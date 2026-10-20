# Kibitz personal MVP — delivery and review plan

Updated 2026-10-20. **Status: proposed implementation plan, not completed work.**

Read [the design](DESIGN_REVIEW.md) and [the decision workbook](DECISIONS_WORKBOOK.md) first. Nine product choices are confirmed; open technical details remain reviewable.

## 1. Milestones and gates

| Milestone | Deliverable | Gate |
| --- | --- | --- |
| M0 — founder review | Agreed target, open choices and first task scope | Founder can describe the intended chosen-first flow and edit the documents |
| M1 — scoreless contracts and safe storage | Primary/remaining schemas, legacy reader, partial-entry repository | Mock/domain/migration/failure tests pass; old journal content is preserved |
| M2 — working personal loop | Per-entry choice, focused result, asynchronous alternatives, collapsed comparison | Primary is usable independently; cached switching makes no new request; failure/interruption/deletion behave honestly |
| M3 — real usefulness and speed | Small bounded real-call evaluation plus actual-device acceptance | Evidence of content quality and measured timing/cost; no claim based only on mocks or bundles |
| M4 — personal trial | Five ordinary reflections over roughly a week, with private notes | Founder finds the feedback useful enough to continue, or identifies a specific design change |

No public beta, account system, store submission, cloud journal, payment or notification milestone is part of this personal-MVP plan. Broader release planning can follow evidence from M4.

## 2. Domain-to-code map

Paths below are repository-relative. The repository currently contains the runnable app in an inner `kibitz/` directory; preserve that layout during this work.

| Domain | Existing locations | Proposed change |
| --- | --- | --- |
| Entry and selection | `kibitz/src/app/(tabs)/index.tsx`, domain model/metadata | Required first philosopher per entry; immutable submitted input snapshot |
| Phase contracts | `kibitz/src/domain/model.ts`, shared services | Scoreless single-perspective and remaining-three schemas; completion invariants |
| Provider and HTTP | `kibitz/server/app.ts`, `prompt.ts`, `index.ts` | Trusted phase prompts, validation, bounded operation identity/cache and phase-aware limits |
| Client orchestration | `kibitz/src/services/evaluate.ts`, state modules | Start primary, save it, then complete alternatives; handle cancellation/readiness without duplicate calls |
| Journal and migration | `kibitz/src/data/repository.ts`, domain storage schema | Partial result storage, lossless old-entry reader, guarded completion merge |
| Result and comparison | `kibitz/src/app/entry/[id].tsx`, common components | One visible take, selector below, explicit loading/error states and collapsed synthesis |
| Draft | Entry/state and a dedicated local draft repository | Text/category/primary selection survive a process interruption |
| History | `kibitz/src/app/(tabs)/history.tsx` | Original first philosopher, partial/complete status, preserved deletion/search |
| Future affinity | Existing profile/resonance modules | Preserve semantic distinction; do not infer thinking alignment in this MVP |

These are logical boundaries inside the existing stack. No backend-framework rewrite or distributed worker platform is planned.

## 3. Scoped task cards

Each card should become a separate reviewable change or a small, explicitly linked change set. Do not merge unrelated refactoring into it.

### T00 — confirm scope and resolve blocking choices

**Owner:** founder. **Depends on:** design review.

- Confirm the scoreless, selected-first, primary-then-remaining flow.
- Decide whether the existing philosophy-map tab is hidden or clearly retained as resonance only (D10).
- Name the actual first test device (D11).
- Confirm one entry field or optional separate reasoning field (D12).
- Record an owner-set limit before paid live experiments; no API key in chat.

**Done when:** the selected first task is unambiguous; unresolved nonblocking choices are explicitly deferred.

### T01 — define phase-specific scoreless contracts

**Owner:** Cursor. **Depends on:** T00's core scope.

- Define a scoreless perspective with stable philosopher ID, verdict, reasoning, question and per-lens next step.
- Define a primary response for exactly the requested philosopher.
- Define a remaining response for exactly the other three plus synthesis.
- Define local completion status and operation/entry identity rules.
- Document the coordinated API change; discover any distributed clients before breaking the existing one-request contract.

**Verify:** wrong/missing/duplicate/unexpected IDs rejected; primary and remaining sets are disjoint and cover all four when complete; old scored fixtures cannot be mistaken for new provider output.

**Done when:** contracts and fixtures are reviewable without a paid AI call, and the migration/compatibility strategy is explicit.

### T02 — add provider phases and HTTP boundaries

**Owner:** Cursor. **Depends on:** T01.

- Build separate trusted primary and remaining prompt paths, with English output and actual framework distinctions.
- Require a specific action proposal for each philosopher; remove generated numerical grades.
- Add validated operation IDs and bounded deduplication/cache policy. Reusing an ID with different input must be rejected.
- Preserve authentication, body limits, origin checks, redaction and timeouts; account for both phases in usage limits.
- Document cache lifetime, expiry/restart behavior and the possibility of repeated charges after ambiguous failure.

**Verify with mocks:** structured responses, correct phase IDs, refusal/incomplete/malformed responses, duplicate operations, mismatched payloads and limits. A provider key is never required for the normal test suite.

**Done when:** independent HTTP tests prove the contract; no UI or deployment claim is attached to this task.

### T03 — evolve the local journal before partial writes

**Owner:** Cursor. **Depends on:** T01.

- Add a versioned reader for old complete scored records and new partial scoreless records.
- Preserve original input, evaluation content, IDs, timestamps, source and explicit votes. Historical scores remain legacy data and are not displayed as new product scores.
- Old records never had an original chosen-first ID. Do not invent that user choice; use a documented neutral display fallback.
- Add `savePrimary` and guarded `mergeCompletion` behavior, or equivalent repository operations.
- Completion updates an existing matching entry/generation only. It must not create a record after deletion.

**Verify:** legacy round-trip, partial-to-complete merge, failed copy/write/cleanup, corrupt data, intentional empty journal, concurrent delete/completion and clear-all/completion races.

**Done when:** interrupted work is recoverable without data loss or resurrection. No existing journal is reset to make tests pass.

### T04 — implement the application-level evaluation coordinator

**Owner:** Cursor. **Depends on:** T02 and T03.

- Snapshot the submitted text/category/primary choice under one entry identity.
- Run one primary operation, validate it, save it, then start one remaining batch.
- Reuse in-flight and cached results across card switches and route changes.
- Preserve the primary result if secondary work fails. Offer explicit retry for missing work only.
- Stop or interrupt work appropriately when the app becomes inactive; do not promise execution after app closure.
- Restore saved state honestly after restart and prevent uncontrolled paid auto-retries.

**Verify:** double submit, repeated switching, route changes, background failure, save failure, request cancellation, inactive/restart, late responses after delete/new entry and operation retry/expiry cases.

**Done when:** these transitions are testable with fake transport/storage; no screen-specific effect accidentally creates extra calls.

### T05 — build the chosen-first result experience

**Owner:** Cursor. **Depends on:** T01 and T04; use fixtures while integrating.

- Add explicit per-entry philosopher selection and a contextual submit label.
- Present one philosopher's verdict, reasoning, question and next step.
- Place the other-philosopher selector below the main card, with readiness states.
- Remove score numbers, score bars, average labels and ranking cues from the target presentation.
- Keep the input episode available but visually secondary.
- Reopening a new-format journal entry starts with its original chosen philosopher.

**Verify:** active name/framework matches the visible content; early switches show accurate loading; ready switches create no request; long English and increased text size wrap correctly.

**Done when:** the revised flow works with fixture-backed transport and is ready for native acceptance. A browser screenshot is not native evidence.

### T06 — complete comparison and demo consistency

**Owner:** Cursor. **Depends on:** T04 and T05.

- Add a collapsed comparison section: main tension, criterion differences, uncertainty and combined action.
- Keep it incomplete/preparing if required perspectives are missing; do not fabricate agreement.
- Adapt the offline examples to the new scoreless switcher interaction.
- Keep arbitrary offline writing clearly generic. Prepared results may be ready immediately; do not fake provider latency as a real generation claim.
- Preserve provenance and explicit resonance semantics if that module remains.

**Verify:** partial, complete and failed comparison; demo/AI labeling; no score or inferred-affinity claims.

### T07 — preserve a writing session

**Owner:** Cursor. **Depends on:** T00's input choice and T05.

- Persist draft text, category and chosen primary philosopher locally.
- Define clear-on-successful-primary-save, deliberate discard, error and restart behavior.
- Keep draft persistence separate from saved reflections so a draft is not counted as a completed record.
- Avoid discarding a newer draft due to a late response from an older submission.

**Verify:** process restart, storage failure, save-only retry, edit/cancel/resubmit and a late completion after a fresh draft.

### T08 — run a small real-call content/performance evaluation

**Owner:** founder with Cursor execution; Antigravity reviews evidence. **Depends on:** working M2, configured key and an explicit experiment budget.

- Use fictional scenarios first; do not commit genuine journal text or keys.
- Compare matched output requirements under all-at-once and progressive generation, rather than comparing a long baseline with a deliberately shorter new answer and attributing everything to orchestration.
- Record primary-visible time, all-ready time, early-switch wait, provider calls and actual usage/cost evidence where available.
- Review grounding, framework fidelity, meaningful contrast, uncertainty, tone and action usefulness separately from JSON validity.
- Include ambiguous input, non-English input, embedded instructions and sensitive situations.

**Done when:** a dated report separates measurement, judgment and unknowns. Do not infer broad reliability from a tiny personal sample or claim a guaranteed cost reduction.

### T09 — verify on the founder's actual mobile device

**Owner:** founder, assisted by Cursor. **Depends on:** D11 and M2.

- Entry → first take → reading while completion runs → switch early/late → expand comparison.
- Relaunch and reopen a partially and fully completed reflection.
- Check keyboard, safe areas, back navigation, larger text and long English content.
- Disconnect, return from inactivity, retry and delete during an outstanding request.
- Check the server is reachable without exposing the OpenAI key or broadly disabling transport security.

**Done when:** the tested platform/device/build and failures are recorded. Keep the other platform's status explicit. A bundle export alone is insufficient.

### T10 — personal-use review and next design decision

**Owner:** founder. **Depends on:** T08 and T09.

- Try five ordinary low-sensitivity episodes over roughly a week.
- Note whether the first take helped, another lens changed the view, and an action was useful.
- Decide whether to improve the core loop, add optional intention input, or design a next feature.
- Keep free conversation and reasoning affinity as separate later designs with their own contracts/cost/consent decisions.

**Done when:** there is a specific next product decision, not just a feature wish list.

## 4. Cursor / Antigravity harness

This is the operating design. The corresponding automated CI, tool adapters and review skills are not created by this planning task.

### Shared context

- Common `AGENTS.md` and accepted product/architecture rules.
- This review package while target behavior is being decided.
- A task brief containing the selected card, acceptance IDs, non-goals and required checks.
- Tool-specific role instructions: Cursor implements; Antigravity reviews independently. Neither gets to silently redefine the product.

### One change cycle

1. Founder selects one task and acceptance criteria.
2. Cursor implements and tests a scoped change.
3. Cursor commits and hands off base/head revisions, changed contracts, check evidence and gaps.
4. Antigravity reviews a clean checkout of the same head, inspecting source and relevant tests instead of trusting the summary.
5. Findings include severity, file/line, triggering case, expected/actual behavior and evidence. Unsupported suspicions are labeled rather than promoted as facts.
6. Cursor fixes or provides counter-evidence for findings. New code means a new head and an updated review.
7. Merge only after required checks and acceptance criteria are met and serious unresolved findings are addressed. The founder owns the merge decision.

A review result is `PASS`, `CHANGES_REQUIRED` or `INCOMPLETE`, and always names the exact reviewed revision. If required checks could not run, record why; do not turn an incomplete review into a pass. Tool instructions express a role; repository permissions and required CI checks are separate enforcement mechanisms.

### Check policy

Run from the inner `kibitz/` directory:

```sh
npm run typecheck
npm run lint
npm test
```

Use targeted tests while changing a domain, then the required suite for the handoff. Run `npm run export:mobile` for navigation/native/configuration changes; use actual device evidence for native acceptance. No default browser preview. Default tests mock paid AI.

### Handoff fields

```text
Task / acceptance IDs:
Base revision:
Head revision:
Changed behavior and contracts:
Migration and compatibility impact:
Checks actually run and results:
Required checks not run and why:
Device/model evidence, if applicable:
Known limits:
```

### Review fields

```text
Reviewed head:
Outcome: PASS | CHANGES_REQUIRED | INCOMPLETE
Evidence checked:
Findings: severity, file/line, scenario, impact, evidence
Acceptance criteria still unmet:
Remaining verification:
```

Keep the first implementation/review exchanges human-mediated. Automating CLI dispatch and CI is a separate task after this protocol proves useful; no cross-app messaging or cloud agent run is implied here.

## 5. Requirement-to-verification map

| Acceptance | Primary tasks | Evidence |
| --- | --- | --- |
| AC01 required per-entry choice | T01, T05 | Input/form validation and a native submission |
| AC02 only selected lens blocks first result | T02, T04 | Phase-specific transport test and timing trace |
| AC03 scoreless actionable primary | T01, T02, T05 | Contract checks, content review and device result |
| AC04 save-only retry | T03, T04 | Failed storage + provider-call-count test |
| AC05 one secondary batch | T04 | Repeated-tap/route lifecycle test |
| AC06 cached switching | T04, T05 | Zero extra transport calls and native interaction |
| AC07 accurate early-switch loading | T05, T09 | Slow fake transport and device check |
| AC08 secondary failure preserves primary | T03, T04, T06 | Saved partial record + explicit retry test |
| AC09 interruption and restart | T03, T04, T07, T09 | Repository/coordinator checks plus process restart |
| AC10 no resurrection after delete | T03, T04 | Delete/clear race with late completion |
| AC11 collapsed comparison | T06, T08 | Incomplete/ready states and grounded comparison review |
| AC12 original first lens on reopen | T03, T05 | Persistent entry metadata and navigation test |
| AC13 legacy preservation | T03, T05 | Lossless migration fixture and honest fallback |
| AC14 honest demo | T06 | Provenance and free-writing generic-response tests |
| AC15 bounded errors, no fake success | T02, T04 | Refusal/invalid/timeout/offline tests |

Content review checks grounding, framework fidelity, meaningful contrast, uncertainty, tone and a feasible action. Passing JSON validation is necessary but does not establish these qualities.

## 6. Stop conditions and follow-up design boundaries

- A primary-only result is a valid partial reflection; do not block its usefulness on all four perspectives.
- A successful first take is not proof the comparison is ready.
- A failed paid request is not proof no charge occurred.
- Deleting a reflection revokes the local target for any late completion.
- A familiar philosopher name or a viewed card is not evidence of the user's philosophical identity.
- A personal MVP does not need a public account, growth, payment or notification platform.
- A design artifact is not an implemented feature or verified model behavior.

The personal MVP is coherent when the founder can reliably write, hear the chosen take, compare other lenses, act on a useful suggestion and revisit/delete the episode on their device, with honest failure and completion states.
