# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

The art direction is set (decision 0007, `docs/art-direction.md`): painted HD pixel art, made with ChatGPT, leads the whole site. Three approved reference pictures are live on branch `spec/0002-design-system`, pull request 3: Henesys day and night, Kerning City at dusk. Spec 0003, an interface that serves the art, is drafted and waits for the owner. The live site still runs the old look.

## Just done

- Installed `henesys-night.webp` and `kerning-city.webp`. Kerning mood is now dusk, and the Thief subtitle says rooftops at dusk.
- Renamed the scene guide to `docs/art-direction.md` and grew it into the full art direction: references, the look, rules, the prompt kit with layout blocks for scenes, share images, icons, and textures, plus fix-up phrases and file steps.
- Decision 0007 and draft spec 0003.
- Lighthouse mobile with the Henesys picture: home 98, crafting 97, layout shift 0.

## In progress

Pull request 3. `public/mockups/` goes before merge.

## Next step

Owner approves spec 0003 and answers its three open questions. Then build it on the same branch for home, Thief, and Crimson Balrog.

## Blockers and questions for the owner

- Spec 0003 approval and its open questions: title font, textures, sidebar.
- More pictures: P2e in `BACKLOG.md`.

## Verify

```bash
npm run validate
npm run build
```
