import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/providers/ThemeProvider';

import { AppButton } from '../ui/AppButton';
import { AppText } from '../ui/AppText';

export interface ErrorStateProps {
  title: string;
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function ErrorState({
  title,
  message,
  retryLabel = 'Try again',
  onRetry,
  style,
  testID,
}: ErrorStateProps) {
  const { theme } = useAppTheme();

  return (
    <View
      accessibilityLiveRegion="polite"
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.errorSurface,
          borderColor: theme.colors.error,
          borderRadius: theme.radii.md,
        },
        style,
      ]}
      testID={testID}
    >
      <AppText accessibilityRole="alert" color="error" variant="heading">
        {title}
      </AppText>
      <AppText style={styles.text}>{message}</AppText>
      {onRetry ? <AppButton onPress={onRetry} title={retryLabel} variant="secondary" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    gap: 12,
    justifyContent: 'center',
    minHeight: 160,
    padding: 24,
  },
  text: {
    textAlign: 'center',
  },
});
