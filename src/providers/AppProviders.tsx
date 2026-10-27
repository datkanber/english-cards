import '@/config/env';

import { type PropsWithChildren, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { i18n, setAppLanguage } from '@/i18n';
import { usePreferencesStore } from '@/state/preferences-store';
import { logger } from '@/utils/logger';

import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

function StartupEffects() {
  const hydrate = usePreferencesStore((state) => state.hydrate);
  const language = usePreferencesStore((state) => state.language);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    void setAppLanguage(language).catch((error: unknown) => {
      logger.warn('Could not change the app language.', { error });
    });
  }, [language]);

  return null;
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <QueryProvider>
          <ThemeProvider>
            <StartupEffects />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
