# Architecture

## Goals

This template is intentionally small but production-oriented. Its boundaries make common choices obvious to a junior developer, keep replaceable example code out of infrastructure, and avoid abstractions that do not yet solve a real problem.

The project uses Expo SDK 54, the managed workflow, Continuous Native Generation, the New Architecture, Expo Router, and strict TypeScript. Generated `ios/` and `android/` projects are not source files and must not be committed.

## Directory responsibilities

```text
.github/workflows/     Continuous-integration checks
.maestro/              Device-level smoke flows
assets/                Fonts, icons, and images bundled with the app
docs/                  Architecture, operations, privacy, and release guidance
src/
  app/                 Expo Router routes and navigation layouts only
  components/
    common/             Shared loading, empty, error, and screen primitives
    ui/                 Reusable presentational controls
  config/               Validated environment and application configuration
  features/             Feature-owned screens, UI, hooks, services, and types
  hooks/                Cross-feature hooks
  i18n/                 i18next setup and English/Turkish resources
  lib/
    api/                Typed fetch client and normalized API errors
    storage/            AsyncStorage and SecureStore adapters
  providers/            Root application providers and their configuration
  state/                Small global client state
  theme/                Colors, spacing, and typography tokens
  types/                Truly cross-feature TypeScript types
  utils/                Focused cross-feature helpers
store-assets/           Store-listing asset instructions and approved exports
tests/                  Shared component and feature behavior tests
```

Feature folders may contain their own `components`, `hooks`, `services`, and `types` directories. Code stays inside a feature until a second feature genuinely needs it. Avoid broad `index.ts` barrels: direct imports keep ownership visible and reduce circular-dependency risk.

## Dependency direction

```text
src/app (routes)
  -> src/features (screens and feature orchestration)
     -> feature hooks/services
        -> src/lib (API and storage boundaries)

src/features and src/components
  -> src/theme, src/i18n, shared hooks/types

src/providers
  -> initializes query, theme, localization, and global app services
```

Lower layers must not import route modules or feature screens. Shared components must not know which route renders them. Cross-feature infrastructure must not contain app-specific business logic.

## Routing

Expo Router reads routes from `src/app`.

- `src/app/_layout.tsx` owns the root provider/navigation boundary and router-compatible error handling.
- `src/app/index.tsx` performs only the initial route decision.
- `src/app/(tabs)/_layout.tsx` declares the tab shell.
- `src/app/(tabs)/index.tsx` renders the Home feature screen.
- `src/app/(tabs)/settings.tsx` renders the Settings feature screen.
- `src/app/+not-found.tsx` provides a recoverable unknown-route experience.

A route can select route parameters and render a feature screen, but it should not fetch data, access storage, validate a form, or contain substantial visual implementation.

## State ownership

| State kind                                | Owner                | Example                                       | Rule                                                                                                                                                    |
| ----------------------------------------- | -------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Remote or asynchronous server-style state | TanStack Query       | Home's local mock query                       | Query hooks own loading, success, empty, and error states. The local mock can later be replaced by an API service without changing the screen boundary. |
| Small global client state                 | Zustand              | Theme, language, and non-sensitive preference | Keep stores narrow and expose typed actions. Do not mirror query data in Zustand.                                                                       |
| Persistent non-sensitive state            | AsyncStorage adapter | Theme/language preference                     | Access through `src/lib/storage/preferences.ts`; do not scatter raw storage keys across features.                                                       |
| Sensitive local state                     | SecureStore adapter  | A future short-lived authentication token     | Never put tokens in AsyncStorage. The base template supplies the boundary but stores no token.                                                          |
| Form state                                | React Hook Form      | Example form fields and errors                | Validate at the boundary with a Zod schema. Do not duplicate fields in global state without a concrete need.                                            |
| Local visual state                        | React state          | Whether a local control is expanded           | Keep it closest to the component that owns it.                                                                                                          |

## Data flow

The included query is deliberately backend-free:

```text
HomeScreen
  -> feature query hook
     -> local mock service
        -> typed result
```

When a real backend is added, preserve the same separation:

```text
Feature screen
  -> query/mutation hook
     -> feature service
        -> typed API client
           -> native fetch
```

Visual components must not call `fetch`. `src/lib/api/api-client.ts` owns shared request behavior such as the public base URL, HTTPS enforcement, response parsing, and normalization into safe `ApiError` values. Feature services own endpoint paths and domain-specific request/response types.

Do not expose raw sensitive server bodies to users or logs. The UI should receive a stable, understandable error and a safe retry path. Authorization is always enforced by the backend; route guards and hidden buttons are user experience, not security controls.

## Configuration and environment

Application identity is centralized in root `app.identity.json`. `app.config.ts` consumes it for Expo/native configuration, and `src/config/app.ts` provides the typed runtime-safe wrapper. Change identity in the JSON source of truth instead of duplicating literals. Environment access is centralized and validated in `src/config/env.ts`.

`EXPO_PUBLIC_API_BASE_URL` is optional because the example service is local. When supplied, it must be a valid URL, and production/non-development traffic must use HTTPS. A local development build may deliberately target an HTTP localhost or LAN service. All `EXPO_PUBLIC_*` values are compiled into the client and must be treated as public. See [Environment](ENVIRONMENT.md).

## Providers

`AppProviders` is the single composition point for application-wide providers. Keep provider-specific configuration in focused modules such as `QueryProvider` and `ThemeProvider`. Add a provider only when its value truly spans the application; feature-local context remains in its feature.

Provider initialization should avoid a flash of incorrect preference state. Storage failures must fall back safely rather than prevent the app from rendering. Query defaults should make retries and staleness explicit instead of relying on accidental library defaults.

## Theme and localization

- Theme tokens live in `src/theme`; reusable components consume semantic colors instead of hard-coded screen-specific values.
- The default appearance follows the system, while a persisted preference may select light or dark.
- Text continues to support device font scaling. Do not replace text with inaccessible images.
- English and Turkish resources live together under `src/i18n/locales`. Add or change user-visible copy in both languages in the same change.
- Persist only the chosen language code, not duplicated translated strings.

## UI and accessibility

Shared primitives establish the baseline for safe areas, keyboard-aware forms, scalable text, semantic colors, and approximately 44-by-44-point interactive targets. Interactive elements need a role, accessible name, and meaningful disabled/busy state. Errors need understandable text and cannot be conveyed by color alone.

Every asynchronous screen should deliberately handle loading, success, empty, offline where relevant, and error behavior. Animation is optional; if introduced, honor the operating system's reduced-motion preference.

## Imports and types

- Use the `@/` alias for `src` imports; use a short relative import only for a closely related sibling when clearer.
- Do not use TypeScript `any` without a nearby explanation of the unavoidable boundary. Prefer `unknown` followed by validation or narrowing.
- Derive types from Zod schemas when that avoids duplicate form contracts.
- Validate untrusted network, storage, deep-link, and environment input at application boundaries.
- Keep public component and service APIs small; avoid speculative generic abstractions.

## Testing boundaries

- Component tests exercise shared UI behavior and accessibility semantics.
- Feature tests exercise visible loading, error, empty, and success behavior around mocked boundaries.
- Store tests exercise actions, hydration, and persistence-relevant behavior without depending on test order.
- Form tests exercise the Zod contract and user-visible validation.
- `.maestro/smoke-test.yaml` verifies that the app opens on Home, navigates to Settings, and displays Settings on an installed build.

Tests should observe public behavior, not private implementation details. Native device, TestFlight, offline, and accessibility checks remain manual release evidence and are not replaced by Jest.

## Adding a feature

1. Create `src/features/<feature>/<Feature>Screen.tsx`.
2. Keep its feature-only components, hooks, services, and types under that folder.
3. If data is asynchronous, expose it through a typed query/mutation hook rather than fetching in the screen's visual children.
4. Add a small route in `src/app` that renders the screen.
5. Add English and Turkish strings, loading/error/empty behavior, and accessibility labels.
6. Add behavior-focused tests and update the Maestro flow if top-level navigation changed.
7. Update the environment and privacy inventory if the feature adds configuration, collection, sharing, permissions, or a third-party SDK.

## Native capability changes

Before adding a native library or permission, confirm Expo SDK 54 compatibility, install native packages with `npx expo install`, review privacy and store consequences, and test a development build on physical devices. Update `app.config.ts`, the privacy inventory, release checklist, and permission explanation together. Never add placeholder permission strings or entitlements for capabilities the app does not use.
