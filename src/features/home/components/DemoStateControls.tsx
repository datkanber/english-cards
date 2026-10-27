import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';

import { demoScenarios, type DemoScenario } from '../types/home';

export interface DemoStateControlsProps {
  value: DemoScenario;
  onChange: (scenario: DemoScenario) => void;
}

const stateFallbacks: Record<DemoScenario, string> = {
  loading: 'Loading',
  empty: 'Empty',
  error: 'Error',
  success: 'Success',
};

export function DemoStateControls({ value, onChange }: DemoStateControlsProps) {
  const { t } = useTranslation();
  const groupLabel = t('home.queryStateLabel', {
    defaultValue: 'Example query state',
  });

  return (
    <View accessibilityLabel={groupLabel} accessibilityRole="radiogroup" style={styles.container}>
      <AppText variant="label">{groupLabel}</AppText>
      <View style={styles.options}>
        {demoScenarios.map((scenario) => {
          const selected = value === scenario;
          const label = t(`home.states.${scenario}`, {
            defaultValue: stateFallbacks[scenario],
          });

          return (
            <AppButton
              key={scenario}
              accessibilityLabel={`${groupLabel}: ${label}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              onPress={() => {
                onChange(scenario);
              }}
              style={styles.option}
              testID={`home-query-state-${scenario}`}
              title={label}
              variant={selected ? 'primary' : 'secondary'}
            />
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
    flexGrow: 1,
    minWidth: 112,
  },
});
