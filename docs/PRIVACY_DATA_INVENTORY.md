# Privacy data inventory

This is a living engineering inventory, not legal advice and not a completed App Store or Google Play declaration. Update it whenever the app begins collecting a new data type, changes purpose or retention, adds a recipient, adds an SDK, or changes account/deletion behavior. Store answers and the privacy policy must be derived from the final, verified behavior.

## Baseline scope

The template is designed to run without a backend. It enables no analytics, advertising, tracking, crash-reporting service, push notification, social authentication, in-app purchase, or device permission by default. It includes adapters for AsyncStorage and SecureStore, but the existence of an adapter is not evidence that a data type is collected.

The current example processes only local demonstration input and non-sensitive preferences:

| Data type                        | Collection purpose                                      | Linked to the user?                           | Used for tracking? | Storage location                                                      | Retention period                                                    | Third-party recipient | Deletion method                                                            |
| -------------------------------- | ------------------------------------------------------- | --------------------------------------------- | ------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------- |
| Theme preference                 | Apply the user's selected system/light/dark appearance  | No account exists; not linked by the template | No                 | AsyncStorage on the device                                            | Until changed, app data is cleared, or the app is uninstalled       | None by the template  | Select another option, clear app data, or uninstall                        |
| Language preference              | Apply the user's selected English/Turkish language      | No account exists; not linked by the template | No                 | AsyncStorage on the device                                            | Until changed, app data is cleared, or the app is uninstalled       | None by the template  | Select another language, clear app data, or uninstall                      |
| Example non-sensitive preference | Demonstrate persisted client preference state           | No account exists; not linked by the template | No                 | AsyncStorage on the device                                            | Until changed/reset, app data is cleared, or the app is uninstalled | None by the template  | Use the corresponding setting/reset behavior, clear app data, or uninstall |
| Sample form input                | Demonstrate local validation and accessible form errors | No                                            | No                 | Process memory only; the base example must not transmit or persist it | Until the form/screen state is cleared or the process ends          | None by the template  | Clear the field, reset/leave the form, or close the app                    |

The local mock query returns application-supplied demonstration content. It does not collect user data or contact a recipient. Confirm this remains true if that service is replaced.

## Planned or application-specific decisions

Every row below is unresolved. Delete irrelevant rows only after confirming the final app does not collect that data; otherwise replace every TODO with an accurate answer before release.

| Data type                                                   | Collection purpose                                                     | Linked to the user?        | Used for tracking?                                                       | Storage location                                                      | Retention period                       | Third-party recipient                    | Deletion method                                          |
| ----------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| Account identifier (for example email or internal user ID)  | TODO: decide whether accounts exist and document the necessary purpose | TODO                       | TODO; must remain No unless cross-context tracking is actually performed | TODO: backend/device locations                                        | TODO: define an enforceable period     | TODO: list processor(s) and legal entity | TODO: in-app account deletion if account creation exists |
| Authentication/session token                                | TODO: only if authentication is added                                  | Yes, if tied to an account | No unless actual behavior changes                                        | TODO: SecureStore on device; authoritative session records on backend | TODO: short lifetime/revocation policy | TODO: authentication/backend provider    | TODO: logout, local deletion, and backend revocation     |
| Profile/contact data                                        | TODO: define exact fields and necessity                                | TODO                       | TODO                                                                     | TODO                                                                  | TODO                                   | TODO                                     | TODO                                                     |
| User-generated content                                      | TODO: define feature and moderation purpose                            | TODO                       | TODO                                                                     | TODO                                                                  | TODO                                   | TODO: hosting/moderation providers       | TODO: user deletion, account deletion, and backup expiry |
| Diagnostics/crash data                                      | TODO: no crash SDK is enabled; document only if one is added           | TODO                       | TODO                                                                     | TODO                                                                  | TODO                                   | TODO: name exact SDK/provider            | TODO: provider and user-request process                  |
| Product analytics/usage data                                | TODO: no analytics is enabled; document only if approved and added     | TODO                       | TODO                                                                     | TODO                                                                  | TODO                                   | TODO: name exact SDK/provider            | TODO                                                     |
| Device or advertising identifier                            | TODO: not collected by the template                                    | TODO                       | TODO                                                                     | TODO                                                                  | TODO                                   | TODO                                     | TODO                                                     |
| Location                                                    | TODO: no location permission or collection exists                      | TODO                       | TODO                                                                     | TODO                                                                  | TODO                                   | TODO                                     | TODO                                                     |
| Photos, camera, microphone, contacts, or notifications data | TODO: no related permission or feature exists                          | TODO                       | TODO                                                                     | TODO                                                                  | TODO                                   | TODO                                     | TODO                                                     |
| Purchase/payment data                                       | TODO: no purchase flow exists                                          | TODO                       | TODO                                                                     | TODO                                                                  | TODO                                   | TODO: store/payment processor            | TODO                                                     |

## SDK and recipient review

JavaScript dependencies such as TanStack Query, Zustand, React Hook Form, Zod, and i18next execute locally in this template and are not configured as data recipients. Expo Go and developer tooling may communicate with their own services during development; that is distinct from claiming what a production app collects. EAS, Apple, and Google also process developer/build/store account information under their own services when an authorized operator uses them.

Before each release:

| Dependency or service              | Runtime data sent by this app                                               | Purpose                                   | Privacy documentation reviewed | Store declaration impact | Owner/status |
| ---------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------ | ------------------------ | ------------ |
| Expo/React Native runtime modules  | TODO: verify final dependency list and network behavior                     | Application runtime                       | TODO                           | TODO                     | TODO         |
| EAS Build/Submit/Update, if used   | TODO: distinguish developer/build operations from end-user runtime behavior | Build, distribution, and optional updates | TODO                           | TODO                     | TODO         |
| Apple App Store / TestFlight       | TODO: verify application behavior and Apple processing separately           | iOS distribution                          | TODO                           | TODO                     | TODO         |
| Google Play                        | TODO: verify application behavior and Google processing separately          | Android distribution                      | TODO                           | TODO                     | TODO         |
| Every newly added SDK/API provider | TODO                                                                        | TODO                                      | TODO: link provider policy/DPA | TODO                     | TODO         |

Do not infer “no data collected” solely because application code does not call an analytics API. Review transitive native dependencies, platform declarations, server logs, CDN/API providers, support tools, and the actual production build.

## Permissions and sensitive capabilities

The base template must not request camera, microphone, location, contacts, photos, tracking, or notification permission. It also must not declare unused background modes, associated domains, tracking descriptions, entitlements, or permission purpose strings.

| Capability                                     | Baseline status          | Before enabling                                                                                                                                |
| ---------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Camera, microphone, photos, contacts, location | Not used                 | Explain the feature before the system prompt, minimize access, add an accurate purpose string, test denial/recovery, and update this inventory |
| Notifications                                  | Not used                 | Define provider, token/user linkage, retention, permission timing, opt-out, and deletion                                                       |
| Tracking / advertising identifier              | Not used                 | Obtain legal/product approval; document recipients and purposes; use App Tracking Transparency only if tracking actually occurs                |
| Background modes / associated domains          | Not used                 | Add only the exact entitlement required by implemented behavior and test a development/production build                                        |
| Non-exempt encryption declaration              | Unresolved for final app | Review actual cryptography and export-compliance obligations; do not guess `usesNonExemptEncryption`                                           |

## Retention and deletion requirements

- Retention must be a defined duration or event, not “as long as necessary” without an enforceable policy.
- A backend must implement authoritative deletion for remotely stored data; removing local UI or AsyncStorage is insufficient.
- If users can create accounts, provide account deletion inside the app and document downstream processor/backup deletion timelines.
- Logout must clear sensitive local tokens. Account deletion and logout are different operations.
- Document legal holds or backup exceptions accurately and narrowly.
- Verify deletion end to end and retain test evidence before release.

## Release sign-off

- [ ] Final production dependency and native-module inventory reviewed.
- [ ] All TODO rows resolved or explicitly marked not applicable with evidence.
- [ ] Network traffic and backend/server logging reviewed.
- [ ] App Store privacy answers match this inventory and actual behavior.
- [ ] Google Play Data safety answers match this inventory and actual behavior.
- [ ] Privacy policy matches actual collection, sharing, retention, and deletion.
- [ ] Privacy policy is accessible in the app and from the store listing.
- [ ] Permission prompts and purpose strings match implemented features.
- [ ] Privacy manifest requirements for the app and third-party SDKs reviewed.
- [ ] Legal/privacy owner approved the final inventory.

All release sign-off items are pending until completed by the appropriate human owners.
