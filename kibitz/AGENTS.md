# Kibitz implementation instructions

Follow the workspace `../AGENTS.md` first. This file adds implementation details for `kibitz/`.

## Framework and source conventions

- Expo SDK 58 / React Native 0.88 / TypeScript. Read `package.json` before changing framework code, then consult matching official docs: https://docs.expo.dev/versions/v58.0.0/ . Navigation docs: https://docs.expo.dev/llms.txt and https://docs.expo.dev/router/introduction/ . Do not assume APIs from another SDK version.
- Use Expo Router. Routes live in `src/app/`; layouts define stacks/tabs. Components, services, state and domain rules belong outside the route directory.
- Keep TypeScript strict. Use shared Zod schemas at every untrusted boundary.
- Keep `relationships`, `work`, `self` and the four philosopher IDs stable. Presentation labels come from `categoryLabels` and philosopher metadata; do not use translated labels as API/storage values.
- Use explicit English locale formatting. New authored text and accessibility labels must be English. Korean is allowed only where required by legacy migrations/tests or user-authored journal content.
- Use the current shared UI/theme before adding a design library. Preserve keyboard handling, native back behavior, readable wrapping and safe areas. Longer English copy must fit mobile widths and increased font sizes.

## Commands

Run commands from this directory. Use npm and the existing lockfile.

```sh
npm ci
npm start             # mobile Metro server; do not open a browser automatically
npm run ios           # requires configured Xcode/simulator
npm run android       # requires configured Android tools/device
npm run api           # server-only environment: server/.env
npm run typecheck
npm run lint
npm test
npm run export:mobile # iOS/Android bundles, not signed installation files
npm run format:check
```

- Install framework/native dependencies with `npx expo install <package>` to resolve compatible versions.
- `npx expo-doctor` checks configuration and dependencies. Run it when app config or native dependencies change.
- Web commands are opt-in debugging tools. Do not run them or open browser tabs by default.
- Do not re-run successful broad checks without new changes or a concrete unresolved concern.

## Boundaries

- `src/domain`: schemas, philosophers, prepared demo, philosophy-map calculation.
- `src/data/repository.ts`: the only journal persistence boundary; serialize operations and update the in-memory snapshot only after successful storage.
- `src/state`: shared journal and in-memory connection settings.
- `src/services`: client-side HTTP calls and server URL validation.
- `server`: provider credentials, system prompt, HTTP validation/auth/limits. Never import it into mobile routes.
- `tests`: behavior, persistence failures/migrations, HTTP contracts and provider mocks. Tests must not consume paid AI calls.

## Native configuration and data

- Edit app identity and plugins in `app.json`. If `ios/` and `android/` are absent, they are generated; do not hand-author them.
- Never casually change bundle/package IDs after a release. App identity changes and storage-key migration are different operations; local sandbox data does not move between app IDs automatically.
- Storage schema is version 2 at `@kibitz/journal/v2`. The only permitted old brand reference in active code is the documented legacy migration namespace `@agora/journal/v1`.
- Preserve legacy text/evaluations and selections byte-for-byte where possible; only category IDs change during this migration.
- Record EAS/signing/device/credential blockers accurately. Do not accept OS license agreements or alter signing accounts on the user's behalf as a side effect of local checks.

## Keeping docs useful

When behavior changes, update the corresponding product/architecture document, roadmap status and validation evidence. Mark old screenshots as historical; do not present the earlier Korean prototype as the current English app. Keep secrets and generated output out of documentation and Git.
