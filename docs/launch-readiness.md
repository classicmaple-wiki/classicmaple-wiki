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

All 1,294 entries are `unverified`. Since 2026-10-14 the importer also takes core numbers from MapleClassic Wiki's closed beta data (decision 0008, amendment). Everything else still waits for official sources or players.

| Collection | Entries | Filled | Still missing |
| --- | --- | --- | --- |
| Monsters | 62 | Level and HP on 61, EXP on 60 | MP and elements on all. Drops on 43. Sprite on 5. |
| Items | 451 | Required level on 346 | Stats on all 350 equipment items. Sprite on 59. |
| Maps | 279 | Level range on 117, town on 251 | Level range on 162, town on 28. |
| NPCs | 185 | Map on 182, sprite on 146 | Sprite on 39. Map on 3. |
| Quests | 276 | Giver on 266 | Rewards and level on all. |
| Shops | 30 | Stock on 24 | Prices on all. |
| Classes | 4 | | Skills: 2 recorded in total. |

Guides are short drafts:

| Guide | Words | State |
| --- | --- | --- |
| Classes: Warrior, Magician, Bowman | 49 each | Stubs |
| Classes: Thief | 143 | Short |
| Leveling: level 1 to 30 party route | 209 | Untested |
| Economy: crafting, citizenship | 66, 64 | Stubs |

## How each gap can be filled

1. **Game numbers.** Core numbers come from the importer. Item stats, prices, rewards, MP, and elements come only from official Nexon posts or a player's own screenshot.
2. **Sprites** (103 left). Most names do not match maplestory.io exactly. A person can search by hand, or draw one under the images policy.
3. **Guides.** The research agent (backlog P5) writes them from official sources. Priority: level 1 to 30 routes, job advancement, then each class.
4. **Missing links** (towns, givers, stock). Fill by hand from in-game screenshots after launch.

## Owner decisions, 2026-10-14

- Game numbers: import the core numbers only (monster level, HP, EXP, item required level, map level ranges). Item stats, prices, and rewards stay with official sources and players.
- Guides: drafted by an agent from Nexon's official sources only, as a pull request labeled `ai-drafted`.

## Rerun the audit

```bash
npm run build
npx tsx scripts/audit-site.ts
```
