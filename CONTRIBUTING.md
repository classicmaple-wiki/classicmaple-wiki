# Contributing to Classic Maple Wiki

Thanks for helping. This wiki is built by players, for players. You do not need to know how to code to contribute.

> Fan project. Not affiliated with or endorsed by Nexon.

## The one rule

Every fact needs two things: a **source** and a **build**.

- **Source:** official patch notes, an official post, or your own in-game screenshot.
- **Build:** the game version you saw it in. Valid build ids are listed in `data/builds.yaml` (for example `cot2`, `founders-2026-10-06`, `launch-2026-10-21`).

Not sure about a number? Submit it anyway and mark it `unverified`. An unverified entry may leave out the source and the build. Unverified data is welcome. Unsourced data presented as fact is not.

Do not know a value at all? Leave the field out. The site shows it as Unknown. Never guess.

Values from old MapleStory (pre Big Bang GMS, private servers, other wikis) are not sources. Classic World changed many of them.

## Three ways to contribute

### 1. Report it (no Git needed)

Open an issue and pick a form:

- **Data correction** (a stat on the site is wrong)
- **New item or monster stats**
- **Patch note update**
- **Leveling route**

Fill in the blanks and attach a screenshot. A maintainer turns it into a change and credits you.

### 2. Edit in the browser

Every page has an **Edit page** link at the bottom. Click it, make your change, and choose **Propose changes**. GitHub creates the fork and pull request for you.

### 3. Work locally

Requires Node 22.12 or newer.

```bash
git clone https://github.com/classicmaple-wiki/classicmaple-wiki.git
cd classicmaple-wiki
npm install
npm run dev        # local site with live reload
npm run validate   # checks every data file against its schema
```

## Where things live

| I want to change | Go to |
| --- | --- |
| A stat, drop, weakness, EXP value | `data/` |
| A guide or route | `src/content/docs/` |
| How a table or card looks | `src/components/` |
| What fields a data type has | `schemas/` (open an issue first) |

**Numbers live in `data/`. Words live in guides.** Guides pull numbers from data instead of typing stats by hand, so one data fix updates every page that uses it.

## Data entries

One entity, one file. The filename is the id, in lowercase kebab-case.

```yaml
# data/monsters/green-mushroom.yaml
# Example values only, not real data.
id: green-mushroom
name: Green Mushroom
level: 15
hp: 250
exp: 26
weak_to: [fire]            # fire | ice | lightning | poison | holy
strong_to: []
verified:
  status: in-game          # official | in-game | unverified
  build: founders-2026-10-06
  source: https://link-to-screenshot-or-official-post
  date: 2026-10-08
```

The full list of fields for each data type is in `schemas/index.ts`. A misspelled field name fails validation, so typos get caught.

### When a value changes in a new build

Do not delete history. Update the value, update `verified`, and add a line to `changes`:

```yaml
changes:
  - build: launch-2026-10-21
    field: hp
    from: 250
    to: 400
    source: https://link-to-patch-notes
```

The site builds its [What changed](https://classicmaple.wiki/changes/) page from these entries, so this is what keeps the wiki version-aware.

### How Classic World differs from the original

Use `differs_from_original` for a one or two sentence note on what is different from original MapleStory. This is separate from `changes`, which tracks movement between Classic World builds.

## Pictures

A monster, NPC, or item can show one small sprite next to its name. The full rules are in [docs/policies/images.md](docs/policies/images.md). The short version:

- Take the plain sprite, one file, from a site marked `allowed` in `data/sprite-sources.yaml`. Or draw your own. Or crop your own screenshot.
- Save it as `public/sprites/<collection>/<id>.png`, at most 128 by 128 pixels and 40 KB.
- Add a `sprite` block to the entry with the file, the source id, the exact link, and the date.
- `npm run validate` checks all of it.

No map art, logos, music, or anything a fan site made itself.

## Patch notes

One file per patch in `data/patches/`, named `YYYY-MM-DD-short-name.yaml`.

```yaml
id: 2026-10-21-grand-launch
name: Grand Launch Patch Notes
date: 2026-10-21
build: launch-2026-10-21       # add it to data/builds.yaml if it is new
source: https://link-to-official-notes
summary: One or two sentences, in your own words.
affects:
  - monsters/green-mushroom    # collection/id of every entity the patch touched
```

Summarize in your own words and link to the original. Do not paste official notes in full.

## Leveling routes

Routes are `.mdx` guides in `src/content/docs/leveling/`. Required frontmatter:

```yaml
---
title: Level 1 to 30 party route
level_range: [1, 30]
party_size: 4
classes: [warrior, magician, bowman, thief]
tested_in: founders-2026-10-06
---
```

Leave `tested_in` out if you have not run the route. The page then shows an **Untested draft** badge instead.

Put `<RouteSummary />` at the top of the page (copy the import from an existing route). For each step, give the map, the level to move on, and the reason. Say clearly what you tested yourself and what is theory.

## Pull request checklist

- [ ] One topic per pull request
- [ ] `npm run validate` passes (CI runs it too)
- [ ] Source and build included for every changed fact
- [ ] Screenshot attached for in-game claims
- [ ] Title starts with `data:`, `guide:`, `patch:`, `site:`, `spec:`, or `docs:`

## Review

- CI validates the data and builds the site on every pull request.
- Every pull request gets a preview link from Vercel, posted as a comment, so you can see your change live before it merges.
- Data and guide changes need one maintainer approval. Schema and site changes need two.
- Disputed numbers stay `unverified` until a second player confirms them.
- Small, sourced pull requests get merged fastest.

## What not to submit

- Game client files or raw extracted assets. Screenshots you took yourself are fine.
- Pictures from a site that is not marked allowed in `data/sprite-sources.yaml`
- Text copied from other wikis, guides, or videos
- Private server data
- Exploits, botting, or real money trading content

## License

Code is MIT. Data and guides are CC BY-SA 4.0. By contributing, you agree to release your work under these licenses.

## Conduct

Be kind. Argue with sources, not insults. Everyone here started at level 1.
