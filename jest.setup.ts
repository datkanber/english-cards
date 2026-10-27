jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    clear: jest.fn(async () => undefined),
    getAllKeys: jest.fn(async () => []),
    getItem: jest.fn(async () => null),
    multiGet: jest.fn(async () => []),
    multiRemove: jest.fn(async () => undefined),
    multiSet: jest.fn(async () => undefined),
    removeItem: jest.fn(async () => undefined),
    setItem: jest.fn(async () => undefined),
  },
}));

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'en', languageTag: 'en-US' }],
}));

afterEach(() => {
  jest.clearAllMocks();
});
