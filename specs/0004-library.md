# 0004: The library

Status: built, waiting for owner review on the preview. Asked for by the owner 2026-10-14, who pointed at the Old School Maple library page as the layout to learn from.

## Problem

The data lives in separate places: a monster table, class guides, a crafting page. There is no single place to look anything up, items and maps have no pages at all, and nothing shows what an entry looks like. Players expect a game database that reads like an inventory: a grid of slots, each with the thing's picture, name, and one key fact.

## Goals and non-goals

Goals:

- One library page at `/library/` that lists every entry in `data/` as an inventory card, with a search box and filters by type.
- Pages for items and maps, like the monster pages, so every card leads somewhere.
- Sprites where an allowed source has them, following `docs/policies/images.md`. A card without a sprite shows a type glyph in its slot.
- The art direction: the library scene, wood and parchment, sign gold.

Non-goals:

- Copying anything from the reference site. It is a private server's library. We borrow the layout idea only, never its images, data, or wording, and we do not link to it.
- A "most searched" section. We have no search analytics and add no tracking.
- Generating item art. Sprites come only from allowed sources, or the slot shows a glyph.

## Requirements

- [x] `/library/` lists every entry in every data collection except builds and patches, as cards in a grid.
- [x] A search field filters cards by name as you type, and filter pills limit the grid to one type. Without JavaScript the full grid still shows.
- [x] Each card shows a type tag, a square slot with the sprite or a type glyph, the name, one short fact from the data (never invented, Unknown when missing), and the verification status.
- [x] Every card links to a page: monsters, items, and maps to their own pages, classes to their guide, professions and systems to their guide pages.
- [x] New pages `/items/<id>/` and `/maps/<id>/` in the same layout as monster pages.
- [x] Sprites are drawn with pixelated scaling at a whole number scale and never blur.
- [x] Mobile first, no horizontal scroll at 360 pixels, Lighthouse mobile 95 or more, accessibility 100, layout shift under 0.02.

## Design

- Page: a `StarlightPage` at `src/pages/library.astro` in the `default` scene, which is the library room. The sign reads "Library". Under it, a parchment search window holds the field and the pills.
- Cards: `src/components/LibraryCard.astro`. A small window: a chip for the type in the top left, an inset slot like an inventory cell, the name in Nunito 800, the fact line in muted text, the status chip. Three to six columns by width, two on phones.
- Data: one function in `src/lib/library.ts` reads every collection and returns card records: type, name, fact, link, sprite file, status. The fact per type: monster level, item category, map region, class "Class", profession unlock level, system unlock level.
- Filtering: a few lines of script that hide cards by `data-type` and by name. Pills are real buttons with `aria-pressed`.
- Sidebar: "Library" goes first under Database. The home page task card for monsters becomes "Library".
- Sprites: the first one, Crimson Balrog, comes from maplestory.io, which is `allowed` in `data/sprite-sources.yaml`.

## Tasks

- [x] `src/lib/library.ts`, `LibraryCard.astro`, `src/pages/library.astro`, styles.
- [x] `src/pages/items/[id].astro` and `src/pages/maps/[id].astro`.
- [x] Sidebar and home links.
- [x] First sprite.
- [x] Screenshots at 360 and 1280, light and dark. Lighthouse mobile on a local build: library 99, Crimson Balrog 98, Mark of the Beta 98, accessibility 100, layout shift 0.
- [x] `npm run validate` and `npm run build`.
- [x] Update `BACKLOG.md` and `HANDOFF.md`.

## Open questions

- Answered during the build: the sprite size cap rose from 128 to 192 pixels so large bosses fit, scaled down by whole numbers only. The first sprite is Crimson Balrog from maplestory.io, the classic boss frame, trimmed and halved.
- None blocking. The reference site was rate limited to our fetch, so the design follows the owner's screenshot.
