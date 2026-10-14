# 0006: Painted scene art, with the page's own sprite in the room

Date: 2026-10-13. Status: accepted by the owner 2026-10-13. Amends 0003 and 0005.

## Context

The owner rejected the scenes built for spec 0002. They were geometric pixel shapes drawn by a script, and they do not feel like MapleStory. The reference is a Slow Snails style picture: a richly painted pixel art room in warm lamplight, with depth, props, neon, and real MapleStory characters sitting in it. A drawing script cannot reach that. The agent has no image generation tool, so the art has to be made with an image model or by an illustrator, then dropped into the site.

## Decision

Scene art is painted, not scripted.

- Each of the seven scenes gets one painted picture, and optionally a second one for night, used in dark mode. The owner or a contributor makes them with an image model or by hand, following `docs/policies/scene-art.md`.
- The pictures are our own. They evoke the 2006 to 2009 MapleStory look, which is a style, but never trace or reproduce a specific Nexon map, background, or character. No people or creatures are painted in. No Nexon or MapleStory logos.
- AI use is disclosed in the site credits, the way Slow Snails discloses it: scene art made with AI image tools and edited by hand.
- The picture is a stage. Life comes from real sprites placed on top by the site: a page about a monster, NPC, or item shows that entry's own sprite standing in its room. This widens 0005 by one step. A sprite may sit in the scene band of its own page, still to identify that page's subject, never as decoration on other pages.
- Until a scene has its picture, the band shows a plain gradient in the scene's mood. No more scripted drawings.

## Consequences

- The site's look depends on art the owner makes. The code is ready before the art: dropping a file into `src/assets/scenes/` is the whole change.
- Image weight matters. The build converts each picture to WebP at a few sizes. Lighthouse must stay at 95 or above on mobile, so pictures are checked after each one lands.
- Every sprite still follows `docs/policies/images.md`, and only allowed sources are used. Sources are never contacted.
- Some fans dislike AI art. The disclosure line and the hand edit requirement are the answer. The owner accepts that trade.
- The scripted scenes and their generator were deleted on 2026-10-13, with the owner's approval.
