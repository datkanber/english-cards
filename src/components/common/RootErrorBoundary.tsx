import type { ErrorBoundaryProps } from 'expo-router';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

const palette = {
  light: {
    background: '#FFFFFF',
    surface: '#FFF1F1',
    text: '#15171A',
    muted: '#535A63',
    primary: '#155EEF',
    onPrimary: '#FFFFFF',
    error: '#B42318',
  },
  dark: {
    background: '#111318',
    surface: '#321B1D',
    text: '#F4F6F8',
    muted: '#C3C8D0',
    primary: '#84ADFF',
    onPrimary: '#0A1733',
    error: '#FDA29B',
  },
} as const;

export function RootErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = palette[scheme];

  return (
    <View
      accessibilityLiveRegion="assertive"
      style={[styles.screen, { backgroundColor: colors.background }]}
      testID="root-error-boundary"
    >
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.error }]}>
        <Text
          accessibilityRole="alert"
          allowFontScaling
          style={[styles.title, { color: colors.error }]}
        >
          Something went wrong
        </Text>
        <Text allowFontScaling style={[styles.message, { color: colors.text }]}>
          The app could not display this screen. Please try again.
        </Text>
        {__DEV__ ? (
          <Text allowFontScaling style={[styles.details, { color: colors.muted }]}>
            {error.message}
          </Text>
        ) : null}
        <Pressable
          accessibilityLabel="Retry loading the app"
          accessibilityRole="button"
          onPress={() => {
            void retry();
          }}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text allowFontScaling style={[styles.buttonText, { color: colors.onPrimary }]}>
            Try again
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    alignItems: 'stretch',
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
    maxWidth: 560,
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
  },
  details: {
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.78,
  },
});
