# Use this repository for a new application

This repository intentionally ships with obvious identity placeholders and no production account IDs, credentials, endpoints, or legal claims. The local example works without replacing account-backed values. Complete the inventory below before distributing a real app.

## Toolchain

Use Node.js `24.17.0` LTS and npm. With a Node version manager, select the version in `.nvmrc`, then install dependencies:

```sh
npm install
```

Keep Expo on SDK 54 and the New Architecture enabled. Add Expo/React Native native dependencies with:

```sh
npx expo install <package>
```

Do not install arbitrary latest native package versions with npm. Do not generate or commit `ios/` or `android/`; native projects are derived by Continuous Native Generation.

## Placeholder inventory

Identity values are centralized in root `app.identity.json`. `app.config.ts` consumes that file for Expo/native configuration, while `src/config/app.ts` exposes its typed runtime-safe values to application code. Edit the JSON source of truth rather than copying identifiers into feature code.

| Value to change                   | Template value/status                        | Primary location                                        | Notes                                                                                                                                                  |
| --------------------------------- | -------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Application name                  | `[APP_NAME]`                                 | `app.identity.json` and store metadata                  | User-visible name; confirm store availability and localized display needs.                                                                             |
| Slug                              | `app-slug`                                   | `app.identity.json`                                     | Expo project slug; choose before `eas init`.                                                                                                           |
| URL scheme                        | `app-scheme`                                 | `app.identity.json`                                     | Must be unique enough for the app; test all implemented deep links.                                                                                    |
| Expo owner                        | `expo-account-name`                          | `app.identity.json`                                     | Replace with the authorized Expo account or organization.                                                                                              |
| Expo project ID                   | Not set                                      | Added to Expo config by `eas init`                      | Do not invent a UUID. Link the intended Expo project/account.                                                                                          |
| iOS bundle identifier             | `com.company.app`                            | `app.identity.json`                                     | Must match the Apple Developer/App Store Connect record. Changing it creates a different app identity.                                                 |
| Android package identifier        | `com.company.app`                            | `app.identity.json`                                     | Must match Google Play. Changing it after release creates a different app.                                                                             |
| API URLs                          | `EXPO_PUBLIC_API_BASE_URL` is optional/unset | `.env.example`, local `.env`, approved EAS environments | Production/non-development endpoints must use HTTPS. Local development may use an intentional HTTP localhost/LAN URL. The local demo needs no backend. |
| Icon                              | Template asset                               | `assets/icon.png` and platform icon configuration       | Replace with approved final artwork and verify current store requirements.                                                                             |
| Splash screen                     | Template asset                               | `assets/splash-icon.png` and Expo config                | Replace with approved artwork; test light/dark launch appearance on builds.                                                                            |
| Adaptive Android icon             | Template asset                               | `assets/adaptive-icon.png` and Expo config              | Verify foreground safe area and background color on physical devices.                                                                                  |
| Support URL                       | Not set                                      | Store metadata and final in-app support surface         | Must be a reachable production URL.                                                                                                                    |
| Privacy policy URL                | Not set                                      | Store metadata and final in-app privacy surface         | Must describe actual final behavior and remain publicly accessible.                                                                                    |
| Marketing URL                     | Not set/optional                             | Store metadata                                          | Add only if a maintained page exists.                                                                                                                  |
| App Store Connect ID (`ascAppId`) | Not set                                      | EAS submit profile/account configuration when known     | Use the numeric ID from the real App Store Connect record; do not guess.                                                                               |
| Apple team information            | Not set                                      | Apple/EAS credential configuration                      | Requires authorized Apple Developer account access. Do not commit credentials.                                                                         |
| Android store information         | Not set                                      | Google Play Console/EAS Submit configuration            | Create the real Play app and configure authorized submission credentials securely.                                                                     |
| Store copy and category           | TODO                                         | `docs/STORE_METADATA_TEMPLATE.md`                       | Product, legal, and localization review required.                                                                                                      |
| Privacy answers and retention     | TODO                                         | `docs/PRIVACY_DATA_INVENTORY.md` and store consoles     | Base-template assumptions cannot be reused after features/SDKs change.                                                                                 |

Also review application version `1.0.0`, iOS build number `1`, and Android version code `1` before the first build. Production EAS builds are configured to increment build numbers where supported, but store versioning remains a release-owner decision.

## Setup sequence

### 1. Create a clean application copy

Create the new repository from this template without carrying over another application's Git history, credentials, `.env`, build artifacts, or store exports unless that is explicitly intended and authorized.

Install and validate the unchanged baseline first:

```sh
npm install
npx expo install --check
npx expo-doctor
npm run validate
```

These commands must be run in the new checkout; this document does not assert their outcome.

### 2. Replace identity values

Choose approved values, then update `app.identity.json`. `app.config.ts` and the runtime wrapper consume that shared identity. Search for leftovers elsewhere:

```sh
rg -n "\[APP_NAME\]|app-slug|expo-account-name|com\.company\.app|app-scheme|TODO"
```

Not every `TODO` is an error: release, privacy, legal, and account decisions remain TODO until a responsible owner supplies them. Do not blindly replace unrelated matches.

Run Expo's resolved-config command during verification so the native identity, assets, runtime version, plugins, and Router settings can be reviewed:

```sh
npx expo config --type public
```

Remember that public config output and the final bundle must contain no secret.

### 3. Configure public environments

The example uses local mock data. If the real app has an API, copy `.env.example` to an ignored `.env` and supply only an approved public HTTPS base URL:

```sh
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

See [Environment](ENVIRONMENT.md) before adding variables. Keep tokens and server credentials out of the mobile application.

### 4. Replace visual identity

Replace icon, adaptive icon, and splash assets with production-owned source artwork. Verify asset paths in Expo's resolved configuration, then inspect the result on both platforms. Store listing exports belong under `store-assets`; bundled runtime assets belong under `assets`.

Do not reuse Expo/template logos, third-party trademarks, fonts, photographs, or illustrations without confirmed rights. Record approvals and source files outside generated exports.

### 5. Link the Expo project

This step requires an authorized Expo account and intentionally has not been performed by the template:

```sh
npm install --global eas-cli
eas login
eas init
eas build:configure
```

Run `eas init` only after setting the real owner and slug. Select or create the intended project, allow EAS to add the real project ID, and review the resulting diff. Never copy another application's project ID.

### 6. Configure account-backed builds

Create builds only with authorization to use the Expo/Apple/Google accounts and credentials:

```sh
eas build --platform ios --profile development
eas build --platform android --profile development
eas build --platform ios --profile preview
eas build --platform android --profile preview
eas build --platform ios --profile production
eas build --platform android --profile production
```

- Development profiles create a custom development client for engineering.
- Preview profiles create internally distributed, release-like stakeholder builds.
- Production profiles create store-distribution artifacts.

For iOS, create the real App Store Connect record, confirm the bundle identifier and Apple team, provide store metadata, and obtain signing access. For Android, create the real Play Console app, confirm the package, define the signing/Play App Signing approach, and securely configure submission access.

Submission is a separate authorized operation:

```sh
eas submit --platform ios
eas submit --platform android
```

The production submit profile intentionally contains no invented `ascAppId`.

### 7. Replace the example safely

The Home and Settings examples prove query, form, theme, language, storage, and UI boundaries. Replace them feature by feature while preserving the architecture rules:

- Routes remain thin and render feature screens.
- Visual components do not call `fetch`.
- Server-style state stays in TanStack Query; small client preferences stay in Zustand.
- Sensitive local values use SecureStore, never AsyncStorage.
- User-visible copy is updated in English and Turkish.
- Accessibility and loading/empty/error/offline behavior are designed with each feature.
- Tests and the privacy inventory change with behavior.

Remove all placeholder/demo content before release, including mock copy, form scenarios, identifiers, URLs, and store screenshots.

## Verification for each new application

Run the safe local checks:

```sh
npm install
npx expo install --check
npx expo-doctor
npm run validate
```

Then verify without claiming results that were not observed:

- Expo remains on SDK 54 and the New Architecture remains enabled.
- `ios/` and `android/` are neither tracked nor required for normal local work.
- `git status` contains no `.env`, credential, certificate, keystore, or generated native directory.
- `npx expo start` launches and Home/Settings/not-found routes resolve.
- The example still works with `EXPO_PUBLIC_API_BASE_URL` absent.
- `eas.json` and `app.config.ts` resolve with the intended non-secret values.
- Package scripts still match the README and CI workflow.
- A human completes the [physical-device procedure](PHYSICAL_DEVICE_TESTING.md).
- Release owners complete the [release checklist](RELEASE_CHECKLIST.md).

## Account and business blockers that code cannot resolve

- Real Expo owner/project and EAS authorization
- Apple Developer membership, team, devices, signing, and App Store Connect record
- Google Play Console application, signing, and submission authorization
- Final name, branding, screenshots, store copy, category, and age-rating answers
- Support, privacy-policy, and optional marketing URLs
- Final API domains and backend security/authorization behavior
- Accurate data collection, retention, sharing, deletion, privacy-manifest, and export-compliance decisions
- App Review contact, notes, and demo account if authentication is added

Keep these items explicitly pending until the responsible human or organization provides and verifies them.
