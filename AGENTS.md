# Kibitz — project instructions for Codex

These instructions apply to this entire workspace. The runnable project is in `kibitz/`.

## Read first

- `README.md`: project overview, implemented scope, mobile setup.
- `kibitz/docs/PRODUCT.md`: product behavior and writing rules.
- `kibitz/docs/ROADMAP.md`: priorities, deferred scope, release gates.
- `kibitz/docs/ARCHITECTURE.md`: boundaries, data contracts, migration and API behavior.
- `kibitz/docs/VALIDATION.md`: what has actually been verified and what remains unknown.
- Follow `kibitz/AGENTS.md` for implementation commands and Expo conventions.

## Product decisions

1. The product name is **Kibitz**; code/package identifiers use `kibitz`. Do not reintroduce Agora or use Kibitzing as a competing name. Legacy migration identifiers are the documented exception.
2. Build an **English-first iOS and Android app**. New interface copy, accessibility labels, prepared examples, errors, AI output and project documentation must be English. Respond to the user in the language they use.
3. The primary experience is writing about an action or something said, then comparing philosophical interpretations. Keep journal and philosophy-map screens secondary to that flow.
4. Do not automatically open a browser, start a web preview, capture browser screenshots, or build a website. Web support is optional development tooling and requires an explicit reason or request. A Metro development server is still needed for mobile development; that is separate from opening the web app.
5. Preserve the current four frameworks and one-call evaluation architecture unless a requested feature requires changing them. Do not add accounts, cloud sync, subscriptions, feeds, or notifications as incidental work.

## Interpretation and trust

- Evaluate the described action, not the worth, identity or diagnosis of its author.
- Treat philosophers as interpretations of frameworks. Do not invent quotations or claim historical endorsement.
- Represent genuine contrasts without manufacturing disagreement or a false consensus. State missing context.
- Require Kant, Mill, Aristotle and Nietzsche exactly once. Validate input and output against the shared schemas.
- Use null scores where evidence is insufficient or scoring would be inappropriate. Preserve supportive handling of victimization, self-harm and threats; never shame or grade distress.
- Keep demo results visibly labeled. Prepared examples may have prepared scores. Arbitrary offline writing gets general questions, without personalized scores. Never convert an AI error into a demo success.
- Philosophy-map percentages come from the user's explicitly chosen perspectives, not the model's scores. Count one choice per AI entry, exclude demo/unselected entries, unlock at five choices, and keep rounded percentages summing to 100. Edits and deletion must update the map.

## Data and credentials

- Preserve journal contents and user choices. Never delete, reset or translate old entries as part of a rename or language change.
- Version every incompatible storage change. Validate before migration, commit the replacement before deleting the old copy, and make retries safe. Unsupported or corrupt data must not silently become an empty journal.
- Never send historical entries to AI to translate or enrich them without a requested feature and informed user consent.
- OpenAI keys stay in server-only environment variables. Never put them in source, mobile bundles, public environment variables, screenshots or logs.
- Send only the current entry and category, after the in-app consent step. No journal bodies or provider secrets in logs.
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

## Definition of done

A task is done when the requested behavior and docs agree, required checks pass (or a concrete environment blocker is recorded), existing journal data is preserved, and the final response briefly states what changed, how it was checked and any material remaining limits. Never describe an exported JavaScript bundle as an installed app, a signed build, or a store release.

Codex instruction-file reference: https://developers.openai.com/codex/guides/agents-md/
