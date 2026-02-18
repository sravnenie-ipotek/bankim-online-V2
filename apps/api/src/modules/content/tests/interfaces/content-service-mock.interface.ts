export interface ContentServiceMock {
  getContentByScreen: jest.Mock;
  getContentByKey: jest.Mock;
  getCategories: jest.Mock;
  getLanguages: jest.Mock;
  getValidationErrors: jest.Mock;
  getContentItems: jest.Mock;
  getCacheStats: jest.Mock;
  clearCache: jest.Mock;
}
