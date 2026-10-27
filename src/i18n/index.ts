import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { appConfig, type AppLanguage } from '@/config/app';

import english from './locales/en.json';
import turkish from './locales/tr.json';

export const resources = {
  en: { translation: english },
  tr: { translation: turkish },
} as const;

export const i18n = createInstance();

export const isAppLanguage = (language: string): language is AppLanguage =>
  appConfig.supportedLanguages.some((supportedLanguage) => supportedLanguage === language);

export const resolveAppLanguage = (languageTag?: string | null): AppLanguage => {
  const language = languageTag?.split(/[-_]/u)[0]?.toLowerCase();

  return language && isAppLanguage(language) ? language : appConfig.defaultLanguage;
};

export const getDeviceLanguage = (): AppLanguage =>
  resolveAppLanguage(getLocales()[0]?.languageCode);

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: appConfig.defaultLanguage,
    supportedLngs: [...appConfig.supportedLanguages],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export const setAppLanguage = async (language: AppLanguage): Promise<void> => {
  if (i18n.resolvedLanguage !== language) {
    await i18n.changeLanguage(language);
  }
};

export type { AppLanguage } from '@/config/app';
