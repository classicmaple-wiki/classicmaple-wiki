# Handoff

Rewritten every session. Read this, then `AGENTS.md`, then `docs/data-research.md`.

## Current state

Live on classicmaple.wiki, ready for Grand Launch on 2026-10-21:

- **Data:** 1,298 entries from MapleClassic Wiki with core numbers, sprites, minimaps, map exits, and complete quests (specs 0005, 0012).
- **Look and navigation:** the field guide look, places and cards everywhere, links inside the wiki (specs 0006 to 0009).
- **Guides:** class, leveling, crafting, and citizenship guides from official sources, with skill icons by branch (spec 0011).
- **Contributions:** the Tally correction form on every page (spec 0010). Corrections arrive by email.
- **Brand:** the owner's painted icon is the logo and favicon. Shared links show a social card, a crop of the Henesys painting.
- **Player guides:** community guides summarized in our words, credited and linked (spec 0013). First entry: ProfessorX Maple's meso guide. Live 2026-10-19.

## Next step

0. **Launch day, 2026-10-21:** redeploy on Vercel, by a merge or by hand. The home page build line is fixed at build time.
1. **What's new:** build spec 0014 once approved.
2. **Corrections:** turn incoming ones into data pull requests with the right build.
3. **Sprites:** 19 Classic-only NPCs from owner or player screenshots, and four missing skill icons.
4. **Class characters:** paint them (prompts in `docs/art-direction.md`), drop into `src/assets/characters/`.
5. **Library speed:** page the library. Local Lighthouse mobile 2026-10-19: library 59. Measure on production.
6. **Remaining gaps:** fill those in `docs/launch-readiness.md` after launch.
7. **Branches:** delete merged ones when the owner says so.

Pull requests go against `main`.

## Blockers and questions for the owner

Spec 0014, What's new on the home page, waits for approval. Confirm the meso guide creator's channel link for `creator_url`.

## Verify

```bash
npm run validate
npm run build
```
