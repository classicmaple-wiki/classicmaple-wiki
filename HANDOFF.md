# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then `docs/data-research.md`.

## Current state

Everything from 2026-10-14 is merged and live on classicmaple.wiki:

- **Import:** 1,280 records from MapleClassic Wiki (spec 0005) with core numbers (decision 0008, amendment), 594 sprites, and the importer and sprite scripts.
- **Look:** the field guide look (spec 0006, decision 0009).
- **Places and links:** place pages and links between entries (spec 0007), plus links inside the wiki and sources as footnotes (spec 0008).
- **Guides:** drafts from official sources. Everything is `unverified`.
- **Live Lighthouse mobile:** home 99, monster page 99, Henesys 100, library 92. Accessibility is 100 everywhere.

## Latest

Pull request for spec 0009, easier navigation: map pictures from town scenes, map exits, cards for quest NPCs, shop stock, and NPC links, geographic breadcrumbs, and Places, Classes, and Economy index pages.

## Next step

1. **Library speed:** it scores 92, under the 95 target. Page or lazy-render the grid; it has 18,000+ elements.
2. **Class characters:** the owner is painting them. Drop PNGs into `src/assets/characters/` (prompts in `docs/art-direction.md`).
3. **Owner review of the guide drafts:**
   - The October 15 fixes come from a notice for maintenance that hasn't happened yet.
   - The route's `party_size: 4` has no source.
   - The old Warrior Rush and Magician Holy Symbol entries have no source.
4. **Remaining gaps:** listed in `docs/launch-readiness.md`. Rerun `npx tsx scripts/audit-site.ts` before launch on 2026-10-21.
5. **Branches:** the merged stacked branches can be deleted once the owner says so: `data/mapleclassic-import`, `site/field-guide-look`, `site/launch-revision`, `data/core-numbers`, `guides/official-drafts`, `release/launch-ready`.

Open every pull request against `main`. Stacked pull requests merged into each other and missed `main` on 2026-10-14.

## Blockers and questions for the owner

None.

## Verify

```bash
npm run validate
npm run build
```
