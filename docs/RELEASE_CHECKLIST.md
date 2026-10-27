# Release checklist

Every item starts unchecked. This repository does not claim that a build, device, account, legal, privacy, or store check has passed. Attach evidence—command output, build URL, test record, approval, or store record—to the release ticket before checking an item.

## Release record

| Field                    | Value                             |
| ------------------------ | --------------------------------- |
| Application              | TODO: replace `[APP_NAME]`        |
| Marketing version        | TODO (template starts at `1.0.0`) |
| iOS build number         | TODO (template starts at `1`)     |
| Android version code     | TODO (template starts at `1`)     |
| Source commit            | TODO                              |
| Expo project/build links | TODO                              |
| Release owner            | TODO                              |
| Target date              | TODO                              |
| Privacy/legal approver   | TODO                              |
| Product approver         | TODO                              |

## Technical quality gate

- [ ] `npm install` or clean `npm ci` completes with the committed lockfile.
- [ ] `npx expo install --check` reports Expo-compatible dependencies.
- [ ] `npx expo-doctor` passes.
- [ ] `npm run format:check` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm test` passes.
- [ ] `npm run validate` passes as the combined local/CI quality gate.
- [ ] GitHub Actions passes for the exact release commit.
- [ ] Expo remains on SDK 54 and the New Architecture is enabled.
- [ ] `app.config.ts` resolves with the intended name, slug, owner, scheme, identifiers, version, build numbers, orientation, assets, Router configuration, and runtime-version policy.
- [ ] `eas.json` resolves with reviewed development, preview, production, and production-submit behavior.
- [ ] No generated `ios/` or `android/` directory is committed.
- [ ] Production EAS build succeeds for every platform being released.
- [ ] Version and build numbers are unique, correct, and match the store record.
- [ ] Release notes identify migrations, native changes, and known limitations.

## Application behavior

- [ ] Application was tested on a real iPhone; device, OS, build, tester, and result are recorded.
- [ ] Application was tested on a supported real Android device; device, OS, build, tester, and result are recorded.
- [ ] The exact iOS release candidate was installed and tested through TestFlight.
- [ ] Cold start, warm start, background/foreground, and interrupted startup behave correctly.
- [ ] Home, Settings, not-found, and every production route resolve correctly.
- [ ] Light and dark appearance are readable; system appearance changes are handled.
- [ ] English and Turkish copy is complete, reviewed, and does not overflow supported layouts.
- [ ] Large text and screen-reader navigation were tested on physical devices.
- [ ] Keyboard, safe-area, and approximately 44-point touch-target behavior were tested.
- [ ] Loading, empty, error, retry, and offline behavior were tested with understandable non-color-only feedback.
- [ ] State persistence and logout/reset/deletion behavior were tested as applicable.
- [ ] Deep links and universal/app links were tested if used; otherwise related schemes/domains/entitlements were removed.
- [ ] Every permission request is preceded by context, has accurate purpose text, and handles denial/recovery; unused permission declarations are absent.
- [ ] Reduced-motion behavior was tested anywhere animation exists.
- [ ] No placeholder, template, mock, debug, lorem ipsum, test account, or development-only content remains.

## Production configuration and security

- [ ] No development, staging, localhost, or mock API URL remains in the production environment or bundle.
- [ ] Every production network endpoint uses HTTPS.
- [ ] No secret, API credential, token, certificate, private key, `.env`, service-account file, or sensitive source map is present in source control or the bundle.
- [ ] `EXPO_PUBLIC_*` values were reviewed as intentionally public.
- [ ] Sensitive local values use SecureStore; AsyncStorage contains only non-sensitive preferences.
- [ ] Backend authorization is enforced independently of client UI and route guards.
- [ ] User-controlled, network, storage, environment, and deep-link inputs are validated at their boundaries.
- [ ] User-visible API errors and production logs do not expose tokens, personal data, or sensitive server responses.
- [ ] Development logs/tools are disabled or sanitized for production.
- [ ] Dependency inventory and lockfile were reviewed for maintenance, advisories, licensing, privacy behavior, and unnecessary packages.
- [ ] EAS/Apple/Google access follows least privilege and no credential was copied into the repository.
- [ ] Update/runtime-version behavior is reviewed so incompatible native and JavaScript versions cannot be combined.
- [ ] Rollback, incident contact, and critical-fix approach are documented for the release team.

## App Store assets and metadata

- [ ] Final application name is approved and matches the binary/store identity.
- [ ] Subtitle is final and accurate where supported.
- [ ] Full description is final, localized as required, and describes only shipped behavior.
- [ ] Keywords are researched, accurate, and free of unauthorized trademarks.
- [ ] Primary and secondary categories are selected accurately.
- [ ] Age-rating questionnaire is completed from actual content and capabilities.
- [ ] Copyright text is approved.
- [ ] Support URL is public, reachable, and offers a real support path.
- [ ] Privacy policy URL is public, reachable, and matches actual behavior.
- [ ] Marketing URL is valid if supplied; it is omitted if not used.
- [ ] Final app icon is approved, owned/licensed, and appears correctly in the built binary.
- [ ] Required screenshots exist for every supported device class and localization, using the current store specifications.
- [ ] Screenshots show the submitted build, contain no sensitive/test data, and make no unsupported claims.
- [ ] App Review notes explain non-obvious behavior, native capabilities, regional restrictions, and review steps.
- [ ] A working, non-privileged demo account and durable review instructions are provided if login is required.
- [ ] Review contact name, email, and phone are monitored during review.
- [ ] Store release notes are accurate and localized where required.
- [ ] [Store metadata template](STORE_METADATA_TEMPLATE.md) has no unresolved release-blocking TODO.
- [ ] [Store asset inventory](../store-assets/README.md) is complete and approved.

## Privacy and compliance

- [ ] [Privacy data inventory](PRIVACY_DATA_INVENTORY.md) matches the exact production build, backend, and operational practices.
- [ ] App Store privacy answers match actual behavior.
- [ ] Google Play Data safety answers match actual behavior.
- [ ] Every third-party SDK/service and its data collection, purpose, linkage, tracking, storage, retention, recipient, and deletion method is included.
- [ ] Privacy policy is accessible inside the app and in App Store Connect/store listings.
- [ ] Permission purpose strings are necessary, specific, and accurate.
- [ ] In-app account deletion exists and was tested if users can create accounts.
- [ ] Backend deletion, processor deletion, and backup-retention behavior match the user-facing policy.
- [ ] Sign in with Apple requirements were evaluated if any third-party/social login was added.
- [ ] App Tracking Transparency is used only if tracking is actually performed; no tracking declaration is invented.
- [ ] Apple privacy manifest and required-reason API requirements were reviewed for first-party code and every included SDK.
- [ ] Export compliance and actual encryption usage were reviewed; `usesNonExemptEncryption` is not guessed.
- [ ] Content licenses, trademarks, fonts, media rights, and intellectual-property ownership are confirmed.
- [ ] User-generated-content reporting, blocking, moderation, contact, and response requirements were reviewed if user-generated content exists.
- [ ] In-app-purchase/store-payment requirements were reviewed if digital content, subscriptions, or functionality are sold.
- [ ] Children's/family, health, financial, location, biometric, accessibility, and regional requirements were reviewed if applicable.
- [ ] Legal/privacy owner approved final disclosures, retention, deletion, terms, and policy text.

## Account and distribution readiness

- [ ] `[APP_NAME]`, `app-slug`, `expo-account-name`, `com.company.app`, and `app-scheme` placeholders are replaced.
- [ ] Repository is linked to the correct Expo project via an authorized `eas init`; the real project ID is reviewed.
- [ ] Apple Developer team and App Store Connect application correspond to the production iOS bundle identifier.
- [ ] Google Play application corresponds to the production Android package identifier.
- [ ] Signing ownership, renewal, backup, and access are documented for authorized operators.
- [ ] App Store Connect ID is configured only from the real record when needed for submission.
- [ ] Agreements, tax, banking, and organization details required by the selected stores are active.
- [ ] Production submission credentials and roles are valid without being committed to the repository.
- [ ] Phased release/manual release/automatic release choice and rollback authority are approved.

## Authorized build and submission commands

After all applicable prerequisites above are met:

```sh
eas build --platform ios --profile production
eas build --platform android --profile production
eas submit --platform ios
eas submit --platform android
```

Authenticated Expo, Apple, or Google operations require explicit authorization. A successful build or upload does not complete metadata, compliance, beta testing, or store-review work.

## Approval

| Role             | Name | Decision | Date | Evidence/notes |
| ---------------- | ---- | -------- | ---- | -------------- |
| Engineering      | TODO | Pending  | TODO | TODO           |
| QA               | TODO | Pending  | TODO | TODO           |
| Product          | TODO | Pending  | TODO | TODO           |
| Privacy/legal    | TODO | Pending  | TODO | TODO           |
| Release operator | TODO | Pending  | TODO | TODO           |
