# Kibitz

**Your choices, a little perspective.**

Kibitz is an English-first iOS and Android app for reflecting on something you did or said. Write about a moment, compare four philosophical interpretations, and decide which perspective stays with you.

<!-- kibitz-design-review:start -->
## Personal MVP design review — October 20, 2026

The next design uses scoreless, written feedback: choose a philosopher for each entry, read that take first, then switch to other perspectives prepared while reading. A collapsed comparison and practical next step sit below. Open-ended conversations and reasoning affinity are later work.

The feature tables below describe the implemented prototype. The review documents distinguish confirmed product choices, technical proposals and future work; the revised flow is not implemented yet.

- [Design review](kibitz/docs/planning/DESIGN_REVIEW.md): product, interaction, contracts, failure behavior and acceptance criteria.
- [Decision workbook](kibitz/docs/planning/DECISIONS_WORKBOOK.md): nine confirmed choices and editable remaining decisions.
- [Delivery and review plan](kibitz/docs/planning/DELIVERY_PLAN.md): scoped tasks, verification and Codex/Antigravity handoffs.

<!-- kibitz-design-review:end -->

## Product and scope

- **Name:** Kibitz. The project directory, package, Expo slug and URL scheme are `kibitz`.
- **Platforms:** iOS and Android. Web is optional developer tooling, not a required user experience or release target.
- **Language:** English interface, accessibility labels, examples, errors and AI responses. Users may write in another language; AI is instructed to respond in English. Existing journal text is preserved as written.
- **Stage:** implemented local MVP. Live AI quality, real-device behavior, signed builds and public release remain to be verified.
- **Positioning:** philosophical feedback on everyday actions and speech, with contrasting criteria and a practical next step. This is a reflection tool, not a ranking of the user's moral worth.

## What is implemented

| Area | Current behavior |
| --- | --- |
| Entry | Write 10–2,000 characters; choose Relationships, Work & study or Myself |
| Four perspectives | Kant, J. S. Mill, Aristotle and Nietzsche; score where appropriate, interpretation and a reflection question |
| Synthesis | Main tension, shared ground/differences, one small next step, missing context |
| Offline demo | Two prepared examples; custom writing receives general questions without personalized scores |
| AI path | Server-side OpenAI Responses request, strict structured output, validation and error handling |
| Journal | Device storage, search, AI/demo filters, detail view, individual/all deletion with confirmation |
| Philosophy map | User-selected perspectives, available after five distinct AI entries with a selection |
| Reliability | Serialized writes, save-only retry after evaluation, duplicate-perspective rejection, request cancellation/timeouts |
| Settings | Demo/AI mode, server origin, in-memory beta access code, data deletion |
| Rename migration | Old journal namespace and Korean category values migrate to version 2 without rewriting original content |
| Mobile packaging | Expo configuration and EAS internal-preview, simulator and production profiles; builds have not been submitted |

Accounts, cloud sync, subscriptions, notifications and social features are not implemented. Priorities and acceptance criteria are in [the roadmap](kibitz/docs/ROADMAP.md).

## Mobile development

Prerequisites: Node.js 22.13+ and npm. The project has been checked with Node.js 24. Install platform tooling only for the platform you intend to run locally.

```sh
cd kibitz
npm ci
npm start
```

Use a compatible Expo Go installation or an installed development client on a device. SDK compatibility determines whether the installed Expo Go can run this project. A library not bundled in that Expo Go version requires a development build.

For configured local simulators/emulators:

```sh
npm run ios
npm run android
```

- iOS requires Xcode, completed license/initial setup and an installed simulator runtime.
- Android requires the Android SDK and a running emulator or connected device.
- `npm start` serves the mobile JavaScript bundle. **There is no need to open a web browser.**
- `npm run web` remains available only for an explicitly requested web check. Do not use web behavior as proof of native behavior.

The default is the offline demo. It needs neither an account nor an API key.

## Enable AI reflections

```sh
cd kibitz # from the workspace root; skip if already here
cp server/.env.example server/.env
```

Set `OPENAI_API_KEY` in `server/.env`, then run:

```sh
npm run api
```

In the mobile app, open **Settings → Reflect with AI**, enter the server origin and the beta access code if configured, then choose **Use AI mode**. The app asks for consent before sending an entry. Only the current entry and category are sent.

The default model is `gpt-4o-mini`; `OPENAI_MODEL` can select a compatible Structured Outputs model. Keep the key on the server. The app's beta code field is not for an OpenAI API key.

For a physical device, `localhost` points to the phone itself. Use an HTTPS development server/tunnel or the computer's private LAN address. Exposing the server beyond loopback requires `HOST=0.0.0.0` and a random `API_ACCESS_TOKEN` of at least 24 characters. Native HTTP restrictions can still apply to LAN addresses; prefer HTTPS instead of weakening app transport security. The Android emulator can reach the host at `http://10.0.2.2:8787`.

Optional app configuration is in `kibitz/.env.example`; only public configuration belongs in `EXPO_PUBLIC_*`. Connection changes and beta codes are in memory and reset when the app fully closes. Journal entries persist.

See [architecture and API contracts](kibitz/docs/ARCHITECTURE.md) for limits, errors, storage and migration details.

## Development review

Codex implements and tests each scoped task; Antigravity reviews the fixed commit range through the local CLI runner. The current Codex chat invokes the runner and reads its result, so manual copying between the two apps is unnecessary once CLI authentication is ready.

The committed reviewer policy selects **Claude Sonnet 4.6 (Thinking)** (`claude-sonnet-4-6`), explicitly chosen by the owner on October 22, 2026. Reviews record the requested model and the CLI-reported model; missing or mismatched selection is incomplete. Historical Opus reviews keep their original model attribution, and earlier reviews without model provenance do not establish which model ran. The owner may retain manual commit/push control; pre-commit reviews use an independent temporary candidate with file hashes.

Routine reviews cover the latest changed code and its affected dependencies/tests. At feature completion, review the full range from the recorded feature start through the latest head, including integration and failure paths. The coordinator selects the range and context explicitly; see [review scope and check selection](harness/README.md#review-scope-and-check-selection).

From the repository root:

```sh
node scripts/review.mjs doctor
node --test scripts/review.test.mjs
```

A task's review uses `prepare --base <base-commit> --task harness/tasks/<task>.json`, followed by `run --run <returned-id>`. The runner records real checks, creates an independent review copy, validates the review verdict and rejects stale or altered evidence. It does not merge or push. See the [workflow diagram](harness/README.md#workflow-at-a-glance) and [setup, commands and limits](harness/README.md).

## Checks and internal builds

From `kibitz/`:

```sh
npm run typecheck
npm run lint
npm test
npm run export:mobile
```

API tests use local ephemeral ports and mocked AI responses; they do not make paid requests. `export:mobile` produces iOS/Android JavaScript/Hermes bundles, not installable apps.

EAS profiles are prepared for a future requested internal build:

```sh
npx eas-cli@latest build --profile preview --platform android
npx eas-cli@latest build --profile simulator --platform ios
```

These require an Expo account/project, signing setup as applicable and explicit intent to create a remote build. The current `com.kibitz.reflection` identifiers are provisional and must be checked before release. Changing them creates a separate native application; an existing app's sandbox does not transfer automatically.

## Decisions and documents

| Document | Purpose |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Workspace-wide Codex rules, product invariants and completion criteria |
| [Review harness](harness/README.md) | Codex/Antigravity setup, executable commands, outcomes and evidence |
| [Implementation rules](kibitz/AGENTS.md) | Expo conventions, commands and source layout |
| [Product rules](kibitz/docs/PRODUCT.md) | Behavior, language, frameworks, scoring and philosophy-map rules |
| [Roadmap](kibitz/docs/ROADMAP.md) | Ordered next work, acceptance criteria and deferred scope |
| [Architecture](kibitz/docs/ARCHITECTURE.md) | Data flow, API, persistence, failure behavior and privacy |
| [Decisions](kibitz/docs/DECISIONS.md) | Why the current scope and technical choices were made |
| [Validation](kibitz/docs/VALIDATION.md) | Evidence, unverified areas, known dependency advisories |
| [Changelog](kibitz/docs/CHANGELOG.md) | User-visible changes and project transitions |

The Codex rules live in `AGENTS.md`; there is no separate competing `codexrule` file. The product and repository documents are written in English. Conversation with the user can remain Korean.
