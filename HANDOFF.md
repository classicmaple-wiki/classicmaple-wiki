# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then `docs/data-research.md`.

## Current state

Pull request 4 is merged. The art led design, scenes, library, and sprite foundations are live on https://classicmaple.wiki. Launch content research (item P5) is in progress. Every research pull request is tagged with `ai-drafted` and enters as `unverified` for owner review.

## Just done

- Summarized official Founder's Access release notes into `data/patches/2026-10-06-founders-access.yaml`.
- Verified dates, level cap (100), region scope, job paths, and new systems against official Nexon notice 45621.
- Validated schemas and static build cleanly with `npm run validate` and `npm run build`.
- Opened pull request `patch: summarize founder's access release notes`.

## In progress

P5 launch content. Next topic is priority 2: level 1 to 30 leveling routes in `src/content/docs/leveling/`.

## Next step

Owner reviews the Founder's Access patch notes pull request on the Vercel preview. Then the research agent creates the plan and branch for level 1 to 30 leveling routes.

## Blockers and questions for the owner

- Review pull request for Founder's Access patch notes on its Vercel preview link.

## Verify

```bash
npm run validate
npm run build
```
