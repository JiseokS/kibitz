# Kibitz — project instructions for Codex

These instructions apply to this entire workspace. The runnable project is in `kibitz/`.

## Read first

- `README.md`: project overview, implemented scope, mobile setup.
- `kibitz/docs/PRODUCT.md`: product behavior and writing rules.
- `kibitz/docs/ROADMAP.md`: priorities, deferred scope, release gates.
- `kibitz/docs/ARCHITECTURE.md`: boundaries, data contracts, migration and API behavior.
- `kibitz/docs/VALIDATION.md`: what has actually been verified and what remains unknown.
- Follow `kibitz/AGENTS.md` for implementation commands and Expo conventions.
- `harness/README.md`: Codex implementation and independent Antigravity review workflow.

## Product decisions

1. The product name is **Kibitz**; code/package identifiers use `kibitz`. Do not reintroduce Agora or use Kibitzing as a competing name. Legacy migration identifiers are the documented exception.
2. Build an **English-first iOS and Android app**. New interface copy, accessibility labels, prepared examples, errors, AI output and project documentation must be English. Write all progress updates, questions and final answers to the owner in Korean; code and technical terms may remain English unless the owner changes this preference.
3. The primary experience is writing about an action or something said, then comparing philosophical interpretations. Keep journal and philosophy-map screens secondary to that flow.
4. Do not automatically open a browser, start a web preview, capture browser screenshots, or build a website. Web support is optional development tooling and requires an explicit reason or request. A Metro development server is still needed for mobile development; that is separate from opening the web app.
5. Follow the corrected order: T00.5 real-output evidence first, then scoreless chosen-first presentation with one complete call. D08 phases/cache/partial storage require T08 evidence and owner go. Preserve the four frameworks; do not add accounts, sync, subscriptions, feeds or notifications incidentally.
6. Separate scored version 2, accepted scoreless target and deferred phases. T01 promotes new-output rules with schemas, provider/client and tests together; T03 establishes compatible storage before writes. Planning alone is not implementation; legacy rules cannot reintroduce new scores.

## Interpretation and trust

- Evaluate the described action, not the worth, identity or diagnosis of its author.
- Treat philosophers as interpretations of frameworks. Do not invent quotations or claim historical endorsement.
- Represent genuine contrasts without manufacturing disagreement or a false consensus. State missing context.
- Require all four philosophers exactly once per complete evaluation. Later gated phases validate exact subsets and the complete union. Use the shared schema for the relevant format.
- In the scored baseline/legacy format, use null scores when evidence is insufficient or scoring inappropriate. T01 new output is scoreless. In every format preserve supportive handling of victimization, self-harm and threats; never shame or grade distress.
- Keep demo results visibly labeled. Existing scored examples remain baseline/legacy data; the target hides numerical presentation and uses scoreless prepared examples. Arbitrary offline writing gets general questions without personalized analysis/scores. Never convert an AI error into a demo success.
- Map percentages use explicit resonance, never scores, first choice or browsing. Preserve capture/data while D10 is open; hiding a tab cannot remove voting. Persist select/change/clear; count one vote per selected AI entry, exclude demo/unselected, unlock at five, round to 100 and update after edits/deletion. Removing capture needs a separate decision and revised AC16.

## Data and credentials

- Preserve journal contents and user choices. Never delete, reset or translate old entries as part of a rename or language change.
- Version every incompatible storage change. Validate before migration, commit the replacement before deleting the old copy, and make retries safe. Unsupported or corrupt data must not silently become an empty journal.
- Never send historical entries to AI to translate or enrich them without a requested feature and informed user consent.
- OpenAI keys stay in server-only environment variables. Never put them in source, mobile bundles, public environment variables, screenshots or logs.
- Send only the current entry and category, after the in-app consent step. No journal bodies or provider secrets in logs.
- Paid application quality experiments require a locally configured server-only key and an explicit owner-set request/token/cost bound. This documentation task and a reviewer allowance do not authorize application API calls. Record actual evidence and unknowns; do not silently retry paid failures or transmit old journals for evaluation.
- Keep access codes in memory in this MVP. Public deployment needs real user authentication and durable usage limits; the beta code is not an account system.
- Enforce HTTPS for remote evaluation servers. Never broadly disable native transport security to make a preview work.

## Engineering workflow

- Complete the requested local work without unnecessary confirmation loops. Use tools only for the task's authorized scope. Request missing credentials or environment approval when required; never ask the user to paste secrets into chat.
- Do not create new chats or delegate to subagents unless explicitly requested by the user or another applicable instruction.
- Keep changes small and typed. Use the existing modules before adding libraries or abstractions. Check current version-matched official documentation before changing framework APIs.
- Keep business rules in domain modules, storage in the repository, external requests in services/server, and screens focused on presentation.
- Run meaningful tests when persistence, schemas, network behavior or business rules change. Do not add tests that merely assert every copy string or repeat an implementation.
- Run typecheck and lint before completion. Build mobile bundles when navigation, app identity, native dependencies or mobile compatibility change. Do not use a browser screenshot as proof of native behavior.
- Do not force dependency fixes that downgrade Expo/React Native or override incompatible major versions. Record concrete unresolved advisories and their affected paths.
- Update product/architecture/roadmap/validation documents when their facts change. Keep completed implementation, mock verification, live verification and planned work distinct.
- Target AC04/AC17: show validated results as saving/unsaved before persistence, publish saved status only on successful write, and retry saving without AI. Memory is not process-durable. Guard duplicate/superseded/deleted work and newer drafts. Later G displays primary before save and visibly pauses extra paid work on save failure.

## Implementation and independent review

- Codex owns implementation, tests and responses to findings. Antigravity is the independent reviewer in this user-requested workflow. Other delegation still requires explicit authorization.
- Use the conservative routing policy in `harness/reviewer.json`, requested by the owner on 2026-10-22. The stronger default is `claude-opus-4-6-thinking`; `claude-sonnet-4-6` is eligible only for a clearly low-risk, small documentation-only routine review. Assess semantic complexity and impact before freezing a task; put `review.complexity` (`low`, `medium`, `high`), `review.scope` (`routine`, `integration`) and a substantive `review.reason` in its committed brief. Explain the decision to the owner. Missing or uncertain assessment, medium/high complexity and integration reviews use Opus. Do not classify runtime, storage/migration, API/network, security/privacy, dependencies, native configuration or harness changes as low risk merely because the diff is short.
- The runner can raise the model choice using the complete diff and explicit context; it does not independently understand semantics. Initial Sonnet eligibility is limited to `README.md`, regular Markdown in `kibitz/docs/` excluding `AGENTS.md`, and the current `harness/tasks/<id>.json` brief, at most five affected files and 200 added/deleted lines. Code, other tooling/configuration, binary/mode changes and deletions require Opus. All changed files remain reviewed. Use Opus when in doubt; do not expand Sonnet eligibility without evidence and an explicit policy change.
- Owner-approved exception (2026-10-26): after an explicit Opus individual-quota error, Codex may switch the active default in `harness/reviewer.json` to `gemini-3.8-flash-high`, record the quota evidence and prepare a new frozen candidate/run. This Gemini policy is currently active; it overrides the normal Opus preference above while quota-blocked, without claiming equal model quality. Keep the failed Opus outcome INCOMPLETE. Authentication, missing-model, timeout, denied-tool and generic rate errors do not authorize this switch. If Gemini also fails, stop; do not cascade to another model. Restore the preferred Opus policy in a fresh candidate when quota recovery is established. The runner itself has no automatic failover. Match the CLI-reported model; preserve all historical model attribution.
- Respect an owner's request to commit/push manually. For a pre-commit review, freeze all intended changes in an independent temporary repository and record file hashes; do not commit in the owner's checkout. Report that the resulting verdict names the temporary commit, not a future owner-created commit.
- For an implementation task, record agreed scope/acceptance in `harness/tasks/<task>.json`, capture the base revision before coding, and keep the change reviewable. Include the task file in the scoped local commit. Do not push or merge as an incidental review step.
- Use routine reviews for the latest increment: set `base` to the previous successfully reviewed head of the same feature (or its start commit for the first increment), and include directly affected dependencies, callers, contracts and tests through `context_files`. Review every changed file in the selected range; do not hide changed files to reduce tokens.
- When a feature is complete, run an integration review from its recorded start commit through the latest head. Cover all feature changes, integration boundaries, error paths and relevant tests. This is the whole feature, not an automatic reread of unrelated repository history. Do not use a routine PASS as evidence of feature-wide integration.
- Choose required checks by the actual impact. Keep valid earlier check evidence for unchanged code clearly attributed to its original revision; never relabel it as newly executed. For a policy/documentation-only follow-up, check the affected review workflow and document consistency instead of repeating the unchanged app's entire suite. Expand checks when source, contracts, dependencies or unresolved concerns justify it. The coordinator selects scope through existing `base` and `context_files`; the runner has no automatic scope mode.
- After implementation, invoke `node scripts/review.mjs prepare --base <base> --task <task-file>` from the root, then `node scripts/review.mjs run --run <returned-id>`. Read its validated result in the current chat; a second Codex process is unnecessary.
- Review must cover the exact changed HEAD. Investigate findings, fix supported defects, rerun checks and prepare a new review for the new commit. Limit automatic repair/review cycles to two, then report unresolved findings to the user. The runner separately enforces three reviewer attempts per frozen run.
- Missing CLI, authentication, denied tools, incomplete checks, stale commits or invalid output mean INCOMPLETE; never substitute a self-review or CLI execution success for an Antigravity PASS. Run `status --run <id>` before relying on a saved verdict.
- Preserve role separation: the reviewer reports defects and evidence without editing source. Do not disable permission checks, change global reviewer settings, or invent successful verification to unblock a run.
- Send review source/check context through one framed stdin message and EOF, never through prompt arguments. Use the explicit minimal reviewer environment for both reviewer runs and CLI help probes; do not forward application/API/CI secrets or preload hooks. Required repository checks keep their own environment and remain owner-trusted code execution.

## Definition of done

A task is done when the requested behavior and docs agree, required checks pass (or a concrete environment blocker is recorded), existing journal data is preserved, and the final response briefly states what changed, how it was checked and any material remaining limits. Never describe an exported JavaScript bundle as an installed app, a signed build, or a store release.

Codex instruction-file reference: https://developers.openai.com/codex/guides/agents-md/
