# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then `docs/data-research.md`.

## Current state

Pull request 5 is merged and live. Founder's Access patch notes summary is in place. Launch content research (item P5) is in progress. Every research pull request is tagged with `ai-drafted` and enters as `unverified` for owner review.

## Just done

- Summarized official Founder's Access release notes into `data/patches/2026-10-06-founders-access.yaml` from Nexon notice 45621.
- Validated schemas and static build cleanly with `npm run validate` and `npm run build`.
- Merged pull request 5 (`patch: summarize founder's access release notes`).

## In progress

Two pull requests wait for the owner, to merge in order:

1. #6, `data/mapleclassic-import`: 1,280 records from MapleClassic Wiki (spec 0005), NPC, quest, and shop pages, the library as the one way into every entry, and 594 sprites from maplestory.io (`scripts/fetch-sprites.ts`).
2. #7, `site/field-guide-look`: the new look (spec 0006, decision 0009). Built on #6.

## Next step

After both merge: run Lighthouse on the live site (previews need a Vercel login). Then P5 continues with level 1 to 30 routes.

Left for people: 104 entries without a sprite. Most have no exact name match on maplestory.io. King Slime and one NPC are too large and need trimming. Rerun `npx tsx scripts/fetch-sprites.ts` (dry run) to list them.

## Blockers and questions for the owner

None.

## Verify

```bash
npm run validate
npm run build
```
