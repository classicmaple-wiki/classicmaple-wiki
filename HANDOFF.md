# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then `docs/data-research.md`.

## Current state

Pull request 5 is merged and live. Founder's Access patch notes summary is in place. Launch content research (item P5) is in progress. Every research pull request is tagged with `ai-drafted` and enters as `unverified` for owner review.

## Just done

- Summarized official Founder's Access release notes into `data/patches/2026-10-06-founders-access.yaml` from Nexon notice 45621.
- Validated schemas and static build cleanly with `npm run validate` and `npm run build`.
- Merged pull request 5 (`patch: summarize founder's access release notes`).

## In progress

Spec 0005, the MapleClassic Wiki import (option 2), is in a pull request from branch `data/mapleclassic-import`, labeled `ai-drafted`, waiting for owner review.

- 1,281 records imported, all `unverified`, each with `source_page`. The manifest is `data/imports/mapleclassic.yaml`.
- The owner chose not to ask the maintainers and to relicense the whole site to CC BY-NC-SA 4.0 (decision 0008, `data/imports/mapleclassic-license.md`).
- 1,300 pages build in about 3.5 seconds. Lighthouse mobile: library 98, monster page 98, accessibility 100.

## Next step

Owner reviews and merges the pull request. Then P5 continues with level 1 to 30 routes. Rerun the importer with `npx tsx scripts/import-mapleclassic.ts` (dry run) and `--write` when the source updates.

## Blockers and questions for the owner

None.

## Verify

```bash
npm run validate
npm run build
```
