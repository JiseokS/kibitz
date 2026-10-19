# Kibitz app

English-first iOS/Android philosophical reflection MVP. This directory contains the runnable Expo app and its AI evaluation server.

The canonical overview and setup guide are in the [workspace README](../README.md). Codex follows [workspace rules](../AGENTS.md) plus [implementation instructions](AGENTS.md).

```sh
npm ci
npm start             # mobile development; no web browser required
npm run ios           # configured local iOS simulator
npm run android       # configured Android emulator/device
npm run api           # optional AI server, configured through server/.env
```

The app starts in offline demo mode. Set a server-only OpenAI key to use AI reflections. Do not enter an OpenAI key in the app's beta access code field.

- [Product behavior and rules](docs/PRODUCT.md)
- [Roadmap and release gates](docs/ROADMAP.md)
- [Architecture, API and migration](docs/ARCHITECTURE.md)
- [Decision log](docs/DECISIONS.md)
- [Validation and known gaps](docs/VALIDATION.md)
- [Changelog](docs/CHANGELOG.md)

## Local checks

```sh
npm run typecheck
npm run lint
npm test
npm run export:mobile
```

`npm run web` is retained for an explicitly requested web check. The product and default verification workflow are mobile-first.
