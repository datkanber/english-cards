import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { useAppTheme } from '@/providers/ThemeProvider';

export interface SettingsOption<TValue extends string> {
  value: TValue;
  label: string;
}

export interface SettingsOptionGroupProps<TValue extends string> {
  label: string;
  value: TValue;
  options: readonly SettingsOption<TValue>[];
  onChange: (value: TValue) => void;
  testID?: string;
}

export function SettingsOptionGroup<TValue extends string>({
  label,
  value,
  options,
  onChange,
  testID,
}: SettingsOptionGroupProps<TValue>) {
  const { theme } = useAppTheme();

  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="radiogroup"
      style={styles.container}
      testID={testID}
    >
      <AppText variant="label">{label}</AppText>
      <View style={styles.options}>
        {options.map((option) => {
          const selected = option.value === value;

          return (
            <Pressable
              key={option.value}
              accessibilityLabel={option.label}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              onPress={() => {
                onChange(option.value);
              }}
              style={({ pressed }) => [
                styles.option,
                {
                  backgroundColor: selected ? theme.colors.primary : theme.colors.surfaceMuted,
                  borderColor: selected ? theme.colors.primary : theme.colors.border,
                  borderRadius: theme.radii.md,
                  paddingHorizontal: theme.spacing.md,
                },
                pressed && styles.pressed,
              ]}
            >
              <AppText color={selected ? 'inverse' : 'default'} variant="label">
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    alignItems: 'center',
    borderWidth: 1,
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 96,
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.78,
  },
});
