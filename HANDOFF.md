# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

Phase 1 is done. The site is live at https://classicmaple.wiki. Phase 2 (item P2) is waiting for the owner. Spec `specs/0002-design-system.md` is a draft. Decision 0004, keep Starlight, is proposed. Two mockup directions are on branch `spec/0002-design-system` with an open pull request and a Vercel preview.

## Just done

- Research documents, decision 0003, and the owner's answers to all asset and scene questions.
- Spec 0002 with checked contrast numbers for every token pair.
- Mockups in `public/mockups/`: direction A "Morning Shelf" and B "Old Window", each with home, Thief, and Crimson Balrog. Built, reviewed with screenshots, and fixed by a multi agent workflow, then checked by hand.
- Display font changed from Pixelify Sans to Silkscreen, because Pixelify's C reads as O.

## In progress

Pull request for `spec/0002-design-system`. Do not merge until the owner picks a direction. `public/mockups/` must be deleted before merge.

## Next step

Owner picks A, B, or a mix, approves spec 0002, decision 0004, and the schema change. Then run Phase B of the spec's Tasks on the same branch.

## Blockers and questions for the owner

- Pick a direction.
- Approve spec 0002, decision 0004, and the `scene`, `mood`, `subtitle` schema fields.
- Confirm Silkscreen as the display font.
- Set a Vercel spend limit before 2026-10-21.

## Verify

```bash
npm run validate
npm run build
open public/mockups/index.html
```
