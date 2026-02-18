import type { ContentServiceMock } from '../interfaces/content-service-mock.interface';
import type { DropdownServiceMock } from '../interfaces/dropdown-service-mock.interface';

export class ContentControllerTestbed {
  static createContentServiceMock(): ContentServiceMock {
    return {
      getContentByScreen: jest.fn(),
      getContentByKey: jest.fn(),
      getCategories: jest.fn(),
      getLanguages: jest.fn(),
      getValidationErrors: jest.fn(),
      getContentItems: jest.fn(),
      getCacheStats: jest.fn(),
      clearCache: jest.fn(),
    };
  }

  static createDropdownServiceMock(): DropdownServiceMock {
    return {
      getDropdownsByScreen: jest.fn(),
      getDropdownByField: jest.fn(),
      getDropdownOptions: jest.fn(),
    };
  }
}
