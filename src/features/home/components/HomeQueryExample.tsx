import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingView } from '@/components/common/LoadingView';
import { AppText } from '@/components/ui/AppText';
import { useAppTheme } from '@/providers/ThemeProvider';

import { useHomeDemoQuery } from '../hooks/useHomeDemoQuery';
import type { DemoScenario } from '../types/home';

export interface HomeQueryExampleProps {
  scenario: DemoScenario;
  onShowSuccess: () => void;
}

export function HomeQueryExample({ scenario, onShowSuccess }: HomeQueryExampleProps) {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const query = useHomeDemoQuery(scenario);

  if (query.isPending) {
    return (
      <LoadingView
        message={t('home.loadingLabel', {
          defaultValue: 'Loading example content...',
        })}
        testID="home-query-loading"
      />
    );
  }

  if (query.isError) {
    return (
      <ErrorState
        message={t('home.errorMessage', {
          defaultValue:
            'The local service returned an expected error. Choose another state or retry.',
        })}
        onRetry={() => {
          void query.refetch();
        }}
        retryLabel={t('common.retry', { defaultValue: 'Try again' })}
        testID="home-query-error"
        title={t('home.errorTitle', { defaultValue: 'Content could not load' })}
      />
    );
  }

  if (query.data.length === 0) {
    return (
      <EmptyState
        actionLabel={t('home.states.success', { defaultValue: 'Show success' })}
        message={t('home.emptyMessage', {
          defaultValue: 'The request succeeded, but there is no content yet.',
        })}
        onAction={onShowSuccess}
        testID="home-query-empty"
        title={t('home.emptyTitle', { defaultValue: 'No example items' })}
      />
    );
  }

  return (
    <View style={styles.container} testID="home-query-success">
      <AppText accessibilityRole="header" variant="heading">
        {t('home.successTitle', { defaultValue: 'Example content is ready' })}
      </AppText>
      {query.data.map((item) => (
        <View
          key={item.id}
          style={[
            styles.item,
            {
              backgroundColor: theme.colors.surfaceMuted,
              borderColor: theme.colors.border,
              borderRadius: theme.radii.md,
            },
          ]}
        >
          <AppText variant="label">{item.title}</AppText>
          <AppText color="muted">{item.description}</AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  item: {
    borderWidth: 1,
    gap: 4,
    padding: 16,
  },
});
