# Kibitz roadmap

Updated 2026-10-19. Order is intentional: finish and verify the core loop before expanding features. No calendar or release date is committed.

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

- [ ] Configure a server-only key and make actual English evaluations from a device/client.
- [ ] Review everyday disagreement, white lies, work/study decisions, self-directed choices and ambiguous accounts.
- [ ] Review non-English input and embedded instructions requesting another language/schema.
- [ ] Verify supportive handling of victimization, self-harm and violence-related material.
- [ ] Measure end-to-end latency, completion rate and cost per reflection; choose acceptable beta targets from evidence.

Acceptance: four distinct frameworks exactly once, English output, grounded reasoning, no invented facts or quotations, appropriate null scores, useful synthesis, and honest visible errors. Record examples and results without exposing personal journal data.

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
- [ ] Design draft persistence so an interrupted writing session is recoverable.
- [ ] Add a recoverable path for corrupt/unsupported data without silently erasing records.
- [ ] Write the privacy policy and align disclosures with actual service/provider behavior.

Acceptance: users understand storage, AI transmission, retention, recovery and deletion; migrations and failures have meaningful coverage.

### 6. Evaluate whether the product is useful

- [ ] Observe whether people complete reflections and choose a resonating perspective.
- [ ] Gather feedback on framework accuracy, tone and whether scores help or distract.
- [ ] Revisit the average score and philosophy-map language using feedback.

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
