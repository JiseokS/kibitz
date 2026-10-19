# Kibitz product specification

Status: current MVP behavior and binding product decisions. Updated 2026-10-19.

## Identity and audience

- Product name: **Kibitz**. Technical identifiers use `kibitz`. Kibitzing is not an alternate in-product name.
- Promise: **Your choices, a little perspective.**
- Primary platforms: iOS and Android, portrait-first. Tablets should remain usable without a separate tablet experience.
- Primary language: English, including app copy, accessibility labels, prepared examples, errors and AI output. Other-language input is allowed; the AI is instructed to preserve its meaning and answer in English.
- Audience: people who want to reflect on an everyday action or statement through multiple philosophical lenses.
- Voice: curious, candid, warm and occasionally witty. Challenge an action without humiliating its author. Do not add a roast mode or conflate sarcasm with insight in the MVP.

## Core journey

1. **Reflect:** describe something done or said; choose a category; submit in demo or AI mode.
2. **Perspectives:** view four framework-specific judgments, with reasons and a question.
3. **Synthesis:** see the real tension, common ground, a practical next step and uncertainty.
4. **Resonance:** optionally choose the perspective that resonates most. One choice per entry; tapping it again clears it.
5. **Journal:** return to saved entries, search, filter, reopen or delete.
6. **My philosophy:** view the distribution of selected perspectives once five eligible entries have choices.

The home screen opens on writing, not a philosopher chat. Continuing chat, councils that debate each other, and philosopher selection are deferred.

## Input and categories

- Trim leading/trailing whitespace before validation.
- Require 10–2,000 characters under the current JavaScript string-length validation.
- Use stable category IDs independent of display text:

| ID | English label |
| --- | --- |
| `relationships` | Relationships |
| `work` | Work & study |
| `self` | Myself |

Categories help frame the account; they do not change who is included in an evaluation. Never require a person's real name or other identifying details.

## Four philosophical frameworks

| Persona ID | Display name | Criteria to preserve |
| --- | --- | --- |
| `kant` | Kant | Universalizability, autonomy, treating persons as ends |
| `mill` | J. S. Mill | Well-being of everyone affected, foreseeable consequences, liberty |
| `aristotle` | Aristotle | Virtue, practical wisdom, habits, fitting emotion and context |
| `nietzsche` | Nietzsche | Self-creation, affirmation, chosen values, examining resentment and approval-seeking |

These are modern interpretations, not historical quotations. Avoid caricatures: Kant as obedience, Mill as majority preference, Aristotle as splitting every difference, or Nietzsche as cruelty. Do not manufacture disagreement when frameworks converge.

Each result includes all four IDs exactly once. Each judgment has a short verdict, concise reasoning grounded in the account, and a reflection question. Every synthesis has a tension, summary, next step and uncertainty.

## Scores

- Scores are integers from 0 to 10, or `null`.
- A score represents how the described action fits that particular framework. It is never a rating of the person.
- Insufficient context, an input that is not an account of an action/speech, and inappropriate-to-score situations use null scores for all four.
- Victimization, self-harm, suicidal distress and threats need supportive handling; do not shame, morally grade distress, or provide harmful tactics.
- An arithmetic average is shown only if all four scores are present. Label it **Framework average**, explain its limited meaning, and do not use it to rank users or drive the philosophy map.
- Scores and interpretation quality have not yet been calibrated against live model evaluations. That is a beta release gate.

## Demo honesty

- The default mode is offline demo, with no network request.
- The two exact prepared examples receive authored evaluations and scores.
- Custom writing receives generic framework questions with null scores and an explicit explanation that its content has not been analyzed.
- Mark every demo result and record. Exclude all demo choices from the philosophy map.
- AI failures must show an error and preserve the user's writing. Never silently fall back to a successful demo result.

## Philosophy map

- Eligible entry: `source === "ai"` and one non-null selected philosopher ID.
- Five eligible distinct entries unlock the distribution. Before that, show progress and counts without presenting a confident personality label.
- Percentage = eligible votes for the framework / all eligible votes. Use largest-remainder rounding so whole-number percentages total 100.
- Each entry contributes one vote, regardless of score, date or text length. Selection changes replace that vote; deletion removes it.
- A tie gets a neutral multiple-perspectives description. Do not arbitrarily declare a single dominant philosophy.
- Explain that this is a snapshot of expressed preferences, not a validated psychological test, moral standing or immutable identity.
- Time trends, learned trait inference and personality claims are future research, not present features.

## Journal and deletion

- Save on this device after a validated evaluation. No account or cloud sync.
- Storage is not additionally encrypted by the app. Do not imply a secure vault or guaranteed backups.
- Only show a saved record after the storage write succeeds. Failed saves can retry the already-generated result without another paid evaluation.
- Confirm individual and full deletion. Full deletion resets the derived map.
- Corrupt or unsupported records must block writes instead of being discarded.
- A language/brand migration must preserve original text, evaluations, timestamps, IDs and choices. Old content is not retroactively translated or transmitted to AI.

## Mobile UX and defaults

- Three tabs: **Reflect**, **Journal**, **My philosophy**. Evaluation details and Settings are separate routes.
- Support the keyboard, safe areas, native back behavior, readable text and sufficiently large touch targets. Let English labels wrap instead of clipping.
- Require a visible consent step before sending the current entry to an evaluation server.
- Connection settings and beta access code stay in memory for this MVP; records persist. Start each fresh session in demo mode.
- A browser is not part of the mobile user journey. Do not launch one by default during development or validation.
- Keep infrastructure configuration in Settings for the internal MVP. Replace manual server/code entry with proper onboarding before a public release.

## Explicitly deferred scope

Accounts, cloud sync, encrypted journal storage, export/backup, subscriptions, notifications, streaks, leaderboards, public sharing, voice input, chat follow-ups, extra philosophers and multilingual interfaces require a deliberate roadmap decision. They must not appear as working features before implementation and verification.
