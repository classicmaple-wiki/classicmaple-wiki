# Handoff

Rewritten every session. Read this, then `AGENTS.md`, then `docs/data-research.md`.

## Current state

Live on classicmaple.wiki, ready for Grand Launch on 2026-10-21:

- **Data:** 1,298 entries from MapleClassic Wiki with core numbers, sprites, minimaps, and quests (specs 0005, 0012).
- **Look and navigation:** the field guide look, places and cards everywhere, links inside the wiki (specs 0006 to 0009).
- **Guides:** class, leveling, crafting, and citizenship, from official sources (spec 0011).
- **Contributions:** the Tally correction form on every page (spec 0010). Corrections arrive by email.
- **Brand:** the owner's icon is the logo and favicon. Shared links show a social card.
- **Player guides:** community guides in our words, credited and linked (spec 0013). Live 2026-10-19. A second guide, weapon scrolling with 100% scrolls, is drafted on branch `claude/exciting-fermat-1vzl09`.
- **What's new:** the six newest entries top the home page, from player guides, guides with a `published` date, patch notes, and live builds, plus `/feed.xml` (spec 0014). On a branch, waiting for review.

## Next step

0. **Launch day, 2026-10-21:** redeploy on Vercel, by a merge or by hand. The home page build line is fixed at build time.
1. **What's new:** merge after review.
2. **Corrections:** turn incoming ones into data pull requests with the right build.
3. **Sprites:** 19 Classic-only NPCs from screenshots, and four skill icons.
4. **Class characters:** paint them (prompts in `docs/art-direction.md`), drop into `src/assets/characters/`.
5. **Library speed:** page the library. Local Lighthouse mobile 2026-10-19: library 59. Measure on production.
6. **Remaining gaps:** fill those in `docs/launch-readiness.md` after launch.
7. **Branches:** delete merged ones when the owner says so.

Pull requests go against `main`.

## Blockers and questions for the owner

Review the What's new branch on its preview. Confirm the meso guide creator's channel link for `creator_url`. For the weapon scrolling guide: the creator's name (the page says CREATOR NAME NEEDED), and whether the vendor town is Ellinia (the shared summary said "Lineia"). Do not merge it until both are filled in.

## Verify

```bash
npm run validate
npm run build
```
