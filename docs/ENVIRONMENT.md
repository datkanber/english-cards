# Environment configuration

## Public mobile configuration

The base template has one optional environment value:

| Variable                   | Required              | Validation                                                                 | Purpose                                       |
| -------------------------- | --------------------- | -------------------------------------------------------------------------- | --------------------------------------------- |
| `EXPO_PUBLIC_API_BASE_URL` | No for the local demo | Must be a valid URL; production/non-development values must use `https://` | Public base URL for a future typed API client |

The Home demonstration query uses a local mock service and does not require this variable, a backend, or an API key.

Expo embeds every `EXPO_PUBLIC_*` variable in the JavaScript bundle. Anyone with the application can read it. These variables are configuration, not secrets.

Never place any of the following in an `EXPO_PUBLIC_*` variable:

- API secret or private API key
- Access, refresh, or session token
- Database credential or connection string
- Apple, Google, or Expo credential
- Signing certificate, keystore, or private key
- Webhook signing secret
- Private service-account data

A mobile application cannot safely hold a production server secret. Keep privileged credentials on a trusted backend and let that backend authorize each request.

## Local setup

`.env.example` documents safe keys and must contain no real credential. Create an ignored local `.env` only when a real public base URL is needed.

macOS or Linux:

```sh
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Example local value:

```dotenv
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

`https://api.example.com` is illustrative, not a configured production service. Replace it only with an approved public endpoint. Do not commit `.env`.

After changing an environment file, stop Metro with `Ctrl+C` and start it again. If an old value remains cached, run:

```sh
npx expo start --clear
```

## Validation and access

Application code reads environment values only through `src/config/env.ts`. That boundary validates `EXPO_PUBLIC_API_BASE_URL` at startup when it is present. Feature and visual code must import the validated configuration instead of reading `process.env` throughout the project.

Reasons for centralizing access:

- Invalid values fail near startup with an actionable configuration error.
- Optional values are represented consistently.
- Tests can isolate the environment boundary.
- A security review has one place to inspect public configuration.

Production/non-development traffic must use HTTPS. Local mock data is the preferred offline development path. During local development only, the validator permits a deliberate `http://` localhost or LAN endpoint; confirm the phone can reach the host address and review any platform network-security implications. Never carry that HTTP value into preview or production configuration.

## Local, EAS, and store environments

Keep configuration environments conceptually separate:

| Environment       | Delivery                                   | Expected use                                            |
| ----------------- | ------------------------------------------ | ------------------------------------------------------- |
| Local             | Developer's ignored `.env`                 | Local development; the template works with no API value |
| Development build | Approved EAS development-profile variables | Developer testing with a custom native client           |
| Preview           | Approved EAS preview-profile variables     | Stakeholder or QA environment                           |
| Production        | Approved EAS production-profile variables  | Public production endpoint only                         |

Configure account-backed EAS values only after `eas login` and `eas init`. A protected EAS environment value may be hidden from repository readers during build, but a value included as `EXPO_PUBLIC_*` is still public in the final application. EAS access controls do not make client-bundled data secret.

Do not run authenticated EAS commands or change shared EAS environments without repository-owner authorization.

## Sensitive local values

Use the adapter in `src/lib/storage/secure-storage.ts` for a future sensitive local token. Use `src/lib/storage/preferences.ts` and AsyncStorage only for non-sensitive preferences such as theme or language.

SecureStore reduces casual local exposure but does not turn a device into a trusted server. Apply short lifetimes, backend revocation, least privilege, and platform-appropriate logout/deletion behavior to real credentials. Never log stored values.

## Adding a variable

Before adding environment configuration:

1. Decide whether it is safe for every app user to read.
2. If it is secret, keep it on a backend and do not add it to the mobile environment.
3. Add only a safe placeholder to `.env.example`.
4. Add strict validation in `src/config/env.ts`.
5. Access it through the validated config boundary.
6. Define approved values separately for local, development, preview, and production contexts.
7. Update this document, `docs/PROJECT_SETUP.md`, and the privacy inventory if behavior changes.
8. Restart Metro and test both missing and invalid cases.

## Incident checklist

If a secret is ever committed or shipped in a bundle, removing it in a later commit is not sufficient. Revoke or rotate it at the provider, review access logs, remove it from all build/update environments, replace the client behavior with a backend boundary, and follow the organization's incident process. Treat Git history and already distributed binaries as exposed.
