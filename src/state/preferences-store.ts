import { create } from 'zustand';

import type { AppLanguage } from '@/config/app';
import { getDeviceLanguage } from '@/i18n';
import {
  preferencesStorage,
  type StoredPreferences,
  type ThemePreference,
} from '@/lib/storage/preferences';
import { logger } from '@/utils/logger';

export interface PreferencesState extends StoredPreferences {
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  reset: () => Promise<void>;
  setExamplePreference: (value: boolean) => Promise<void>;
  setLanguage: (language: AppLanguage) => Promise<void>;
  setThemePreference: (theme: ThemePreference) => Promise<void>;
}

const getDefaultPreferences = (): StoredPreferences => ({
  themePreference: 'system',
  language: getDeviceLanguage(),
  examplePreference: false,
});

const selectStoredPreferences = (state: PreferencesState): StoredPreferences => ({
  themePreference: state.themePreference,
  language: state.language,
  examplePreference: state.examplePreference,
});

let hydrationPromise: Promise<void> | undefined;
let storageQueue = Promise.resolve();

const enqueueStorageOperation = (operation: () => Promise<void>): Promise<void> => {
  const result = storageQueue.then(operation, operation);
  storageQueue = result.catch(() => undefined);
  return result;
};

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
  ...getDefaultPreferences(),
  isHydrated: false,

  hydrate: async () => {
    if (get().isHydrated) {
      return;
    }

    if (hydrationPromise) {
      return hydrationPromise;
    }

    hydrationPromise = (async () => {
      try {
        const storedPreferences = await preferencesStorage.get();
        if (storedPreferences) {
          set(storedPreferences);
        }
      } catch (error: unknown) {
        logger.warn('Could not restore preferences.', { error });
      } finally {
        set({ isHydrated: true });
        hydrationPromise = undefined;
      }
    })();

    return hydrationPromise;
  },

  reset: async () => {
    set({ ...getDefaultPreferences(), isHydrated: true });
    try {
      await enqueueStorageOperation(() => preferencesStorage.remove());
    } catch (error: unknown) {
      logger.warn('Could not reset preferences.', { error });
    }
  },

  setExamplePreference: async (examplePreference) => {
    set({ examplePreference });
    const preferences = selectStoredPreferences(get());
    try {
      await enqueueStorageOperation(() => preferencesStorage.set(preferences));
    } catch (error: unknown) {
      logger.warn('Could not save the example preference.', { error });
    }
  },

  setLanguage: async (language) => {
    set({ language });
    const preferences = selectStoredPreferences(get());
    try {
      await enqueueStorageOperation(() => preferencesStorage.set(preferences));
    } catch (error: unknown) {
      logger.warn('Could not save the language preference.', { error });
    }
  },

  setThemePreference: async (themePreference) => {
    set({ themePreference });
    const preferences = selectStoredPreferences(get());
    try {
      await enqueueStorageOperation(() => preferencesStorage.set(preferences));
    } catch (error: unknown) {
      logger.warn('Could not save the theme preference.', { error });
    }
  },
}));

export type { AppLanguage, ThemePreference };
