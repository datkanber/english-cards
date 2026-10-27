# Store metadata template

This worksheet contains placeholders only. Do not publish template copy or infer privacy, age-rating, legal, or feature claims from the sample application. Product, localization, support, privacy/legal, and release owners must approve the final text against the exact production build.

## Application identity

| Field                          | Value                                            |
| ------------------------------ | ------------------------------------------------ |
| Product name                   | TODO: replace `[APP_NAME]`                       |
| Expo slug                      | TODO: replace `app-slug`                         |
| iOS bundle identifier          | TODO: replace `com.company.app`                  |
| Android package identifier     | TODO: replace `com.company.app`                  |
| URL scheme                     | TODO: replace `app-scheme`                       |
| Marketing version              | `1.0.0` initially; TODO: confirm release version |
| iOS build number               | `1` initially; TODO: confirm submitted build     |
| Android version code           | `1` initially; TODO: confirm submitted build     |
| Primary language               | English                                          |
| Secondary language             | Turkish                                          |
| SKU/internal product reference | TODO                                             |
| App Store Connect ID           | TODO: use real record; never invent              |
| Google Play application record | TODO: create/confirm in authorized account       |

## English listing

| Field                             | Approved copy/status                                        |
| --------------------------------- | ----------------------------------------------------------- |
| App name                          | TODO                                                        |
| Subtitle (Apple)                  | TODO                                                        |
| Short description (Google Play)   | TODO                                                        |
| Full description                  | TODO: describe only features present in the submitted build |
| Keywords (Apple)                  | TODO: comma-separated, accurate, and trademark-reviewed     |
| Primary category                  | TODO                                                        |
| Secondary category                | TODO or not used                                            |
| Promotional text (Apple, if used) | TODO or omit                                                |
| Release notes / What's New        | TODO                                                        |

## Turkish listing

Use a human-reviewed localization that preserves meaning and product terminology; do not publish an unreviewed literal translation.

| Field                             | Approved copy/status |
| --------------------------------- | -------------------- |
| App name                          | TODO                 |
| Subtitle (Apple)                  | TODO                 |
| Short description (Google Play)   | TODO                 |
| Full description                  | TODO                 |
| Keywords (Apple)                  | TODO                 |
| Promotional text (Apple, if used) | TODO or omit         |
| Release notes / Yenilikler        | TODO                 |
| Translator/reviewer and date      | TODO                 |

## URLs and ownership

| Field                           | Value/owner                                          |
| ------------------------------- | ---------------------------------------------------- |
| Support URL                     | TODO: public production URL                          |
| Privacy policy URL              | TODO: public production URL matching actual behavior |
| Marketing URL                   | TODO or omit if unused                               |
| Terms of service URL            | TODO if applicable                                   |
| Copyright                       | TODO: year and rights-holding legal entity           |
| Content/trademark owner         | TODO                                                 |
| Support owner and response path | TODO                                                 |
| Privacy contact                 | TODO                                                 |

Verify each URL from a signed-out browser and a mobile device. It must not depend on an employee account, temporary preview deployment, localhost, or an expiring link.

## Content and rating questionnaire

Answer the current store questionnaires from the final application, including remotely accessible content. Do not preselect low/no-content answers based on this template.

| Topic                                                               | Final answer/evidence                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Age rating                                                          | TODO: complete current Apple and Google questionnaires              |
| Unrestricted web access                                             | TODO                                                                |
| User-generated content                                              | TODO; if present, document moderation/report/block/contact controls |
| Violence, sexual content, profanity, substances, gambling, contests | TODO for each applicable category                                   |
| Medical/health, financial, or legal content                         | TODO                                                                |
| Location sharing                                                    | TODO                                                                |
| Digital purchases/subscriptions                                     | TODO                                                                |
| Advertising                                                         | TODO; none is enabled by the base template                          |
| Target audience / children or family programs                       | TODO                                                                |
| Content licensing by region                                         | TODO                                                                |

## Privacy and compliance summary

Do not write marketing copy such as “we collect no data” until the production app, backend, server logs, operational tools, and every SDK have been reviewed.

| Field                             | Final answer/evidence                         |
| --------------------------------- | --------------------------------------------- |
| App Store privacy responses       | TODO: derive from `PRIVACY_DATA_INVENTORY.md` |
| Google Play Data safety responses | TODO: derive from the same verified inventory |
| Data linked to user               | TODO                                          |
| Data used for tracking            | TODO; base template has no tracking           |
| Third-party SDK recipients        | TODO: list every final recipient              |
| Account creation                  | TODO                                          |
| In-app account deletion           | TODO: required if account creation exists     |
| Permission purpose strings        | TODO: list only permissions actually used     |
| Privacy manifest review           | TODO                                          |
| Export compliance / encryption    | TODO: review actual usage; do not guess       |
| Sign in with Apple evaluation     | TODO if third-party login is added            |
| In-app-purchase compliance        | TODO if digital purchases are added           |

## App Review information

| Field                                             | Value                                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Review contact first/last name                    | TODO                                                                                         |
| Review contact email                              | TODO: actively monitored                                                                     |
| Review contact phone                              | TODO: actively monitored                                                                     |
| Sign-in required?                                 | TODO                                                                                         |
| Demo account username                             | TODO if login is required; provide through authorized store workflow, not source control     |
| Demo account password                             | TODO if login is required; never commit it                                                   |
| Two-factor/one-time-code bypass or review process | TODO if applicable; use a controlled review mechanism                                        |
| Review notes                                      | TODO: concise steps to reach non-obvious features and explain legitimate native capabilities |
| Required hardware/accessory/location              | TODO or not applicable                                                                       |
| Backend availability during review                | TODO: owner and monitoring plan                                                              |

The demo account must remain available for the review period, contain no real person's data, have only the access needed for review, and not require the reviewer to create an account. Explain any regional, subscription, hardware, or staged-access constraint honestly.

## Release controls

| Field                                                    | Decision                                      |
| -------------------------------------------------------- | --------------------------------------------- |
| Release method (manual/automatic/phased where supported) | TODO                                          |
| Countries/regions                                        | TODO: confirm rights and service availability |
| Pricing                                                  | TODO                                          |
| Pre-order                                                | TODO or not used                              |
| App availability start                                   | TODO                                          |
| Version release owner                                    | TODO                                          |
| Support escalation during review/release                 | TODO                                          |
| Rollback/critical update owner                           | TODO                                          |

## Asset manifest

Track actual files in [store-assets/README.md](../store-assets/README.md).

| Asset                                                                                   | English | Turkish                    | Approval |
| --------------------------------------------------------------------------------------- | ------- | -------------------------- | -------- |
| App icon                                                                                | TODO    | Usually shared; TODO       | TODO     |
| iPhone screenshots for every required display class                                     | TODO    | TODO                       | TODO     |
| iPad screenshots (currently applicable because Expo configuration enables iPad support) | TODO    | TODO                       | TODO     |
| Android phone screenshots                                                               | TODO    | TODO                       | TODO     |
| Android tablet/large-screen screenshots if supported                                    | TODO    | TODO                       | TODO     |
| Google Play feature graphic                                                             | TODO    | TODO/localization decision | TODO     |
| Promotional media if used                                                               | TODO    | TODO                       | TODO     |

## Final copy review

- [ ] Names and identifiers match the submitted binary.
- [ ] Copy describes only functionality available to reviewers.
- [ ] English copy has product, legal, and editorial approval.
- [ ] Turkish copy has human localization review.
- [ ] Screenshots come from the submitted release candidate and contain no personal/test secrets.
- [ ] Support and privacy URLs are live and public.
- [ ] Privacy, age-rating, purchase, and encryption answers match verified behavior.
- [ ] Copyright, trademark, font, image, and content rights are confirmed.
- [ ] Review credentials and instructions work from a clean device.
- [ ] No TODO or template placeholder remains in submitted metadata.
