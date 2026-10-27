import { forwardRef } from 'react';
import type { StyleProp, TextInputProps, TextStyle } from 'react-native';
import { StyleSheet, TextInput, View } from 'react-native';

import { useAppTheme } from '@/providers/ThemeProvider';

import { AppText } from './AppText';

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  helperText?: string;
  inputStyle?: StyleProp<TextStyle>;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  {
    label,
    error,
    helperText,
    inputStyle,
    editable = true,
    accessibilityLabel,
    accessibilityHint,
    accessibilityState,
    allowFontScaling = true,
    ...inputProps
  },
  ref,
) {
  const { theme } = useAppTheme();
  const hint = error ? [accessibilityHint, error].filter(Boolean).join('. ') : accessibilityHint;

  return (
    <View style={styles.container}>
      <AppText variant="label">{label}</AppText>
      <TextInput
        ref={ref}
        accessibilityHint={hint}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{
          ...accessibilityState,
          disabled: !editable,
        }}
        allowFontScaling={allowFontScaling}
        editable={editable}
        placeholderTextColor={theme.colors.textMuted}
        selectionColor={theme.colors.primary}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.background,
            borderColor: error ? theme.colors.error : theme.colors.border,
            borderRadius: theme.radii.md,
            color: theme.colors.text,
            paddingHorizontal: theme.spacing.md,
          },
          !editable && styles.disabled,
          inputStyle,
        ]}
        {...inputProps}
      />
      {error ? (
        <AppText accessibilityRole="alert" color="error" variant="caption">
          {error}
        </AppText>
      ) : helperText ? (
        <AppText color="muted" variant="caption">
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    gap: 6,
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
    lineHeight: 22,
    minHeight: 48,
    paddingVertical: 11,
  },
  disabled: {
    opacity: 0.55,
  },
});
