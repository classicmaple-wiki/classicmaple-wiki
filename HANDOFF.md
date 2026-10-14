# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

The art led design is live. Branch `site/scenes-and-library` adds every remaining painted scene, four special page rooms, and the library (spec 0004): `/library/` lists every entry as an inventory card with search and type filters, and items and maps get their own pages. Crimson Balrog has the first sprite. It waits for the owner's review on the pull request preview.

## Just done

- Scenes: Maple Island, Ellinia, Perion, Sleepywood, Default, plus workshop, harbor board, potion shop, and closed shop. What changed and 404 use their rooms. Only home has a night picture.
- Library page, cards, item and map pages, Library in the sidebar and on the home task grid.
- Sprite cap raised to 192 pixels for bosses.
- Lighthouse mobile on a local build: library 99, monster 98, item 98, accessibility 100, layout shift 0.

## In progress

Pull request for `site/scenes-and-library`.

## Next step

Owner reviews and merges. Then the launch content spec: where to level, quests, job advancement. Then the about and support pages in their rooms (P3), and more sprites (P2b). Launch is 2026-10-21.

## Blockers and questions for the owner

- Review the library on the preview.

## Verify

```bash
npm run validate
npm run build
```
