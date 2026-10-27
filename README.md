# Expo 57 Production Template

A reusable, production-oriented React Native foundation built with Expo SDK 57, Expo Router, and strict TypeScript. The included Home and Settings tabs demonstrate the project architecture with local-only data, theme and language preferences, reusable UI, common UI states, and a validated form. No backend, API key, analytics, tracking, or production credentials are required to run the example.

The values `[APP_NAME]`, `app-slug`, `expo-account-name`, `com.company.app`, and `app-scheme` are intentional placeholders. Replace them before publishing; see [Project setup](docs/PROJECT_SETUP.md).

## Requirements

- Node.js `24.17.0` LTS (see `.nvmrc`)
- npm
- iOS: macOS and Xcode for the iOS simulator; a physical iPhone can use Expo Go
- Android: Android Studio for an emulator; a physical Android phone can use Expo Go
- An Expo account only when using EAS services or a development build

## Start locally

```sh
npm install
npx expo start
```

Then press `i` for an available iOS simulator, press `a` for an available Android emulator, or open the app on a physical phone as described below. The sample query uses a local mock service, so local startup does not depend on an API or credentials.

## Run on a physical phone with Expo Go

1. Install Expo Go on the phone.
2. Connect the computer and phone to the same network.
3. From the repository root, run:

   ```sh
   npm install
   npx expo start
   ```

4. This template includes `expo-dev-client`, so Expo may initially print `Using development build`. Press `s` once until the terminal prints `Using Expo Go` and shows an `exp://` QR code.
5. Scan the Expo Go QR code:
   - iOS: use the Camera app and open the Expo Go link.
   - Android: use Expo Go's QR scanner.
6. If the network blocks the local connection, stop the server with `Ctrl+C` and run:

   ```sh
   npx expo start --tunnel
   ```

   Press `s` again if the tunnel server starts in development-build mode.

Expo Go is appropriate for this template's initial JavaScript and UI work. If the real app adds custom native functionality that Expo Go does not contain, create and test a development build before release. Physical-device testing has **not** been completed for this repository; a human must run and record it. See [Physical device testing](docs/PHYSICAL_DEVICE_TESTING.md) for cache, debugging, and build-channel guidance.

## Included example

- Home and Settings tabs plus a not-found route and router-compatible error handling
- Automatic light/dark appearance with a persisted user preference
- English and Turkish language selection
- Reusable button, text field, card, and safe-area screen components
- Accessible loading, empty, and error state examples
- React Hook Form and Zod validation
- A local mock query through TanStack Query
- Zustand client preferences persisted to AsyncStorage
- A SecureStore adapter for future sensitive local values

The SecureStore adapter is infrastructure only; the template does not create an account or collect an authentication token.

## Repository map

The project is organized by responsibility so a developer can decide where code belongs without searching the whole repository.

```text
.
|-- .github/workflows/       Continuous integration
|-- .maestro/                Physical-device smoke tests
|-- assets/                  Runtime icons, splash images, fonts, and images
|-- docs/                    Architecture, setup, privacy, testing, and release guides
|-- src/
|   |-- app/                 Expo Router route files; keep these small
|   |-- components/          Reusable UI and common state components
|   |-- config/              App identity access and validated public environment values
|   |-- features/            Product features, screens, hooks, services, and feature types
|   |-- i18n/                English/Turkish resources and localization setup
|   |-- lib/                 API and storage adapters shared across features
|   |-- providers/           Global query, theme, localization, and safe-area providers
|   |-- state/               Small global client state
|   |-- theme/               Colors, spacing, radii, and typography tokens
|   |-- types/               Types that are genuinely shared across features
|   `-- utils/               Small, reusable, non-visual helpers
|-- store-assets/            Guidance and future App Store/Play listing exports
|-- tests/                   Unit and component tests arranged by responsibility
|-- app.config.ts            Expo application configuration
|-- app.identity.json        Central app name, owner, scheme, and native identifiers
|-- eas.json                 Development, preview, production, and submission profiles
`-- package.json             Dependencies and executable project commands
```

Use these placement rules when adding code:

| If you are adding...                   | Put it in...                                     |
| -------------------------------------- | ------------------------------------------------ |
| A screen or behavior for one feature   | `src/features/<feature>/`                        |
| A route that opens a feature screen    | `src/app/`; import and render the feature screen |
| A component reused by several features | `src/components/`                                |
| A remote request                       | A feature service using `src/lib/api/`           |
| A sensitive local token                | `src/lib/storage/secure-storage.ts`              |
| A non-sensitive global preference      | `src/state/` and AsyncStorage                    |
| English or Turkish copy                | Both files in `src/i18n/locales/`                |
| A unit or component test               | The matching area under `tests/`                 |

See [Architecture](docs/ARCHITECTURE.md) for the dependency boundaries and [Project setup](docs/PROJECT_SETUP.md) for every identity value that must be replaced.

## Commands

| Command                | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `npm start`            | Start the Expo development server.                   |
| `npm run android`      | Start Expo and target Android.                       |
| `npm run ios`          | Start Expo and target iOS.                           |
| `npm run lint`         | Run ESLint.                                          |
| `npm run format`       | Format supported files with Prettier.                |
| `npm run format:check` | Check formatting without changing files.             |
| `npm run typecheck`    | Run strict TypeScript checking.                      |
| `npm test`             | Run the Jest test suite once.                        |
| `npm run test:watch`   | Run Jest in watch mode.                              |
| `npm run doctor`       | Run Expo Doctor.                                     |
| `npm run validate`     | Run formatting, lint, type checking, and unit tests. |

Before opening a pull request, run:

```sh
npm run validate
npx expo install --check
npx expo-doctor
```

These commands describe the required quality gate; this README does not claim that a future checkout or build has passed it.

## Practical development workflows

### Example: add a Profile feature

Keep a new feature self-contained until another feature genuinely needs part of it:

```text
src/features/profile/
|-- components/
|-- hooks/
|-- services/
|-- types/
`-- ProfileScreen.tsx

src/app/(tabs)/profile.tsx
tests/features/ProfileScreen.test.tsx
```

1. Build the screen in `src/features/profile/ProfileScreen.tsx`.
2. Put profile-specific UI, hooks, types, and requests in that same feature folder.
3. Make `src/app/(tabs)/profile.tsx` only import and render `ProfileScreen`.
4. Use TanStack Query in a feature hook when loading remote data. Do not call `fetch` from `ProfileScreen`.
5. Add user-visible text to both `en.json` and `tr.json`.
6. Add a behavior-focused test under `tests/features/`.
7. Run `npm run validate` before committing.

This keeps deleting or replacing the example feature straightforward because its implementation is not spread across unrelated folders.

### Example: make and test a small UI change

Suppose you change `AppButton`:

```sh
# Keep Metro running while editing.
npm start

# Run the focused test after each small change.
npm test -- tests/components/AppButton.test.tsx

# Run every local quality check before committing.
npm run validate
```

Prefer tests that describe behavior, such as "pressing the button calls the handler," instead of testing internal component state. If a change affects navigation or native behavior, also run the Maestro smoke test or verify it on a physical device.

### Example: teach this project to a beginner

A simple guided lesson can use the existing Home feature:

1. Start at `src/app/(tabs)/index.tsx` and show that a route only renders `HomeScreen`.
2. Follow the import to `src/features/home/HomeScreen.tsx` and identify the reusable cards and state components.
3. Follow `useHomeDemoQuery` to the local service and explain why data loading is outside the visual component.
4. Use the on-screen controls to compare loading, empty, error, and success states.
5. Change one sentence in both locale files and switch languages in Settings.
6. Change one spacing or color token and observe where the shared design updates.
7. Open a test, make one assertion fail intentionally, run it, then restore it and run `npm run validate`.

After this exercise, a new developer has seen routing, feature ownership, server-style state, localization, theming, accessibility states, and testing without needing a backend.

### Recommended daily loop

1. Pull the latest branch and run `npm install` when the lockfile changed.
2. Keep `npm start` running while making one small change at a time.
3. Run the closest test during development.
4. Run `npm run typecheck` after changing data shapes or component props.
5. Run `npm run validate`, `npx expo install --check`, and `npm run doctor` before opening a pull request.
6. Use a development or preview build when native configuration changes; Expo Go alone is not enough for release validation.

## Architecture

Expo Router routes live in `src/app` and remain thin: they render screens from `src/features`. Feature-specific UI, hooks, services, and types stay together. Shared components live in `src/components`, cross-feature infrastructure in `src/lib`, application-wide providers in `src/providers`, and design tokens in `src/theme`.

```text
src/app route
  -> src/features screen
     -> feature hook/service
        -> local mock or src/lib/api
```

- TanStack Query owns asynchronous/server-style state.
- Zustand owns small global client preferences.
- AsyncStorage holds only non-sensitive preferences.
- SecureStore is reserved for sensitive local values.
- Visual components do not call `fetch` directly.
- Imports from `src` use the `@/` alias.

See [Architecture](docs/ARCHITECTURE.md) for the complete boundaries and extension guide.

## Environment values

Copy `.env.example` to `.env` when a real public API base URL is needed. `EXPO_PUBLIC_API_BASE_URL` is optional for the local-only demo and must be a valid URL when present. Production/non-development values must use HTTPS; local development may deliberately target an HTTP localhost or LAN server.

```sh
cp .env.example .env
```

On PowerShell:

```powershell
Copy-Item .env.example .env
```

Every `EXPO_PUBLIC_*` value is embedded in client code and is publicly readable. Never put tokens, credentials, private endpoints, signing material, or server secrets in these variables. See [Environment configuration](docs/ENVIRONMENT.md).

## Expo and native dependencies

This project must remain on Expo SDK 57 with the New Architecture enabled. Add Expo or React Native native dependencies with Expo's compatibility resolver:

```sh
npx expo install <package>
```

Use `npm install <package>` only for JavaScript-only packages after reviewing necessity, maintenance, licensing, security, privacy behavior, bundle impact, and compatibility. Do not generate or commit `ios/` or `android/`; this managed-workflow project uses Continuous Native Generation.

## EAS setup and builds

`eas.json` defines `development`, `preview`, and `production` build profiles. No EAS project ID, App Store Connect app ID, certificate, or credential is invented in the template.

Account-dependent one-time setup:

```sh
npm install --global eas-cli
eas login
eas init
eas build:configure
```

`eas init` links the repository to an Expo project and adds the real EAS project ID. Review all generated changes before committing them.

Development builds:

```sh
eas build --platform ios --profile development
eas build --platform android --profile development
```

Preview builds:

```sh
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

Production builds:

```sh
eas build --platform ios --profile production
eas build --platform android --profile production
```

Submission, after store records and credentials exist:

```sh
eas submit --platform ios
eas submit --platform android
```

Do not run authenticated Expo, Apple, or Google commands without authorization. A production build is not proof of App Store approval, and submission still requires real store metadata, privacy answers, signing access, and account-specific identifiers.

## Build and distribution choices

| Channel           | What runs                                                   | Intended use                                                              |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| Expo Go           | JavaScript bundle inside the standard Expo Go native client | Fast initial development when all native modules are included in Expo Go  |
| Development build | This app's custom native client with developer tools        | Development and physical-device testing after adding native functionality |
| Preview build     | Internally distributed, release-like standalone binary      | Stakeholder and QA testing outside a store production track               |
| TestFlight        | Apple-hosted beta distribution of an App Store build        | Required iOS release-candidate testing and App Review preparation         |
| Production build  | Store-distribution artifact                                 | Upload to App Store Connect or Google Play; not a development client      |

## Costs and cloud usage

Prices and quotas in this section were checked on July 22, 2026. They are not guarantees: providers can change prices, limits, taxes, currencies, and eligibility. Recheck the linked official pages before launch or budgeting.

- **Local coding and testing have no required service fee.** Expo SDK, Expo CLI, and Expo Go are free. `npm start`, formatting, linting, type checking, and Jest run on the developer's computer and do not consume EAS cloud-build quota. The included Home service uses local mock data, so this template does not call a billable backend or API. See the [Expo FAQ](https://docs.expo.dev/faq/).
- **A public GitHub repository is normally free.** GitHub Free is currently `$0` and supports unlimited public repositories. Standard GitHub-hosted Actions runners are free for public repositories, which covers this repository's normal CI workflow. Larger runners are billable, and storage or other products can incur charges. Private repositories have different included Actions and storage allowances. See [GitHub pricing](https://github.com/pricing) and [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
- **Expo EAS is optional.** The EAS Free plan is currently `$0` per month and includes up to 15 low-priority Android builds, 15 low-priority iOS builds, 60 Workflow minutes, and Update delivery to 1,000 monthly active users. Current Free Update allowances also include 100 GiB of edge bandwidth and 20 GiB of storage. Paid tiers currently begin with Starter at `$19` per month plus additional usage; Production is currently `$199` per month plus usage. Review [EAS pricing](https://expo.dev/pricing), [plan behavior](https://docs.expo.dev/billing/plans/), and [usage-based pricing](https://docs.expo.dev/billing/usage-based-pricing/) because quotas and overage rates can change.
- **Apple distribution has an account fee.** Apple currently charges `$99` per membership year, or the equivalent local price where available, for the Apple Developer Program. Eligible organizations can request a fee waiver. This membership is not required just to edit the project or use Expo Go. See [Apple Developer Program membership](https://developer.apple.com/programs/whats-included/).
- **Google Play distribution has a registration fee.** Google currently charges a `$25` one-time Play Console registration fee. It is not required for local development or local device testing. See [Play Console registration](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en).
- **Store monetization can add transaction fees.** If the app later sells downloads, subscriptions, or digital goods, Apple or Google may charge commissions or service fees. Rates depend on the program, product, region, and eligibility, so review the current [Apple program information](https://developer.apple.com/programs/whats-included/) and [Google Play service-fee documentation](https://support.google.com/googleplay/android-developer/answer/112622?hl=en) instead of assuming one percentage.
- **Future backend and API costs depend on what is added.** This repository creates no cloud bill by itself. A hosted API, database, authentication provider, file storage, CDN, email/SMS service, maps API, AI model, monitoring tool, or similar service may charge for a subscription, users, requests, tokens, messages, compute time, storage, or bandwidth.

Concrete examples:

- Keeping the included local mock service costs nothing.
- Running the standard CI workflow in this public repository uses free standard GitHub-hosted runners under GitHub's current public-repository policy.
- Creating 10 Android and 10 iOS EAS builds in one month currently fits inside the EAS Free build counts, subject to the plan's other limits and availability.
- Replacing the mock service with a hosted endpoint used by 5,000 devices may exceed that provider's free tier and become billable.
- Adding an AI feature can create per-token or per-request charges even when the mobile app itself is free.
- Sending login codes by SMS can create a charge for every message and country-specific delivery rates.

Before connecting a paid service, identify what is metered, estimate development and production usage, configure budgets and alerts where available, and document who owns billing. Never put a provider's secret key in an `EXPO_PUBLIC_*` variable; publicly visible mobile configuration cannot protect a secret.

## Security and privacy baseline

- No analytics, advertising, tracking, notifications, social authentication, purchases, or permission requests are enabled.
- Production network traffic must use HTTPS.
- Sensitive values belong in SecureStore or on a trusted backend, never AsyncStorage or `EXPO_PUBLIC_*` variables.
- Logs and error messages must not expose tokens or raw sensitive server responses and must be sanitized or disabled in production.
- Authorization must be enforced by a backend; hiding UI is not an authorization boundary.
- App Store and Google Play privacy declarations must be based on the final app and every added SDK, not copied from this template.

Maintain [the privacy data inventory](docs/PRIVACY_DATA_INVENTORY.md) whenever behavior or dependencies change.

## Release preparation

- [Release checklist](docs/RELEASE_CHECKLIST.md)
- [Store metadata template](docs/STORE_METADATA_TEMPLATE.md)
- [Store asset guidance](store-assets/README.md)
- [Project setup and remaining placeholders](docs/PROJECT_SETUP.md)

None of the account-, legal-, store-, TestFlight-, or physical-device-dependent release checks are represented as complete by this repository.

## License

This project is licensed under the [MIT License](LICENSE), with `Copyright 2026 Burak Kanber`.

The MIT License permits use, copying, modification, merging, publication, distribution, sublicensing, and sale of copies. Copies or substantial portions must retain the copyright notice and license text, and the software is provided without warranty. Third-party dependencies, fonts, icons, and other assets keep their own licenses; review their terms and required notices before distributing a final application.
