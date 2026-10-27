import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/providers/ThemeProvider';

import { AppText } from './AppText';

export type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface AppButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  title: string;
  variant?: AppButtonVariant;
  loading?: boolean;
  leadingIcon?: ReactNode;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function AppButton({
  title,
  variant = 'primary',
  loading = false,
  leadingIcon,
  fullWidth = false,
  disabled = false,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  style,
  ...pressableProps
}: AppButtonProps) {
  const { theme } = useAppTheme();
  const isDisabled = disabled || loading;
  const isPrimary = variant === 'primary';

  const backgroundColor = {
    primary: theme.colors.primary,
    secondary: theme.colors.surfaceMuted,
    ghost: 'transparent',
  }[variant];

  const borderColor = variant === 'primary' ? theme.colors.primary : theme.colors.border;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityState={{
        ...accessibilityState,
        busy: loading,
        disabled: isDisabled,
      }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor,
          borderRadius: theme.radii.md,
          paddingHorizontal: theme.spacing.md,
        },
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...pressableProps}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            accessibilityElementsHidden
            color={isPrimary ? theme.colors.onPrimary : theme.colors.primary}
            size="small"
          />
        ) : (
          leadingIcon
        )}
        <AppText
          color={isPrimary ? 'inverse' : 'default'}
          numberOfLines={2}
          style={styles.title}
          variant="label"
        >
          {title}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingVertical: 10,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  title: {
    flexShrink: 1,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
  disabled: {
    opacity: 0.5,
  },
});
