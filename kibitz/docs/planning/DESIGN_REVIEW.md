# Kibitz design review — personal MVP

**Version:** 0.3 staged design · **Updated:** 2026-10-22 · **Owner:** founder

**Read and edit this document.** Product choices confirmed in chat are recorded below. Detailed implementation choices remain proposals until reviewed. This document does not claim that the revised interface or API has been implemented.

Read next: [decision workbook](DECISIONS_WORKBOOK.md) → [delivery and review plan](DELIVERY_PLAN.md).

Owner-requested revision, 2026-10-22: T00.5 tests existing content first, then build scoreless chosen-first presentation with one complete call. D08 remains gated on measured need and T08 evidence. This documentation update implements no revised runtime behavior or paid app call.

## 1. Confirmed product direction

| ID | Founder decision | Consequence |
| --- | --- | --- |
| D01 | Friendly but pointed kibitzing | Challenge the action with wit; avoid lectures, humiliation or diagnosing the author |
| D02 | A personal MVP the founder can actually use | Prioritize one user's real mobile loop; accounts, public launch and monetization are deferred |
| D03 | Written judgments and practical advice, without scores | Remove per-philosopher scores, averages, ranking and score bars from the proposed experience |
| D04 | One evaluation in the first MVP | Open-ended conversations with philosophers are a later capability |
| D05 | Automatic local journal storage with deletion | Persist real results on this device and retain individual/all deletion |
| D06 | The chosen philosopher first; switch philosophers below | A focused perspective card replaces the four-card-first result presentation |
| D07 | Choose the first philosopher for each entry | Selection is part of the writing flow, not a global preference that silently applies |
| D08 | Deliver that philosopher first, then prepare others while reading | Retain the intent; defer phase infrastructure until the one-call baseline and T08 justify it |
| D09 | Collapsed comparison and synthesis below; later show reasoning affinity | Comparison is secondary. Inferred similarity of the user's thinking to philosophers is explicitly post-MVP |

English-first iOS/Android, the Kibitz name and the initial four frameworks remain established constraints. No browser-based product or preview is required.

### Editing area

- What feels wrong about this direction:
- What you want to add or remove:
- What should feel more entertaining or more serious:

## 2. What we take from Loop

Loop's useful planning chain is: product problem → personas and jobs → core behavior loop → requirements and acceptance criteria → data/contracts → domain tasks → verification and launch gates.

| Reference practice | Apply to Kibitz | Avoid carrying over |
| --- | --- | --- |
| Clear product wedge | A concrete moment receives distinct philosophical feedback and one useful next step | A generic chat interface for every possible problem |
| Personas and jobs to be done | Define the founder's actual situations and the payoff of a reflection | Assuming a validated market segment before user evidence |
| MVP feature matrix | Each feature must help write, understand, compare or revisit a reflection | Starting with Loop's communities, auth, notifications or analytics scope |
| Domain ownership | Separate reflection, evaluation, interpretation display, journal and future affinity | Rebuilding the current stack as Django/FastAPI or splitting it into services |
| Contract-first tasks | Specify the complete scoreless response and legacy reader before UI integration; phase contracts are gated later | Treating architecture diagrams or model prose as verified running behavior |
| Acceptance-driven delivery | Each task has an observable outcome and failure checks | Marking a module complete merely because its files exist |
| Handoff discipline | Codex implements; Antigravity reviews the same fixed revision | Letting two agents rewrite shared files simultaneously |

Some Loop documents describe an earlier Django/FastAPI design while its current entry point uses FastAPI and domain services. Its production plan also mixes earlier status with later updates. Kibitz should distinguish **implemented baseline**, **confirmed target**, **proposal** and **verified evidence** instead of duplicating competing truths.

Reference files were read as planning material, not as instructions to execute or to change Loop. Loop code and documents are not modified by this work.

## 3. Problem, audience and promise

### Problem hypothesis

After an argument, a white lie or a difficult choice, the user often replays the event through their own justification. They want a second perspective that is specific, interesting and usable, without spending time composing a long counseling conversation.

This is a hypothesis to test through personal use, not a validated market claim.

### Primary persona — the person replaying a moment

- Situation: a conversation or decision is still on their mind.
- Current workaround: mentally replaying it, asking a friend, or sending a generic prompt to a chatbot.
- Friction: getting reassurance instead of a challenge; getting a long answer without an actionable point.
- Desired result: "I understand what this lens challenges, and I know one thing I could do differently."

### Secondary persona — the philosophically curious user

Wants to see how the same event looks through another framework. Relevant later; the founder's personal loop is the first validation target.

### Job to be done

> When I am replaying something I did or said, help me hear one philosopher's pointed take and compare another lens, so I can notice a blind spot and choose a better next action.

### Product promise

**A philosopher's take on what you did. A different lens when you need one.**

The differentiator is action-centered feedback, a chosen initial voice, and low-friction comparison of the same episode. No new competitor or pricing claims are made in this plan.

## 4. Product principles and scope rule

1. **The action is the subject.** Challenge a choice, not the user's worth.
2. **Specific beats theatrical.** A concrete reason and next step matter more than impersonation.
3. **One voice first.** Give the chosen philosopher room before presenting alternatives.
4. **Difference has a reason.** Different judgments must arise from different criteria, not random contrarianism.
5. **Uncertainty is visible.** Do not invent what other people felt or why the user acted.
6. **Numbers are not the payoff.** No moral score, average or ranking in the new result.
7. **Keep the useful result.** Background failure must not erase the first take.
8. **Local ownership.** Keep records on the device, disclose AI transmission and preserve deletion.

A personal-MVP feature belongs if it helps the user **describe, hear, compare, act or revisit** a reflection. Anything else needs a separate reason.

## 5. Current code versus target design

Baseline inspected: commit `31b1146316d8b34fd8ebb0e48e4a53c56b755309`. Runnable code is under the repository's inner `kibitz/` directory.

| Capability | Current baseline | Target in this draft |
| --- | --- | --- |
| English mobile entry | Implemented | Keep; add a required first-philosopher selection |
| Philosophers | Fixed Kant, Mill, Aristotle, Nietzsche | Keep these four initially |
| Evaluation | One request requires four judgments plus synthesis | First slice: one complete scoreless response; D08 phases are deferred |
| Results | Four cards with scores and an average | One focused scoreless card, switcher below, collapsed comparison |
| Practical action | Shared synthesis has a next step | Every philosopher gets its own next step; synthesis has a combined proposal |
| Journal | Autosave after a whole evaluation; save failure retains an in-memory retry | Display the validated complete result immediately with saving/unsaved status; retry saving without another AI call |
| Persistence | Version 2 envelope, migration from the old brand | Scoreless/selected-first compatibility is needed now; partial-entry storage is gated with D08 |
| Entry selection | No primary philosopher field | Persist original first philosopher separately from the currently viewed card |
| Draft | In memory | Persist the current text/category/selection to survive interruption |
| Affinity | Existing explicit-resonance percentage map | Preserve explicit voting and data independently of the open map-tab visibility choice; inferred similarity is later |
| API and tests | Provider integration code; 22 application tests previously recorded | Validate baseline content before implementation; add scoreless complete-response and compatibility tests |
| Native/live verification | Previously documented as outstanding | Prove the revised flow on the founder's actual device and real provider calls |

No new application code, paid requests, deployment, native installation or fresh test pass is implied by this planning document.

## 6. Target journey and information architecture

### First slice: entry → chosen take, one call

1. Open **Reflect**.
2. Describe what happened. The placeholder may invite the reason for the action without forcing an extra field.
3. Choose a category and explicitly choose who weighs in first.
4. Review the transmission notice and submit.
5. Wait for one validated response containing all four scoreless perspectives plus synthesis. This slice does not promise a faster first generated answer.
6. Show the selected philosopher's verdict, reasoning, question and next step immediately; all alternatives are already available.
7. Autosave the complete entry. Show saving/unsaved status separately from readability. Do not publish it as saved before the repository write succeeds.

### Compare → revisit

8. Use the philosopher selector below the main card to switch lenses.
9. Cached perspectives switch without another model request.
10. Expand **Compare the lenses** for the shared tension, differences and a combined next step.
11. Optionally select **Which perspective stayed with you?** This explicit resonance is independent of the first choice and currently viewed card.
12. Reopen a saved entry from Journal. The philosopher originally chosen for that entry opens first.
13. Delete one reflection or all local reflections when desired.

Keep the current map tab and explicit vote control until D10 is resolved. Hiding the tab later does not authorize removing the vote control, freezing new votes or deleting old data. Any such behavior change needs its own explicit decision and revised AC16.

### Proposed screen sketch

```text
REFLECT
What happened?
[ What I did or said, and the context... ]
[ Relationships ] [ Work & study ] [ Myself ]
Who should weigh in first?
[ Kant ] [ Mill ] [ Aristotle ] [ Nietzsche ]
[ Let Kant weigh in ]

RESULT
Your story                         [ Show ]
Kant · Duty ethics
"You had a point. The public audience is worth questioning."
[ Why this lens sees it that way ]
[ One thing to try next ]
[ A question to sit with ]

Another perspective
[ Kant: ready ] [ Mill: ready ] [ Aristotle: ready ] [ Nietzsche: ready ]

> Compare the lenses               [ collapsed / ready ]
Which perspective stayed with you? [ optional explicit choice / clear ]
[ Saving... / Saved / Unsaved: retry saving ]
[ Return to journal ]
```

This is a structural sketch, not a rendered interface. The first philosopher's take is the primary content; the selector is beneath it as requested. Long content and native font sizes must be tested on device.

### Deferred surfaces

- Open-ended philosopher conversation, anchored to an entry and a chosen lens.
- "Which philosophy resembles my reasoning?" with evidence and opt-in analysis.
- Accounts, cloud sync, notifications, subscriptions and public sharing.

Map-tab visibility is open in D10; existing resonance capture remains required. The map is preference history, not inferred reasoning affinity. Deferred progressive loading/error states must not be presented as part of the first one-call slice.

## 7. Evaluation content and voice

| Framework | Core question | Avoid |
| --- | --- | --- |
| Kant | Could the principle be universal, and does it respect people as ends? | Reducing ethics to obedience |
| Mill | What well-being and harm could this produce for everyone? | Equating popularity with usefulness |
| Aristotle | What response fits the context and cultivates practical wisdom? | Treating the mean as an arithmetic compromise |
| Nietzsche | Are these chosen values or a reaction to resentment/approval? | Equating strength with cruelty or selfishness |

For the illustrative situation "a friend borrowed my things; I called them out in a group chat":

- **Kant:** "You had a point. Turning a friend into a public example is the part worth questioning."
- **Mill:** "Your boundary got airtime. Did the group chat need the fallout?"
- **Aristotle:** "The anger may fit. The stage and volume deserve a second look."
- **Nietzsche:** "Was that your boundary speaking, or resentment asking for an audience?"

These are authored style examples, not historical quotations, model outputs or calibrated philosophical judgments. Each needs context-dependent reasoning beneath it.

### Content acceptance rules

- One pointed observation, not a stream of insults.
- Speak about the described act; acknowledge missing context.
- No numeric scores, grades, averages, rankings or replacement approval meters.
- Give a specific next step that is feasible in the situation. Avoid generic "reflect more."
- Ground the difference between two lenses in their criteria.
- Use supportive handling when scoring/joking would be inappropriate, including victimization and acute distress. No invented facts, diagnoses, quotations or hotline numbers.
- English output, even for non-English input, preserving the original meaning.
- Proposed primary-card length: a short verdict, roughly two reasoning sentences, one question and one next step. Actual length/latency tradeoffs require testing.

## 8. Domain ownership and architecture

Keep the current Expo/React Native + small Node API stack. Add logical boundaries in the existing modules; no separate services, message broker or worker cluster are proposed for the personal MVP.

| Domain | Owns | Must not own |
| --- | --- | --- |
| Reflection | Current text, category, chosen first philosopher and draft validation | Provider credentials or historical-affinity inference |
| Evaluation lifecycle | One immutable submitted snapshot, one request, cancellation, stale-response guards and save-only retry | Premature primary/remaining orchestration or claiming OS background execution |
| Perspective presentation | Active card, readiness, philosopher selector and collapsed comparison | Generating another response on each selection |
| Journal | Complete entry identity, original primary ID, resonance, compatibility and deletion | Publishing unsaved records as saved or recreating a deleted reflection |
| Provider adapter | Trusted instructions, complete scoreless schema, one model request and bounded errors | Device storage or leaking journal text to logs |
| Affinity, later | Opt-in evidence about expressed reasoning over time | Treating a browsed tab or moral score as a personality diagnosis |

```mermaid
sequenceDiagram
    participant U as User
    participant A as Mobile app
    participant S as Evaluation API
    participant L as Device journal
    U->>A: Entry + chosen philosopher + consent
    A->>S: One complete evaluation request
    S-->>A: Validated four scoreless takes + synthesis
    A-->>U: Show chosen lens; alternatives ready; saving status
    A->>L: Save complete entry + original choice + resonance
    alt Write succeeds
        L-->>A: Committed entry
        A-->>U: Saved; available in Journal
    else Write fails
        A-->>U: Keep session result; Unsaved; save-only retry
    end
    U->>A: Switch lens / explicitly vote / expand comparison
    A-->>U: Use existing result; no AI call
```

## 9. Progressive generation: performance hypothesis and boundaries

**Retained D08 intent, deferred implementation:** one philosopher first; prepare others during reading. It is not a dependency of the first chosen-first screen.

**Hypothesis:** a shorter foreground generation can reduce time to the first useful take. Background work may overlap reading time. This is not yet measured or guaranteed.

Tradeoffs:

- Normally two model calls rather than the current single call; repeated input/context may increase cost.
- Overall completion time may increase even if the first take appears sooner.
- Passing primary output into the remaining request may anchor or homogenize the other viewpoints; it may also help consistency. Neither quality improvement nor degradation is established. Compare framework fidelity, grounding and justified agreement as well as latency.
- Fast switching can reach a perspective that is not ready.
- The mobile OS may suspend work when the app is no longer active. "Background" here means asynchronous work while using the app, not guaranteed work after closing it.

### Activation gate and proposed later policy

T00.5 precedes revised work. After the one-call slice is usable, T08 compares matched quality/timing/usage only if waiting is a material problem, before building phase infrastructure. Require owner go; inconclusive evidence retains one call. This document alone authorizes no paid experiment.

1. Request and validate exactly the selected philosopher first.
2. Show the validated primary immediately as saving/unsaved, then attempt persistence. Storage must not block its display. On save failure, retain the session result, show the failure and explicitly pause the remaining request until save-only retry succeeds. Memory is not durable across process termination.
3. After a successful primary save, start one remaining-batch request containing exactly the other three plus synthesis. Reuse that in-flight operation when switching tabs; never start a request on every tap. Continuing with another paid call while unsaved is outside this proposal.
4. Complete the secondary batch atomically for the first implementation. Streaming individual secondary cards can wait.
5. If another card is selected early, show that philosopher's loading state. Never relabel the first philosopher's text as someone else's.
6. A secondary failure leaves the primary result readable and saved, with an explicit retry action.
7. Cancel secondary work when the app becomes inactive; record interruption and offer a deliberate resume/retry on return. Aborting a request does not prove it was not billed.
8. Do not append late results to an entry that has been deleted or replaced. Use entry identity/generation guards.
9. Primary and remaining attempts share a bounded session budget. Successful cached switches use zero additional calls.
10. Keep results and state in an app-level coordinator so changing screen routes does not create duplicate requests.
11. A deliberate new reflection cancels/supersedes old work under a new identity; late responses cannot change the new story, selected philosopher, draft or result. An unsaved usable result must be explicitly saved or discarded before replacement.

Proposed timing measurements: tap-to-primary-visible, time until all alternatives are ready, switch-to-visible latency and total input/output usage. Compare the old one-call approach with the new approach on the same synthetic scenarios before claiming a speed improvement.

## 10. Proposed contracts and storage evolution

These shapes are design targets, not deployed API contracts.

### Scoreless perspective

```json
{
  "philosopherId": "kant",
  "verdict": "You had a point. The public audience is worth questioning.",
  "reasoning": "You can defend a boundary while still respecting the other person's agency. Public criticism needs a justification beyond making an example of them.",
  "question": "Could I defend this way of handling conflict as a principle for everyone?",
  "nextStep": "Speak privately, acknowledge the public criticism, and restate the permission you need."
}
```

### First-slice complete response and compatibility

Keep one request for the current text/category and one response containing all four distinct scoreless perspectives plus synthesis. Store the user's original first-philosopher choice as entry metadata; do not turn it into a resonance vote. Every new perspective has a practical next step. Prompts, shared schemas, client parsing and fixtures change together in T01.

T03 still needs a versioned compatibility/reader decision: existing strict records require a `score` and do not contain per-lens `nextStep` or an original primary ID. Removing partial results does not eliminate this work. Preserve old payloads and scores as legacy data, hide their numbers in the new presentation and provide an honest legacy display fallback; do not invent missing historical per-lens advice or an original user choice. No migration occurs in this document task.

### Deferred phase contracts — only after T08

| Operation | Request | Validated result |
| --- | --- | --- |
| Primary | operation ID, current text/category, primary philosopher ID | Exactly that one scoreless perspective |
| Remaining | a distinct operation ID, same immutable input/primary ID, validated primary context | Exactly the other three perspectives and the synthesis |

Generate a reflection/operation identity before the first request. Requests with a repeated operation ID and the same payload should share or reuse work; a different payload under that ID is an error. A bounded in-memory response cache is sufficient to start personal testing, with its TTL and restart limitations documented. Durable job infrastructure is deferred. A server restart or ambiguous failure can still cause another paid attempt; do not promise exactly-once billing.

The current API requires all four perspectives in one response. The new phases require a deliberate shared-schema change, server adapter change, client coordinator and tests in the same task set. If no distributed clients exist, coordinate this as an explicit local-prototype breaking change. If installed/distributed clients are discovered, version the API before deployment.

### Entry additions, with deferred fields separated

Proposed entry state includes:

- Existing ID, creation time, original input and demo/AI provenance.
- `primaryPhilosopherId`: original per-entry choice; viewing another card does not replace it.
- A complete set of four scoreless perspectives and synthesis in the first slice.
- Explicit user resonance, retained independently of map-tab visibility; tab switching is not a vote.
- Non-secret model/prompt format version where needed for reproducibility.

Only the later progressive format adds a readiness map, primary/remaining operation identities, phase status and synthesis that is absent until completion. Do not add these merely to implement the first screen.

Deferred state examples: `primary_ready`, `completing`, `complete`, `completion_failed`, `interrupted`. An old persisted `completing` state becomes interrupted after restart; it is not proof a job is still running. The first slice needs request/saving/unsaved states, not this phase state machine.

The version 2 journal assumes a complete scored evaluation. Introduce a tested new storage envelope/reader before persisting partial results. Preserve existing text, scores as legacy data, IDs, timestamps and votes; new presentation ignores historical scores. Never discard or silently regenerate old entries. Old records have no original chosen-first philosopher: do not invent one from the order of cards or an explicit resonance vote. Use an honestly labeled display fallback for those records. No migration is performed by this design task.

## 11. Screen and failure acceptance criteria

These are target criteria, not passing evidence. **B** is the first complete one-call slice; **G** is the deferred progressive extension after T08. AC16 and AC17 are mandatory in both. AC18 precedes revised implementation; AC19 gates G.

| ID | Scenario | Required behavior |
| --- | --- | --- |
| AC01 | Start a new reflection | The first philosopher must be explicitly selected for that entry |
| AC02 | Submit valid input | B: one validated complete response, chosen lens shown first without waiting for persistence; G: only the chosen lens blocks first display |
| AC03 | Chosen card ready | Visible English verdict, reasoning, question and practical next step; no score |
| AC04 | Autosave fails | B/G: keep the validated session result readable with unsaved status; save-only retry makes no AI call; do not claim restart durability |
| AC05 | Generation starts | B: one complete evaluation call; G: one remaining batch only after primary save, paused visibly on save failure |
| AC06 | Switch to a ready philosopher | Show that cached lens with no model call |
| AC07 | Switch before ready | B: no partial-ready claim before full validation; G: accurate philosopher-specific loading, no wrong attribution |
| AC08 | Remaining phase fails (G only) | Primary stays usable; comparison explains it is incomplete; manual retry |
| AC09 | App interruption/restart | B: restore saved complete entries; unsaved results may be lost and are labeled accordingly; G: restore saved partial state honestly; no uncontrolled paid retry |
| AC10 | Entry deleted during a request | Late work cannot resurrect it |
| AC11 | Comparison expanded | Show criteria differences, uncertainty and one combined action, no numerical ranking |
| AC12 | Reopen history | Original chosen philosopher appears first, even if a different card was last viewed |
| AC13 | Legacy record opened | Original content preserved, numbers hidden by new presentation, provenance retained |
| AC14 | Demo used | Same interaction pattern, clearly authored/prepared or generic, no fabricated AI claims |
| AC15 | API failure/refusal/invalid output | Visible bounded error; writing/usable results preserved; no fake demo success |
| AC16 | Explicit resonance | Preserve the choice control and old votes; select/change/clear persists across restart; one vote per selected AI entry, five-choice threshold, demo/unselected exclusion, vote edits/deletion update the map; first choice and browsing never vote |
| AC17 | New reflection while old work is pending | Block duplicate submit; deliberate replacement cancels/supersedes under a new identity; late work cannot overwrite the new draft/result or resurrect deleted data; save/discard an unsaved usable result explicitly |
| AC18 | Before revised implementation | T00.5 records bounded baseline quality/timing evidence and a go/revise/stop decision; no claim of validated quality from mock/schema checks |
| AC19 | Before progressive implementation | T08 records matched quality/latency/usage tradeoffs and an owner go decision; otherwise retain the complete one-call slice |

## 12. Personal validation and success criteria

Before T01, T00.5 uses roughly ten fictional cases covering conflict, justified agreement, ambiguity, non-English input, embedded instructions and sensitive context. Review grounding, criteria, tone, uncertainty and action separately from schema validity; do not reward forced disagreement. Record revision/model/prompt, timing, failures and available usage; missing cost stays unknown.

Require a configured server-only key and explicit owner request/token/cost bound; no key in chat or automatic retries. No paid app call occurs in this documentation task. A tiny sample exposes failure, not broad reliability; persistent generic/caricatured/unsafe output means revise within budget or stop.

Repeat relevant cases after the target prompt/contracts change and before personal trial; baseline scored evidence does not validate future scoreless or progressive output. Then try ordinary low-sensitivity personal episodes on the founder's actual device.

Proposed personal trial: five different reflections over roughly a week. This is exploratory usability feedback, not market validation or a statistical benchmark.

After each reflection, record privately:

1. Was the first take specific and worth reading?
2. Did another philosopher reveal a meaningfully different criterion?
3. Is there one action worth trying?
4. Where did waiting, switching or saving feel awkward?

Measure reliability and latency separately from subjective usefulness. No analytics SDK or transmission of journal bodies is required for this trial. Numeric performance/cost thresholds should be chosen from measured results and an owner-set budget, not invented as verified facts.

## 13. Risks and mitigations

| Risk | Why it matters | Proposed mitigation / evidence needed |
| --- | --- | --- |
| Generic or caricatured philosophy | Different names may hide essentially identical advice | T00.5 before implementation; repeat after prompt changes; compare criteria, not forced disagreement |
| First take feels slow | D08 aims to improve first-visible time; chosen-first presentation alone does not | Measure the existing path first, then matched T08 cases; do not assume total time falls |
| Extra cost from two phases or retries | Original context is repeated and cancellation can still be billed | Bounded calls/attempts, in-flight reuse, explicit retry and an owner-set experiment budget |
| App suspension (deferred G) | Reading-time generation does not guarantee work after closing the app | Keep B complete in one response; if G is activated, show primary before saving, persist it before secondary work and expose interruption |
| Partial data is lost or misattributed | A late secondary response may target an old/deleted episode | Versioned storage, operation identity and guarded merges |
| Journal migration erases meaning | Older entries lack new metadata and still contain scores | Preserve legacy payloads; do not invent original selections; test before writing |
| Witty critique becomes shaming | The product should challenge without humiliating | Grounded action-focused language and sensitive-context review |
| Future affinity overclaims identity | Preference votes and inferred reasoning are different evidence | Separate concepts; require a later evidence/consent design and an insufficient-data state |
| Documentation drifts from code | The new plan is deliberately ahead of the implementation | Promote accepted targets explicitly; maintain a distinct implemented/verified status ledger |

## 14. Later: conversations and reasoning affinity

### Conversations

An eventual conversation is anchored to an entry and philosopher, with explicit context scope, bounded history/cost and consistent persona criteria. It is not part of this MVP's request or data model beyond preserving stable entry/persona IDs.

### Reasoning affinity

The founder wants a later explanation of which philosopher their judgments/thinking resemble. That is different from the existing percentage of explicitly resonating choices.

A later design must define:

- Evidence: what the user actually wrote about intentions, reasons or their revised judgment.
- Consent: whether any past entries may be analyzed; current-entry consent is not blanket history consent.
- Output: explainable similarities and counterexamples, with uncertainty, rather than a fabricated personality score.
- Limits: insufficient evidence state, changing views and correction/removal of source entries.
- Surface: beside/below the collapsed comparison when available, with a fuller profile only if useful.

No tab-switch behavior, chosen initial philosopher, old moral score or demo record should silently become a claim about the user's underlying philosophy. Do not show invented affinity values in the personal MVP.

## 15. Review and promotion

The workbook records confirmed and open choices. The delivery plan maps requirements to tasks and independent review evidence. After founder edits:

1. Resolve the open choices needed by the first implementation slice.
2. Keep the accepted target and implemented baseline distinct in `PRODUCT.md`, `AGENTS.md`, decisions and roadmap. T01 is the concrete promotion boundary: update the active new-output rules, shared schemas, provider/client and tests together; T03 establishes compatibility before new-format writes. Do not enforce scored-baseline rules on the new scoreless format, or remove legacy readers before preservation is verified.
3. Keep current implementation status separate until the code changes and checks exist.
4. Have Codex implement one scoped task at a time; Antigravity reviews its fixed commit and acceptance criteria.

### Reference basis

- `/Users/jiseokshim/Loop/loop-full-prd.pdf`: problem, personas, jobs, feature acceptance, data model, success metrics and launch sequencing.
- `/Users/jiseokshim/Loop/Workflow.md`: domain ownership, contracts, test and handoff discipline.
- `/Users/jiseokshim/Loop/PRODUCTIONPLAN.md`: concrete domain/task decomposition and status-drift example.
- `/Users/jiseokshim/Loop/AGENTS.md` and sampled backend entry point/services: current implementation context.
- Existing Kibitz product, architecture, roadmap, validation records and sampled source at the baseline commit above.

External market claims, pricing and technical choices in Loop were not adopted as facts or requirements for Kibitz.
