import { darkColors, lightColors, type ThemeColors } from './colors';
import { radii, spacing } from './spacing';
import { typography } from './typography';

export type AppColorScheme = 'light' | 'dark';

export interface AppTheme {
  colors: ThemeColors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
}

export const lightTheme: AppTheme = {
  colors: lightColors,
  spacing,
  radii,
  typography,
};

export const darkTheme: AppTheme = {
  colors: darkColors,
  spacing,
  radii,
  typography,
};

export { darkColors, lightColors, radii, spacing, typography };
