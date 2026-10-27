export const lightColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF2F7',
  text: '#0F172A',
  textMuted: '#475569',
  primary: '#1D4ED8',
  onPrimary: '#FFFFFF',
  border: '#CBD5E1',
  error: '#B42318',
  errorSurface: '#FEE4E2',
  disabled: '#94A3B8',
} as const;

export const darkColors = {
  background: '#0F172A',
  surface: '#1E293B',
  surfaceMuted: '#334155',
  text: '#F8FAFC',
  textMuted: '#CBD5E1',
  primary: '#93C5FD',
  onPrimary: '#172554',
  border: '#475569',
  error: '#FDA29B',
  errorSurface: '#55160C',
  disabled: '#64748B',
} as const;

export type ThemeColors = {
  [ColorName in keyof typeof lightColors]: string;
};
