export interface CacheMock {
  get: jest.Mock;
  set: jest.Mock;
  stores?: { reset?: jest.Mock }[];
}
