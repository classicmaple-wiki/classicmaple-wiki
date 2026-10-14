# Data research brief

For any agent or person filling the wiki with game information: Gemini, Antigravity, Claude, or a player. Read `AGENTS.md` first, then this page. It says what counts as true, where to look, how to write it down, and how to hand it in.

The wiki covers **MapleStory Classic World only**: Nexon's official classic server, which opened as Founder's Access on 2026-10-06 and has its Grand Launch on 2026-10-21. It is not old Global MapleStory, not any private server, and not modern MapleStory. Many values changed. Accuracy beats coverage: a page that says Unknown is correct, a page with a wrong number is not.

## What counts as a source

Ranked from strongest to weakest. Every fact needs one, plus the build it applies to.

| Rank | Source | Use it for | Status it supports |
| --- | --- | --- | --- |
| 1 | Nexon's official Classic World patch notes, news posts, and FAQ on nexon.com | Anything they state directly | `official` |
| 2 | A screenshot taken in the live Classic World game, by a player, showing the value | Stats, drops, quest steps, NPC locations | `in-game` |
| 3 | A player's written report without a screenshot | Leads only | `unverified` |

Not sources, never cite them, never copy from them:

- Old Global MapleStory data from any year, including version 83 databases such as maplestory.io's numbers. Classic World changed many values. maplestory.io may be used for sprites only, under `docs/policies/images.md`, never for numbers.
- Private servers and their libraries: MapleLegends, MapleRoyals, Old School Maple, and any other. Nexon forbids promoting them, and their values are their own.
- Other wikis and databases: Fandom, maplestorywiki.net, Hidden Street, NiaMeowDB, and the like. Their text and data are not ours to copy, and most describe a different version. You may read them to learn what to look for, then confirm it from a rank 1 or 2 source.
- One exception: MapleClassic Wiki, imported only by `scripts/import-mapleclassic.ts` and only the fields in spec 0005 (decision 0008). Never copy from it by hand, and never copy its prose. Its records enter as `unverified` like anything else.
- Modern MapleStory, MapleStory Worlds, MapleStory M, or any regional server other than Classic World.
- Your own memory or a model's general knowledge. If you cannot point to a rank 1 or 2 source, the value stays out.

## Rules that never bend

1. **Never invent a value.** Leave a field out when you have no source. The site shows Unknown.
2. **AI never raises a verification status.** Anything an AI drafts enters as `unverified`, even when it quotes official notes. A human owner reviews it and raises it.
3. **Every number names its build.** Use an id from `data/builds.yaml`: `founders-2026-10-06` today, `launch-2026-10-21` from launch day.
4. **Write in your own words.** Summarize official notes, cite them, never paste them in full. Short sentences, plain words, no em dashes.
5. **Link inside the wiki, cite outside it.** Write names plainly. The build links the first mention of every place, NPC, monster, map, quest, shop, item, and class to its page (spec 0008). Cite sources as footnotes, `fact[^1]`, with `[^1]: [Title](url), read on YYYY-MM-DD.` at the end of the page. Never link a name to an outside site.
6. **Do not delete history.** When a value changes between builds, update it and add a line to `changes`.
7. **Do not scrape.** Read pages one at a time, respect rate limits and robots rules, and never bulk download. Never fetch from a private server.
8. **No schema changes without the owner.** If the data needs a new field or a new collection, such as quests or NPCs, write a short spec in `specs/` and stop.

## Where things go

| Information | File | Format |
| --- | --- | --- |
| Monster stats, drops, weaknesses | `data/monsters/<id>.yaml` | `schemas/index.ts`, `monster` |
| Item category, level, stats | `data/items/<id>.yaml` | `item` |
| Map region, levels, monsters | `data/maps/<id>.yaml` | `map` |
| Class skills and what changed | `data/classes/<id>.yaml` | `characterClass` and `skill` |
| Crafting professions | `data/professions/<id>.yaml` | `profession` |
| Systems such as citizenship | `data/systems/<id>.yaml` | `system` |
| Patch notes | `data/patches/YYYY-MM-DD-name.yaml` | `patch` |
| A new build | `data/builds.yaml` | `build` |
| Leveling routes | `src/content/docs/leveling/<name>.mdx` | Frontmatter in `CONTRIBUTING.md`, "Leveling routes" |
| Class guides and other prose | `src/content/docs/` | Starlight Markdown or MDX |
| Sprites | `public/sprites/` plus a `sprite` block | `docs/policies/images.md` |

Ids are lowercase kebab case and match the file name. `CONTRIBUTING.md` shows full examples.

A data entry from research looks like this:

```yaml
id: green-mushroom
name: Green Mushroom
level: 15
verified:
  status: unverified        # always, for AI drafted work
  build: founders-2026-10-06
  source: https://link-to-the-official-post-or-screenshot
  date: 2026-10-15
```

## Priorities for launch

In this order. Each is useful on its own.

1. **Patch notes.** Summarize the Founder's Access release notes into `data/patches/2026-10-06-founders-access.yaml`, and list in `affects` every entry they change. Add the Grand Launch notes when Nexon posts them.
2. **Level 1 to 30.** Fill `src/content/docs/leveling/level-1-30-party-route.mdx` and write solo routes per class, only with maps, levels, and reasons confirmed for Classic World. Mark what is tested and what is theory. Leave `tested_in` out until a player has run it.
3. **Job advancement.** For each of the four classes: the level, the NPC, the place, and the requirements, from official posts or screenshots.
4. **Monsters and maps for levels 1 to 30.** One file each, linked: maps list their monsters.
5. **What is different from the original.** The `differs_from_original` notes on classes, skills, monsters, and items, from official notes.
6. **Professions and citizenship.** Classic World's new systems, from official posts.

## Handing work in

1. Work on a branch, one topic per pull request.
2. Run `npm run validate` and `npm run build`. Both must pass.
3. Title the pull request with `data:`, `guide:`, or `patch:`, and add the `ai-drafted` label.
4. In the pull request, list every source you used, with links, and anything you could not confirm.
5. The owner reviews on the Vercel preview, raises statuses where the sources hold, and merges.

## When in doubt

Leave it out and say so in the pull request. Unknown is honest. A wrong number on a wiki that promises every number is tagged with its build breaks the one thing the site exists to do.
