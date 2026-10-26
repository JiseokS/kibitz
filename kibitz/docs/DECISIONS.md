# Kibitz decision log

Accepted decisions and dated transitions, updated 2026-10-22. Keep baseline implementation, accepted target and verified evidence distinct; update rules, code status and roadmap together.

## D001 — Kibitz, English-first, mobile-first

The user selected Kibitz/Kibitzing as the naming direction and requested English as the product baseline. **Kibitz** is the single chosen name because it is shorter for app navigation and branding. App/package/folder identifiers use `kibitz`; native identifiers are provisional `com.kibitz.reflection`.

Ship iOS/Android behavior first. Retain web tooling only as an explicit debugging option; do not open it automatically. Keep conversation with the user in Korean when appropriate. All new product/developer documentation and product-authored text are English. Preserve the language of previously stored journal content.

## D002 — Expo, Router and a small separate API

Use Expo/React Native with TypeScript and file-based Router navigation. Keep shared schemas/domain rules outside screens. A small Node HTTP service owns the OpenAI key and provider call. This supports both mobile platforms while avoiding a premature account/backend system.

Tradeoff: real public authentication, durable budgets and deployment operations remain release work. Do not put the provider key into the app to bypass that work.

## D003 — One evaluation, four frameworks

One structured request returns all four judgments and a synthesis. Use Kant, Mill, Aristotle and Nietzsche. Modern framework interpretations, uncertainty and real contrasts matter more than theatrical impersonation.

This remains the implemented architecture and the first revised slice. The scoreless format transition is D008; D08 progressive generation from the design workbook is gated by D009 below, not silently adopted as a prerequisite.

Tradeoff: this is not four independently verified agents debating. Do not claim independence, historical authenticity or calibrated scores. Live quality evaluation is required before beta.

## D004 — Honest offline demo

Make a useful local experience available without credentials. Exact authored examples have prepared judgments; arbitrary writing receives general questions without invented analysis or scores. Label and store demo provenance. An AI failure remains an error.

Tradeoff: freeform offline input cannot produce contextual AI critique. The explicit limitation is preferable to an experience that implies analysis it did not perform.

## D005 — User-expressed alignment

Use the user's chosen perspective per AI entry to create the philosophy map. Unlock at five distinct selections; exclude demos and unselected entries; use largest-remainder rounding.

Tradeoff: this measures expressed resonance, not inferred personality or behavioral allegiance. Trend inference requires more data, design and validation and is deferred.

## D006 — Versioned local journal and safe rename

Use AsyncStorage for the local MVP. The rename moves accessible journals to `@kibitz/journal/v2` and stable category IDs. Validate and commit the new copy before removing the old one. Retain original journal/evaluation text; do not run AI translation on old records.

Tradeoff: there is no app-level encryption/sync/recovery. App identifier changes do not transfer another native sandbox. Resolve final release identity before distributing persistent real-user builds.

## D007 — One clear instruction hierarchy

The workspace `AGENTS.md` defines durable Codex/product/workflow rules; `kibitz/AGENTS.md` adds implementation conventions. README is the human entry point; product, architecture, roadmap and validation documents hold their own facts. Avoid an unrecognized or conflicting `codexrule` file.

Update status when evidence changes. Implemented, mocked, exported, installed, live-tested and released are different states.

## D008 — Accepted scoreless chosen-first target, 2026-10-22 sequencing

Keep D03/D06/D07: scoreless critique, per-entry first choice, alternatives below. First use one complete call with per-lens actions; store original choice separately from viewing/resonance.

T01 promotes new-format rules with provider/client/schema/tests; T03 establishes versioned compatibility before writes. Preserve old payloads, IDs, timestamps and votes without inventing missing original choice/actions. This documentation change implements none of that runtime work.

## D009 — Quality before architecture; progressive generation gated

T00.5 precedes revised implementation: existing AI path, roughly ten fictional cases, configured server-only key, explicit owner budget and go/revise/stop report. Repeat relevant cases after prompt changes.

Retain D08 intent, but defer phases/cache/partial storage/coordinator until waiting evidence motivates T08 and matched quality/timing/usage evidence supports owner go. An inconclusive result retains one call.

## D010 — Preserve explicit resonance independently of map visibility

D10 remains open; preserve the current tab, vote control and data. Hiding the tab alone cannot remove voting. First choice/browsing never vote. AC16 preserves select/change/clear, persistence, eligibility, five-choice threshold and edit/delete updates. Removing capture requires a separate decision. Inferred affinity stays later.

## D011 — Target display, persistence and stale-work boundaries

Show validated transient output while saving/unsaved; a successful write alone commits a journal record. Save retry calls no AI; memory is not process-durable. Keep the matching draft until save or deliberate discard.

Block duplicate submit; deliberate replacement cancels/supersedes old work under a new identity after explicit save/discard of usable unsaved output. Late work cannot replace new drafts/results or resurrect deleted records (AC17).

For later D08, show primary before saving, but start the extra paid call only after save succeeds; failure visibly pauses it. This is deferred policy, not existing behavior.
