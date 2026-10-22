# Kibitz architecture and contracts

Updated 2026-10-19. These are current implementation facts unless marked future.

## Stack and boundaries

Expo SDK 58, React Native 0.88, React 19.3, TypeScript, Expo Router, AsyncStorage and Zod. The API uses Node's HTTP server and a direct OpenAI Responses request. There is no database, account service or authentication provider in the MVP.

```text
Reflect screen
  → shared input schema
  → offline example/general questions OR evaluation HTTP request
  → validated four-framework evaluation
  → serialized local repository write
  → result + optional user-selected perspective
  → Journal / derived philosophy map

Mobile client → private evaluation server → OpenAI Responses API
                 server-only credentials    structured English output
```

The server receives no journal history. One provider request produces four perspectives plus the synthesis. IDs and values are shared with the mobile client through `src/domain/model.ts`.

| Location | Responsibility |
| --- | --- |
| `src/app/` | Routes, tabs and screens |
| `src/components/` | Shared theme and presentation |
| `src/domain/` | Schemas, framework metadata, prepared demo and map calculation |
| `src/data/repository.ts` | Storage validation, migration, serialized operations |
| `src/state/JournalProvider.tsx` | Journal state and in-memory connection settings |
| `src/services/` | Client HTTP and server-origin validation |
| `server/` | HTTP boundaries, provider request and trusted English-output instructions |
| `tests/` | Domain, client, persistence/migration, HTTP and provider-mock behavior |

## Current schemas

`EntryInput` contains `text` and `category`. Categories are `relationships`, `work`, `self`; labels are presentation-only.

An evaluation contains:

- `title`
- exactly four `judgments`: `philosopherId`, nullable integer `score` (0–10), `verdict`, `reasoning`, `question`
- `synthesis`: `tension`, `summary`, `nextStep`, `uncertainty`

Four distinct allowed IDs plus length four ensure every framework occurs once. The server and client both validate output. English is instructed by the provider prompt; live semantic/language quality has not yet been verified. JSON validation alone does not establish philosophical accuracy.

A stored entry adds UUID, ISO timestamp, original input, `source: demo | ai` and optional `resonance` philosopher ID. Source is preserved on save and is used to exclude demo choices from the map.

## Persistence and rename migration

Current key: `@kibitz/journal/v2`; envelope `{ version: 2, entries: [...] }`.

Legacy key: `@agora/journal/v1`; version 1 used Korean category labels. On load:

1. Read the current and legacy keys.
2. If the current key exists, validate and use it, including an intentionally empty journal.
3. Otherwise validate the legacy envelope/entries, map the three category labels to stable IDs, and preserve IDs, dates, source, original text, evaluations and choices.
4. Persist the validated version 2 copy before removing the legacy copy.
5. Remove a remaining legacy copy only after a valid version 2 state exists. Interrupted cleanup is retried on the next load.
6. Publish the loaded snapshot and allow mutations only after success. Invalid data or migration failure blocks writes and is surfaced to the user.

Operations are serialized. Snapshot/UI state advances only after successful storage. Re-adding the same entry ID replaces that record instead of duplicating it, enabling save-only retry. Removing a record removes its map vote; clearing writes an empty current journal so stale data cannot be resurrected.

This migrates storage inside one accessible app sandbox. A new iOS bundle ID or Android package creates a different sandbox. No previously released native app is known in this project; identifiers remain provisional. Future released identifiers must be preserved or an explicit export/import path designed.

There is no automatic journal encryption, sync or app-level backup. Old-language content is intentionally not rewritten. Draft state and pending unsaved results are not durable across process termination.

## HTTP API

- `GET /health` returns `{ "ok": true }`. It checks liveness, not provider credentials.
- `POST /v1/evaluations` accepts JSON:

```json
{ "text": "I gave a friend advice before asking what they needed.", "category": "relationships" }
```

Response: the validated evaluation schema above. Breaking request/category changes require matching app/server versions; the old Korean request values are not accepted by the current API. Legacy mapping applies only to stored entries.

Expected error statuses: 400 invalid input/JSON, 401 access code, 403 origin, 404 route, 405 method, 413 size, 415 content type, 422 refusal, 429 limits, 502 invalid/failed provider output, 503 unconfigured provider, 504 timeout. Client messages are English and do not expose provider internals.

Limits: 16 KiB body; 10 requests/minute per socket IP; four active evaluations; default 100 attempts/day across the process. Rate counts are in memory, daily rollover is UTC, and restart resets counters. Arbitrary `X-Forwarded-For` values are not trusted; behind a proxy a shared limit may result. Durable, user-specific accounting is future work.

Timeouts: server evaluation 45 seconds, client 50 seconds, body request 15 seconds, headers 10 seconds. Client cancellation passes an abort signal; disconnect cancels the provider request where supported.

## Credentials and configuration

Server-only `server/.env`:

- `OPENAI_API_KEY`, `OPENAI_MODEL` (default `gpt-4o-mini`)
- `HOST` (default loopback), `PORT` (8787)
- `API_ACCESS_TOKEN`, required at 24+ characters when non-loopback or production
- `ALLOWED_ORIGINS`, exact comma-separated browser origins for optional web tooling
- `DAILY_LIMIT`, positive integer

The server requests strict JSON Schema output with `store: false`. The prompt treats journal content as untrusted data and requires English output, grounded interpretations, uncertainty and supportive sensitive-context handling. No input/result database or body logging is implemented. Provider retention policies may still apply.

The client may read `EXPO_PUBLIC_API_URL` as its initial origin. The optional access code stays in memory and uses an Authorization header. It is an internal beta mechanism, not user authentication. Remote origins must be HTTPS; loopback/private numeric IPv4 origins may use HTTP for development, subject to native OS rules.

## Mobile workflow

`npm start` starts Metro for devices/development clients; opening a web page is unnecessary. Local `ios`/`android` commands need configured platform tools. `export:mobile` builds platform JavaScript/Hermes bundles. EAS creates installation builds separately and requires project/signing ownership. Nothing in export or tests deploys the API or submits a store release.

## Development review tooling — 2026-10-21

The repository-level `scripts/review.mjs` coordinates committed-change reviews without changing the mobile/API runtime. It captures allowlisted checks against a clean exact source HEAD, creates an independent clone without a remote, supplies frozen code/test evidence to Antigravity CLI, and validates structured review results plus source/snapshot integrity. The committed `harness/reviewer.json` uses Opus 4.6 Thinking by default and permits Sonnet 4.6 Thinking only for explicitly low-risk, small documentation-only routine reviews. Codex records semantic complexity/scope/reason in the task; deterministic diff/context guards can raise the choice. Version 3 manifests freeze this selection and rederive it during run/status; matching CLI model-selection evidence is still required. Unknown, medium/high and integration work uses Opus, with no quota-based downgrade. Historical fixed-model evidence stays attributed to its original model. The current Codex chat handles implementation and up to two repair cycles. Owner-controlled pre-commit reviews use independent temporary candidate commits and file hashes. The runner makes no merge/push decisions. Runtime artifacts are ignored under `harness/runs/`; see [the harness guide](../../harness/README.md).

Review context is delivered as one stdin frame followed by EOF, with no prompt in process arguments. Reviewer/help processes receive an explicit minimal environment instead of app/API/CI secrets or preload hooks. Repository checks keep their existing environment and execute owner-trusted code; the CLI sandbox is not their isolation boundary. Stdin delivery failures cannot become a successful review.
