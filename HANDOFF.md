# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

The art led design is live on https://classicmaple.wiki. Pull request 4 (`site/scenes-and-library`) adds every painted scene, four special page rooms, the library (spec 0004), item and map pages, the first sprite, and the data research brief. It waits for the owner to merge. Game content is still mostly Unknown, and data research is being handed to Gemini or Antigravity.

## Just done

- `docs/data-research.md`: what counts as a Classic World source, what never does, the rules, where each fact goes, launch priorities, and how to hand work in.
- `GEMINI.md` pointer, and AGENTS.md now points data work at the brief.
- The library, scenes, and sprite work listed in spec 0004.

## In progress

Pull request 4. P5 launch content, by a research agent, from the brief.

## Next step

Owner merges pull request 4. The research agent works through the priorities in `docs/data-research.md`, one pull request per topic, each labeled `ai-drafted`. The owner reviews each on its preview and raises statuses only where sources hold. Then P3 (about and support pages in their rooms) and more sprites (P2b). After launch, stage 1 of P4d. Launch is 2026-10-21.

## Blockers and questions for the owner

- Merge pull request 4.
- Review research pull requests as they arrive.

## Verify

```bash
npm run validate
npm run build
```
