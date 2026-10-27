# Physical device testing

Physical-device testing has **not yet been completed** for this template. The instructions below are a procedure, not a test result. Record the device, operating-system version, build/profile, date, tester, and observed result when a human performs each release check.

## Expo Go: first run

Expo Go is the quickest way to exercise the included template because it uses native functionality already available in Expo Go.

1. Install Expo Go on the physical phone.
2. Connect the computer and phone to the same network.
3. In the repository root, run:

   ```sh
   npm install
   npx expo start
   ```

4. Because this repository includes `expo-dev-client` for its development-build profile, the terminal may initially say `Using development build`. Press `s` once to switch until it says `Using Expo Go` and displays an `exp://` QR code.
5. Scan the Expo Go QR code:
   - iOS: scan with the Camera app, then open the Expo Go link.
   - Android: open Expo Go and use its scanner.
6. Wait for the bundle to load and verify the Home screen appears.

If the local network blocks peer-to-peer traffic, stop Metro with `Ctrl+C` and try:

```sh
npx expo start --tunnel
```

Press `s` again if the tunnel server initially targets a development build.

Tunnel mode can be slower and depends on an external relay, but it is useful on guest, corporate, or isolated Wi-Fi. Also check that the computer firewall allows the Node/Expo process and that a VPN is not separating the devices.

## Metro and debugging operations

Restart the development server:

1. Focus the terminal running Expo.
2. Press `Ctrl+C`.
3. Run `npx expo start` again.

Clear Metro's cache when module resolution, stale assets, or stale environment values are suspected:

```sh
npx expo start --clear
```

Inspect errors in all relevant places:

- Read the terminal running Metro for bundling, module-resolution, and application logs.
- Read the in-app error overlay for the JavaScript stack and source location.
- Open Expo's developer menu on the phone to reload the app and access available debugging tools.
- Reproduce the problem once after a clean restart and capture the full first error, not only follow-on errors.
- For a development build, use the development client tools and platform logs when a failure occurs before JavaScript loads.

Do not paste access tokens, credentials, personal data, or raw sensitive server responses into screenshots, issue trackers, or logs.

## What each channel proves

| Channel           | Native runtime                                                         | Distribution                                                          | What it is for                                                                     | What it does not prove                                                       |
| ----------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Expo Go           | Standard Expo Go client                                                | App Store/Google Play install of Expo Go plus a development QR bundle | Fast JavaScript, routing, UI, and supported Expo-module iteration                  | Compatibility with custom native code or the final standalone binary         |
| Development build | App-specific native binary with development client and developer tools | EAS internal distribution or local native tooling                     | Custom native module integration and on-device development                         | Release configuration, store review, or production behavior                  |
| Preview build     | App-specific release-like standalone binary                            | EAS internal distribution                                             | Stakeholder/QA testing without developer tooling                                   | App Store delivery, TestFlight processing, or approval                       |
| TestFlight        | iOS App Store build processed by Apple                                 | Apple beta distribution                                               | Real iOS release-candidate installation, signing, launch, and beta review workflow | Final App Review approval or Android behavior                                |
| Production build  | Store-distribution artifact                                            | Uploaded to App Store Connect or Google Play                          | Candidate artifact for store release                                               | Approval, correct metadata/privacy answers, or real-device quality by itself |

Expo Go is suitable for initial development. A development build must be tested before release whenever the application adds custom native functionality, a native module unavailable in Expo Go, custom native configuration, or permissions.

## Development build workflow

Account-backed setup is required and must be authorized:

```sh
npm install --global eas-cli
eas login
eas init
eas build:configure
```

Create development builds:

```sh
eas build --platform ios --profile development
eas build --platform android --profile development
```

Install the resulting build on an authorized device using the EAS-provided instructions, then start Metro for the development client:

```sh
npx expo start --dev-client
```

An iOS physical-device development build requires appropriate Apple Developer access, registered-device/signing setup as prompted by EAS, and authorization to use those credentials. Do not invent or commit credentials.

## Preview and production candidates

Build preview artifacts for internal stakeholder testing:

```sh
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

Build store-distribution artifacts only after identity, environments, versions, signing, privacy, and metadata have been reviewed:

```sh
eas build --platform ios --profile production
eas build --platform android --profile production
```

TestFlight requires a real App Store Connect application record and Apple Developer access. Upload/submission steps are account-dependent and should be performed only by an authorized operator.

## Manual test pass

Record evidence for at least one supported real iPhone and one supported real Android device. The template currently enables iPad support in Expo configuration, so also test a representative real iPad before release unless that support is deliberately removed and the store configuration is updated. Expand this matrix to match the real application's support policy.

- [ ] Cold launch reaches Home without a backend or API key.
- [ ] Home loading and success states are understandable.
- [ ] Empty and error examples are readable and offer an appropriate next action.
- [ ] Settings opens and returns to Home correctly.
- [ ] System, light, and dark appearance behave as designed.
- [ ] English and Turkish selection updates visible content and survives a relaunch.
- [ ] The non-sensitive example preference survives a relaunch.
- [ ] The form remains usable with the keyboard visible.
- [ ] Valid form data succeeds; invalid data shows text errors, not color alone.
- [ ] Text remains usable with larger accessibility font sizes.
- [ ] Screen-reader labels, roles, state, and navigation order are meaningful.
- [ ] Interactive targets are approximately 44 by 44 points or larger.
- [ ] Portrait layout handles notches, home indicators, and safe areas.
- [ ] Airplane mode and restored connectivity produce controlled behavior.
- [ ] Unknown/deep links show the not-found experience where applicable.
- [ ] No unexpected permission prompt appears.
- [ ] No token, credential, or sensitive payload appears in user-visible errors or logs.

## Test record

Copy one row per run. Do not mark a result as passed without a human observation.

| Date | Tester | Device | OS version | Channel/profile                                           | App version/build | Result  | Notes or issue link |
| ---- | ------ | ------ | ---------- | --------------------------------------------------------- | ----------------- | ------- | ------------------- |
| TODO | TODO   | TODO   | TODO       | Expo Go / development / preview / TestFlight / production | TODO              | Not run | TODO                |

Before App Store release, the release candidate must be tested on a real iPhone and through TestFlight. Expo Go results cannot substitute for those checks.
