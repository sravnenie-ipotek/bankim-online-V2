import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { DropdownService } from './dropdown.service';

describe('ContentController', () => {
  let controller: ContentController;
  let contentService: {
    getContentByScreen: jest.Mock;
    getContentByKey: jest.Mock;
    getCategories: jest.Mock;
    getLanguages: jest.Mock;
    getValidationErrors: jest.Mock;
    getContentItems: jest.Mock;
    getCacheStats: jest.Mock;
    clearCache: jest.Mock;
  };

  const mockContentService = () => ({
    getContentByScreen: jest.fn(),
    getContentByKey: jest.fn(),
    getCategories: jest.fn(),
    getLanguages: jest.fn(),
    getValidationErrors: jest.fn(),
    getContentItems: jest.fn(),
    getCacheStats: jest.fn(),
    clearCache: jest.fn(),
  });

  const mockDropdownService = () => ({
    getDropdownsByScreen: jest.fn(),
    getDropdownByField: jest.fn(),
    getDropdownOptions: jest.fn(),
  });

  beforeEach(async () => {
    contentService = mockContentService();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [
        { provide: ContentService, useValue: contentService },
        { provide: DropdownService, useValue: mockDropdownService() },
      ],
    }).compile();

    controller = module.get<ContentController>(ContentController);
  });

  describe('content routes – expected data (pass-through)', () => {
    it('getContentByScreen returns service result', async () => {
      const payload = {
        status: 'success',
        screen_location: 'home_page',
        language_code: 'he',
        content_count: 1,
        content: { 'home_page.title': { value: 'Welcome' } },
        cached: false,
      };
      contentService.getContentByScreen.mockResolvedValue(payload);

      const result = await controller.getContentByScreen('home_page', 'he');

      expect(result).toEqual(payload);
      expect(contentService.getContentByScreen).toHaveBeenCalledWith(
        'home_page',
        'he',
        undefined,
      );
    });

    it('getContentByScreen with type query passes type to service', async () => {
      const payload = {
        status: 'success',
        screen_location: 'home_page',
        language_code: 'he',
        content_count: 0,
        content: {},
        filtered_by_type: 'heading',
        cached: false,
      };
      contentService.getContentByScreen.mockResolvedValue(payload);

      const result = await controller.getContentByScreen(
        'home_page',
        'he',
        'heading',
      );

      expect(result).toEqual(payload);
      expect(contentService.getContentByScreen).toHaveBeenCalledWith(
        'home_page',
        'he',
        'heading',
      );
    });

    it('getCategories returns service result', async () => {
      const payload = {
        status: 'success',
        categories_count: 1,
        categories: [{ id: 1, name: 'general' }],
      };
      contentService.getCategories.mockResolvedValue(payload);

      const result = await controller.getCategories();

      expect(result).toEqual(payload);
      expect(contentService.getCategories).toHaveBeenCalled();
    });

    it('getLanguages returns service result', async () => {
      const payload = {
        status: 'success',
        languages_count: 2,
        languages: [{ code: 'he' }, { code: 'en' }],
      };
      contentService.getLanguages.mockResolvedValue(payload);

      const result = await controller.getLanguages();

      expect(result).toEqual(payload);
      expect(contentService.getLanguages).toHaveBeenCalled();
    });

    it('getValidationErrors returns service result', async () => {
      const payload = {
        status: 'success',
        screen_location: 'validation_errors',
        language_code: 'he',
        content_count: 0,
        content: {},
        cached: false,
      };
      contentService.getValidationErrors.mockResolvedValue(payload);

      const result = await controller.getValidationErrors('he');

      expect(result).toEqual(payload);
      expect(contentService.getValidationErrors).toHaveBeenCalledWith('he');
    });

    it('getContentItems returns service result with default page/limit', async () => {
      const payload = {
        status: 'success',
        pagination: { page: 1, limit: 50, total: 0, pages: 0 },
        items: [],
      };
      contentService.getContentItems.mockResolvedValue(payload);

      const result = await controller.getContentItems();

      expect(result).toEqual(payload);
      expect(contentService.getContentItems).toHaveBeenCalledWith(
        1,
        50,
        undefined,
        undefined,
        undefined,
      );
    });

    it('getContentItems with query params passes them to service', async () => {
      const payload = {
        status: 'success',
        pagination: { page: 2, limit: 10, total: 5, pages: 1 },
        items: [],
      };
      contentService.getContentItems.mockResolvedValue(payload);

      const result = await controller.getContentItems(
        '2',
        '10',
        'general',
        'home_page',
        'foo',
      );

      expect(result).toEqual(payload);
      expect(contentService.getContentItems).toHaveBeenCalledWith(
        2,
        10,
        'general',
        'home_page',
        'foo',
      );
    });

    it('getCacheStats returns service result', async () => {
      const payload = {
        status: 'success',
        cache_stats: { message: 'Cache is managed by Nest CacheModule' },
        ttl: '300 seconds (5 minutes)',
      };
      contentService.getCacheStats.mockResolvedValue(payload);

      const result = await controller.getCacheStats();

      expect(result).toEqual(payload);
      expect(contentService.getCacheStats).toHaveBeenCalled();
    });

    it('clearCache returns service result', async () => {
      const payload = {
        status: 'success',
        message: 'Content cache cleared successfully',
      };
      contentService.clearCache.mockResolvedValue(payload);

      const result = await controller.clearCache();

      expect(result).toEqual(payload);
      expect(contentService.clearCache).toHaveBeenCalled();
    });

    it('getContentByKey returns service result', async () => {
      const payload = {
        status: 'success',
        content_key: 'test_key',
        requested_language: 'he',
        actual_language: 'he',
        fallback_used: false,
        content: {
          value: 'Test value',
          component_type: 'text',
          category: 'general',
          screen_location: 'home_page',
        },
      };
      contentService.getContentByKey.mockResolvedValue(payload);

      const result = await controller.getContentByKey('test_key', 'he');

      expect(result).toEqual(payload);
      expect(contentService.getContentByKey).toHaveBeenCalledWith(
        'test_key',
        'he',
      );
    });
  });

  describe('negative – getContentByKey throws NotFoundException', () => {
    it('propagates NotFoundException when content item not found', async () => {
      contentService.getContentByKey.mockRejectedValue(
        new NotFoundException('Content item not found'),
      );

      await expect(
        controller.getContentByKey('missing_key', 'he'),
      ).rejects.toThrow(NotFoundException);
      await expect(
        controller.getContentByKey('missing_key', 'he'),
      ).rejects.toThrow('Content item not found');
    });
  });

  describe('fault – service throws generic error', () => {
    it('propagates error when getContentByScreen throws', async () => {
      contentService.getContentByScreen.mockRejectedValue(
        new Error('DB connection failed'),
      );

      await expect(
        controller.getContentByScreen('home_page', 'he'),
      ).rejects.toThrow('DB connection failed');
    });

    it('propagates error when getContentByKey throws generic Error', async () => {
      contentService.getContentByKey.mockRejectedValue(
        new Error('DB connection failed'),
      );

      await expect(
        controller.getContentByKey('some_key', 'he'),
      ).rejects.toThrow('DB connection failed');
    });
  });
});
