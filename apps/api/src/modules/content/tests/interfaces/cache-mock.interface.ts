export interface CacheMock {
  get: jest.Mock;
  set: jest.Mock;
  stores?: { clear?: jest.Mock }[];
}
