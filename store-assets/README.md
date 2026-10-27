# Store assets

This directory is the handoff area for final App Store and Google Play listing exports. It currently contains guidance only; no store asset is represented as final or approved.

Runtime assets used by Expo belong under `assets/`:

- `assets/icon.png`
- `assets/adaptive-icon.png`
- `assets/splash-icon.png`

Store screenshots, feature graphics, editable source artwork, and approval records belong here. Do not point `app.config.ts` at a store screenshot export.

## Suggested organization

Create only the folders needed by the real support matrix:

```text
store-assets/
  source/                 Editable, highest-quality approved source artwork
  ios/
    en/                   English iPhone/iPad exports
    tr/                   Turkish iPhone/iPad exports
  android/
    en/                   English phone/tablet exports
    tr/                   Turkish phone/tablet exports
  approvals/              Non-sensitive asset/copy approval records
```

Do not store credentials, personal data, review-account passwords, certificates, provisioning profiles, keystores, private signing files, or restricted third-party source material here.

## Asset inventory

Fill this table with exact filenames, target store/device class, locale, source build, owner, and approval. Verify current store dimensions and file-format rules in App Store Connect and Google Play Console at release time; those requirements and the app's supported device set can change.

| Asset                                   | Platform/device class                                                | Locale                   | Filename | Captured/exported from                      | Owner | Status                   |
| --------------------------------------- | -------------------------------------------------------------------- | ------------------------ | -------- | ------------------------------------------- | ----- | ------------------------ |
| App icon/source artwork                 | iOS and Android                                                      | Shared or TODO           | TODO     | TODO                                        | TODO  | Not created/approved     |
| Screenshots                             | iPhone required display class(es)                                    | English                  | TODO     | Exact production/TestFlight candidate: TODO | TODO  | Not created/approved     |
| Screenshots                             | iPhone required display class(es)                                    | Turkish                  | TODO     | Exact production/TestFlight candidate: TODO | TODO  | Not created/approved     |
| Screenshots                             | Android phone                                                        | English                  | TODO     | Exact production candidate: TODO            | TODO  | Not created/approved     |
| Screenshots                             | Android phone                                                        | Turkish                  | TODO     | Exact production candidate: TODO            | TODO  | Not created/approved     |
| iPad screenshots                        | Currently applicable because Expo configuration enables iPad support | English/Turkish          | TODO     | TODO                                        | TODO  | Not created/approved     |
| Android tablet/large-screen screenshots | If supported/required                                                | English/Turkish          | TODO     | TODO                                        | TODO  | Applicability unresolved |
| Feature graphic                         | Google Play                                                          | English/Turkish decision | TODO     | Approved source: TODO                       | TODO  | Not created/approved     |
| Promotional artwork/video               | If used                                                              | TODO                     | TODO     | TODO                                        | TODO  | Applicability unresolved |

## App icon checklist

- Use final, organization-owned or properly licensed artwork.
- Keep the master source at high quality and export platform assets from it.
- Check small-size legibility, edge treatment, transparency rules, color space, and platform masking against current store/platform requirements.
- Test the actual bundled icon on light and dark home screens and across representative Android icon masks.
- Ensure the Android adaptive foreground remains inside its safe area and the configured background is intentional.
- Do not add marketing badges, prices, unsupported claims, or another company's trademark.
- Confirm the icon in the production binary matches the approved store identity.

## Screenshot capture procedure

1. Finalize the device support matrix and check current store requirements.
2. Install the exact production candidate (TestFlight on iOS when available, production-equivalent artifact on Android).
3. Reset the app to a controlled state with fictional, non-sensitive content.
4. Select the intended locale, appearance, text size, and device orientation.
5. Hide developer menus, debug overlays, connection banners, test controls, and notification content.
6. Capture native-resolution screenshots for each required device class.
7. Apply only approved framing/copy that does not misrepresent the interface or hide required disclosures.
8. Export with deterministic filenames and record the source build in the inventory.
9. Have product, localization, design, privacy, and legal owners review as applicable.
10. Upload and inspect the store preview before submission; compression/cropping may change presentation.

Suggested deterministic filename pattern:

```text
<platform>-<device-class>-<locale>-<sequence>-<short-scene>.<extension>
```

Example pattern only: `ios-iphone-en-01-home.<extension>`. Choose the final extension according to the current store specification.

## Screenshot quality and privacy

- Show only features available in the submitted build and region.
- Use clearly fictional data; never expose a real person's name, email, messages, photo, location, account, device identifier, or notification.
- Do not show API keys, internal hostnames, test credentials, QR codes with secrets, or debug information.
- Keep system status information intentional and visually consistent.
- Check light/dark contrast, localization, truncation, keyboard state, safe areas, and accessibility text.
- Avoid claims such as “secure,” “anonymous,” “private,” “best,” or “free” without approved, supportable meaning.
- Confirm rights for every font, photo, illustration, logo, device frame, and trademark.
- Turkish screenshots and embedded copy require human review; do not rely on unreviewed machine translation.

## Splash and launch artwork

The splash asset is part of the application binary rather than store metadata, but keep its source and approval aligned with the icon. Test the generated launch experience on physical iOS and Android devices in light and dark appearance. A Metro preview alone does not validate the native launch screen.

## Release handoff

- [ ] Current App Store Connect asset requirements reviewed for every supported Apple device class.
- [ ] Required iPad screenshots are included while iPad support remains enabled, or dropping iPad support was an explicit reviewed product/configuration decision.
- [ ] Current Google Play asset requirements reviewed for every supported Android form factor.
- [ ] All files are mapped to locale, device class, sequence, and source build.
- [ ] Final icon and splash are present in the production binary.
- [ ] Screenshots were captured from the submitted release candidate.
- [ ] No personal, secret, development, or placeholder content appears.
- [ ] Product/design approval recorded.
- [ ] English editorial and Turkish localization approval recorded.
- [ ] Privacy/legal and intellectual-property review recorded where required.
- [ ] Uploaded store previews were inspected before submission.

All checklist items remain pending until an authorized human completes them.
