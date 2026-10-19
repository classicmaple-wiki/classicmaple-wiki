# 0014: What's new on the home page

Status: draft, waiting for owner approval

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
- Comments, likes, or an RSS feed. RSS is a good later addition and is noted in Open questions.

## Requirements

- [ ] The home page order is: hero, What's new, Find something, Places, How to read this wiki, closing line.
- [ ] What's new shows the newest 6 entries, newest first. Each entry has a date, a type chip, a linked title, and one line of text.
- [ ] Entry sources, each with its type label: player guides (`watched_on`, "Player guide"), guides and news pages with a `published` date ("Guide" or "News" by folder), patch notes from `data/patches/` ("Patch notes"), and builds from `data/builds.yaml` whose date has arrived ("Build", for example "Grand Launch is live").
- [ ] A build whose date is in the future is not listed. On launch day the deploy adds "Grand Launch is live" at the top.
- [ ] The window ends with one link to What changed.
- [ ] Phone layout stacks date over title. No horizontal scroll at 360 pixels.
- [ ] Lighthouse mobile on the home page stays at 95 or higher on production. No new JavaScript.
- [ ] `npm run validate` and `npm run build` pass with no broken internal links.

## Design

Files:

- `schemas/index.ts`: `published: z.coerce.date().optional()` on `pageFrontmatter`.
- `src/lib/whatsNew.ts`: one function that gathers entries from the four sources, sorts them by date, newest first, and returns the first six. Each entry is `{ date, type, title, href, line }`. The type label comes from the source, with the docs folder deciding Guide or News. The line is the page description, the patch summary's first sentence, or "Build {name} is live".
- `src/components/WhatsNew.astro`: the window. A list where each row is the date in muted small text, the type chip, the title as the link, and the line. Reuses the window, chip, and stat row styles. The footer holds the link to What changed.
- `src/content/docs/index.mdx`: the new window first, then the existing ones in the order above.
- Guide pages that should appear now get `published`: the level 1 to 30 route, crafting, citizenship, and the four class guides, with the date they were first merged from git history.
- `docs/data-research.md` or `CONTRIBUTING.md`: one line saying a guide shows on the home page when it carries a `published` date, and the date moves only when the guide is substantially rewritten.

The Places window keeps its cards and its one line. The task grid keeps its six cards.

## Tasks

- [ ] Add `published` to the schema.
- [ ] Write `src/lib/whatsNew.ts` and `WhatsNew.astro`.
- [ ] Reorder the home page.
- [ ] Add `published` dates to the existing guides from git history.
- [ ] Add the one line of contributor guidance.
- [ ] Screenshots at 360 and 1280. Lighthouse mobile on a local build.
- [ ] Run `npm run validate` and `npm run build`.
- [ ] Update `BACKLOG.md` and rewrite `HANDOFF.md`.

## Open questions

- Six entries, or more? Six keeps the window short on a phone. Recommended: six.
- Should the feed also list new sprites or data imports? Recommended: not now. They are many and small. A "Data" entry per import could come later.
- An RSS feed at `/feed.xml` for the same entries is cheap with Astro and lets players follow the wiki in a reader. Recommended: add it in this spec if the owner wants it, else as a one line follow-up.
