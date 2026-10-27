import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

import type { AppLanguage } from '@/config/app';

export const themePreferences = ['system', 'light', 'dark'] as const;
export type ThemePreference = (typeof themePreferences)[number];

export interface StoredPreferences {
  themePreference: ThemePreference;
  language: AppLanguage;
  examplePreference: boolean;
}

const storedPreferencesSchema = z.object({
  themePreference: z.enum(themePreferences),
  language: z.enum(['en', 'tr']),
  examplePreference: z.boolean(),
});

export const PREFERENCES_STORAGE_KEY = '@app/preferences/v1';

const get = async (): Promise<StoredPreferences | null> => {
  const value = await AsyncStorage.getItem(PREFERENCES_STORAGE_KEY);

  if (!value) {
    return null;
  }

  try {
    const parsedValue: unknown = JSON.parse(value);
    const result = storedPreferencesSchema.safeParse(parsedValue);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
};

const set = async (preferences: StoredPreferences): Promise<void> => {
  const validatedPreferences = storedPreferencesSchema.parse(preferences);
  await AsyncStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(validatedPreferences));
};

const remove = async (): Promise<void> => {
  await AsyncStorage.removeItem(PREFERENCES_STORAGE_KEY);
};

export const preferencesStorage = { get, set, remove } as const;
