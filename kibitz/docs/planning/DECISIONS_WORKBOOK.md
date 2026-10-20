# Kibitz decision workbook

Updated 2026-10-20. Companion: [design review](DESIGN_REVIEW.md) · [delivery plan](DELIVERY_PLAN.md).

**How to edit:** keep confirmed choices, change the selection if you disagree, and write short founder notes. You can answer in Korean; authored product/developer documentation and app output remain English. The first nine decisions reflect direct answers in chat, not inferred approval.

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
| D08 | Generation order | First chosen philosopher, then prepare others while reading | One blocking all-four request; generate only after each tab tap |
| D09 | Secondary summary | Collapsed comparison and combined action below | Later: reasoning-affinity explanation alongside it |

D08 is a chosen strategy and a performance hypothesis to measure. It does not guarantee lower total latency or provider cost.

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
3. Other philosophers prepare asynchronously while the app is active.
4. Tap another name below to see another lens; loading is explicit if it is not ready.
5. Expand the comparison below when all required perspectives are ready.
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

Founder notes:

### D11 — primary device for the first acceptance pass

| Option | Effect | Tradeoff |
| --- | --- | --- |
| A. iOS device first | Validate on the founder's iPhone | Requires the relevant signing/device setup |
| B. Android device first | Validate on the founder's Android phone | Requires device/debugging or an internal package |
| C. Both together | Parallel acceptance on two platforms | More setup before learning whether the experience helps |

**Proposal:** use the phone you actually use; do not assume which one that is. iOS and Android remain the product targets. **Selected:** OPEN.

Founder device / OS / notes:

### D12 — how much reasoning to collect in the entry

| Option | Effect | Tradeoff |
| --- | --- | --- |
| A. One text field; prompt for what happened and why | Fastest, closest to the current form | Later affinity may have insufficient evidence for some entries |
| B. Event text plus optional "Why I did it" | Better explicit reasoning evidence | Slightly more form structure and API/storage work |
| C. Required event, intention and self-judgment fields | Richest structured input | More friction before the first useful reflection |

**Proposal: A for the first slice**, evaluate whether B helps after personal use. Never infer unprovided motives as facts. **Selected:** OPEN.

Founder notes:

## Implementation proposals that are not product approvals

| Topic | Proposed starting point | Review before implementation |
| --- | --- | --- |
| Background meaning | Asynchronous work while the app is active; deliberate resume after interruption | Phone lifecycle and cost behavior |
| Remaining viewpoints | One batch for the other three plus synthesis | Exact output lengths and failure handling |
| Primary next step | Each lens gets its own concrete action | Avoid four cosmetically different versions of identical advice |
| New API contract | Phase-specific scoreless responses | Breaking-change handling if distributed clients exist |
| Journal evolution | Versioned partial-results schema with legacy reader | Lossless content/selection migration and deletion races |
| Idempotency | Operation IDs plus bounded process-local deduplication/cache | Restart/expiry limits and ambiguous paid retries |
| Private personal API | Keep server-only credentials and controlled access | Choose an actual reachable development/server setup later |
| Usage budget | Owner-set provider-call/token budget, with phase accounting | Amount and measurement; no made-up cost guarantee |
| Draft recovery | Local text/category/primary-choice persistence | Clear-on-save, failure and process-restart semantics |

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
