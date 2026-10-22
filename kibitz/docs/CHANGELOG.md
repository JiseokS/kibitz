# Changelog

## Default reviewer model — 2026-10-22

- Changed the default reviewer to owner-approved Claude Sonnet 4.6 Thinking (`claude-sonnet-4-6`) after the Opus security review was interrupted by the account quota.
- Updated current instructions, the workflow diagram and reusable task criteria; retained historical Opus evidence and the incomplete run without relabeling either.
- Kept explicit model-selection validation and disabled automatic fallback.

## Review process security — 2026-10-21

- Moved review context from command-line prompt arguments to one framed stdin message followed by EOF.
- Restricted reviewer and CLI help environments to explicit runtime/configuration settings, excluding unrelated app/API/CI secrets and preload hooks.
- Added regression coverage for private prompt delivery, environment isolation, early stdin closure, backpressure timeouts and missing executables.
- Preserved required repository-check environments, cached reviewer sign-in and existing review integrity/model checks.

## Development review tooling — 2026-10-21

- Set Codex as the implementer and Antigravity as the independent reviewer.
- Added a local review runner, strict result schema, task brief and diagnostics.
- Added real check capture, independent review copies, stale-result/edit detection, bounded processes, attempt limits and behavior tests.
- Kept runtime evidence local and distinguished execution success, review findings and incomplete verification.
- Pinned Claude Opus 4.6 Thinking, validated CLI-reported model selection, and preserved raw model provenance for cached results.
- Documented temporary-candidate review when the owner chooses to commit and push manually.
- Defined routine reviews of the latest increment and affected dependencies/tests, with full feature-range integration review at completion and checks selected by impact.
- Recorded Korean as the owner's communication language while retaining English product copy and repository documentation.

## Unreleased — 2026-10-19

- Chose **Kibitz** as the product name and renamed the project directory, npm identity, Expo name/slug/scheme and provisional native identifiers.
- Converted interface copy, accessibility labels, prepared demo evaluations, errors and date formatting to English.
- Updated AI instructions to require English output, including for input in another language.
- Replaced language-specific category values with stable `relationships`, `work`, `self` IDs and English display labels.
- Added a version 2 journal migration that preserves legacy content and votes and retries safely after failure.
- Made mobile development the documented default and stopped the earlier web preview server.
- Added durable Codex rules, product rules, ordered roadmap, architecture and decision records.

## Initial local prototype — 2026-10-19

- Scaffolded Expo/React Native with TypeScript and Router.
- Built entry, four-perspective evaluation/synthesis, journal, selected-perspective profile and settings flows.
- Added offline examples, server-backed structured AI evaluation and validation/error handling.
- Added local persistence, save retry, search/filter/deletion, server limits and automated checks.
- The initial prototype used a Korean interface and a different working name. Its screenshots and browser verification are historical evidence, not current English native-app evidence.
