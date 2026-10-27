import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { LoadingView } from '@/components/common/LoadingView';
import { Screen } from '@/components/common/Screen';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { useAppTheme } from '@/providers/ThemeProvider';
import {
  usePreferencesStore,
  type AppLanguage,
  type ThemePreference,
} from '@/state/preferences-store';

import { SettingsOptionGroup, type SettingsOption } from './components/SettingsOptionGroup';

export function SettingsScreen() {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const themePreference = usePreferencesStore((state) => state.themePreference);
  const language = usePreferencesStore((state) => state.language);
  const examplePreference = usePreferencesStore((state) => state.examplePreference);
  const isHydrated = usePreferencesStore((state) => state.isHydrated);
  const setThemePreference = usePreferencesStore((state) => state.setThemePreference);
  const setLanguage = usePreferencesStore((state) => state.setLanguage);
  const setExamplePreference = usePreferencesStore((state) => state.setExamplePreference);

  const themeOptions: readonly SettingsOption<ThemePreference>[] = [
    {
      value: 'system',
      label: t('settings.themes.system', { defaultValue: 'System' }),
    },
    {
      value: 'light',
      label: t('settings.themes.light', { defaultValue: 'Light' }),
    },
    {
      value: 'dark',
      label: t('settings.themes.dark', { defaultValue: 'Dark' }),
    },
  ];

  const languageOptions: readonly SettingsOption<AppLanguage>[] = [
    {
      value: 'en',
      label: t('settings.languages.en', { defaultValue: 'English' }),
    },
    {
      value: 'tr',
      label: t('settings.languages.tr', { defaultValue: 'T\u00FCrk\u00E7e' }),
    },
  ];

  if (!isHydrated) {
    return (
      <Screen scrollable={false} testID="settings-screen">
        <LoadingView
          message={t('settings.hydrating', {
            defaultValue: 'Loading saved preferences...',
          })}
          style={styles.centeredState}
          testID="settings-hydrating"
        />
      </Screen>
    );
  }

  const preferenceLabel = t('settings.preferenceLabel', {
    defaultValue: 'Remember example preference',
  });
  const preferenceHint = t('settings.preferenceHint', {
    defaultValue: 'This non-sensitive example is stored on this device with AsyncStorage.',
  });

  return (
    <Screen testID="settings-screen">
      <View style={styles.heading}>
        <AppText accessibilityRole="header" variant="title">
          {t('settings.title', { defaultValue: 'Settings' })}
        </AppText>
        <AppText color="muted">
          {t('settings.subtitle', {
            defaultValue: 'Personalize this local example application.',
          })}
        </AppText>
      </View>

      <Card>
        <AppText accessibilityRole="header" variant="heading">
          {t('settings.appearanceTitle', { defaultValue: 'Appearance' })}
        </AppText>
        <SettingsOptionGroup
          label={t('settings.themeLabel', { defaultValue: 'Color theme' })}
          onChange={(value) => {
            void setThemePreference(value);
          }}
          options={themeOptions}
          testID="theme-selector"
          value={themePreference}
        />
      </Card>

      <Card>
        <AppText accessibilityRole="header" variant="heading">
          {t('settings.languageTitle', { defaultValue: 'Language' })}
        </AppText>
        <SettingsOptionGroup
          label={t('settings.languageLabel', { defaultValue: 'App language' })}
          onChange={(value) => {
            void setLanguage(value);
          }}
          options={languageOptions}
          testID="language-selector"
          value={language}
        />
      </Card>

      <Card>
        <AppText accessibilityRole="header" variant="heading">
          {t('settings.preferencesTitle', { defaultValue: 'Local preference' })}
        </AppText>
        <Pressable
          accessibilityHint={preferenceHint}
          accessibilityLabel={preferenceLabel}
          accessibilityRole="switch"
          accessibilityState={{ checked: examplePreference }}
          onPress={() => {
            void setExamplePreference(!examplePreference);
          }}
          style={({ pressed }) => [styles.preferenceRow, pressed && styles.pressed]}
          testID="example-preference-toggle"
        >
          <View style={styles.preferenceCopy}>
            <AppText variant="label">{preferenceLabel}</AppText>
            <AppText color="muted" variant="caption">
              {preferenceHint}
            </AppText>
          </View>
          <Switch
            accessible={false}
            ios_backgroundColor={theme.colors.border}
            pointerEvents="none"
            thumbColor={examplePreference ? theme.colors.onPrimary : theme.colors.surface}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            value={examplePreference}
          />
        </Pressable>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    gap: 4,
  },
  centeredState: {
    flex: 1,
  },
  preferenceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    minHeight: 52,
  },
  preferenceCopy: {
    flex: 1,
    gap: 2,
  },
  pressed: {
    opacity: 0.78,
  },
});
