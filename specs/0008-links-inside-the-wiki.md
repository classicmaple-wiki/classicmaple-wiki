# 0008: Links stay inside the wiki

Status: built 2026-10-14, for owner review. From the owner: "they supposed to work like spider web in our site, not linking to external sources. When i click Henesys it links to Nexon, it's supposed to be our wiki about that map."

## Problem

Guide values and text linked to Nexon's pages. Status chips linked to MapleClassic Wiki. A reader who clicked a name left the wiki instead of reaching our page about it.

## Requirements

- [x] A name in a guide links to our own page: a place, NPC, monster, map, quest, shop, item, or class. The first mention on each page links automatically at build time (`src/lib/entityLinks.mjs`).
- [x] Sources are numbered footnotes. The notes jump to a Sources list at the bottom of the page, the only place external links appear in a guide.
- [x] Job path values link to the NPC and place pages.
- [x] Status chips never link out. On an imported page the chip jumps to the Source block at the bottom.
- [x] `npm run validate` and `npm run build` pass, with no broken internal links.

## Design

The linker is a Markdown plugin for Astro's Sätteri processor, declared in `package.json` with the owner's approval on 2026-10-14. It reads names from `data/` at build time. One-word names link only for places, NPCs, monsters, and classes. When two entries share a name, the place wins, then class, NPC, monster, quest, shop, map, and item. Footnotes use GFM syntax, `[^1]`, and the section is labeled Sources.
