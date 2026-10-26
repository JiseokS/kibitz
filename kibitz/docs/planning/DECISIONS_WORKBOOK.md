# Kibitz decision workbook

Updated 2026-10-22. Companion: [design review](DESIGN_REVIEW.md) · [delivery plan](DELIVERY_PLAN.md).

**How to edit:** keep confirmed choices, change the selection if you disagree, and write short founder notes. You can answer in Korean; authored product/developer documentation and app output remain English. The first nine decisions reflect direct answers in chat, not inferred approval.

**Accepted revision, 2026-10-22:** T00.5 tests existing output first; D03/D06/D07 use one complete call next; D08 remains gated on T08 evidence. D10–D12 and paid-call budgets remain unresolved; technical proposals are not blanket approved.

## Confirmed decisions

| ID | Decision | Selection | Alternative not selected / later |
| --- | --- | --- | --- |
| D01 | Product voice | Friendly but pointed kibitzing | Calm journaling voice; theatrical council debate |
| D02 | Next milestone | Founder-usable personal MVP | Invited beta and public stores are later |
| D03 | Judgment format | Written takes and practical next steps, no scores | Numeric scores, averages and approval meters |
| D04 | Conversation depth | One evaluation for the first MVP | Later: freely continue a conversation with a philosopher |
| D05 | Record storage | Automatically save on this device; allow deletion | Ask to save each result; ephemeral-only sessions |
| D06 | Result layout | Chosen philosopher first, alternatives selected below | Four detailed cards presented all at once |
| D07 | Primary selection | Choose a philosopher for each entry | Global default or an onboarding-only choice |
| D08 | Intended later generation order | Retained: first chosen philosopher, then others while reading; gated on T08 | First implementation uses one complete call to validate D06/D07 before phase infrastructure |
| D09 | Secondary summary | Collapsed comparison and combined action below | Later: reasoning-affinity explanation alongside it |

D08 remains a chosen direction and an unmeasured performance/quality hypothesis. Its first implementation was deferred by the owner's sequencing correction. It does not guarantee lower first-visible/total latency, better contrast or lower cost; an inconclusive experiment keeps the complete one-call slice.

### D01 — voice examples to approve

Situation: someone was publicly criticized after borrowing without permission.

| Voice option | Example | Choice |
| --- | --- | --- |
| A. Friendly, pointed | "Your boundary had a point. The public audience is worth questioning." | Selected direction |
| B. Calm reflection | "Consider whether a private conversation could have protected the same boundary." | Available if tone needs softening |
| C. Roast-like | "You turned a borrowed item into a courtroom drama." | Not the baseline; risks making wit more important than context |

Founder wording preference:

### D03 — what removing scores means

- Remove scores from newly generated philosophy takes.
- Remove the overall average, bars, ranks and numerical moral labels from the proposed UI.
- Preserve existing stored content as legacy data; hiding a score is not permission to erase a journal.
- Future reasoning affinity must have its own evidence and consent design. A percentage of resonance choices is not the requested inference.

Founder notes:

### D06–D09 — the chosen interaction

1. Write an episode and choose who weighs in first.
2. Read that one philosopher's take and next action.
3. First slice: one response provides all four lenses; only the selected card is initially expanded. All alternatives are already ready.
4. Tap another name below with no model call. Later D08 may introduce honest per-lens loading after its gate.
5. Expand the ready comparison; optionally record an explicit resonance choice independently of first choice and browsing.
6. Later, show explainable reasoning affinity; do not fabricate it in the MVP.

Founder notes / sketch changes:

## Remaining choices — edit when convenient

These are proposals, not automatically approved behavior. Only resolve those that block the next task.

### D10 — existing philosophy-map tab during the personal MVP

| Option | Effect | Tradeoff |
| --- | --- | --- |
| A. De-emphasize/hide the tab until real reasoning affinity is designed | Reflect and Journal lead the first MVP | Simplest product; existing map code can be preserved rather than deleted |
| B. Keep it, clearly named "Perspectives I resonated with" | Retains explicit preference feedback | It must not claim similarity of the user's thinking |
| C. Build reasoning affinity now | Directly addresses the later vision | More input/consent/evaluation design; conflicts with the chosen "later" scope |

**Proposal: A**, with the inference feature in the later roadmap. **Selected:** OPEN.

Until decided, keep the current tab, vote control and data. Hiding the tab alone cannot remove voting. AC16 preserves capture, eligibility, five-choice unlocking and edit/delete updates; removal needs a separate explicit decision.

Founder notes:

### D11 — primary device for the first acceptance pass

| Option | Effect | Tradeoff |
| --- | --- | --- |
| A. iOS device first | Validate on the founder's iPhone | Requires the relevant signing/device setup |
| B. Android device first | Validate on the founder's Android phone | Requires device/debugging or an internal package |
| C. Both together | Parallel acceptance on two platforms | More setup before learning whether the experience helps |

**Proposal:** use the phone you actually use; do not assume which one that is. iOS and Android remain the product targets. **Selected:** OPEN.

Resolve before T09 physical-device acceptance, not before the existing client/server T00.5 spike. Installed simulator runtimes do not establish installed-phone behavior.

Founder device / OS / notes:

### D12 — how much reasoning to collect in the entry

| Option | Effect | Tradeoff |
| --- | --- | --- |
| A. One text field; prompt for what happened and why | Fastest, closest to the current form | Later affinity may have insufficient evidence for some entries |
| B. Event text plus optional "Why I did it" | Better explicit reasoning evidence | Slightly more form structure and API/storage work |
| C. Required event, intention and self-judgment fields | Richest structured input | More friction before the first useful reflection |

**Proposal: A for the first slice**, evaluate whether B helps after personal use. Never infer unprovided motives as facts. **Selected:** OPEN.

The existing one-field input can be used for T00.5 without closing this choice. Resolve the target before the revised form is implemented; do not silently add required reasoning fields.

Founder notes:

## Implementation proposals that are not product approvals

| Topic | Proposed starting point | Review before implementation |
| --- | --- | --- |
| First-slice generation | One complete scoreless response, chosen card displayed first | Baseline T00.5 evidence, target contracts and fresh output review after changes |
| Later background meaning (D08) | Asynchronous work while active; deliberate resume | T08 go, phone lifecycle, quality/cost tradeoffs |
| Later remaining viewpoints (D08) | One batch for the other three plus synthesis | Exact output lengths, primary-context anchoring and failure behavior |
| Primary next step | Each lens gets its own concrete action | Avoid four cosmetically different versions of identical advice |
| New API contract | One complete four-perspective scoreless response first; phase subsets later | Coordinated schema/prompt/client change at T01; distributed-client compatibility |
| Journal evolution | Complete scoreless/first-choice compatibility now; partial format only after T08 | Preserve content, scores as legacy data and explicit votes; do not invent missing metadata |
| Later idempotency (D08) | Operation IDs plus bounded process-local deduplication/cache | T08 go, actual TTL/budgets, restart/expiry and ambiguous paid retries |
| Private personal API | Keep server-only credentials and controlled access | Choose an actual reachable development/server setup later |
| Usage budget | Explicit owner-set request/token/cost bound before T00.5 or any later experiment | Missing cost evidence remains unknown; later phase accounting decided before G implementation |
| Draft recovery | Local text/category/primary-choice persistence | Clear-on-save, failure and process-restart semantics |

Target results remain readable while saving/unsaved; save retry calls no AI and memory is not process-durable. Later D08 shows primary before save, then starts the extra paid batch only after save succeeds; failure visibly pauses it. These are planned policies.

## Review sign-off

- [ ] The core promise and tone match what I want.
- [ ] The chosen-philosopher-first flow matches my intended interaction.
- [ ] Scores and averages are absent from the target experience.
- [ ] Personal MVP and later chat/affinity boundaries are clear.
- [ ] The first implementation slice is small enough to review.
- [ ] I have edited or accepted the open choices needed by that slice.

**Founder edits / changed choices:**

**Approved scope for next implementation task:**

**Review date:**

Leaving these fields blank means the complete technical proposal is still under review. It does not undo the nine choices already confirmed in chat, and it does not authorize paid requests, deployment or a store release.

The dated sequencing revision above and separately requested/implemented review tooling are already authorized within their recorded scope; blank sign-off fields do not revoke those instructions. D10/D11/D12 remain OPEN and no runtime work is marked complete by this revision.
