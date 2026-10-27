import appIdentity from '../../app.identity.json';

export const appConfig = {
  ...appIdentity,
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'tr'],
} as const;

export type AppLanguage = (typeof appConfig.supportedLanguages)[number];
