# 0010: Map minimaps

Date: 2026-10-15. Status: accepted by the owner. Updates 0005 and the images policy.

## Context

Map pages showed only their town's painted scene. The owner pointed at another MapleStory wiki whose map pages show the map's minimap, and asked for the same: "we should have a minimap too." The images policy forbade all Nexon map art.

## Decision

- Each map page may show that map's minimap: the small overview the game draws in the corner of the screen.
- Minimaps come only from maplestory.io, the same allowed source as the sprites. `scripts/fetch-sprites.ts` matches each map by its exact name, one request a second, and keeps a file only if it is a PNG of at most 640 pixels a side and 80 KB.
- Files live in `public/minimaps/<map id>.png`. Each map's `minimap` field names its source and the date it was fetched. `npm run validate` checks every file the same way it checks sprites.
- Full map renders, backgrounds, and other Nexon map art stay out.

## Consequences

- A minimap is Nexon's art, like a sprite. The fan site disclaimer covers it, and a takedown request removes the file and its field.
- Maps whose names differ from the old Global data get no minimap until someone matches them by hand.
