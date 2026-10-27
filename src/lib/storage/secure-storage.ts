import * as SecureStore from 'expo-secure-store';

export type SecureStorageOperation = 'get' | 'remove' | 'set';

export class SecureStorageError extends Error {
  readonly operation: SecureStorageOperation;

  constructor(operation: SecureStorageOperation) {
    super(`Secure storage ${operation} operation failed.`);
    this.name = 'SecureStorageError';
    this.operation = operation;
    Object.setPrototypeOf(this, SecureStorageError.prototype);
  }
}

const assertValidKey = (key: string): void => {
  if (!/^[\w.-]+$/u.test(key)) {
    throw new Error(
      'Secure storage keys may contain only letters, numbers, underscores, periods, and hyphens.',
    );
  }
};

const get = async (
  key: string,
  options?: SecureStore.SecureStoreOptions,
): Promise<string | null> => {
  assertValidKey(key);

  try {
    return await SecureStore.getItemAsync(key, options);
  } catch {
    throw new SecureStorageError('get');
  }
};

const set = async (
  key: string,
  value: string,
  options?: SecureStore.SecureStoreOptions,
): Promise<void> => {
  assertValidKey(key);

  try {
    await SecureStore.setItemAsync(key, value, options);
  } catch {
    throw new SecureStorageError('set');
  }
};

const remove = async (key: string, options?: SecureStore.SecureStoreOptions): Promise<void> => {
  assertValidKey(key);

  try {
    await SecureStore.deleteItemAsync(key, options);
  } catch {
    throw new SecureStorageError('remove');
  }
};

export const secureStorage = {
  get,
  isAvailable: SecureStore.isAvailableAsync,
  remove,
  set,
} as const;
