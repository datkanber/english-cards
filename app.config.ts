import type { ConfigContext, ExpoConfig } from 'expo/config';

import appIdentity from './app.identity.json';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: appIdentity.name,
  slug: appIdentity.slug,
  owner: appIdentity.owner,
  version: appIdentity.version,
  scheme: appIdentity.scheme,
  orientation: 'portrait',
  platforms: ['ios', 'android'],
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  runtimeVersion: {
    policy: 'appVersion',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: appIdentity.iosBundleIdentifier,
    buildNumber: '1',
  },
  android: {
    package: appIdentity.androidPackage,
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#E8EEF7',
    },
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#F8FAFC',
        dark: {
          backgroundColor: '#0F172A',
        },
      },
    ],
    'expo-localization',
    'expo-secure-store',
    'expo-font',
    'expo-status-bar',
  ],
  experiments: {
    typedRoutes: true,
  },
});
