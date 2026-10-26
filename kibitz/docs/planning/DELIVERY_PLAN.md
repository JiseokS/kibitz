# Kibitz personal MVP — delivery and review plan

Updated 2026-10-22. **Status: owner-requested sequencing correction; target implementation is not completed.**

Read [the design](DESIGN_REVIEW.md) and [decision workbook](DECISIONS_WORKBOOK.md). D01–D09 retain the founder's intent. The first slice implements D03/D06/D07 with one complete evaluation call. D08 progressive generation is deferred behind evidence, not required to build the selected-first screen. No paid application experiment is authorized by this document update.

## 1. Milestones and gates

| Milestone | Deliverable | Gate |
| --- | --- | --- |
| M0 — scope | First-slice scope and unresolved choices | T00 identifies the decisions needed next without reopening confirmed choices |
| M0.5 — baseline content | Roughly ten fictional cases through the existing AI path | T00.5 has a configured server-only key, explicit owner budget and a go/revise/stop report before T01 |
| M1 — scoreless complete contract and compatibility | One-call output, original first-choice metadata and safe legacy reader | T01/T03 pass contract, preservation and failure checks; no partial-state infrastructure required |
| M2 — chosen-first personal loop | One request, one focused card, cached alternatives, collapsed comparison and explicit resonance | T04–T07 satisfy applicable B criteria; save failure leaves results readable; no vote loss |
| M3 — actual-device and target-quality acceptance | Native core loop and relevant real-output cases after prompt changes | T09 records the actual device/build and fresh target evidence within an authorized budget |
| M4 — personal trial | Five ordinary reflections over roughly a week | T10 yields a specific usefulness/waiting decision; this is exploratory feedback |
| Optional D08 extension | Progressive experiment, then phase implementation if warranted | T08 requires measured need and a go decision before T02-G, T03-G and T04-G |

No public beta, accounts, store submission, cloud journal, payment or notification milestone belongs to this personal-MVP slice. Do not expand the review harness alongside product work; assess its usefulness on real application changes using the existing workflow.

## 2. Domain-to-code map

Paths are repository-relative; the runnable app remains in the inner `kibitz/` directory.

| Domain | Existing locations | First-slice change |
| --- | --- | --- |
| Entry and selection | `kibitz/src/app/(tabs)/index.tsx`, model/metadata | Per-entry first philosopher and immutable submitted snapshot |
| Complete response | `kibitz/src/domain/model.ts`, server prompt/adapter, client | Four scoreless perspectives with per-lens action plus synthesis in one call |
| Client lifecycle | `kibitz/src/services/evaluate.ts`, existing state/screens | One request, readable transient result, save-only retry, cancel/supersede guards |
| Journal | `kibitz/src/data/repository.ts`, storage schema | Complete new-format/legacy compatibility, original first choice, explicit resonance |
| Result and comparison | `kibitz/src/app/entry/[id].tsx`, UI components | Chosen card, ready alternatives, collapsed synthesis, explicit vote and save status |
| Draft | Entry/state and local draft storage | Recover text/category/selection before personal trial; separate from saved reflections |
| History / map | History/profile routes and resonance modules | Preserve records, votes, search/deletion and existing map until D10 is resolved |
| Deferred D08 | Provider phases, partial repository and coordinator | Only after T08; not a prerequisite for the rows above |

## 3. Scoped task cards

Preserve task IDs for traceability. `-G` variants are explicitly gated extensions, not active dependencies of the first slice. A card is planned work until source and evidence exist.

### T00 — confirm only the choices needed next

**Owner:** founder with Codex. **Depends on:** this accepted sequencing revision.

- Keep the confirmed scoreless and chosen-first direction; separate visual ordering from generation ordering.
- D10 remains open: decide map-tab visibility before T05. Until then retain the current tab, explicit resonance control and all votes. Hiding the tab does not imply removing voting.
- D11 names the actual physical device before T09; it does not block the baseline client/server quality spike. A simulator runtime is not installed-device evidence.
- Resolve D12 before the revised form: the existing single field can be used for T00.5 without approving a new form contract.
- Configure the server-only key locally and obtain an explicit owner-set request/token/cost bound before any paid app experiment. Do not paste keys into chat or treat a review budget as an application budget.

**Done when:** the next card has clear prerequisites and unresolved choices are recorded at the task they actually block.

### T00.5 — baseline content-quality and timing spike, before implementation

**Owner:** founder judges usefulness; Codex assists execution. **Depends on:** configured key and explicit experiment budget, not M1/M2.

- Use the existing scored flow on roughly ten fictional cases; no architecture change, genuine journal data or committed keys. Cover the case categories in design section 12.
- Review grounding, criteria, justified agreement/contrast, tone and action separately from schema validity. Record revision/model/prompt, timing, failures, available usage and budget; unknown cost stays unknown.
- Stop/revise for generic, caricatured, unsafe or unhelpful output; repeat only within budget. This initial failure check is not a reliability benchmark or a reason to build phase infrastructure.

**Done when:** a dated go/revise/stop report supports the next product decision. This scored-baseline report does not validate later scoreless prompts or D08. Normal tests keep using provider doubles.

### T01 — one-call scoreless contract and provider path

**Owner:** Codex. **Depends on:** T00.5 go decision and needed T00 choices.

- Define one complete response: exactly Kant, Mill, Aristotle and Nietzsche, each with verdict, reasoning, question and next step, plus synthesis. No new scores, averages or approval meters.
- Update shared schemas, trusted provider prompt/adapter, client parsing and fixtures together; preserve authentication, limits, redaction, refusal/error handling and one-call behavior.
- Define original first-philosopher entry metadata separately from the currently viewed lens and explicit resonance.
- This is the rule-promotion boundary: update `AGENTS.md`/`PRODUCT.md` active new-output rules and implementation status in the same change. Keep scored rules only for legacy compatibility; planning text alone must not be reported as implemented.
- Discover distributed clients before an API break; coordinate local-prototype changes or version a deployed contract deliberately.
- Deliver T01/T03 as a linked compatibility slice, or keep the new output path inactive until T03 is ready. Do not activate writes that the current repository cannot read.

**Verify:** complete distinct IDs, malformed/refusal/incomplete responses, no score-bearing new output, per-lens action and unchanged transport protections. No paid key is needed for automated checks.

### T03 — complete-entry compatibility and original choice

**Owner:** Codex. **Depends on:** T01 contract.

- Choose and test a versioned reader/migration before persisting the new complete scoreless format, original first choice and per-lens next steps. Strict version 2 records cannot simply accept arbitrary added/removed fields.
- Preserve old input, evaluation payloads, IDs, timestamps, provenance, scores as legacy data and explicit votes; hide old numbers in the target UI.
- Do not infer an original first choice from card order or a vote. Use an honestly labeled fallback; do not invent missing historical per-lens advice (the old shared action remains available).
- Keep serialized writes, failed-write recovery, corrupt/unsupported-data protection, deletion and explicit vote updates.
- Do not add partial-entry states or completion merges for this slice. That later work is T03-G.

**Verify:** old/new round trips, migration failures/retries, intentional empty journal, original choice versus resonance, failed save, vote change/clear and deletion. Single-call delivery reduces this task; it does not remove compatibility work.

### T04 — minimal one-request lifecycle and save presentation

**Owner:** Codex. **Depends on:** T01 and T03.

- Snapshot text/category/first choice, block duplicate submit, and issue one complete evaluation request. Reuse the validated result for switching and save retry.
- Display a validated complete result immediately in transient view state with saving/unsaved status; do not require reading an already-saved Journal record to render it.
- Attempt autosave separately. Publish saved status and the repository snapshot only after successful persistence. On failure retain readable session content and a save-only retry with zero AI calls; memory may be lost on process termination.
- A deliberate new reflection cancels/supersedes old work under a new identity. Require explicit save/discard before replacing a usable unsaved result; prevent late work from changing the new draft/result or recreating deleted data.
- Handle cancellation, route changes and restart without uncontrolled paid retries. Keep this in existing modules; a primary/remaining background coordinator is not required.

**Verify:** one provider call, failed storage with readable result and save-only retry, double submit, cancel/new input, stale response, route/restart and delete/clear races.

### T05 — chosen-first result and explicit resonance

**Owner:** Codex. **Depends on:** T01/T03/T04; D10/D12 resolved or explicitly retain existing behavior.

- Add required first-philosopher choice per entry and a contextual submit label.
- Show one scoreless card with a per-lens action; place the selector below it. All four perspectives are ready after the one response validates; do not fake progressive states.
- Remove scores/bars/averages from new presentation, including legacy presentation without deleting historical data.
- Preserve **Which perspective stayed with you?** as a separate optional select/change/clear action. First choice and browsing do not vote. D10 can change tab visibility only; dropping capture needs a separate explicit decision and revised AC16.
- Reopen new-format entries with the original first choice. Keep unsaved results visibly distinct from saved Journal records.

**Verify:** correct name/content, cached switching with zero AI calls, original choice on reopen, explicit vote persistence/exclusions/map updates, long English and increased font sizes.

### T06 — comparison and demo consistency

**Owner:** Codex. **Depends on:** T04/T05.

- Add collapsed tension, grounded criteria differences, uncertainty and combined action from the already-complete result.
- Adapt prepared demo results to the scoreless switcher; arbitrary offline writing stays generic and labeled. No fabricated analysis or simulated latency claim.
- Preserve AI/demo provenance and explicit resonance semantics. Baseline comparison is ready with the complete result; G-only incomplete states are deferred.

**Verify:** collapsed/expanded content, no forced disagreement or scores, demo exclusion and zero extra provider calls.

### T07 — minimal draft recovery before personal trial

**Owner:** Codex. **Depends on:** D12 and T05.

- Persist current text/category/first choice separately from saved reflections. This minimum recovery is part of the personal MVP, not the later encryption/export project.
- Clear only the matching draft after successful complete-entry save, or on deliberate discard. Failed save retains the draft; an older response cannot erase a newer draft.
- Record storage-error and restart behavior without promising unsaved generated results are durable.

**Verify:** restart, failed save, explicit discard, edit/cancel/resubmit and stale-response protection.

### T09 — actual-device and revised-content acceptance

**Owner:** founder, assisted by Codex. **Depends on:** D11 and working M2.

- Test write → one evaluation → chosen card → switch → comparison → explicit vote → reopen/search/delete on the named physical device/build.
- Check keyboard, safe areas, back navigation, long/increased-size text, slow/disconnected networks, readable unsaved results, retry and process restart.
- Repeat relevant T00.5 fictional cases after target prompts/contracts change under an explicit budget; record new quality/timing evidence rather than relabeling the old scored sample.
- Record the other platform as unverified when appropriate. Simulator availability, browser screenshots and bundle export are not installed-device acceptance.

**Done when:** platform/device/build, target content evidence and failure results are recorded. No signed build, deployment or OS-license action is automatic.

### T10 — personal-use review

**Owner:** founder. **Depends on:** T09; T08 is not required.

- Try roughly five ordinary low-sensitivity reflections over a week; privately record specificity, meaningful criteria, useful action and waiting/switching friction.
- Decide whether the core loop is useful, content needs work or waiting merits a progressive experiment. Preserve later chat/affinity as separate designs.

**Done when:** there is a concrete next decision. This small personal trial is not market or statistical validation.

### T08 — optional matched progressive experiment and activation gate

**Owner:** founder with Codex assistance. **Depends on:** promising T00.5, working one-call M2, measured/reported waiting friction from native use, and an explicit experiment budget.

- Compare matched content requirements, model/configuration and fictional inputs using a bounded isolated one-call versus primary/remaining experiment; full phase/storage/coordinator implementation is not a prerequisite for this experiment.
- Compare first-visible/all-ready time, unavailable-lens wait, total calls/usage and content fidelity, grounding, useful contrast and action. Primary-context anchoring is a possible quality tradeoff, not a proven regression.
- Decide acceptable tradeoffs from evidence and the owner budget. No guaranteed improvement or automatic promotion from a tiny sample.

**Done when:** the owner records go/revise/stop. Inconclusive or unnecessary optimization leaves the one-call design in place. Only go activates these cards:

### T02-G — deferred provider phases and HTTP boundaries

**Owner:** Codex. **Depends on:** T08 go and a reviewed phase contract.

- Define one requested primary and exactly the other three plus synthesis, validated primary context, operation identities, bounded deduplication/cache, payload conflicts and expiry/restart behavior.
- Preserve current transport protections. Decide actual phase-aware attempt/token/concurrency budgets before coding; the current default is 100 attempts/day and four active evaluations. Two attempts per successful reflection can consume roughly twice the daily allowance; sequential phases do not automatically halve concurrent-reflection capacity.
- No exactly-once billing claim. Provider errors/cancellation may still incur charges.

**Verify:** phase sets, malformed/refusal/error responses, duplicate/conflicting IDs, cache expiry/restart and budget accounting with mocks.

### T03-G — deferred partial-entry storage

**Owner:** Codex. **Depends on:** T08 go, T02-G contracts and T03.

- Add a tested versioned partial-result reader and guarded completion merge without losing complete/legacy records or votes.
- Late completion updates only the same extant entry/generation; deletion and clear-all revoke that target. Restarted in-flight status becomes interrupted, not proof a server job lives.

**Verify:** partial/full/legacy preservation, failed writes, interrupted recovery and deletion/completion races.

### T04-G — deferred progressive coordinator and presentation extension

**Owner:** Codex. **Depends on:** T02-G/T03-G and T08 go.

- Show validated primary immediately as saving; save it before the additional paid remaining request. On save failure keep it readable and explicitly pause remaining work until save-only retry succeeds. Continuing unsaved is outside this proposal.
- Run one remaining batch with in-flight/cached reuse. Add honest per-lens readiness, incomplete comparison and explicit retry; cancellation/inactivity does not imply no charge.
- Keep saved primary on secondary failure. Cancel/supersede when a new reflection starts and prevent stale results/draft clearing/resurrection. Do not promise execution while closed.

**Verify:** applicable G criteria, especially storage failure versus first display, duplicate taps, inactivity/restart, supersession and deletion. Re-review content and native behavior after the extension changes them.

## 4. Codex / Antigravity harness

The normal Opus/Sonnet preference below has an owner-approved quota exception dated 2026-10-26. Gemini 3.8 Flash (High) is the active default after an explicit Opus individual-quota failure. Codex records evidence and prepares a fresh policy/run; no runner auto-failover or general error-based model switch is implemented. Preserve the original INCOMPLETE result and stop if Gemini also fails.

The local review adapter, task/result contracts, tests and coordinator rules are implemented as of 2026-10-21. See [the executable harness guide](../../../harness/README.md). CLI installation/authentication and live evidence are environment checks; CI enforcement and a standalone implementation daemon remain separate work.

The reviewer policy uses the owner-requested conservative routing: Opus 4.6 Thinking for medium/high or uncertain complexity, runtime/configuration work and integration; Sonnet 4.6 Thinking only for explicitly low-risk small documentation-only routine changes. Codex records complexity, scope and reasoning; the harness can raise the choice using diff/context guards and freezes/validates the selected model and evidence. Quota failures never automatically lower the model; the explicit Gemini exception above requires a fresh policy and run. Historical fixed-model results keep their actual attribution. The owner may keep commit/push manual: use an independent temporary candidate and changed-file hashes for a pre-commit review, then prepare again after the owner's commit if an exact final-HEAD verdict is required.

Routine reviews cover the latest increment plus affected dependencies and tests. At feature completion, review the full feature-start-to-head range with integration/failure evidence. Select checks by impact and keep earlier results attributed to their actual revision; a documentation follow-up does not automatically rerun the unchanged app suite. The coordinator uses the existing base/context controls; see [scope and check selection](../../../harness/README.md#review-scope-and-check-selection).

### Shared context

- Common `AGENTS.md` and accepted product/architecture rules.
- This review package while target behavior is being decided.
- A task brief containing the selected card, acceptance IDs, non-goals and required checks.
- Tool-specific role instructions: Codex implements; Antigravity reviews independently. Neither gets to silently redefine the product.

### One change cycle

1. Founder selects one task and acceptance criteria.
2. Codex implements and tests a scoped change.
3. Codex commits and hands off base/head revisions, changed contracts, check evidence and gaps.
4. Antigravity reviews a clean checkout of the same head, inspecting source and relevant tests instead of trusting the summary.
5. Findings include severity, file/line, triggering case, expected/actual behavior and evidence. Unsupported suspicions are labeled rather than promoted as facts.
6. Codex fixes or provides counter-evidence for findings. New code means a new head and an updated review.
7. Merge only after required checks and acceptance criteria are met and serious unresolved findings are addressed. The founder owns the merge decision.

A review result is `PASS`, `CHANGES_REQUIRED` or `INCOMPLETE`, and always names the exact reviewed revision. If required checks could not run, record why; do not turn an incomplete review into a pass. Tool instructions express a role; repository permissions and required CI checks are separate enforcement mechanisms.

### Check policy

For runtime changes, select meaningful checks from the inner `kibitz/` directory:

```sh
npm run typecheck
npm run lint
npm test
```

Use targeted tests while changing a domain, then the required suite for the handoff. Run `npm run export:mobile` for navigation/native/configuration changes; use actual device evidence for native acceptance. No default browser preview. Default tests mock paid AI.

For this documentation-only correction, check local links, task dependencies, rule scope and AC mappings; capture scoped typecheck/lint without relabeling prior app/harness suites as rerun. This documentation range leaves the separately reviewed Gemini compatibility baseline and active reviewer configuration unchanged. A reviewer PASS establishes evidence for the scoped change, not content usefulness or native behavior.

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

The current Codex chat invokes the local runner, reads the validated result and handles supported fixes. This is a local CLI handoff, not an always-on daemon. The owner retains scope and merge decisions. Required CI checks and unattended implementation are separate extensions.

## 5. Requirement-to-verification map

AC IDs refer to [design section 11](DESIGN_REVIEW.md#11-screen-and-failure-acceptance-criteria). B is the first complete one-call slice; G applies only after T08 go. Deferred criteria do not block B or imply G is implemented.

| Acceptance | Primary tasks | Evidence |
| --- | --- | --- |
| AC01 required per-entry choice | T01, T05 | Input/form validation and native submission |
| AC02 complete-response/first-display boundary | T01, T04; G: T02-G, T04-G | One-call count and display before save resolves; later phase timing |
| AC03 scoreless actionable take | T01, T05, T09 | Contract checks, fresh content review and device result |
| AC04 readable unsaved result, save-only retry | T03, T04; G: T04-G | Failed storage, visible result/status and zero extra AI calls |
| AC05 bounded generation | T04; G: T04-G | One complete call; later one secondary batch paused on failed primary save |
| AC06 cached switching | T04, T05 | Zero extra transport calls; browsing does not vote |
| AC07 correct readiness/attribution | T05, T09; G: T04-G | No false partial-ready claim; later slow-transport lens loading |
| AC08 secondary failure (G only) | T03-G, T04-G | Preserved primary, incomplete comparison and explicit retry |
| AC09 restart and durability limits | T03, T04, T07, T09; G: T03-G, T04-G | Saved records/draft recover; unsaved memory limits; no paid auto-retry |
| AC10 no resurrection after delete | T03, T04; G: T03-G, T04-G | Delete/clear races and late-response guards |
| AC11 collapsed comparison | T06, T09 | Complete grounded comparison without numerical ranking |
| AC12 original first lens on reopen | T03, T05 | Choice persisted separately from browsing/voting |
| AC13 legacy preservation | T03, T05 | Old payloads/votes preserved; honest metadata/action fallback |
| AC14 honest demo | T06 | Provenance, prepared/generic behavior and demo vote exclusion |
| AC15 bounded errors, no fake success | T01, T04 | Refusal/invalid/timeout/offline tests |
| AC16 explicit resonance preserved | T03, T05, T06 | Select/change/clear/relaunch; one eligible vote; five-choice unlock; edit/delete/exclusions |
| AC17 new input supersedes old work | T04, T07; G: T04-G | Cancel/new input, unsaved save/discard and late response versus new draft/result |
| AC18 baseline quality before implementation | T00.5 | Dated bounded real-output go/revise/stop report |
| AC19 progressive activation | T08 | Matched quality/timing/usage evidence and owner decision before G work |

Content review checks grounding, framework fidelity, meaningful criteria, uncertainty, tone and a feasible action; schema validity does not establish these qualities.

## 6. Stop conditions and follow-up boundaries

- No promising T00.5 evidence means revise content or stop before revised architecture/UI work.
- The first slice returns all four perspectives and synthesis in one response; first-card emphasis is presentation, not measured generation acceleration.
- A readable unsaved result is not a committed journal record or restart guarantee.
- For G, display precedes save; successful save precedes the additional paid request. Save failure pauses that request visibly.
- A failed/canceled paid request is not proof no charge occurred.
- A deliberate new reflection or deletion revokes old work's authority over the active draft/result or journal target.
- First choice and viewed cards never become resonance votes or inferred philosophical identity.
- Preserve existing data and vote capture while D10 is open. Resolve device/input choices only when they block the relevant task.
- A design artifact, test double, bundle export and installed/live evidence are different states. Keep the ledger current at T01/T03/T05 and after actual verification.

The personal MVP is ready for trial when the founder can write, hear the chosen take, compare ready lenses, explicitly resonate, use a concrete suggestion and revisit/delete a saved reflection on their device, with honest errors and recovery limits.
