# Kibitz validation record

Updated 2026-10-26. Environment: macOS, Node.js 24.12.0. Current automated evidence, historical prototype evidence and unverified native/live behavior are recorded separately.

## Gemini model compatibility and quota recovery — 2026-10-26

The owner authorized Gemini following explicit Opus quota exhaustion. The account catalog lists `gemini-3.8-flash-high`; High is the active default during this block, while normal Opus/Sonnet preference remains documented. This is a coordinator-managed new-policy/new-run procedure, not runner auto-failover or equivalent-quality evidence.

The previous documentation run `20261022T231511Z-5916353f`, temporary head `9585ddfe0ebab2a1a892a15058b8aff2bb720f64`, ended with `Individual quota reached` and no structured verdict. Preserve that INCOMPLETE record. Authentication, timeout, missing-model, denied-tool and generic rate errors do not authorize switching. Stop if Gemini also fails.

Preparation initially rejected the real Gemini ID because three model validators allowed hyphens but not dots. They now also allow dots within the existing bounded, alphanumeric-leading model token. Flags, whitespace, paths and excessive length remain rejected. No selection, subprocess, transport, retry or provenance behavior changes. The expanded local harness suite passed **44/44** using temporary repositories and mock reviewers. The task also captures this suite plus typecheck/lint; its generated report supplies the real verdict. Mock Gemini flow/provenance coverage is not a live-model PASS. No app evaluation API call, native run or app-suite rerun is claimed.

The real compatibility review completed **PASS**, no findings, on temporary head `e2ab8208fee9a7ab4f4e56b2a86b7bc8310d1b5c` from base `6348ee3bfa4613d328655321f6aef0ba59ef1dde`, run `20261026T174152Z-38c5e41f`. Requested and CLI-reported model both matched `gemini-3.8-flash-high`; captured checks were harness **44/44**, typecheck and lint. This covers the compatibility/model-policy range, not the pending product-plan range or a future owner commit. Its ignored run archive retains the raw stream and structured result.

## Quality-first plan correction — 2026-10-22

This documentation correction moves existing-path quality/timing evidence to T00.5 before implementation, keeps one complete scoreless call for the first target and gates D08 on T08. It aligns rule promotion, compatibility, resonance and save/supersession acceptance.

This documentation review starts at the separate October 26 Gemini compatibility candidate recorded above. The documentation range changes no app/provider/storage/dependencies, reviewer implementation or active model policy. The preceding compatibility range permits dotted model IDs and changes reviewer policy; do not describe the aggregate owner diff as documentation-only. The scoped documentation task captures typecheck/lint; local checks cover links/AC mappings/dependencies. Earlier app 22/22 evidence remains historical; the compatibility candidate separately captures harness 44/44.

T00.5 still needs a configured server-only key, explicit owner budget, fictional cases and go/revise/stop report. Repeat relevant cases after target prompt/contract changes; baseline scored evidence does not validate future output.

## Conservative reviewer routing — 2026-10-22

The owner requested model selection by review complexity, biased toward the stronger model. The new policy uses Opus 4.6 Thinking by default; only explicitly assessed, small documentation-only routine scopes can select Sonnet 4.6 Thinking. Codex supplies semantic judgment in the committed task and deterministic diff/context guards may raise it. No model request is made to classify the task. This is a conservative policy, not proof that automated complexity classification is accurate.

The expanded local behavior suite passed **41/41** with temporary repositories and fake reviewers. Coverage includes both selected-model paths, missing/invalid assessments, sensitive context and runtime changes, size limits, binary/symlink/rename changes (including unchanged unusual context), frozen-selection/result tampering, quota failure without fallback and legacy fixed-policy evidence. The scoped feature task `harness/tasks/review-model-routing.json` requires harness/typecheck/lint; its generated report supplies the real integration outcome for the new frozen candidate, not a predeclared PASS. The mobile/API suite is unchanged and is not relabeled as newly executed.

The prior Sonnet security follow-up completed a real PASS with no findings: temporary candidate `6110b21502858f69d4275390db016d0072cc8e88`, base `3b53a0f03d9b3e9df983a80931e7ad4048ae28e0`, run `20261022T190530Z-5d78adb2`. All 32 harness tests, typecheck and lint passed; requested/reported model both matched `claude-sonnet-4-6`. The owner commit `f9880edd5d928b75888dc48d619734b8404ae5f3` has the exact reviewed Git tree and was pushed at the owner's request. That establishes fixed-Sonnet transport/evidence for the earlier follow-up, not a native run of this new routing feature.

## Historical fixed Sonnet default — 2026-10-22

The owner explicitly selected `claude-sonnet-4-6` (Claude Sonnet 4.6 Thinking) as the fixed default, confirmed in the signed-in `agy models` catalog on 2026-10-22. This policy was subsequently superseded by conservative routing above; the completed fixed-Sonnet result retains its real attribution. Tests use local provider doubles and can exercise another valid model slug without selecting it for a real review.

The first real security-follow-up attempt (`20261021T210606Z-e1317259`, temporary head `90ca2de2c4505ee43251086405f1f1c6b48c6390`) reached Opus model execution with stdin delivery and the minimal environment, then reported `Individual quota reached` with no structured review result. Harness 32/32, typecheck and lint had passed for that candidate; the review remains **INCOMPLETE**, not PASS. Its local evidence is preserved. The Sonnet retry uses a new frozen candidate and generated run report; this paragraph does not predeclare a successful review or available usage allowance.

## Review process security follow-up — 2026-10-21

The pushed tooling commit `3b53a0f03d9b3e9df983a80931e7ad4048ae28e0` was checked for secret exposure. Local patterns found no real key/token in its 15 changed files; a wider 55-text-file scan matched only an invalid-URL test fixture. No real env/private-key files or runtime review artifacts were tracked. This was not a full-history/provider-validated scan or a penetration test.

The follow-up hardens two local developer-tool exposure paths: prompt/source context in process arguments and unnecessary inherited reviewer environment variables. Context now uses a single stdin frame and EOF; reviewer and CLI help invocations use a minimal allowlist. App/provider/CI secrets and preload hooks are excluded, while required runtime/configuration/proxy/CA and supported credential-file locations remain available. Required repository checks retain their existing environment.

The updated behavior suite passed **32/32** locally using temporary repositories and fake reviewer processes. It verifies complete stdin framing, absence of prompt arguments, secret-canary removal, diagnostic environment isolation, preserved runtime settings, early stdin closure, missing executables, and timeout with pending input, alongside prior integrity/schema/model cases. Only dummy credentials were used. The scoped task `harness/tasks/review-process-security.json` captures harness/typecheck/lint checks and the final real reviewer outcome in its generated run report; this paragraph does not predeclare live authentication or PASS. The unchanged application suite's earlier 22/22 result remains historical evidence and is not relabeled as rerun.

## Development review harness — 2026-10-21

- Harness behavior suite: **26/26 passed** with local fake reviewer processes and temporary Git repositories after adding the pinned-model policy. Covers exact commit/acceptance validation, unavailable authentication, execution errors, malformed output, denied actions, wrong attribution, source/snapshot edits, cached-result tampering, check failures, duplicate requests, timeouts, context bounds, model selection and raw provenance validation.
- Existing app checks: typecheck and lint passed; **22/22 behavior tests passed**. The first restricted run could not bind three temporary loopback servers (`EPERM`); the complete suite passed when local port access was allowed. These app tests use mocked provider responses.
- Real reviewer integration: official Antigravity CLI **1.4.4**, official archive SHA-512 verified, existing account authentication. A synthetic numerical-addition change and genuine test logs produced a validated **PASS** for the exact temporary base/head and both acceptance criteria. This verifies transport/schema/evidence integration, not review quality on all application changes.
- Early live attempts with a denied terminal action or invalid arguments were recorded as INCOMPLETE. The final adapter supplies bounded frozen code/test context, uses the CLI sandbox, and does not change global permissions or use a permission-bypass flag.
- Historical harness implementation review: **PASS**, no findings, all three acceptance criteria met. Reviewed temporary candidate `55ad50f7df758a5e14f2c8d8a9db65a2b529477f` against base `7eef51b2d8188116de25f828dc2e2484cbf75f39`, with the then-current 21-test harness check captured by the runner. This preceded the model pin and final documentation updates; it does not cover the current complete change. App checks above were run separately against unchanged application source. The earlier CLI calls did not specify or record a model, so the model used cannot be established.
- Initial reviewer policy (2026-10-21): `claude-opus-4-6-thinking`, confirmed available in the signed-in CLI catalog that day. A live stream-format probe returned this exact model in `init.model`; the CLI rejected a separate effort override, which was therefore omitted. The runner checks CLI `init.model` and retains requested/reported selection. This is CLI provenance, not independent server attestation. The current conservative routing policy is recorded above.
- Completed tooling integration review before the scope-policy follow-up: **PASS**, no findings, all five criteria met, all 14 changed files reviewed. Temporary candidate `c53f783cc2b619668c06232bda01452583e1f4b7` against base `7eef51b2d8188116de25f828dc2e2484cbf75f39`; all four checks passed (harness 26/26, typecheck, lint, app tests 22/22). CLI requested/reported model both matched `claude-opus-4-6-thinking`. The owner working files matched the candidate; the owner checkout was not committed or pushed.

The later scope-policy change updates documentation and its task brief only. It is a routine review from the completed candidate above, using `harness/tasks/review-scope-policy.json` and the harness check. Earlier app checks retain their original attribution; they are not presented as rerun against that follow-up. Its generated review report supplies the follow-up outcome separately. The runner, application, server, model selection and dependencies are unchanged by this policy update.

The completed integration review used all four required checks in `harness/tasks/review-harness.json`; this brief is retained for feature-wide review. Generated `harness/runs/<run_id>/result.json` / `report.md` records are the authoritative outcomes for their respective ranges. For an owner-controlled manual commit, evidence is created in independent temporary candidates and accompanied by changed-file hashes. Their commit identities differ from the owner's later commit.

The coordinator is the current Codex chat following `AGENTS.md`; CLI review execution and result validation are implemented, while unattended implementation/CI enforcement are not. See [commands and limits](../../harness/README.md). The app's mobile UI, API contract and journal storage are unchanged by this developer-tooling task.

## Current rename and English transition

| Check | Evidence |
| --- | --- |
| TypeScript | Passed after the rename, English copy and version 2 migration changes |
| ESLint | Passed, no errors or warnings |
| Formatting | All checked source/config files pass Prettier |
| Behavior tests | **22/22 passed**, including local HTTP tests with mocked provider responses |
| Expo Doctor | **20/20 passed** after changing app identity |
| iOS/Android export | Both platform Hermes bundles generated after the final English copy pass |
| Authored language scan | No Korean app/AI/example/error copy remains; only legacy migration literals and their tests retain Korean |
| Web workflow | Earlier localhost:8081 preview server stopped; no web preview opened for this transition |

### Automated behavior coverage

- Input trimming, length bounds and valid categories.
- All four distinct perspectives, prepared example contrasts and null scores for arbitrary offline writing.
- Philosophy-map eligibility, threshold, percentages and edits/deletion.
- Serialized writes, relaunch, failed-write recovery, safe retry and corrupt-data protection.
- Legacy category migration preserving content/IDs/votes; failed copy; interrupted cleanup; an intentionally empty current journal; invalid legacy records.
- Client request scope/access header, server-origin validation, response validation and error paths.
- HTTP input, access code, origin, size and usage limits; internal-error redaction.
- Provider structured-response contract, refusal, incomplete/malformed output and duplicate-persona rejection.

These tests do not make paid AI requests, establish interpretation quality or emulate native keyboard/storage behavior.

## Historical evidence — initial prototype

Before the Kibitz/English transition, the Korean prototype passed 17 tests, typecheck/lint, 20 Expo diagnostics and web/iOS/Android export. A mobile-sized Chrome session verified the prepared example/result loop, selection after refresh, journal search, demo exclusion from the map, consent gating, HTTP-origin rejection and a connection error preserving input. Deletion confirmation/cancel was checked in the browser; storage deletion was tested in code.

Screenshots are retained under [archive/initial-korean-prototype](archive/initial-korean-prototype/README.md). They show a previous name and language. They are not the current English interface or evidence of an installed native app.

## Still unverified

- Real OpenAI requests, current account/model availability, latency, cost and semantic quality.
- English output across actual ordinary, ambiguous, non-English, adversarial and sensitive entries.
- Installed iOS/Android flows, safe areas, keyboard, increased font sizes, back navigation, long content and persistence after a process restart.
- The unlocked map with actual user AI records; calculation/eligibility are tested, but live/native integration is not.
- Signed EAS installation builds, final app identifiers, signing ownership and store release.
- Current local Xcode/simulator readiness has not been rechecked in this documentation task. The earlier unaccepted-license report is historical, not an asserted current blocker; check the environment before relying on it. Simulator/runtime availability still does not establish installed-device acceptance. No OS license or signing settings were changed here.

A browser screenshot is not a substitute for these mobile checks. See [the roadmap](ROADMAP.md) for priorities and acceptance criteria.

## Previously recorded dependency advisories

The initial `npm audit --omit=dev` reported **26 warnings: 19 high, 7 moderate**. Most are propagated dependency paths originating in the following packages rather than 26 distinct root issues. The rename did not change dependency versions; this records the prior audit, not a new security clearance.

| Package and path | Recorded finding |
| --- | --- |
| `braces@3.0.3` via Metro → micromatch | Stack exhaustion from deeply nested patterns; 3.0.3 was also the published latest checked then |
| `node-forge@1.4.0` via Expo CLI/signing tools | RSA signature verification advisory; 1.4.0 was also the published latest checked then |
| `uuid@7.0.3` via Expo config plugins → xcode | Buffer bounds advisory in a transitive older major |

The evaluation HTTP service does not directly call these packages. This is not proof that the dependency graph is risk-free. Review compatible upstream fixes before distributing builds or exposing development tools. A forced downgrade to Expo 44/React Native 0.72 was not applied.

## Reproduce

From `kibitz/`:

```sh
npm run typecheck
npm run lint
npm run format:check
npm test
npm run export:mobile
npx expo-doctor
```

HTTP tests need temporary loopback ports in restricted environments. Mobile export produces bundles only. A web preview and cloud build are unnecessary for these checks.
