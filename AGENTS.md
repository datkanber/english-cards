# Repository instructions

## Architecture

- This is an Expo SDK 54 managed-workflow project using Continuous Native Generation and the New Architecture.
- Keep route files in `src/app` small; they should render screens from `src/features`.
- Keep name, slug, owner, scheme, bundle/package identifiers, and app version centralized in `app.identity.json`; consume them through existing configuration wrappers instead of duplicating literals.
- Keep feature-specific components, hooks, services, and types inside their feature folder.
- Put shared UI in `src/components`, API infrastructure in `src/lib/api`, storage adapters in `src/lib/storage`, global providers in `src/providers`, small global client state in `src/state`, and design tokens in `src/theme`.
- Use `@/` for imports from `src`. Avoid circular dependencies and unnecessary barrel files.
- Do not call `fetch` from visual components. Use a feature service or the typed API client.

## Required commands

Run these before considering a change complete:

```sh
npm run validate
npx expo install --check
npx expo-doctor
```

Useful commands are `npm start`, `npm run android`, `npm run ios`, `npm run lint`, `npm run format`, `npm run format:check`, `npm run typecheck`, `npm test`, `npm run test:watch`, and `npm run doctor`.

## Dependency and SDK rules

- Remain on Expo SDK 54. Do not upgrade Expo or disable the New Architecture without an explicit project decision.
- Install Expo and React Native native packages with `npx expo install <package>`, not an arbitrary latest npm version.
- Review every new dependency for necessity, SDK compatibility, maintenance, security, privacy collection, licensing, and bundle impact.
- Do not add Redux, NativeWind, Axios, Firebase, Sentry, analytics, advertising, push notifications, social authentication, or in-app purchases unless the real application has an approved need.
- Do not generate or commit `ios/` or `android/`.

## Security

- Treat every `EXPO_PUBLIC_*` value as public. Never place secrets or production credentials in the mobile bundle.
- Store sensitive local values only with SecureStore; AsyncStorage is for non-sensitive preferences.
- Require HTTPS in production. Validate input and environment values at boundaries.
- Sanitize errors and production logs. Never log tokens or sensitive server responses.
- Do not add permissions, entitlements, privacy declarations, or data-collection claims without corresponding implemented behavior and review.

## Testing

- Add or update tests with behavior changes. Maintain coverage for shared UI, form validation, preference state, and Home loading/success states.
- Keep the Maestro Home-to-Settings smoke flow current when navigation or labels change.
- Keep accessibility roles, labels, approximately 44-point touch targets, scalable text, safe areas, keyboard behavior, and non-color-only errors intact.

## Definition of done

A change is complete when it follows the folder boundaries, uses strict types without undocumented `any`, handles loading/error/empty behavior where relevant, updates English and Turkish copy together, updates privacy/environment/release documentation when applicable, and passes the required local commands. Account-dependent builds, physical-device checks, TestFlight, store submission, and legal/privacy decisions must be reported as pending unless they were actually completed and evidenced.
