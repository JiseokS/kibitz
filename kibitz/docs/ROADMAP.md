# Kibitz roadmap

Updated 2026-10-22. Order is intentional: test content before changing generation architecture. No calendar or release date is committed. The [delivery plan](planning/DELIVERY_PLAN.md) distinguishes implemented baseline, accepted next slice and gated D08 work.

## Implemented — local MVP

- [x] Expo/React Native TypeScript project with Router tabs and detail/settings routes.
- [x] English-first Kibitz identity, UI, accessibility labels, errors and prepared examples.
- [x] Action/speech entry and three stable category IDs.
- [x] Four philosophical perspectives and overall synthesis.
- [x] Honest offline demo and a distinct server-backed AI path.
- [x] Structured response validation, duplicate-persona detection, provider failure/refusal handling.
- [x] Journal persistence, search, filters, detail, selection and confirmed deletion.
- [x] Philosophy map based on selected perspectives, with a five-entry threshold.
- [x] Save-only retry, serialized writes, request timeout/cancel and basic server limits.
- [x] Versioned rename/category migration with retry and data-loss protection.
- [x] Mobile app configuration, internal EAS profiles and automated behavior checks.
- [x] Product specification, Codex rules, architecture, decisions and validation records.

This means the code exists and local checks cover the described behavior. It does not imply live AI quality, installed-device verification, signed builds or public release.

## P0 — prove the English mobile core

### 1. Exercise real AI evaluation

**Next task: T00.5, before T01 or revised app architecture.** Use the existing scored one-call path on roughly ten fictional scenarios with a locally configured server-only key and an explicit owner-set request/token/cost bound. No paid application call is authorized by a documentation update. Record a go/revise/stop decision; stop for persistent generic, caricatured, unsafe or unhelpful content rather than building phase infrastructure first.

- [ ] Configure a server-only key and make actual English evaluations from a device/client.
- [ ] Review everyday disagreement, white lies, work/study decisions, self-directed choices and ambiguous accounts.
- [ ] Review non-English input and embedded instructions requesting another language/schema.
- [ ] Verify supportive handling of victimization, self-harm and violence-related material.
- [ ] Measure end-to-end latency, completion rate and cost per reflection; choose acceptable beta targets from evidence.

Acceptance for the existing baseline: four distinct frameworks exactly once, English, grounded criteria, no invented facts/quotations, appropriate null scores, useful action and honest errors. Agreement is allowed; do not reward fabricated disagreement. Record revision/model/prompt configuration, time, failures and available usage evidence without personal journals or keys. This small sample is an initial failure check, not broad validation.

After scoreless T01 changes, repeat relevant cases under a new explicit bound: no new scores/averages, useful per-lens actions, grounded synthesis and supportive handling. The earlier scored sample does not validate the new prompt. Schema/mock checks alone establish neither stage's semantic quality.

### 1a. Deliver the accepted one-call chosen-first slice, after the quality gate

- [ ] T01: promote the scoreless complete-response rules, provider/client/schema/fixtures together; preserve one call for all four lenses and synthesis.
- [ ] T03: implement tested complete-entry/legacy compatibility and original first-choice metadata; preserve old content, scores as legacy data and explicit votes. No partial-result schema yet.
- [ ] T04/T05: choose a philosopher for each entry, show it first, switch among already-ready lenses and display saving/unsaved results with save-only retry.
- [ ] T06: collapsed grounded comparison and honest scoreless demo interaction.
- [ ] Preserve the explicit resonance control while D10 is open; first choice/browsing never vote. Keep eligibility, five-choice unlocking and edit/delete behavior (AC16).
- [ ] Guard duplicate submission, deliberate new input, stale responses and deletion; replacing an unsaved usable result requires save/discard (AC17).
- [ ] T07: minimal local text/category/selection recovery before personal trial; keep drafts separate from saved reflections.

Acceptance: applicable B criteria in the design and their task mapping pass; no phase/cache/coordinator dependency is introduced for the screen layout. D10/D12 are resolved before the relevant UI change or explicitly retain existing behavior; D11 is needed for actual-device acceptance.

### 2. Verify installed iOS and Android behavior

- [ ] Resolve local tooling setup or request an EAS internal build when ready.
- [ ] Run the write → evaluate → select → reopen → search → delete loop on both platforms.
- [ ] Check keyboard, safe areas, back navigation, long English text and increased text sizes.
- [ ] Confirm persistence across a full process restart and device-level storage failure behavior where practical.
- [ ] Verify error, retry and cancellation behavior over a slow/disconnected network.

Acceptance: the core loop works on installed apps; a web screenshot or successful bundle export is insufficient.

### 3. Finish release identity and dependency review

- [ ] Connect the intended EAS project and confirm the owning app identifiers/signing setup.
- [ ] Re-audit framework/tooling advisories and apply compatible fixes as available.
- [ ] Check branded icons/splash/display name on installed builds.
- [ ] Archive prior prototype screenshots as historical; capture current English native evidence when available.

Acceptance: no accidental placeholder identity, documented treatment of unresolved advisories, reproducible platform builds, and current validation evidence.

### 3a. Personal trial, then decide whether D08 is warranted

- [ ] T09: verify the one-call target on the founder's named physical device and repeat changed-prompt content checks within an authorized budget.
- [ ] T10: try roughly five ordinary reflections over a week; note usefulness, distinct criteria and waiting friction.
- [ ] Only if waiting is a material problem, T08 runs a bounded matched one-call/progressive experiment before any G implementation. Compare quality, first-visible/all-ready time and usage; an inconclusive result retains one call.

T02-G/T03-G/T04-G (phase API/cache, partial storage and progressive coordinator) require T08 evidence and an owner go decision. D08 intent is retained; its performance, cost and quality benefits are not established. The initial personal loop/trial does not depend on this optimization.

## P1 — internal beta

### 4. Host a private evaluation service

- [ ] Deploy behind HTTPS with server-only credentials and a selected model.
- [ ] Replace process-memory budgets with persistent usage accounting before scaling.
- [ ] Add operational visibility for status/latency/cost without journal-body logging.
- [ ] Verify connection setup and error messages with beta testers.

Acceptance: no credentials in mobile bundles, predictable cost limits, controlled beta access, and no silent demo fallback.

### 5. Add required data controls for real use

- [ ] Decide encryption and platform key management before inviting sensitive journal use.
- [ ] Add export/backup or explicitly define recoverability limits for the beta.
- [ ] Reassess broader recovery/export needs after the minimum T07 draft recovery in the personal slice; encryption, backup and durable generated-result recovery remain separate designs.
- [ ] Add a recoverable path for corrupt/unsupported data without silently erasing records.
- [ ] Write the privacy policy and align disclosures with actual service/provider behavior.

Acceptance: users understand storage, AI transmission, retention, recovery and deletion; migrations and failures have meaningful coverage.

### 6. Evaluate whether the product is useful

- [ ] Observe whether people complete reflections and choose a resonating perspective.
- [ ] Gather feedback on framework accuracy, tone, grounding and practical usefulness; score removal is already the accepted next-slice decision.
- [ ] Review explicit-resonance map language separately from later inferred reasoning affinity; do not use votes or scores as personality evidence.

Acceptance: evidence that contrasting views and the next step are useful, without implying a validated moral/personality test. Any analytics needs an explicit product/privacy decision first.

## P2 — public release, only after P0/P1

- [ ] User authentication and server-side per-user authorization/budgets.
- [ ] Public onboarding that does not ask users for infrastructure URLs or beta codes.
- [ ] Appropriate data recovery/deletion behavior and support process.
- [ ] Store listings, final legal/app identity, signed release builds and store review.
- [ ] Monitor quality, abuse, reliability and cost after launch.

Acceptance: the internal beta gates are met, privacy statements match behavior, release ownership is configured and both platform releases are verified. No store submission is automatic.

## Deferred — no current commitment

Cloud sync, subscriptions, voice input, reminders/streaks, social sharing, extra philosophers, follow-up chats, richer alignment trends and multilingual UI. Add one only when the core experience and user evidence justify it. Do not implement these alongside routine copy, rename or maintenance work.
