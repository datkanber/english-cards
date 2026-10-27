import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '../ui/AppButton';
import { AppText } from '../ui/AppText';

export interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
  style,
  testID,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <AppText accessibilityRole="header" style={styles.text} variant="heading">
        {title}
      </AppText>
      <AppText color="muted" style={styles.text}>
        {message}
      </AppText>
      {actionLabel && onAction ? (
        <AppButton onPress={onAction} title={actionLabel} variant="secondary" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    minHeight: 160,
    padding: 24,
  },
  text: {
    textAlign: 'center',
  },
});
