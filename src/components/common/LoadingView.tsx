import type { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/providers/ThemeProvider';

import { AppText } from '../ui/AppText';

export interface LoadingViewProps {
  message: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function LoadingView({ message, style, testID }: LoadingViewProps) {
  const { theme } = useAppTheme();

  return (
    <View
      accessibilityLabel={message}
      accessibilityLiveRegion="polite"
      accessibilityRole="progressbar"
      style={[styles.container, style]}
      testID={testID}
    >
      <ActivityIndicator accessibilityElementsHidden color={theme.colors.primary} size="large" />
      <AppText color="muted" style={styles.message}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    padding: 24,
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
  },
});
