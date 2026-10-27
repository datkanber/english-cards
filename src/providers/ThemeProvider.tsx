import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { usePreferencesStore } from '@/state/preferences-store';
import { darkTheme, lightTheme, type AppColorScheme, type AppTheme } from '@/theme';

export interface AppThemeContextValue {
  theme: AppTheme;
  scheme: AppColorScheme;
}

const AppThemeContext = createContext<AppThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const themePreference = usePreferencesStore((state) => state.themePreference);
  const scheme: AppColorScheme =
    themePreference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : themePreference;

  const value = useMemo<AppThemeContextValue>(
    () => ({
      scheme,
      theme: scheme === 'dark' ? darkTheme : lightTheme,
    }),
    [scheme],
  );

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

export const useAppTheme = (): AppThemeContextValue => {
  const value = useContext(AppThemeContext);

  if (!value) {
    throw new Error('useAppTheme must be used within ThemeProvider.');
  }

  return value;
};
