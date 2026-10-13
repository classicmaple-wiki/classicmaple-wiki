# UI research

Date: 2026-10-13. Phase 2, deliverable 1.

This document records what eleven reference sites do well and badly in layout, navigation, data tables, search, and mobile. It then applies the six Slow Snails principles to a wiki page and develops the library of places idea into rules the design spec can use. Ideas are borrowed. Markup, styles, and images are not.

How this was made: one reading agent per site loaded the home page, an index page, an entity page, the search, and any licensing page with a text fetch tool. Rendered chrome such as sidebars, hover tooltips, and phone layouts cannot be seen through a text fetch, so every "unknown" below is a real gap, not a guess. One site, the MapleLegends Library, never responded and is reported second hand only.

Standing decision: original art only, kept minimal. See `docs/decisions/0003-original-art-only.md`. Where a pattern below depends on game sprites, read it as "with our own motifs".

## Reference sites

### Old School RuneScape Wiki

What it is: the best run independent fan wiki. Volunteer MediaWiki, hosted by Weird Gloop, founded 2013, left Fandom in 2018, now the official wiki with Jagex's support. About 41,900 articles.

Layout. Standard three part MediaWiki frame. Every entity page follows one section order: lead, stats, sources, changes, trivia, references. The home page is category tiles, update cards, popular pages, and a skill icon row. What fails: pages run past 100,000 characters with nothing collapsed, and every heading carries two edit links.

Navigation. Three layers: wiki switcher, grouped sidebar, and page tabs plus a numbered table of contents plus a navbox at the bottom. Cross links are everywhere. Dated facts link to their update post. Quest pages split into walkthrough, quick guide, and transcript. The sidebar is a flat list of twenty plus links with no hierarchy.

Data tables. Drop tables are split into named sections with fixed columns: item with icon, quantity, rarity as a fraction, price. Level column first in training tables. Infobox tabs switch between variants of the same monster. Narrow screen behavior unknown.

Search. Exact title goes straight to the page. Results show a snippet, a redirect note, and namespace tabs.

Mobile. A separate MobileFrontend skin, not a fluid layout. Category tiles become a plain list.

Performance. Prices load client side after render. Pages are text and icon heavy. Scores unknown.

Patterns to borrow:

- One fixed section order per page type.
- A dated changes table at the bottom of every entity page, each row linked to its source. This is the version aware pattern the wiki already has in `changes`.
- A compact infobox with a small image, key flags, and an id row.
- Drop tables grouped by source with rates as plain fractions or percentages.
- Level column first in any training or requirement table.
- A plain public page that explains funding in plain words.
- An images policy with strict naming and a per file license note.

Patterns to avoid:

- Pages over 100,000 characters with nothing collapsed.
- Edit links in the reading flow.
- A flat sidebar with no hierarchy.
- Icon only stat rows with no labels. Screen readers get nothing.
- Writing "used with permission". That line rests on a real Jagex partnership. The wiki has no such line from Nexon.

### Wowhead

What it is: the reference game database for World of Warcraft. Most content renders with JavaScript, so only the page shell was readable. Treat details as partial.

Layout. Every entity page shares one skeleton: title with a type suffix, portrait, action buttons, Quick Facts, a one line location, then guides, related, and contribute. With scripts off the page is nearly empty. Every page ends with an app promo and long forms.

Navigation. The URL carries the game version as a path prefix: `/classic/`, `/tbc/`. The same entity id works across versions by changing the prefix. A version strip at the top of every page switches builds, each link with a plain tooltip saying what it does.

Data tables. List pages open with a ten to twelve field filter form. Wowhead itself added a simpler finder beside it as an escape hatch. The tooltip is a fixed order block: name colored by rarity, level, slot and type, stats, requirements, effect, sell price. Results tables did not render. Unknown on phones.

Search. Results split into database hits and guide hits under labeled headings.

Mobile. Second hand only. Mobile friendly since 2015, with ongoing per feature fixes.

Patterns to borrow:

- Version in the URL path, so one entity resolves per build and the switcher only swaps the prefix.
- One fixed skeleton per entity page.
- A stat block as structured lines in a fixed order, reused on the page, in hover cards, and in drop rows.
- Color only the name line by rarity or type. Stat lines stay default ink, which keeps AA contrast easy.
- An escape hatch next to any big filter: "where can I train at my level".
- Group by as a first class list control. Grouped lists read better on a phone than wide sorted tables.
- Search results split into data hits and guide hits.
- A dated What's New page.

Patterns to avoid:

- Core content that only renders with JavaScript.
- A full filter form open by default.
- Empty section headings when there are no rows.
- Rarity color on text alone with no second cue.

### Pokemon Database

What it is: a one person fan reference, running since 2008, server rendered, no framework. The closest cousin to what this wiki wants to be.

Layout. A thin header, one column, short footer. Entity pages open with name, previous and next links, a short intro, an in page contents list, then stacked key value panels and wide tables. The home page is a news feed, which puts announcements before data. No atmosphere at all.

Navigation. Four top groups: Data, Mechanics, Games, Other. Previous and next on every entity page. Version specific data lives on sub pages per generation. No breadcrumbs.

Data tables. The full list is one sortable table with a thousand plus rows, a sprite in every row, a name filter and eighteen type buttons above it, no pagination. Stat bars are colored by value band with the number beside the bar. Empty cells are a dash. The owner states that all tables except one page type were made to work on phones. Not observed directly.

Search. Instant results from the header box across all types, keyboard driven on desktop. The no JavaScript fallback page shows nothing.

Mobile. Responsive single column. Lazy loaded images are the stated main data saver.

Performance. Self reported: plain JavaScript, server rendered, lazy loaded images, fast by design.

Patterns to borrow:

- Previous and next links at the top and bottom of every entity page.
- A short in page contents list under the intro.
- Key value panels for basic facts, wide tables only for repeating rows.
- Sortable index tables with a text filter and category buttons, on one page.
- A tiny icon in every table row so readers scan by picture.
- Version specific data in tabs or sub pages, never one giant table.
- Stat bars colored by band with the number next to them.
- Dashes for empty cells.
- Lazy load every image below the fold.
- A plain about page that names the maintainer, the stack, and the data sources.
- Popular quick links on the landing page.

Patterns to avoid:

- A news feed home page.
- No breadcrumbs. A library of places needs a visible trail.
- A fallback search page that shows nothing.
- A single site wide look with no sense of place.
- Ten column tables that depend on horizontal scroll.

### Kiranico Monster Hunter Wilds Database

What it is: a datamined game database. Flat, text first, fourteen categories, a version label in the header, a theme toggle, no editorial content.

Layout. One skeleton everywhere: breadcrumb, version label, language and theme controls, category menu, content. Entity pages stack sections in a fixed order. Nothing orients the reader: no in page contents, no anchors, several tables with no column headers, no footer at all. Index pages are one unbroken list.

Navigation. A flat fourteen link menu and a two item breadcrumb that never goes deeper. Cross links are one way: monster links to item, item does not link back.

Data tables. Dense and numeric. The hitzone table has nine columns whose headers are icons only. Drop tables are grouped by source but column labels are implied. Phone behavior unknown and likely poor.

Search. None found on this subsite. A sibling site has a Ctrl+K palette.

Patterns to borrow:

- The game version label in the header on every page.
- One fixed section order per entity type.
- Drop tables grouped by source with a small heading per group.
- The in game description set apart as a quote at the top of the page. The flavor text gives a place its mood before the numbers start.
- Theme toggle and language selector in the header.
- Breadcrumb one level deeper than Kiranico: Home, Monsters, Orange Mushroom.
- Static, text first entity pages with small icons only. This is what makes 95 on mobile reachable.

Patterns to avoid:

- Icon only column headers.
- Index pages with no headings, filters, or counts.
- No table of contents on long pages. Starlight gives one for free. Keep it.
- One way cross links. Generate both directions from data.
- No footer, no credits, no license line.
- Six or more values crammed into one row line.

### bg3.wiki

What it is: an independent Baldur's Gate 3 wiki on MediaWiki with the open source Citizen skin. About 13,000 articles. Founded by one developer. Once took donations, now serves ads.

Layout. The home page is a grid of icon cards grouped by reader task, not by wiki structure. Location pages open with a banner image and a small strip linking the neighboring areas above, right, and below. That is the closest thing to a library of places any reference site has. Pages are very long, every heading has an edit link, and an ad sits near the top.

Navigation. Citizen gives a collapsible menu, a persistent table of contents, collapsible sections, and a "/" shortcut for search. Every inline link carries a type glyph: a map pin before a quest, a portrait before a character, an item icon before an item. Location pages end with a navbox grouping that place's characters, locations, and quests.

Data tables. Standard wikitables with an icon in almost every cell. The spell data is split into a light grouped list page and a separate sortable seven column page. Narrow screen behavior unknown.

Search. Exact title jumps straight to the page, which sometimes lands on a category page by surprise. Results show thumbnails, a snippet, a category tag, and a redirect note. Missed searches are logged so editors learn what readers wanted.

Mobile. Citizen claims 375 to 1920 pixel support, dark mode, and reader preferences for width and type size. Not observed.

Patterns to borrow:

- Front page as icon cards grouped by task.
- Place pages as rooms: a scene band at the top and a strip linking neighboring maps.
- One fixed tiny glyph per entity type before every inline link.
- A light grouped list page plus a separate sortable table page for the same data, so phones get the light one.
- A short definitions block for core mechanics on the home page.
- Search results with a thumbnail, snippet, and type tag. Log missed searches.
- An image policy that fixes formats, naming, sizes, and alt text, with a separate plain language licensing page.
- Quest pages: objectives, walkthrough, rewards, then a navbox of sibling quests.
- A "latest game update" line on the home page.

Patterns to avoid:

- Single giant articles.
- Seven column tables with icons in every cell and no narrow fallback.
- An ad above the content.
- Empty alt text on icons.
- A sidebar that mixes reader links with editor tools.
- Promising no ads and reversing later. Decide the funding model up front and state it.

### MapleStory Wiki (maplestorywiki.net)

What it is: the main existing MapleStory wiki. MediaWiki, founded 2005, about 24,000 articles covering every regional version. The direct comparison. Search and file pages returned 403, and the mobile view toggle too.

Layout. Standard MediaWiki. The home page works: a welcome line, dated news with region tags, six icon tiles, and a "Regions and versions" block that shows each server's current version. Article pages lose that clarity. The Orange Mushroom page stacks five near identical infoboxes down one column. Map pages have no NPC list and no connected maps table. Plain white chrome, no atmosphere.

Navigation. The sidebar carries huge nested trees: monsters in ten level bands, bosses by letter range, locations by continent. Complete but heavy. Small things are good: level list pages have previous and next range links, and monster icons on a map page jump to the right anchor.

Data tables. The level band list is a flat 99 row table with a grouped "Monster's Stats" header over Level, HP, MP, PDR, MDR, EXP. No sort, no filter, no version column. Drop entries carry free text notes like "Confirmed December 2025 (GMS)". An item page lists 93 vendors as a bullet list.

Search. Unknown, every search URL returned 403.

Mobile. Unknown. The deep sidebar trees, stacked infoboxes, and wide tables are the obvious risks.

Patterns to borrow:

- One clear version line on the home page, but for Classic World builds.
- Six to eight icon tiles on the home page instead of a sidebar tree.
- One fixed stat field order used in both the infobox and the list tables.
- Separate drop lists for equipment, use, etc, and quest drops, each row linked.
- A structured "confirmed on date in build" field, which the wiki already has as `verified`.
- A map page with a monster icon row, an NPC list, a connected maps list, and a minimap.
- Previous and next links on level band lists.
- A "name in other servers" table for KMS and GMS names.
- A one or two sentence in world flavor line at the top of a page, set apart from the facts.

Patterns to avoid:

- Several full infoboxes stacked for variants of one monster.
- A sidebar of dozens of collapsible tree nodes.
- Flat stat tables with no sort or filter.
- Vendor lists as bullets with no grouping by town.
- Map pages that are prose only.
- Region and version flags as free text.
- A news carousel.

### MapleLegends Library (read second hand)

The site did not respond to any request, including a mirror with a broken certificate. Everything here comes from search snippets. It is the built in database of a private server: monsters, maps, equipment, an EXP table, entities addressed by game id in the query string. Snippets say the monster list sorts by level, EXP, and HP. Layout, search, mobile, and licensing are unknown.

Patterns to borrow, with that caveat:

- Stable game ids as the canonical key for every entity, paired with a readable slug.
- The EXP table as a first class page. Other fan sites copied this exact page, which shows players want it.
- Small, literal top level sections: Monsters, Items, Maps, NPCs, Quests, Skills, EXP table.
- Sort state kept in the URL so a sorted view can be shared.

Patterns to avoid:

- A single slow origin with no static fallback.
- Query string ids alone with no slug.

Policy note: this is a private server. Nexon's September 2026 notice calls private servers copyright infringement. The wiki borrows no asset, no data, and no link from it. See `assets.md`.

### Stripe Docs

What it is: the documentation gold standard. Every URL also serves plain Markdown with `.md` appended, so the content structure was read first hand and the chrome second hand.

Layout. Every page opens with a one line title and one plain sentence. The home page is a short "Start here" block of task groups, then "Browse by product". Related pages use one unit: link, colon, one sentence. What fails: every page now opens with the same promo block before the content.

Navigation. Task entry points sit above product names. Cross links are inline in sentences, never a "see also" dump. The left rail groups by subject with actions nested under each. A language picker persists across pages.

Data tables. Two patterns. Comparison tables with a bold row label and three or four short cell values, with a status tag in the column header. And reference lists instead of tables: each field as a bullet with name, type in parentheses, and a one line description, nested detail collapsed by default. The bullet style avoids wide tables entirely.

Search. Client side only. Machine readable alternatives exist: an `llms.txt` and `.md` on every URL.

Patterns to borrow:

- Open every page with a one line title and one plain sentence before any scene.
- Index pages from task entry points first: where to train at 30, how to take the second job.
- The link, colon, one sentence unit for related pages.
- Stats as a labeled list when there are many fields, a table only for repeating rows.
- Comparison tables with a bold row label, short cells, and the build in the column header.
- Collapsed nested detail that a URL anchor can open.
- A Markdown twin of every page plus `llms.txt`. Astro can do this cheaply and it feeds the Phase 4 ai-assist spec.
- A version switcher that persists across pages.

Patterns to avoid:

- A promo block above the content. Donation and credit go in the footer.
- A sticky code rail. The wiki has no code samples. Two columns leave room for the scene.
- Client side only search with no fetchable fallback.
- Dense parenthetical flags. Use a short badge or plain word.

### Starlight docs

What it is: the framework the wiki runs on, documented on itself. The clearest picture of what the default theme gives and how far it can be pushed. The showcase lists about a hundred production sites including a Pokemon database.

Layout. A three column frame: left sidebar, content, right "On this page". Content width and type scale are custom properties, so the column can widen for data pages. The home page "splash" template removes both sidebars and gives a hero plus cards. Almost every component, including PageFrame, Header, Sidebar, PageTitle, Hero, ContentPanel, and Footer, can be swapped through the components config. That is the route for a room per page: override one component to put a scene behind a solid panel and keep everything else. The default look is generic SaaS docs and the splash hero is a marketing pattern.

Navigation. Header with search and a Ctrl+K hint, theme selector, Skip to content. Sidebar groups with optional badges per item, which is a cheap way to tag a build or "Stub". Right table of contents from h2 and h3. Footer with edit link, last updated from git, previous and next. A page can override the sidebar. Versioning is not built in. Community plugins add a version dropdown and per section sidebars.

Data tables. Plain Markdown tables, styled, no scroll container, no sorting, no sticky headers. The narrow content column overflows past five or six columns. Built in components: Cards, Link Cards, Asides, Badges, Tabs, Steps, File Tree, Icons. The Pokemon showcase site avoids tables on its list page and uses stacked list items with a sprite, name, and type tags, 80 per page. The wiki needs its own table component.

Search. Pagefind by default: a static index built at deploy, loaded on demand. Pages can be excluded with `pagefind: false` and parts of a page with a data attribute. The Search component can be overridden to add a type label and icon to results.

Mobile. The sidebar becomes a drawer, the table of contents a sticky dropdown. Near zero JavaScript makes a 95 score realistic. The risks are custom scenes and wide tables, which the theme does not handle.

Patterns to borrow:

- Keep the frame. Spend the design effort on color, type, and the scene panel.
- Override PageFrame or ContentPanel to place a solid panel over a per page scene, so the room idea lives in one component.
- Set accent and gray tokens with the theme color editor's AA setting and check both modes.
- Sidebar badges for build tags, Stub, and New.
- Per section sidebars so navigation never scrolls forever.
- Splash only on the home page, and replace the SaaS hero.
- Asides with custom titles and icons as in game notices.
- Tabs and details for long stat blocks on phones.
- Keep Pagefind. Exclude stubs. Override Search later for typed results.
- Last updated and edit link on every page.
- The PaperMC footer pattern: plain not affiliated line next to the credits.
- Image zoom for maps, links validator in the build.

Patterns to avoid:

- The default blue accent, gray palette, and generic sans.
- Raw Markdown tables for stats.
- The marketing home page structure.
- Autogenerated sidebars sorted by filename, which ignore game progression.
- A scene behind body text without a solid panel.

### Garland Tools

What it is: a one person FFXIV database built as a single page app. "Everything is a block." Search adds draggable panels to one screen. Code is MIT, the data pipeline is open.

Layout. A slim header, a collapsible sidebar, and blocks with a fixed shape and a title bar. Dense data stays readable because every block looks the same. Each entity is a main record plus compact partials for every linked thing, so a block shows rich cross links from one small file. What fails: the shell is a wall of settings and link lists, there is no stable URL per subject, and a sub tool died with a script error.

Navigation. Category sidebar. Entity to entity movement through the partials inside each block. Quests show prerequisites and next quests explicitly. No breadcrumbs.

Data tables. Stats inside blocks, not page wide tables. Search results are paged with filters beside them. Phone behavior unknown and likely poor for a drag and drop layout.

Search. One box, type aware, tiny JSON hits with icon and level inline. Hidden behind an icon.

Patterns to borrow:

- Main record plus compact partials for linked things, so a quest page lists its NPC, map, prerequisite, and rewards from one small file.
- One fixed card shape reused for items, quests, NPCs, and maps.
- Type aware search with icon and level inline.
- A visible patch or build tag on every record, surfaced as a badge.
- Explicit prerequisite and next links on quest pages.
- A per user scratch area for a route or checklist in local storage, no account.
- Honest credits that name every icon designer and data source.

Patterns to avoid:

- A settings wall home page.
- A client side app with hash routes.
- Drag and drop as the primary reading model.
- Search hidden behind an icon.

### Terraria Wiki (wiki.gg)

What it is: the official Terraria wiki, MediaWiki on wiki.gg, moved off Fandom in 2022. A pixel art game wiki with thousands of small sprites used inline.

Layout. Three part MediaWiki frame. Sprites render at native size by default, so pixel art never blurs. The style guide warns that icon clutter adds up and that larger images break line spacing. Entity pages stack two infobox panels with animated sprites. No reading width limit. The biome page is plain wiki layout with a screenshot banner, not a place you feel.

Navigation. Sidebar groups with a small icon beside each heading. Version scope sits right under the title as a row of platform icons plus one sentence. Older versions live in a Legacy namespace with a notice at the top. Eight decorative themes plus a system following light and dark toggle loaded early to limit flash.

Data tables. The swords table has ten columns. Rows start with the sprite then a bold name. Numbers carry a word label in parentheses, like "Use time 20 (Very fast)". Rarity is a color swatch with a tooltip. Drop lists are nested bullets with icon, name, quantity, and rate on the next line. Phone behavior unknown.

Search. Standard MediaWiki. Exact title jumps straight to the page. Full text shows a count, pagination, namespace tabs, and "Did you mean". The box sits in the sidebar, not the header.

Patterns to borrow:

- Render pixel art at native size and scale only by integer multiples, with a cap.
- Small inline icons only next to the first mention in a paragraph.
- Version scope under the title as small icons plus one sentence.
- A clear place for older builds instead of footnotes.
- A number with a word label in parentheses.
- Rarity or element as a small swatch with a tooltip.
- Drop lists as compact icon plus name rows with the rate on a second line.
- A dated history section at the bottom, newest first, naming the build.
- Light and dark following the system, loaded early.
- A license line on every image page and a site copyright page that separates text license from image license.
- Search in the header, exact match jumps, fuzzy shows a list.

Patterns to avoid:

- A sidebar that lists every tool and 35 language links.
- Ten column tables with icon stuffed cells.
- Infoboxes with animated sprites and audio widgets.
- Place pages that list what is there but not where.
- No maximum reading width.
- Eight decorative themes. One light and dark pair is enough and easier to keep AA.

## Slow Snails principles

Source note. The channel page would not render. The findings come from the channel's Atom feed, fetched 2026-10-13. The channel's display name is 느린달팽이, handle @SlowSnails. Titles are Korean. The owner's English examples match feed entries in meaning and are most likely YouTube's localized titles. Thumbnails were not viewed, so everything about the pictures is the owner's description, not observed. The naming grammar and description structure are observed.

Sample titles, verbatim from the feed:

- 에델슈타인의 음모 1시간
- 오후 2시의 주사위 1시간
- 🌙 밤의 엘리니아 공원에서 듣기 좋은 메이플 커버 | 𝗣𝗹𝗮𝘆𝗹𝗶𝘀𝘁
- 루시드의 우울 1시간
- 한낮의 지구방위본부 초원 1시간
- 🌕 월묘들과 떡을 찧으며 듣기 좋은 메이플 커버 | 𝗣𝗹𝗮𝘆𝗹𝗶𝘀𝘁
- 어린 날의 야시장 1시간
- 🍄 헤네시스 버섯 대가족과 함께 듣기 좋은 메이플 커버 | 𝗣𝗹𝗮𝘆𝗹𝗶𝘀𝘁
- 🏮 개미굴의 심야 식당에서 작업하며 듣기 좋은 메이플 커버 | 𝗣𝗹𝗮𝘆𝗹𝗶𝘀𝘁
- 🌅석양의 절벽에서 휴식하며 듣는 테일즈위버 커버 모음 | 𝗣𝗹𝗮𝘆𝗹𝗶𝘀𝘁
- 🧪 리스항구 포션 상점에서 작업하며 듣기 좋은 메이플 커버 모음 | 𝗣𝗹𝗮𝘆𝗹𝗶𝘀𝘁
- 🧸 파티 퀘스트를 하며 듣기 좋은 루디브리엄 커버 모음 | 𝗣𝗹𝗮𝘆𝗹𝗶𝘀𝘁

What the titles show. Two families. Single tracks are "track name, 1 hour". Playlists are "emoji, place or situation, while doing an activity, covers good to listen to, Playlist". Track names use "time of place" or "place of time": Ereve at dawn, Singapore at midday, Free Market at sunset, Wedding Village at midnight. The time vocabulary is small and reused: morning, midday, afternoon, sunset, night, midnight, dawn, plus a season. Some rooms are invented inside real maps: a cafe in Kerning Square, a late night diner in the Ant Tunnel, a potion shop in Lith Harbor. The map is real, the room is imagined. Each playlist starts with one emoji that acts as a one glyph icon for the scene, never two. The subject is often a crowd of tiny creatures, not a hero. Descriptions follow a fixed order: greeting, seasonal note, tracklist, original track credit with a link to the official channel, a disclosure that the music is AI plus hand editing made under Nexon's IP guideline, and a usage guide. A weak engagement signal from the feed: the named rooms with small life had more views than plain map names.

### 1. The place is the picture

On the channel: every video names one place and one moment, and the title carries all the words, so the image needs none. Reported, not observed.

On a wiki page: the page header becomes a scene band. A wide, low strip with zero text drawn into it. The title, breadcrumb, and build badge live in HTML on a solid cream panel that overlaps the bottom edge of the band. Index cards use the same rule: art only above, HTML title below. Alt text names the place and the moment, nothing more.

Risk and guard. Text on a busy scene fails AA. Text never sits on the image. A full bleed scene per page costs bytes. Under decision 0003 the scene is minimal original art: a color field, a horizon, a few motifs, drawn as SVG or a small WebP of under 40 KB, with width and height set so there is no layout shift, eager only in the header and lazy on cards. The panel is the largest contentful paint, not the image.

### 2. Place plus moment

On the channel: observed. "Night of Ellinia Park". "Late night diner in the Ant Tunnel". The time words form a small reusable set.

On a wiki page: keep the H1 factual, "Thief job advancement", because people search for it. Put the moment in a one line subtitle: "Kerning City, after dark. The Dark Lord's hideout." Make the moment a frontmatter field from a fixed vocabulary of about eight words, so each page declares one and that field drives the scene tint and the accent tokens. Show the subtitle in small type under the title on index cards. Never rename pages after moments.

Risk and guard. If the moment replaces the real name in titles, URLs, or navigation, nobody can find the Ant Tunnel. Factual name everywhere that is searchable. Moment only in subtitle and art.

### 3. Small life in the scene

On the channel: partly observed in words. The Henesys mushroom extended family. Moon rabbits pounding rice cake. A lore note about why Mushmom is big sits beside the tracklist.

On a wiki page: two spots only. The header band can hold one or two tiny original figures doing the page's activity. The infobox can carry a one line lore note field. Body text stays free of decorative images.

Risk and guard. Sprites scattered between paragraphs break reading rhythm and confuse screen readers. Decorative art is marked decorative. Under decision 0003 the figures are our own simple pixel motifs, not Nexon characters, and the launch set is small.

### 4. Light sets the mood

On the channel: inferred from the emoji prefixes and time words. Moon, lantern, sunset, full moon. One light color per scene.

On a wiki page: the moment word is a theme token. Each page declares one of five or six moods such as dawn, day, dusk, night, cave. The mood sets three custom properties: scene tint, accent color, and panel shadow tint. The text panel stays the same cream and ink on every page. Only the atmosphere changes. In dark mode the same mood maps to a darker scene tint and the panel flips to warm charcoal with cream text, not pure black. The accent is used only for links, the active nav item, and the stat block header rule.

Risk and guard. A per page accent on body links can fail contrast on cream. Every mood's accent is precomputed in a light and a dark value, both checked to 4.5 to 1 against the panel. Body text never changes with mood. Cap the moods at six and list them in the style guide, or the site stops feeling like one library. Tokens are a few lines of CSS on a data attribute, not a stylesheet per mood.

### 5. Old interface as art

On the channel: not observed. The owner's description.

On a wiki page: use the old window as a shape language, not as copied pixels. The stat block takes the 2006 to 2009 window grammar: a slim title bar, a one pixel inner border, a two or three pixel corner, a cream body. Drawn in CSS with our own colors. The quest reward box and the "where to train" table use the same frame so they read as windows in the same client. Body paragraphs stay modern: generous line height, a readable sans or humanist serif, no pixel font for running text.

Risk and guard. Pixel fonts at body size fail AA. Pixel or bitmap faces only in the titles of boxed components at 16 pixels or larger. Copying the actual client skin is a copyright problem. Original CSS that evokes the era, no traced screenshots. CSS borders and shadows are free. No image based nine slice frames.

### 6. One consistent frame

On the channel: observed in text. Every playlist title shares one template. Every description shares one order. The visual frame is reported.

On a wiki page: the index grid is the shelf. Every card has the same aspect ratio, the same cream label strip below with the factual title in one weight and the moment subtitle in a lighter weight, and the same one glyph type marker in the corner of the strip, not on the art. Page headers use one fixed band height and one fixed panel overlap. The content collection schema enforces the frame: every entity page carries title, kind, place, moment, and scene fields.

Risk and guard. A perfectly uniform grid hides hierarchy. Allow exactly one larger featured card per index and a plain text list under the grid for scanners. Forty scene images on one index costs bytes. Lazy load, fixed dimensions, and group or paginate past about 24 cards. Do not borrow the channel's mathematical bold "Playlist" trick. Screen readers spell those glyphs letter by letter. Real text and CSS only.

## The library of places, developed

### Rules

Changes per page:

- The scene band at the top: a minimal original composition keyed to the place.
- The mood, one of about six, which sets the scene tint, the accent, and the shadow tint.
- The emblem, one small original glyph for the place or the entity type, shown in the panel corner and on the index card.
- The subtitle, which names the place and the moment.
- The "what is here" dock on map pages: NPCs, monsters, portals, and the track name, in a fixed order.

Never changes:

- The grid, the panel width, and the overlap of panel over band.
- The type scale and the two or three typefaces.
- The navigation: header, search, sidebar, breadcrumb, footer.
- The table and stat block components, their field order, and their frame.
- The cream and ink of the text panel in light mode and the charcoal and cream in dark mode.
- The disclaimer, the credit, and the license line in the footer.

### Tied to data

An entry can name its scene and mood in frontmatter or in its YAML file. Entries without one inherit from their category: a class from its job town, a monster from its first map, a map from its region, a profession from its workshop, a quest from the map of its NPC, a patch from a neutral "notice board" scene. Inheritance is resolved at build time in one function, so a page never ships without a scene. The neutral default is a cream field with the wordmark glyph.

Launch set under decision 0003: one scene per hub in the order a 2006 player met them. Maple Island, Henesys, Ellinia, Perion, Kerning City, Sleepywood, and a neutral default. Seven compositions. Orbis and Ludibrium come after launch. Each is a color field, a horizon or skyline in silhouette, and one or two motifs. Child pages inherit the hub scene with a different mood tint, so seven drawings cover the whole site.

### Ideas to test

- Light and dark mode as day and night of the same scene. Keep. Dark mode is "night in the same room". The night variant is a tint on the same composition, the panel goes warm charcoal, the accent desaturates one step. The art is not inverted.
- Stat blocks styled like old windows, with modern type. Keep. This is the strongest vintage signal at the lowest cost. Pure CSS.
- Index pages as a shelf. Keep, with the one featured card and a text list under the grid.
- Page titles that name a place and a moment. Keep as the subtitle only. The H1 stays factual.
- A moment switcher that lets the reader toggle dawn and night. Drop. It adds JavaScript, duplicates art, and gives a toy instead of an answer.
- Invented rooms inside real maps. Keep for non guide pages only: the 404 page is a closed shop in the Free Market, the support page is a potion shop counter, the changelog is the Lith Harbor notice board. Guide and data pages stay literal.
- A BGM line in the infobox with the original track name and a link to Nexon's official channel. Keep as text only. No audio hosted, no embeds, no background player.
- A build chip in the stat block title bar reading the build id. Keep. The version is visible where the reader checks the number.

### Readability rules

- Text sits on a solid panel. The scene is atmosphere.
- Body text is a normal web font at 16 pixels or larger with a maximum line length of about 70 characters.
- Pixel faces only in display sizes and boxed component titles.
- Body and panel pair tested to 4.5 to 1. Large type and the accent to 3 to 1 at least, accent links to 4.5 to 1.
- Nothing moves on load. Every image has width and height. The scene never delays the first paint.
- Tables under six columns. Past that, a labeled list, tabs, or a scroll container with a sticky first column.
- Every icon has alt text or is marked decorative.

### Further ideas and pushback

- Reading paths named by the channel's time vocabulary answer the owner's "give me something" request. Morning is level 1 to 10 on Maple Island. Midday is Henesys and the mushroom fields. After dark is Kerning City and the thief advancement. Dawn is Ellinia and the magician path. Each is a short guided page that links out to factual pages. The story order helps a returning 2006 player, and the factual pages stay searchable.
- A home page that lists places, not features. Rows are hubs in the order a player met them. Each row is a strip of cards with the same frame. Nothing autoplays. Stillness is part of the calm and it protects the performance budget.
- Pushback on scenes everywhere. With eight days to launch and one maintainer, seven hub scenes is the ceiling. The design must look finished with the neutral default alone.
- Pushback on the shelf as the only index. Players who know what they want need a plain sortable list. Ship both.
- A one page style guide that lists the moment vocabulary, the six moods with token values, the card frame spec, and the asset rule. The channel works because its template is strict. The spec in Phase 2 is that page.

## Patterns to borrow, consolidated

Ranked by value to Classic Maple Wiki. Page type in brackets.

1. One fixed section order per entity type, and one fixed stat field order used in the infobox and in every list. OSRS, Kiranico, MapleStory Wiki. [entity, index]
2. A solid cream panel over a minimal per page scene, done by overriding one Starlight component. Starlight, bg3.wiki. [all]
3. Build visible on the page: a chip in the stat block title bar, a line under the title, and a dated changes table at the bottom linked to sources. Terraria, Kiranico, OSRS. [entity]
4. Stats as a labeled list in a window frame, with a table only for repeating rows, and never more than six columns. Stripe, Terraria. [entity]
5. Drop and reward lists as compact icon plus name rows with the rate on a second line, grouped by source. Terraria, OSRS. [entity]
6. Home page as icon cards by reader task plus a shelf of places, with the current build line and a small definitions block. bg3.wiki, MapleStory Wiki, Stripe. [home]
7. Index pages with a sortable list and a text filter and level band buttons on one page, plus the shelf grid, with a tiny icon in every row. Pokemon Database. [index]
8. Previous and next links and a short in page contents list on every entity page. Pokemon Database. [entity]
9. Map pages as rooms: scene band, a strip of neighboring maps, and a fixed order dock of NPCs, monsters, and portals. bg3.wiki, MapleStory Wiki. [entity]
10. One tiny glyph per entity type before inline links. bg3.wiki. [all]
11. Numbers with a word label in parentheses, and rarity or element as a swatch with a tooltip. Terraria. [entity, index]
12. Search results that split data hits from guide hits and show a type label and icon. Wowhead, bg3.wiki, Garland. [all]
13. Task entry points above category lists: where to train at my level, how to take the second job. Stripe, Wowhead. [home, guide]
14. Version in the URL path once there is more than one build worth browsing. Wowhead. [entity] Not for launch.
15. A Markdown twin of every page and an `llms.txt`. Stripe. [all] Feeds the Phase 4 ai-assist spec.

## Open questions for the owner

- The moment vocabulary. Proposed: dawn, morning, midday, dusk, night, cave. Confirm or edit.
- The seven launch hubs. Proposed: Maple Island, Henesys, Ellinia, Perion, Kerning City, Sleepywood, and the neutral default. Confirm or edit.
- Reading paths. Do you want the four time named guided pages at launch, or after?
- Scene and mood fields need a schema change. Changing schemas needs your approval. The spec will propose the exact fields.
