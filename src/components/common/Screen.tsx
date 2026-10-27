import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/providers/ThemeProvider';

export interface ScreenProps {
  children: ReactNode;
  scrollable?: boolean;
  padded?: boolean;
  keyboardVerticalOffset?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Screen({
  children,
  scrollable = true,
  padded = true,
  keyboardVerticalOffset = 0,
  contentContainerStyle,
  style,
  testID,
}: ScreenProps) {
  const { theme } = useAppTheme();
  const contentStyle = [
    styles.content,
    padded && { padding: theme.spacing.lg },
    contentContainerStyle,
  ];

  return (
    <SafeAreaView
      edges={['top', 'right', 'bottom', 'left']}
      style={[styles.safeArea, { backgroundColor: theme.colors.background }, style]}
      testID={testID}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.keyboardAvoidingView}
      >
        {scrollable ? (
          <ScrollView
            contentContainerStyle={contentStyle}
            keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View style={contentStyle}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    flexGrow: 1,
    gap: 24,
    maxWidth: 760,
    width: '100%',
  },
});
