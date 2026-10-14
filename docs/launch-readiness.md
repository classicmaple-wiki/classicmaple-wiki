# Launch readiness

Audit of 2026-10-14, a week before Grand Launch on 2026-10-21. It checks every built page for placeholder text, broken links, and missing values. Rerun it before launch and update this page.

## Done in this pass

- Every place on the home shelf has its own page: maps by kind, monsters and NPCs with sprites, shops, and quests (spec 0007). "No pages yet" is gone.
- Map pages show their kind, their town linked to its place, the monsters and NPCs there as cards, and the shops.
- Item pages show which monsters drop them, with the chance and kills, and which shops sell them.
- NPC pages link to their town's place.
- The empty History window is hidden until an entry has a recorded change. It was on 1,284 pages.
- No broken internal links across 1,305 pages.

## What is still missing

All 1,294 entries are `unverified`. These values are empty because option 2 of spec 0005 leaves out numbers that come from the game's files, and no player has added them yet.

| Collection | Entries | Missing |
| --- | --- | --- |
| Monsters | 62 | Level, HP, EXP on all 62. Drops on 43. Sprite on 5. |
| Items | 451 | Required level on all 451. Stats on all 350 equipment items. Sprite on 59. |
| Maps | 279 | Recommended levels on all 279. Town on 28. |
| NPCs | 185 | Role on all. Sprite on 39. Map on 3. |
| Quests | 276 | Rewards and level on all. Giver on 10, turn in on 15. |
| Shops | 30 | Prices on all. Stock on 6. |
| Classes | 4 | Skills: 2 recorded in total. |

Guides are short drafts:

| Guide | Words | State |
| --- | --- | --- |
| Classes: Warrior, Magician, Bowman | 49 each | Stubs |
| Classes: Thief | 143 | Short |
| Leveling: level 1 to 30 party route | 209 | Untested |
| Economy: crafting, citizenship | 66, 64 | Stubs |

## How each gap can be filled

1. **Game numbers** (levels, HP, EXP, stats, prices, rewards). Only three sources are allowed: official Nexon posts, a player's own screenshot, or, if the owner changes the rule, MapleClassic Wiki's client-derived values. See the open question below.
2. **Sprites** (103 left). Most names do not match maplestory.io exactly. A person can search by hand, or draw one under the images policy.
3. **Guides.** The research agent (backlog P5) writes them from official sources. Priority: level 1 to 30 routes, job advancement, then each class.
4. **Missing links** (towns, givers, stock). Fill by hand from in-game screenshots after launch.

## Open question for the owner

Should game numbers come from MapleClassic Wiki (spec 0005 option 1, entered as `unverified`), or only from official posts and players? Option 1 fills almost every table before launch, but goes against the rule against datamined sources, and the legal review covered option 2 only.

## Rerun the audit

```bash
npm run build
npx tsx scripts/audit-site.ts
```
