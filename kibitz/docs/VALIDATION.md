# Kibitz validation record

Updated 2026-10-19. Environment: macOS, Node.js 24.12.0. Current automated evidence, historical prototype evidence and unverified native/live behavior are recorded separately.

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
- Xcode/simulator setup: this Mac previously reported an unaccepted Xcode license. No OS license agreement or signing setup was changed in this task.

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
