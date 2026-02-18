import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ContentService } from '../../content.service';
import { ContentItemEntity } from '../../../../entities/content-item.entity';
import { ContentTranslationEntity } from '../../../../entities/content-translation.entity';
import { ContentCategoryEntity } from '../../../../entities/content-category.entity';
import { LanguageEntity } from '../../../../entities/language.entity';
import type { DefaultMocks } from '../interfaces/default-mocks.interface';
import { createChainMock } from './query-chain.helper';
import {
  rawContentRow,
  categoryRow,
  languageRow,
} from '../fixtures/content.fixtures';

const CONTENT_CONNECTION = 'content';

export class ContentModuleTestbed {
  static createDefaultMocks(): DefaultMocks {
    const getRawMany = jest.fn().mockResolvedValue([rawContentRow]);
    const getCount = jest.fn().mockResolvedValue(1);
    const mockChain = createChainMock(getRawMany, getCount);

    return {
      contentItemRepo: {
        createQueryBuilder: jest.fn().mockReturnValue(mockChain),
        findOne: jest.fn().mockResolvedValue(null),
      },
      translationRepo: {
        findOne: jest.fn().mockResolvedValue(null),
      },
      categoryRepo: {
        find: jest.fn().mockResolvedValue([categoryRow]),
      },
      languageRepo: {
        find: jest.fn().mockResolvedValue([languageRow]),
      },
      cache: {
        get: jest.fn().mockResolvedValue(undefined),
        set: jest.fn().mockResolvedValue(undefined),
        stores: [{ reset: jest.fn().mockResolvedValue(undefined) }],
      },
    };
  }

  static buildProviders(mocks: DefaultMocks): Provider[] {
    return [
      ContentService,
      {
        provide: getRepositoryToken(ContentItemEntity, CONTENT_CONNECTION),
        useValue: mocks.contentItemRepo,
      },
      {
        provide: getRepositoryToken(
          ContentTranslationEntity,
          CONTENT_CONNECTION,
        ),
        useValue: mocks.translationRepo,
      },
      {
        provide: getRepositoryToken(ContentCategoryEntity, CONTENT_CONNECTION),
        useValue: mocks.categoryRepo,
      },
      {
        provide: getRepositoryToken(LanguageEntity, CONTENT_CONNECTION),
        useValue: mocks.languageRepo,
      },
      { provide: CACHE_MANAGER, useValue: mocks.cache },
    ];
  }
}
