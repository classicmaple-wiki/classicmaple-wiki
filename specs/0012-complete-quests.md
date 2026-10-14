# 0012: Complete quests

Status: built 2026-10-15. From the owner: "Next is the quests. No images, no npc for some. Let's complete them too."

## What was missing, and why

- Two quest NPCs, Slade and Lyn the Librarian, have no page on MapleClassic Wiki, so the importer dropped them and their quests lost the link.
- Nine quests have no NPC because they start from the quest log (7) or by themselves (2). The source records this as `start_mode`, but it was not imported.
- The source's quest steps, start map, and next quest were not imported.
- Quests had no picture of their own.

## What changed

- **NPCs named only by quests:** they become NPC records sourced to the quest page that names them: Slade, Lyn the Librarian, and a general Community Board.
- **Quest fields:** quests gain `start_mode`, `start_map`, `next`, and `steps`. Each step records only the NPC, monster, and map it names, never the source's step text. These are links between entries, allowed under option 2.
- **Quest page:** it says how the quest starts ("Your quest log" or "Starts by itself" when no NPC starts it) and where. It lists everyone to talk to, including NPCs along the way, as cards. A Steps window spells out each step from its names, such as "Talk to Silas Irons in Perion", then "Hunt Dark Axe Stump". The next quest joins the chain.
- **Pictures:** a quest's picture is its starting NPC's sprite, or else the turn-in or the first step NPC's. It shows on library cards and on the page banner. 264 of 276 quests have one. The other 12 belong to Classic-only NPCs with no sprite yet, or to event quests with no NPC.
- **Cards:** quest cards say where the quest starts.

## Coverage

| Field | Quests |
| --- | --- |
| Giver | 269 of 276 |
| Turn-in | 264 |
| Start map | 268 |
| Steps | 247 |
| Next quest | 101 |
| Starts without an NPC | 9 |

Four event quests have no start recorded at the source at all.

## Checks

- `npm run validate` and `npm run build` pass: 1,312 pages, no broken internal links.
