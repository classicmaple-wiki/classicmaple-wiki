# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

The design system (spec 0002, the mix of mockups A and B) is built on branch `spec/0002-design-system`, pull request 3, and waits for the owner to look at the preview. The live site still runs the old look. The sprite system (decision 0005) is set up as rules, data, and validator checks, but no sprites exist yet.

## Just done

- Scenes: seven original pixel scenes from `scripts/draw-scenes.py`, in `src/components/scenes/`.
- Windows: `Window`, `StatRows`, `Invitation`, and every data component restyled.
- Page title band and home page as Starlight overrides. Silkscreen and Nunito self hosted and preloaded.
- Checked: no sideways scroll on 9 pages at 360 and 1280 in both themes. Lighthouse mobile on a local build 98 to 99, accessibility 100, layout shift 0.
- Sprite rules in `docs/policies/images.md`, sources in `data/sprite-sources.yaml`, evidence in `docs/research/sprite-sources.md`.

## In progress

Pull request 3. `public/mockups/` stays until the owner has compared, then is deleted before merge.

## Next step

Owner reviews the preview. Then delete `public/mockups/`, merge, and run Lighthouse on production. Then P2b, the first sprites, and P3.

## Blockers and questions for the owner

- Q10 takedown contact, Q11 source statuses, Q2 donation platforms, Q3 credit name. See `BACKLOG.md`.
- Direction C, the storybook look in decision 0005, waits for the owner's reaction to this build.

## Verify

```bash
npm run validate
npm run build
python3 scripts/draw-scenes.py
```
