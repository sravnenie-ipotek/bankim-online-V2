import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ContentService } from './content.service';
import type { GetContentByScreenResult } from './tests/interfaces/get-content-by-screen-result.interface';
import type { GetLanguagesResult } from './tests/interfaces/get-languages-result.interface';
import type { GetLanguagesEmptyResult } from './tests/interfaces/get-languages-empty-result.interface';
import type { ContentItemRepoMock } from './tests/interfaces/content-item-repo-mock.interface';
import type { CacheMock } from './tests/interfaces/cache-mock.interface';
import type { DefaultMocks } from './tests/interfaces/default-mocks.interface';
import { ContentFixtures } from './tests/fixtures/content.fixtures';
import { QueryChainHelper } from './tests/helpers/query-chain.helper';
import { ContentModuleTestbed } from './tests/helpers/module-testbed.helper';

describe('ContentService', () => {
  let service: ContentService;
  let contentItemRepo: ContentItemRepoMock;
  let translationRepo: DefaultMocks['translationRepo'];
  let categoryRepo: DefaultMocks['categoryRepo'];
  let languageRepo: DefaultMocks['languageRepo'];
  let cache: CacheMock;

  beforeEach(async () => {
    const mocks = ContentModuleTestbed.createDefaultMocks();
    contentItemRepo = mocks.contentItemRepo;
    translationRepo = mocks.translationRepo;
    categoryRepo = mocks.categoryRepo;
    languageRepo = mocks.languageRepo;
    cache = mocks.cache;

    const module: TestingModule = await Test.createTestingModule({
      providers: ContentModuleTestbed.buildProviders(mocks),
    }).compile();

    service = module.get<ContentService>(ContentService);
  });

  describe('getContentByScreen', () => {
    it('returns expected data shape on cache miss', async () => {
      const result = (await service.getContentByScreen(
        'home_page',
        'he',
      )) as GetContentByScreenResult;

      expect(result).toMatchObject({
        status: 'success',
        screen_location: 'home_page',
        language_code: 'he',
        content_count: 1,
        cached: false,
      });
      expect(result.content['home_page.title']).toBeDefined();
      expect(result.content['home_page.title']).toEqual(
        ContentFixtures.contentEntry,
      );
      expect(cache.set).toHaveBeenCalledWith(
        'content:home_page:he:all',
        expect.objectContaining({ cached: true }),
        300_000,
      );
    });

    it('returns cached value on cache hit and does not call DB', async () => {
      cache.get.mockResolvedValueOnce(ContentFixtures.cachedScreenPayload);

      const result = await service.getContentByScreen('home_page', 'he');

      expect(result).toEqual(ContentFixtures.cachedScreenPayload);
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
      contentItemRepo.createQueryBuilder.mockReturnValueOnce(
        QueryChainHelper.createEmptyContentChain(),
      );

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
      contentItemRepo.createQueryBuilder.mockReturnValueOnce(
        QueryChainHelper.createFailingContentChain(ContentFixtures.dbError),
      );

      await expect(
        service.getContentByScreen('home_page', 'he'),
      ).rejects.toThrow(ContentFixtures.dbError.message);
    });
  });

  describe('getContentByKey', () => {
    it('returns expected data when item and translation exist', async () => {
      contentItemRepo.findOne.mockResolvedValueOnce(ContentFixtures.sampleContentItem);
      translationRepo.findOne.mockResolvedValueOnce(ContentFixtures.sampleTranslation);

      const result = await service.getContentByKey('test_key', 'he');

      expect(result).toMatchObject({
        status: 'success',
        content_key: 'test_key',
        requested_language: 'he',
        actual_language: 'he',
        fallback_used: false,
        content: {
          value: ContentFixtures.sampleTranslation.content_value,
          component_type: ContentFixtures.sampleContentItem.component_type,
          category: ContentFixtures.sampleContentItem.category,
          screen_location: ContentFixtures.sampleContentItem.screen_location,
        },
      });
    });

    it('throws NotFoundException when item not found (negative)', async () => {
      contentItemRepo.findOne.mockResolvedValueOnce(null);

      await expect(
        service.getContentByKey('missing_key', 'he'),
      ).rejects.toThrow(NotFoundException);
      await expect(
        service.getContentByKey('missing_key', 'he'),
      ).rejects.toThrow('Content item not found');
    });

    it('uses English fallback when requested language has no translation', async () => {
      contentItemRepo.findOne.mockResolvedValueOnce(ContentFixtures.sampleContentItem);
      translationRepo.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(ContentFixtures.enFallbackTranslation);

      const result = await service.getContentByKey('test_key', 'ru');

      expect(result).toMatchObject({
        status: 'success',
        actual_language: 'en',
        fallback_used: true,
        content: { value: ContentFixtures.enFallbackTranslation.content_value },
      });
    });

    it('returns empty value when no translation and no fallback (negative)', async () => {
      contentItemRepo.findOne.mockResolvedValueOnce(ContentFixtures.sampleContentItem);
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
      contentItemRepo.findOne.mockRejectedValue(ContentFixtures.dbError);

      await expect(service.getContentByKey('test_key', 'he')).rejects.toThrow(
        ContentFixtures.dbError.message,
      );
    });
  });

  describe('getCategories', () => {
    it('returns expected data shape', async () => {
      const result = await service.getCategories();

      expect(result).toEqual({
        status: 'success',
        categories_count: 1,
        categories: [ContentFixtures.categoryRow],
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
      categoryRepo.find.mockRejectedValue(ContentFixtures.dbError);

      await expect(service.getCategories()).rejects.toThrow(
        ContentFixtures.dbError.message,
      );
    });
  });

  describe('getLanguages', () => {
    it('returns expected data shape', async () => {
      const result = (await service.getLanguages()) as GetLanguagesResult;

      expect(result).toMatchObject({
        status: 'success',
        languages_count: 1,
      });
      expect(Array.isArray(result.languages)).toBe(true);
      expect(result.languages).toHaveLength(1);
      const firstLanguage = result.languages[0];
      expect(firstLanguage).toMatchObject(ContentFixtures.languageRow);
    });

    it('returns empty array when no languages (negative)', async () => {
      languageRepo.find.mockResolvedValueOnce([]);

      const result = (await service.getLanguages()) as GetLanguagesEmptyResult;

      expect(result).toEqual({
        status: 'success',
        languages_count: 0,
        languages: [],
      });
    });

    it('rejects when find throws (fault)', async () => {
      languageRepo.find.mockRejectedValue(ContentFixtures.dbError);

      await expect(service.getLanguages()).rejects.toThrow(
        ContentFixtures.dbError.message,
      );
    });
  });

  describe('getValidationErrors', () => {
    it('returns expected shape on cache miss', async () => {
      const result = (await service.getValidationErrors(
        'he',
      )) as GetContentByScreenResult;

      expect(result).toMatchObject({
        status: 'success',
        screen_location: 'validation_errors',
        language_code: 'he',
        content_count: 1,
        cached: false,
      });
      expect(result.content['home_page.title']).toBeDefined();
      expect(cache.set).toHaveBeenCalledWith(
        'content:validation_errors:he',
        expect.objectContaining({ cached: true }),
        600_000,
      );
    });

    it('returns cached value on cache hit', async () => {
      cache.get.mockResolvedValueOnce(ContentFixtures.cachedValidationPayload);

      const result = await service.getValidationErrors('he');

      expect(result).toEqual(ContentFixtures.cachedValidationPayload);
      expect(contentItemRepo.createQueryBuilder).not.toHaveBeenCalled();
    });

    it('returns empty content when no rows (negative)', async () => {
      contentItemRepo.createQueryBuilder.mockReturnValueOnce(
        QueryChainHelper.createEmptyContentChain(),
      );

      const result = await service.getValidationErrors('he');

      expect(result).toMatchObject({
        status: 'success',
        screen_location: 'validation_errors',
        content_count: 0,
        content: {},
      });
    });

    it('rejects when getRawMany throws (fault)', async () => {
      contentItemRepo.createQueryBuilder.mockReturnValueOnce(
        QueryChainHelper.createFailingContentChain(ContentFixtures.dbError),
      );

      await expect(service.getValidationErrors('he')).rejects.toThrow(
        ContentFixtures.dbError.message,
      );
    });
  });

  describe('getContentItems', () => {
    it('returns expected pagination and items shape', async () => {
      const [itemsChain, countChain] = QueryChainHelper.createItemsAndCountChains(
        [ContentFixtures.contentItemListRow],
        1,
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
        items: [ContentFixtures.contentItemListRow],
      });
    });

    it('applies category filter when provided', async () => {
      const [itemsChain, countChain] = QueryChainHelper.createItemsAndCountChains([], 0);
      contentItemRepo.createQueryBuilder
        .mockReturnValueOnce(itemsChain)
        .mockReturnValueOnce(countChain);

      await service.getContentItems(1, 50, 'general');

      const firstChain = contentItemRepo.createQueryBuilder.mock.results[0]
        ?.value as Record<string, unknown> | undefined;
      expect(firstChain?.andWhere).toHaveBeenCalledWith(
        'ci.category = :category',
        expect.any(Object),
      );
    });

    it('returns empty result when no items (negative)', async () => {
      const [itemsChain, countChain] = QueryChainHelper.createItemsAndCountChains([], 0);
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
      const [, countChain] = QueryChainHelper.createItemsAndCountChains([], 0);
      contentItemRepo.createQueryBuilder
        .mockReturnValueOnce(QueryChainHelper.createFailingContentChain(ContentFixtures.dbError))
        .mockReturnValueOnce(countChain);

      await expect(service.getContentItems(1, 50)).rejects.toThrow(
        ContentFixtures.dbError.message,
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
    const clearCacheSuccessPayload = {
      status: 'success',
      message: 'Content cache cleared successfully',
    };

    it('returns success message and calls clear', async () => {
      const result = await service.clearCache();

      expect(result).toEqual(clearCacheSuccessPayload);
      expect(cache.stores?.[0]?.clear).toHaveBeenCalled();
    });

    it('returns success when stores[0] is missing (fault)', async () => {
      cache.stores = [];

      const result = await service.clearCache();

      expect(result).toEqual(clearCacheSuccessPayload);
    });

    it('rejects when clear throws (fault)', async () => {
      cache.stores = [
        { clear: jest.fn().mockRejectedValue(new Error('Clear failed')) },
      ];

      await expect(service.clearCache()).rejects.toThrow('Clear failed');
    });
  });
});
