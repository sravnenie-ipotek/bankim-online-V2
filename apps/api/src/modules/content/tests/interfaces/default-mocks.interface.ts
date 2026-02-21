import type { ContentItemRepoMock } from './content-item-repo-mock.interface';
import type { CacheMock } from './cache-mock.interface';
import type { MemoryConfiguration } from '../../../../config/interfaces/MemoryConfiguration.js';

export interface DefaultMocks {
  contentItemRepo: ContentItemRepoMock;
  translationRepo: { findOne: jest.Mock };
  categoryRepo: { find: jest.Mock };
  languageRepo: { find: jest.Mock };
  cache: CacheMock;
  cacheConfig: MemoryConfiguration;
}
