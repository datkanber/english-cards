import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from '@/components/common/Screen';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';

export default function NotFoundRoute() {
  const router = useRouter();
  const { t } = useTranslation();
  const actionLabel = t('notFound.action', { defaultValue: 'Return to Home' });

  return (
    <Screen contentContainerStyle={styles.screen} scrollable={false} testID="not-found-screen">
      <View style={styles.copy}>
        <AppText accessibilityRole="header" style={styles.text} variant="title">
          {t('notFound.title', { defaultValue: 'Page not found' })}
        </AppText>
        <AppText color="muted" style={styles.text}>
          {t('notFound.message', {
            defaultValue: 'The page you requested does not exist or has moved.',
          })}
        </AppText>
      </View>
      <AppButton
        accessibilityLabel={actionLabel}
        onPress={() => {
          router.replace('/(tabs)');
        }}
        title={actionLabel}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    gap: 8,
    maxWidth: 480,
  },
  text: {
    textAlign: 'center',
  },
});
