# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

Phase 1 is done. The site is live at https://classicmaple.wiki. Phase 2 (item P2) is in progress. The two research documents are written and waiting for owner review. No spec 0002 yet. No design code yet.

## Just done

- `docs/research/ui.md`: eleven reference sites, the six Slow Snails principles applied to a wiki page, and the library of places developed into rules.
- `docs/research/assets.md`: a 53 row asset inventory, verified Nexon quotes on fan sites, images, and money, enforcement history, and ten owner decisions with defaults.
- `docs/decisions/0003-original-art-only.md`: original art only, kept minimal.
- The research ran as a multi agent workflow. It hit a usage limit before its writers ran, so the documents were written from the saved findings. Quotes for the "other fan wikis" topic were never verified and are not shown.

## In progress

Nothing open in code.

## Next step

Owner reviews both research documents and answers Q8 and Q9 in `BACKLOG.md`. Then write `specs/0002-design-system.md` from `specs/_template.md`. It must cover tokens, type, the window frame, the scene band and mood system, the schema fields for scene and mood (needs owner approval), and two mockup directions of home, Thief, and a monster page.

## Blockers and questions for the owner

- Q8: the ten asset decisions in `docs/research/assets.md`.
- Q9: moment vocabulary and launch hubs in `docs/research/ui.md`.
- Donations are unclear under Nexon policy. Flagged before Phase 3.
- Set a Vercel spend limit before 2026-10-21.

## Verify

```bash
npm run validate
npm run build
```
