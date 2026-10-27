import type { TextProps } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import { useAppTheme } from '@/providers/ThemeProvider';

export type AppTextVariant = 'title' | 'heading' | 'body' | 'label' | 'caption';
export type AppTextColor = 'default' | 'muted' | 'primary' | 'error' | 'inverse';

export interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
  color?: AppTextColor;
}

export function AppText({
  variant = 'body',
  color = 'default',
  allowFontScaling = true,
  style,
  ...textProps
}: AppTextProps) {
  const { theme } = useAppTheme();

  const colorValue = {
    default: theme.colors.text,
    muted: theme.colors.textMuted,
    primary: theme.colors.primary,
    error: theme.colors.error,
    inverse: theme.colors.onPrimary,
  }[color];

  return (
    <Text
      allowFontScaling={allowFontScaling}
      style={[variantStyles[variant], { color: colorValue }, style]}
      {...textProps}
    />
  );
}

const variantStyles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
});
