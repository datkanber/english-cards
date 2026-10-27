import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useAppTheme } from '@/providers/ThemeProvider';

export default function TabLayout() {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarAccessibilityLabel: t('navigation.home', {
            defaultValue: 'Home tab',
          }),
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="home-outline" size={size} />
          ),
          title: t('navigation.home', { defaultValue: 'Home' }),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarAccessibilityLabel: t('navigation.settings', {
            defaultValue: 'Settings tab',
          }),
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="settings-outline" size={size} />
          ),
          title: t('navigation.settings', { defaultValue: 'Settings' }),
        }}
      />
    </Tabs>
  );
}
