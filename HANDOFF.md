# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then `docs/data-research.md`.

## Current state

Live on classicmaple.wiki as of 2026-10-15, ready for Grand Launch on 2026-10-21:

- **Data:** 1,298 entries from MapleClassic Wiki with core numbers (specs 0005, decision 0008), sprites, minimaps (decision 0010), map exits, and complete quests with steps (spec 0012).
- **Look and navigation:** the field guide look (spec 0006), places and cards everywhere (specs 0007, 0009), and links that stay inside the wiki (spec 0008).
- **Guides:** class, leveling, crafting, and citizenship guides from official sources, with skill icons by branch (spec 0011).
- **Contributions:** players send corrections through the Tally form at https://tally.so/r/GeveVj, linked from every page (spec 0010). Corrections arrive by email to the owner.
- **Brand:** the owner's painted icon is the logo and favicon.

## Next step

1. **Corrections:** turn incoming ones into data pull requests with the right build.
2. **Sprites:** add sprites for the 19 Classic-only NPCs from owner or player screenshots (source `own-screenshot`), and skill icons for Precise Strikes, Amazon's Judgement, Critical Recovery, and Nimble Recovery.
3. **Class characters:** paint them (prompts in `docs/art-direction.md`) and drop them into `src/assets/characters/`.
4. **Library speed:** page the library. It scores 92 on mobile against a 95 target.
5. **Remaining gaps:** fill those in `docs/launch-readiness.md` after launch. Rerun `npx tsx scripts/audit-site.ts`.
6. **Branches:** delete the old merged branches when the owner says so.

Open every pull request against `main`.

## Blockers and questions for the owner

None.

## Verify

```bash
npm run validate
npm run build
```
