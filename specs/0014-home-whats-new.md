# 0014: What's new on the home page

Status: built 2026-10-19, waiting for owner review on the preview. Approved 2026-10-19 in chat: six entries, no import entries, RSS feed included.

## Problem

The home page is built for a first visit: search, six task cards, the six places, and how to read the wiki. Nothing on it changes between visits, so a player who has seen it once has no reason to come back. The owner wants the newest things at the top, so the home page becomes the place to check what is new: player guides, patch notes, new guides, and later news posts.

## Goals and non-goals

Goals:

- A What's new window right under the hero, listing the newest entries across the site with a date, a type chip, a title, and one line.
- The feed builds itself from data and page frontmatter. Nobody edits a list by hand.
- Places stay on the page, below the feed, because the paintings are the site's identity (decision 0007). First-time visitors still get their tour.
- A `published` date on guide pages, so a new or rewritten guide shows up in the feed when its author says so.
- Ready for news posts: a page with a `published` date in any docs folder appears in the feed, so a later `news/` folder needs no feed change.

Non-goals:

- A news or blog folder with posts. The owner writes the first post when there is something to say; the feed is ready for it.
- Client side updates. The site is static. The feed is as fresh as the last deploy, and every merge deploys.
- Removing Places or the task cards.
- Comments or likes.

## Requirements

- [x] The home page order is: hero, What's new, Find something, Places, How to read this wiki, closing line.
- [x] What's new shows the newest 6 entries, newest first. Each entry has a date, a type chip, a linked title, and one line of text.
- [x] Entry sources, each with its type label: player guides (`watched_on`, "Player guide"), guides and news pages with a `published` date ("Guide" or "News" by folder), patch notes from `data/patches/` ("Patch notes"), and builds from `data/builds.yaml` whose date has arrived ("Build", for example "Grand Launch is live").
- [x] A build whose date is in the future is not listed. On launch day the deploy adds "Grand Launch is live" at the top.
- [x] The window ends with one link to What changed.
- [x] `/feed.xml` is an RSS 2.0 feed of the same entries, the newest 20, linked from the head of every page, written without a new dependency.
- [x] Phone layout stacks date over title. No horizontal scroll at 360 pixels.
- [ ] Lighthouse mobile on the home page stays at 95 or higher on production. No new JavaScript. Local build 2026-10-19: 86 before and 86 after, so the window costs nothing. Check production after merge.
- [x] `npm run validate` and `npm run build` pass with no broken internal links.

## Design

Files:

- `schemas/index.ts`: `published: z.coerce.date().optional()` on `pageFrontmatter`.
- `src/lib/whatsNew.ts`: one function that gathers entries from the four sources, sorts them by date, newest first, and returns the first six. Each entry is `{ date, type, title, href, line }`. The type label comes from the source, with the docs folder deciding Guide or News. The line is the page description, the patch summary's first sentence, or "Build {name} is live".
- `src/components/WhatsNew.astro`: the window. A list where each row is the date in muted small text, the type chip, the title as the link, and the line. Reuses the window, chip, and stat row styles. The footer holds the link to What changed.
- `src/content/docs/index.mdx`: the new window first, then the existing ones in the order above.
- Guide pages that should appear now get `published`: the level 1 to 30 route, crafting, citizenship, and the four class guides, with the date they were first merged from git history.
- `src/pages/feed.xml.ts`: the RSS feed, built from the same function, escaped by hand. `astro.config.mjs` adds the alternate link in the head.
- `CONTRIBUTING.md`: one line saying a guide shows on the home page when it carries a `published` date, and the date moves only when the guide is substantially rewritten.

The Places window keeps its cards and its one line. The task grid keeps its six cards.

## Tasks

- [x] Add `published` to the schema.
- [x] Write `src/lib/whatsNew.ts` and `WhatsNew.astro`.
- [x] Reorder the home page.
- [x] Add `published` dates to the existing guides from git history.
- [x] Add the one line of contributor guidance.
- [x] Write the RSS feed and its head link.
- [x] Screenshots at 360 and 1280. Lighthouse mobile on a local build.
- [x] Run `npm run validate` and `npm run build`.
- [x] Update `BACKLOG.md` and rewrite `HANDOFF.md`.

## Open questions

- Six entries, or more? Six, by the owner, 2026-10-19.
- Should the feed also list new sprites or data imports? No, too many, by the owner, 2026-10-19.
- An RSS feed at `/feed.xml`? Yes, in this spec, by the owner, 2026-10-19.
