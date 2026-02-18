import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { ContentService } from './content.service';
import type { ContentEntry } from './interfaces/content-entry.interface';
import { ContentItemEntity } from '../../entities/content-item.entity';
import { ContentTranslationEntity } from '../../entities/content-translation.entity';
import { ContentCategoryEntity } from '../../entities/content-category.entity';
import { LanguageEntity } from '../../entities/language.entity';

const CONTENT_CONNECTION = 'content';

function createChainMock(
  getRawMany: jest.Mock,
  getCount?: jest.Mock,
): Record<string, unknown> {
  const chain: Record<string, unknown> = {
    innerJoin: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    addGroupBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    getRawMany,
  };
  if (getCount) {
    chain.getCount = getCount;
  }
  return chain;
}

describe('ContentService', () => {
  let service: ContentService;
  let contentItemRepo: {
    createQueryBuilder: jest.Mock;
    findOne: jest.Mock;
  };
  let translationRepo: { findOne: jest.Mock };
  let categoryRepo: { find: jest.Mock };
  let languageRepo: { find: jest.Mock };
  let cache: {
    get: jest.Mock;
    set: jest.Mock;
    stores?: { reset?: jest.Mock }[];
  };

  const rawContentRow = {
    content_key: 'home_page.title',
    component_type: 'text',
    category: 'general',
    content_value: 'Welcome',
    language_code: 'he',
    status: 'approved',
  };

  beforeEach(async () => {
    const getRawMany = jest.fn().mockResolvedValue([rawContentRow]);
    const getCount = jest.fn().mockResolvedValue(1);
    const mockChain = createChainMock(getRawMany, getCount);

    contentItemRepo = {
      createQueryBuilder: jest.fn().mockReturnValue(mockChain),
      findOne: jest.fn().mockResolvedValue(null),
    };

    translationRepo = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    categoryRepo = {
      find: jest
        .fn()
        .mockResolvedValue([{ id: 1, name: 'general', is_active: true }]),
    };

    languageRepo = {
      find: jest
        .fn()
        .mockResolvedValue([
          { id: 1, code: 'he', name: 'Hebrew', is_active: true },
        ]),
    };

    cache = {
      get: jest.fn().mockResolvedValue(undefined),
      set: jest.fn().mockResolvedValue(undefined),
      stores: [{ reset: jest.fn().mockResolvedValue(undefined) }],
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: getRepositoryToken(ContentItemEntity, CONTENT_CONNECTION),
          useValue: contentItemRepo,
        },
        {
          provide: getRepositoryToken(
            ContentTranslationEntity,
            CONTENT_CONNECTION,
          ),
          useValue: translationRepo,
        },
        {
          provide: getRepositoryToken(
            ContentCategoryEntity,
            CONTENT_CONNECTION,
          ),
          useValue: categoryRepo,
        },
        {
          provide: getRepositoryToken(LanguageEntity, CONTENT_CONNECTION),
          useValue: languageRepo,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cache,
        },
      ],
    }).compile();

    service = module.get<ContentService>(ContentService);
  });

  describe('getContentByScreen', () => {
    it('returns expected data shape on cache miss', async () => {
      const result = (await service.getContentByScreen('home_page', 'he')) as {
        content: Record<string, ContentEntry>;
      };

      expect(result).toMatchObject({
        status: 'success',
        screen_location: 'home_page',
        language_code: 'he',
        content_count: 1,
        cached: false,
      });
      const content = result.content;
      expect(content['home_page.title']).toBeDefined();
      expect(content['home_page.title']).toEqual({
        value: 'Welcome',
        component_type: 'text',
        category: 'general',
        language: 'he',
        status: 'approved',
      });
      expect(cache.set).toHaveBeenCalledWith(
        'content_home_page_he_all',
        expect.objectContaining({ cached: true }),
        300_000,
      );
    });

    it('returns cached value on cache hit and does not call DB', async () => {
      const cached = {
        status: 'success',
        screen_location: 'home_page',
        language_code: 'he',
        content_count: 0,
        content: {},
        cached: true,
      };
      cache.get.mockResolvedValueOnce(cached);

      const result = await service.getContentByScreen('home_page', 'he');

      expect(result).toEqual(cached);
      expect(contentItemRepo.createQueryBuilder).not.toHaveBeenCalled();
    });

    it('includes filtered_by_type when type is passed', async () => {
      const result = await service.getContentByScreen(
        'home_page',
        'he',
        'heading',
      );

      expect(result).toMatchObject({
        status: 'success',
        filtered_by_type: 'heading',
      });
      expect(contentItemRepo.createQueryBuilder).toHaveBeenCalled();
      const chain = contentItemRepo.createQueryBuilder() as Record<
        string,
        unknown
      >;
      expect(chain.andWhere).toHaveBeenCalledWith(
        'ci.component_type = :type',
        expect.any(Object),
      );
    });

    it('returns empty content when no rows (negative)', async () => {
      const emptyChain = createChainMock(jest.fn().mockResolvedValue([]));
      contentItemRepo.createQueryBuilder.mockReturnValueOnce(emptyChain);

      const result = await service.getContentByScreen('home_page', 'he');

      expect(result).toMatchObject({
        status: 'success',
        screen_location: 'home_page',
        language_code: 'he',
        content_count: 0,
        content: {},
        cached: false,
      });
    });

    it('rejects when getRawMany throws (fault)', async () => {
      const failingChain = createChainMock(
        jest.fn().mockRejectedValue(new Error('DB connection failed')),
      );
      contentItemRepo.createQueryBuilder.mockReturnValueOnce(failingChain);

      await expect(
        service.getContentByScreen('home_page', 'he'),
      ).rejects.toThrow('DB connection failed');
    });
  });

  describe('getContentByKey', () => {
    it('returns expected data when item and translation exist', async () => {
      const item = {
        id: 1,
        content_key: 'test_key',
        component_type: 'text',
        category: 'general',
        screen_location: 'home_page',
        is_active: true,
      };
      const translation = {
        id: 1,
        content_item_id: 1,
        language_code: 'he',
        content_value: 'Translated text',
        status: 'approved',
      };
      contentItemRepo.findOne.mockResolvedValueOnce(item);
      translationRepo.findOne.mockResolvedValueOnce(translation);

      const result = await service.getContentByKey('test_key', 'he');

      expect(result).toMatchObject({
        status: 'success',
        content_key: 'test_key',
        requested_language: 'he',
        actual_language: 'he',
        fallback_used: false,
        content: {
          value: 'Translated text',
          component_type: 'text',
          category: 'general',
          screen_location: 'home_page',
        },
      });
    });

    it('throws NotFoundException when item not found (negative)', async () => {
      contentItemRepo.findOne.mockResolvedValueOnce(null);

      await expect(service.getContentByKey('missing_key', 'he')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getContentByKey('missing_key', 'he')).rejects.toThrow(
        'Content item not found',
      );
    });

    it('uses English fallback when requested language has no translation', async () => {
      const item = {
        id: 1,
        content_key: 'test_key',
        component_type: 'text',
        category: 'general',
        screen_location: 'home_page',
        is_active: true,
      };
      const enTranslation = {
        id: 1,
        content_item_id: 1,
        language_code: 'en',
        content_value: 'English fallback',
        status: 'approved',
      };
      contentItemRepo.findOne.mockResolvedValueOnce(item);
      translationRepo.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(enTranslation);

      const result = await service.getContentByKey('test_key', 'ru');

      expect(result).toMatchObject({
        status: 'success',
        actual_language: 'en',
        fallback_used: true,
        content: { value: 'English fallback' },
      });
    });

    it('returns empty value when no translation and no fallback (negative)', async () => {
      const item = {
        id: 1,
        content_key: 'test_key',
        component_type: 'text',
        category: 'general',
        screen_location: 'home_page',
        is_active: true,
      };
      contentItemRepo.findOne.mockResolvedValueOnce(item);
      translationRepo.findOne.mockResolvedValue(null);

      const result = await service.getContentByKey('test_key', 'ru');

      expect(result).toMatchObject({
        status: 'success',
        actual_language: 'ru',
        fallback_used: false,
        content: { value: '' },
      });
    });

    it('rejects when findOne throws (fault)', async () => {
      contentItemRepo.findOne.mockRejectedValue(
        new Error('DB connection failed'),
      );

      await expect(service.getContentByKey('test_key', 'he')).rejects.toThrow(
        'DB connection failed',
      );
    });
  });

  describe('getCategories', () => {
    it('returns expected data shape', async () => {
      const result = await service.getCategories();

      expect(result).toEqual({
        status: 'success',
        categories_count: 1,
        categories: [
          { id: 1, name: 'general', is_active: true },
        ],
      });
    });

    it('returns empty array when no categories (negative)', async () => {
      categoryRepo.find.mockResolvedValueOnce([]);

      const result = await service.getCategories();

      expect(result).toEqual({
        status: 'success',
        categories_count: 0,
        categories: [],
      });
    });

    it('rejects when find throws (fault)', async () => {
      categoryRepo.find.mockRejectedValue(new Error('DB connection failed'));

      await expect(service.getCategories()).rejects.toThrow(
        'DB connection failed',
      );
    });
  });

  describe('getLanguages', () => {
    it('returns expected data shape', async () => {
      const result = await service.getLanguages();

      expect(result).toMatchObject({
        status: 'success',
        languages_count: 1,
        languages: expect.any(Array),
      });
      expect(result.languages[0]).toMatchObject({
        id: 1,
        code: 'he',
        name: 'Hebrew',
        is_active: true,
      });
    });

    it('returns empty array when no languages (negative)', async () => {
      languageRepo.find.mockResolvedValueOnce([]);

      const result = await service.getLanguages();

      expect(result).toEqual({
        status: 'success',
        languages_count: 0,
        languages: [],
      });
    });

    it('rejects when find throws (fault)', async () => {
      languageRepo.find.mockRejectedValue(new Error('DB connection failed'));

      await expect(service.getLanguages()).rejects.toThrow(
        'DB connection failed',
      );
    });
  });

  describe('getValidationErrors', () => {
    it('returns expected shape on cache miss', async () => {
      const result = (await service.getValidationErrors('he')) as {
        content: Record<string, ContentEntry>;
      };

      expect(result).toMatchObject({
        status: 'success',
        screen_location: 'validation_errors',
        language_code: 'he',
        content_count: 1,
        cached: false,
      });
      const validationContent = result.content;
      expect(validationContent['home_page.title']).toBeDefined();
      expect(cache.set).toHaveBeenCalledWith(
        'validation_errors_he',
        expect.objectContaining({ cached: true }),
        600_000,
      );
    });

    it('returns cached value on cache hit', async () => {
      const cached = {
        status: 'success',
        screen_location: 'validation_errors',
        language_code: 'he',
        content_count: 0,
        content: {},
        cached: true,
      };
      cache.get.mockResolvedValueOnce(cached);

      const result = await service.getValidationErrors('he');

      expect(result).toEqual(cached);
      expect(contentItemRepo.createQueryBuilder).not.toHaveBeenCalled();
    });

    it('returns empty content when no rows (negative)', async () => {
      const emptyChain = createChainMock(jest.fn().mockResolvedValue([]));
      contentItemRepo.createQueryBuilder.mockReturnValueOnce(emptyChain);

      const result = await service.getValidationErrors('he');

      expect(result).toMatchObject({
        status: 'success',
        screen_location: 'validation_errors',
        content_count: 0,
        content: {},
      });
    });

    it('rejects when getRawMany throws (fault)', async () => {
      const failingChain = createChainMock(
        jest.fn().mockRejectedValue(new Error('DB connection failed')),
      );
      contentItemRepo.createQueryBuilder.mockReturnValueOnce(failingChain);

      await expect(service.getValidationErrors('he')).rejects.toThrow(
        'DB connection failed',
      );
    });
  });

  describe('getContentItems', () => {
    it('returns expected pagination and items shape', async () => {
      const itemRow = {
        id: 1,
        content_key: 'key1',
        content_type: 'text',
        category: 'general',
        screen_location: 'home_page',
        component_type: 'text',
        description: 'Desc',
        created_at: '2024-01-01',
        updated_at: '2024-01-02',
        translation_count: '2',
        approved_translations: '2',
      };
      const itemsChain = createChainMock(
        jest.fn().mockResolvedValue([itemRow]),
        undefined,
      );
      const countChain = createChainMock(
        jest.fn(),
        jest.fn().mockResolvedValue(1),
      );
      contentItemRepo.createQueryBuilder
        .mockReturnValueOnce(itemsChain)
        .mockReturnValueOnce(countChain);

      const result = await service.getContentItems(1, 50);

      expect(result).toMatchObject({
        status: 'success',
        pagination: {
          page: 1,
          limit: 50,
          total: 1,
          pages: 1,
        },
        items: [itemRow],
      });
    });

    it('applies category filter when provided', async () => {
      const itemsChain = createChainMock(
        jest.fn().mockResolvedValue([]),
        undefined,
      );
      const countChain = createChainMock(
        jest.fn(),
        jest.fn().mockResolvedValue(0),
      );
      contentItemRepo.createQueryBuilder
        .mockReturnValueOnce(itemsChain)
        .mockReturnValueOnce(countChain);

      await service.getContentItems(1, 50, 'general');

      const firstChain = contentItemRepo.createQueryBuilder.mock.results[0]
        ?.value;
      expect(firstChain?.andWhere).toHaveBeenCalledWith(
        'ci.category = :category',
        expect.any(Object),
      );
    });

    it('returns empty result when no items (negative)', async () => {
      const itemsChain = createChainMock(jest.fn().mockResolvedValue([]));
      const countChain = createChainMock(
        jest.fn(),
        jest.fn().mockResolvedValue(0),
      );
      contentItemRepo.createQueryBuilder
        .mockReturnValueOnce(itemsChain)
        .mockReturnValueOnce(countChain);

      const result = await service.getContentItems(1, 50);

      expect(result).toEqual({
        status: 'success',
        pagination: { page: 1, limit: 50, total: 0, pages: 0 },
        items: [],
      });
    });

    it('rejects when getRawMany throws (fault)', async () => {
      const failingChain = createChainMock(
        jest.fn().mockRejectedValue(new Error('DB connection failed')),
      );
      const countChain = createChainMock(
        jest.fn(),
        jest.fn().mockResolvedValue(0),
      );
      contentItemRepo.createQueryBuilder
        .mockReturnValueOnce(failingChain)
        .mockReturnValueOnce(countChain);

      await expect(service.getContentItems(1, 50)).rejects.toThrow(
        'DB connection failed',
      );
    });
  });

  describe('getCacheStats', () => {
    it('returns fixed expected shape', async () => {
      const result = await service.getCacheStats();

      expect(result).toEqual({
        status: 'success',
        cache_stats: { message: 'Cache is managed by Nest CacheModule' },
        ttl: '300 seconds (5 minutes)',
      });
    });
  });

  describe('clearCache', () => {
    it('returns success message and calls reset', async () => {
      const result = await service.clearCache();

      expect(result).toEqual({
        status: 'success',
        message: 'Content cache cleared successfully',
      });
      expect(cache.stores?.[0]?.reset).toHaveBeenCalled();
    });

    it('returns success when stores[0] is missing (fault)', async () => {
      cache.stores = [];

      const result = await service.clearCache();

      expect(result).toEqual({
        status: 'success',
        message: 'Content cache cleared successfully',
      });
    });

    it('rejects when reset throws (fault)', async () => {
      cache.stores = [
        { reset: jest.fn().mockRejectedValue(new Error('Reset failed')) },
      ];

      await expect(service.clearCache()).rejects.toThrow('Reset failed');
    });
  });
});
