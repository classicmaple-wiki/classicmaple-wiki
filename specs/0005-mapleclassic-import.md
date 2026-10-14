# 0005: Seed the database from MapleClassic Wiki

Status: draft. Option 2 chosen on 2026-10-13. Built and dry run. The real run waits on the license question in "Legal review".

## Problem

The wiki is almost empty two weeks before launch. MapleClassic Wiki (mapleclassic.wiki) is a Classic World wiki with structured data, licensed CC BY-NC-SA 4.0, which allows reuse with attribution under the same license. The owner asked to seed from it.

## What was verified on 2026-10-14

All through their MediaWiki API, one request at a time, with a User-Agent naming classicmaple.wiki.

- License: CC BY-NC-SA 4.0, from the site's own rights info.
- robots.txt allows everything except `/index.php?` and `/wiki/Special:`. The API at `/api.php` is allowed.
- Scope: Classic World only. Their About page says it documents the game "as seen in its closed beta testing".
- Structure: every fact lives in a Cargo table, readable through `action=cargoquery`. No page text parsing is needed for data.
- Size: monsters 74 (game version 0.9.0, the beta), items 2,513 (all "pre-launch"), quests about 530, maps 281, NPCs 191, shops 31, monster drops 158.
- Provenance: their pages state that many values come from the game's client data. For example: "Map sizes come from the same client data", and "What a coupon costs. Cash prices are not in the client data." Monster drops are different: 137 of 158 rows record `observed_by`, `observed_on`, and `sample_kills`, so they come from players.

## The blocking question

The owner's instructions say both "seed from mapleclassic.wiki" and "do not use any datamined source". MapleClassic Wiki is itself largely built from client data: the 2,513 items, the monster stats, the quest rewards, the shop prices. Three ways forward:

1. **Import everything from MapleClassic Wiki.** Treat it as one cited wiki source, and read the datamining ban as covering the other named sites and raw datamine dumps only. Fastest and fullest. Every record still enters as `unverified`.
2. **Import only what players observed, plus the list of what exists.** Names, ids, maps, NPC locations, quest names and givers, and observed drops. Leave out every number that comes from client data, such as stats, prices, and rewards. The pages show the entity with Unknown values for players to confirm.
3. **Do not import.** Stay with official sources and screenshots only.

Recommendation: option 2 if the datamining ban is meant strictly, option 1 if it was aimed at the other sites. The importer is the same code for both. Only a field allow list changes.

**Answer, 2026-10-13: option 2**, "and just make sure that it's safe to import without any law issues."

**Widened 2026-10-14: option 2 plus core numbers.** For launch the owner chose to import monster level, HP, and EXP, item required level, and map recommended levels, as `unverified`. Item stats, prices, and rewards stay out. Assumption: the source's game version 0.9.0 is the closed beta, Closed Online Test 2 (`cot2`). Their About page says the wiki documents the game "as seen in its closed beta testing", and their one dated update, 2026-08-11, falls inside that test. See decision 0008, amendment.

Option 2 narrows what comes from client data but cannot remove it. Names, locations, quest links, and shop lists were probably read from the closed beta client too. Only the drop rates are certainly player observed. Facts are not Nexon's copyright, and we never datamine ourselves, so the risk is low, but it is not zero.

## Legal review

Full text: `docs/research/mapleclassic-legal-review.md`. It is research, not legal advice. The short version:

- **The source contradicts itself on its license.** The footer and API say CC BY-NC-SA 4.0. The About page says editor content is CC BY-SA 4.0. Their copyright page does not exist. The two licenses cannot be mixed in either direction, so picking "the stricter one" is not automatically safe.
- **The review recommends a written answer from the maintainers before the real run.** Their About page also asks bulk importers to "coordinate with maintainers first". The owner said earlier not to contact other sites, so this is the owner's call.
- **Bare facts are mostly not protected** in US law (Feist). The license may not even reach them. Following it anyway is the safe default.
- **The names are close.** "Classic Maple Wiki" and "MapleClassic Wiki" are the same two words swapped. Every credit says we are independent of them.

What the importer and site now do because of it:

- Only api.php, an explicit field list on every query, and never `observed_by`, descriptions, NPC roles or summaries, prices, stats, or rewards.
- Stops if the license changes, or if a page level license template appears.
- `--write` refuses to run until `data/imports/mapleclassic-license.md` records which license the import relies on and why.
- `--remove-all` and `--remove-page` delete imported data in one command, for a takedown.
- The manifest records the date, the license, and the revision of every page. `npm run validate` fails if an imported record is not in it.
- Every imported page ends with a credit: the source page, a contributors link to its history, the license, "modified", what was left out, and the non-affiliation line.
- Drop rates show as "about 1 in N", labeled community estimates, with kills and date.

## Goals and non-goals

Goals:

- A rerunnable importer in `scripts/` that reads their Cargo tables and writes our YAML.
- New collections for NPCs, quests, and shops, plus drops on monsters.
- Attribution on every imported page, and the content license changed to match.

Non-goals:

- Images or game art of any kind.
- Game text copied verbatim: item descriptions, quest dialogue, NPC lines. These are Nexon's text, not theirs to license. Recommended: leave all `description_*` fields out.
- Data from MeowDB, Henesys.GG, MapleStory Quest, cw-wiki, or any datamine dump.
- Ads. There is no donation page today. The future support page will say donations fund hosting only.

## Requirements

- [ ] `scripts/import-mapleclassic.ts` reads only `api.php`, at most one request per second, with the User-Agent `ClassicMapleWikiImporter/1.0 (https://classicmaple.wiki; https://github.com/classicmaple-wiki/classicmaple-wiki)`.
- [ ] It never requests `/index.php?` or `Special:` pages, and never downloads images.
- [ ] It is rerunnable: an existing file is updated in place, never duplicated, and a value a human has raised above `unverified` is never overwritten.
- [ ] Every imported record stores `source_page`, the URL of the page it came from, and enters with `verified.status: unverified`.
- [ ] Every page built from an imported record shows: "Source: <page> on MapleClassic Wiki, CC BY-NC-SA 4.0, modified", with links to the page and the license.
- [ ] `LICENSE-CONTENT.md` and the footer say CC BY-NC-SA 4.0. Code stays MIT.
- [ ] New schemas for NPCs, quests, shops, and monster drops pass `npm run validate`.
- [ ] The library stays fast with thousands of entries. Lighthouse mobile 95 or more.
- [ ] `npm run validate` and `npm run build` pass, and the build time on Vercel stays under five minutes.

## Design

### Build

Under option 2 no imported record carries a game value, so records name no build. Drops are the one exception. Only rows observed on or after 2026-10-06 are taken, and each points at `founders-2026-10-06`. No closed beta build is needed.

### Schema additions

Owner approved in principle on 2026-10-14. Shapes to confirm:

- `data/npcs/<id>.yaml`: name, role, map, region.
- `data/quests/<id>.yaml`: name, required level, giver and turn in NPC ids, prerequisite quest id, region, rewards as a list of item ids and amounts, plus EXP and mesos under option 1 only.
- `data/shops/<id>.yaml`: name, NPC, map, and items with price, where prices are option 1 only.
- `drops` on each monster: item id, rate, quantity range, and the observation (`observed_on`, `sample_kills`). The rate is included even under option 2, since it is player observed.
- `source_page` on every entity. Optional, so hand made entries keep working.

### Importer

1. Fetch each table with `cargoquery` in pages of 500 rows, a little over one second apart. That is about 15 requests in total.
2. Map each row to our schema through one field map per table, which is also the allow list for options 1 and 2.
3. Turn their ids into our kebab case ids, keeping their numeric game id as `game_id`, so links between tables hold.
4. Write YAML, run validation, and print a summary: created, updated, skipped, and why.

### Site

- An attribution block on every imported entity page, under the windows.
- The library adds paging and type grouping, since one grid of 3,000 cards is too heavy for a phone.
- New pages for NPCs, quests, and shops, in the same window layout.

### Coordination

The research agent working on P5 writes some of the same entities by hand. The importer never overwrites an entry that has no `source_page`, or has a status above `unverified`.

## Tasks

- [x] Owner answers the blocking question: option 2.
- [x] Legal review, saved in `docs/research/mapleclassic-legal-review.md`.
- [ ] Owner decides the license basis: ask the maintainers, or proceed on the footer license. Record it in `data/imports/mapleclassic-license.md`.
- [ ] Owner decides: relicense the whole site to CC BY-NC-SA 4.0, or only the imported data and the pages built from it.
- [ ] Decision 0008: MapleClassic Wiki as a source, and the license change. Update `docs/data-research.md`, which today forbids copying other wikis.
- [x] Schemas and validator, including the import manifest check.
- [x] Importer script, with a dry run mode, the write gate, and removal.
- [x] Dry run: 1,281 records in 20 requests. Shown to the owner on 2026-10-13.
- [ ] Real run, on a branch, as one `data:` pull request labeled `ai-drafted`.
- [x] NPC, quest, and shop pages, the drops window, and the credit block.
- [ ] Credits page, privacy page, library paging, license files and footer, data notice.
- [ ] `npm run validate`, `npm run build`, Lighthouse.
- [ ] Update `BACKLOG.md` and `HANDOFF.md`.

## Open questions

- The license basis and the relicensing scope, above (blocking the real run).
- Confirm leaving out all game text: descriptions and dialogue.
- CC BY-NC-SA's non-commercial term binds all our content from then on, including what we write ourselves. The Sirux credit is fine. Ads and paid features would not be.
