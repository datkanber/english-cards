import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/providers/ThemeProvider';

export type CardProps = ViewProps;

export function Card({ style, ...viewProps }: CardProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.lg,
          padding: theme.spacing.lg,
        },
        style,
      ]}
      {...viewProps}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    gap: 16,
  },
});
