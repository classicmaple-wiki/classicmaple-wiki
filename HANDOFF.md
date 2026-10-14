# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

Spec 0003, the interface that serves the art, is built on branch `spec/0002-design-system`, pull request 3, and waits for the owner's review on the preview. The home page centers on search over a veiled Henesys picture. Inner pages hang the page name on a wooden sign in the picture and attach a wooden strip under it. Painted scenes exist for Henesys (day and night) and Kerning City (dusk). The live site still runs the old look.

## Just done

- Home centered on search, inner page map name sign, attached strip. The owner rejected the floating title panel.
- Fixes from an independent review: dark mode placeholders, lead window and breadcrumb contrast, focus on wood, stone footer, painted only place shelf, leftover pixel font chrome.
- Lighthouse mobile on a local build: home 99, Thief 98, Crimson Balrog 98, accessibility 100, layout shift 0.

## In progress

Pull request 3, ready to merge. The old mockups are deleted.

## Next step

Owner merges pull request 3. Then check production and run Lighthouse there. The owner paints the remaining scenes with `docs/art-direction.md`; the agent installs each one.

## Blockers and questions for the owner

- Review of the preview.
- Remaining pictures: Kerning City night, Maple Island, Ellinia, Perion, Sleepywood, Default.

## Verify

```bash
npm run validate
npm run build
```
