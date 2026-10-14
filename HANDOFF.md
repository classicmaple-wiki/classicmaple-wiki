# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

Branch `spec/0002-design-system`, pull request 3, holds the new design: windows, page title band, home, sprite rules. The owner rejected the scripted pixel scenes. Decision 0006 replaces them with painted pictures made with an image model. The code is ready: a picture dropped in `src/assets/scenes/` shows up on the next build, and a page's own sprite stands in its scene. Until pictures exist, scenes show a mood gradient. The live site still runs the old look.

## Just done

- Decision 0006 and `docs/policies/scene-art.md`: style rules, sizes, safe zones, file names, and a prompt for each of the seven scenes.
- `Scene.astro` now serves painted pictures as WebP at two sizes, with a night picture or a dimmed day picture in dark mode.
- Page sprite layer in `PageTitle.astro`. Footer: official game link, disclaimer, AI disclosure when art exists, Sirux link.
- Tested end to end with temporary pictures and a sprite, then removed them.

## In progress

Pull request 3. `public/mockups/` is still there and goes before merge.

## Next step

Owner paints Kerning City and Henesys first (P2e). Agent checks each picture on phone and desktop and reruns Lighthouse. Then delete `public/mockups/`, merge, and check production.

## Blockers and questions for the owner

- P2e scene pictures.

## Verify

```bash
npm run validate
npm run build
```
