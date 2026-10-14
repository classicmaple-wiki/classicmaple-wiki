# 0007: Places and cross-links

Status: built 2026-10-14, for owner review. Asked for in the owner's launch revision: "I can still see no pages yet."

## Problem

The home shelf said "No pages yet" for four of six places, though their maps, monsters, and NPCs were imported. Entries also did not point at each other. An item did not say who drops or sells it, and a map did not show its town, NPCs, or shops.

## Goals and non-goals

Goals:

- One page per shelf place, gathering everything that belongs there.
- Links both ways between items, monsters, maps, NPCs, and shops, built from data we already hold.

Non-goals:

- New game numbers. See `docs/launch-readiness.md`.

## Requirements

- [x] Maps record `town` and `kind` from MapleClassic Wiki's `nearest_town` and `map_type`. Both are optional schema fields.
- [x] `/places/<scene>/` for the six shelf places: monsters and NPCs as cards, maps by kind, shops, and quests.
- [x] Every shelf card links to its place. The sidebar has a Places group.
- [x] Map pages show kind, town, monsters, NPCs, and shops. Item pages show Dropped by and Sold at. NPC pages show their town.
- [x] The History window shows only when an entry has a recorded change.
- [x] `scripts/audit-site.ts` reports placeholders, Unknown counts, and broken links. No broken links.
- [x] `npm run validate` and `npm run build` pass.

## Design

`src/lib/places.ts` maps a town name to a place. Maple Island's small towns count as Maple Island, and Ellinia Station as Ellinia. NPCs and shops follow their map, quests their giver, and monsters every map they live on. Map scenes now follow their town first.

## Tasks

- [x] Importer, schema, places helper, place pages, cross-links, audit script, launch readiness doc.
- [x] Update `BACKLOG.md` and `HANDOFF.md`.
