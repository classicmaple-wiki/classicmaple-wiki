# 0002: Design system and the library of places

Status: done 2026-10-14. Merged in pull request 3. The look was later superseded by spec 0003.

## Problem

The site runs on the default Starlight look: a blue and gray docs theme with one orange override. It does not feel like MapleStory, it does not impress as a Sirux portfolio piece, and nothing tells a reader where they are. Wide tables break on phones. Grand Launch is 2026-10-21.

## Goals and non-goals

Goals:

- An original identity: wordmark, palette, type, icon style, and a window frame, balanced between modern and vintage.
- One token file for color, type, spacing, radius, and shadow, with light and dark values, wired into the Starlight theme.
- The library of places: every page sits in a scene chosen by its subject, with rules that keep the site feeling like one place.
- Stat blocks and tables that work on a phone.
- Two visual directions as static mockups of the home page, the Thief page, and the Crimson Balrog monster page. The owner picks one.
- Implementation of the chosen direction after the pick.

Non-goals:

- Any Nexon art. Decision 0003: original art only, kept minimal.
- New game data. Mockups show the real repository data, which today is mostly Unknown.
- The about and support pages. Those are Phase 3.
- A moment switcher, sound, animation on load, or carousels.
- Version URLs per build. Later, once there is more than one build worth browsing.

## Requirements

Acceptance criteria. The implementation is done when all of these pass.

- [x] Mobile first. Every page is usable at 360 pixels wide with no horizontal page scroll.
- [x] WCAG AA. Body text 4.5 to 1 or better against its panel in both modes. Large text and interface parts 3 to 1 or better. Checked with the contrast script in the Tasks and with an automated audit.
- [x] Lighthouse mobile performance 95 or higher on the home page, the Thief page, and the Crimson Balrog page. Measured on production 2026-10-14: 100, 100, 100, accessibility 100, layout shift 0. Local production build: 99, 98, 98. The Vercel preview needs a login, so this is checked on production right after merge.
- [x] No layout shift. Cumulative layout shift under 0.02 on the same three pages. Every image and scene has fixed dimensions.
- [x] Tables usable on a phone. No table wider than its container at 360 pixels. Stat blocks reflow to one column. Any table over four columns either scrolls inside its own container with a sticky first column or becomes a labeled list.
- [x] Text never sits on a scene. All body text, titles, and badges live on a solid panel.
- [x] Every entity page has a scene and a mood, either named in its data or inherited, and the build passes when a page names neither.
- [x] Light and dark modes are the day and night of the same scene. Both follow the system setting by default and keep the existing Starlight toggle.
- [x] The fan site disclaimer stays on every page.
- [x] No em dashes in any user facing text.
- [x] Fonts are self hosted, at most two families and four files, with `font-display: swap`.
- [x] `npm run validate` and `npm run build` pass.

## Design

### Balance

Modern carries the reading: layout, body type, spacing, tables, navigation. Vintage carries the frame: the wordmark, the window chrome on boxed components, the scene band, the chips. A reader should never read a paragraph in a pixel font, and never see a stat block without the window frame.

### Starlight stays

Decision 0004 (proposed, waiting for the owner): keep Starlight with a custom theme. Override `PageTitle` to draw the scene band and the title panel, and `Hero` for the home page. Indexes and entity pages stay as Astro pages rendered through `StarlightPage`, as the monster pages already are. Search, sidebar, table of contents, edit links, dark mode, and the mobile drawer come for free.

### Tokens

One file: `src/styles/tokens.css`. Starlight's `--sl-color-*` variables are mapped onto it in `src/styles/custom.css`, so components read our tokens and the theme follows.

Color, light mode. Ratios checked against the panel.

| Token | Value | Use | Contrast on panel |
| --- | --- | --- | --- |
| `--color-paper` | `#F7F1E3` | Page background, cream | |
| `--color-panel` | `#FFFCF4` | Text panels, cream white | |
| `--color-ink` | `#2A1F17` | Body text, warm near black | 15.7 |
| `--color-ink-muted` | `#5C4B3C` | Secondary text | 8.1 |
| `--color-line` | `#E3D6BC` | Borders and rules, decorative | |
| `--color-accent` | `#9A3D08` | Links, active nav, focus of the brand | 6.7 |
| `--color-accent-fill` | `#E8711C` | Orange mushroom fill, never behind small text | |
| `--color-chip` | `#F3E3C7` | Chip and badge background | |
| `--color-titlebar` | `#F4D9B0` | Window title bar | |
| `--color-focus` | `#1F6FB2` | Focus ring | 5.2 |

Color, dark mode, the same names. Panel `#1F1914`, paper `#14100D`, ink `#F4EBDA` (14.7), muted `#C7B7A0` (8.9), line `#3D3229`, accent `#F4A04E` (8.3), accent fill `#C25E12`, chip `#2E241C`, title bar `#3A2A1C`, focus `#7FB8F0` (8.3).

The accent clears 5 to 1 on the title bar and chips in both modes, so links work anywhere on a panel.

Status badges, background and text. Official `#E2F0DA` and `#2F5E1F` (6.5). In game `#DCEBF7` and `#1F4E79` (7.1). Unverified `#FBE6C8` and `#7A4306` (6.6). Dark: `#21351A` and `#B7E39E`, `#16283A` and `#A9CFF2`, `#3A2810` and `#F6C98A`, all above 9. Each badge also carries a word, so color is never the only cue.

Moods. A page declares one. The mood sets the scene colors and one rule color used for the header rule, the emblem, and the title bar stripe. Body text and links never change with mood.

| Mood | Sky top, light | Sky bottom, light | Ground, light | Rule, light | Rule, dark |
| --- | --- | --- | --- | --- | --- |
| dawn | `#F6C9B8` | `#FBE6D2` | `#C98E7A` | `#C2410C` (5.1) | `#FDBA8C` (10.4) |
| morning | `#BFE3F2` | `#EAF6F4` | `#8CC37A` | `#2F7D4F` (4.9) | `#8FD5A6` (10.1) |
| midday | `#9ED3F0` | `#E6F4FB` | `#6FB25B` | `#B45309` (4.9) | `#FCD34D` (12.1) |
| dusk | `#F2A65A` | `#F8D9A8` | `#9C5B3B` | `#B4410F` (5.5) | `#F59E6B` (8.3) |
| night | `#1F2747` | `#3A3F6B` | `#232A3F` | `#3B4BA8` (7.4) | `#A5B4FC` (8.7) |
| cave | `#3E4A3F` | `#5E6B55` | `#2F372E` | `#3F6B4E` (6.0) | `#9AD1A8` (10.0) |

In dark mode every scene darkens toward its night version: sky values move toward `#141A30`, ground toward `#11151F`, and small lights in the scene stay warm. The panel goes warm charcoal. The art is never inverted.

Type.

- Body and interface: Nunito, variable, weights 400 to 800. Rounded and friendly, built for screens. 17 pixel base on phones, 18 on desktop, line height 1.6, measure at most 70 characters.
- Display: Silkscreen, weights 400 and 700. The wordmark, window titles, chips, and in direction B the page titles. Never for paragraphs. Pixelify Sans was the first choice and was dropped during the mockups: its capital C reads as an O at small sizes, so "Classic" read as "Olassic".
- Chips and tiny labels: Silkscreen at 13 pixels with letter spacing, not a third family. This keeps the site at two families. On phones the wordmark drops to 15 pixels so the header stays on one row.
- Numbers in stat blocks use Nunito with tabular figures so columns line up.
- Both fonts are OFL 1.1 and self hosted as subset woff2 files in `public/fonts/`. No npm dependency and no third party request.

Scale, in rem at a 16 pixel root: 0.8125, 0.875, 1, 1.0625, 1.25, 1.5, 1.875, 2.25, 3.

Spacing: a 4 pixel base. Steps 4, 8, 12, 16, 24, 32, 48, 64.

Radius: 2 pixels for window chrome and chips, 10 pixels for cards and panels in direction A, 4 pixels everywhere in direction B.

Shadow: one soft panel shadow `0 1px 0 line, 0 8px 24px` at 8 percent ink in light mode, a 1 pixel highlight plus a 2 pixel offset ink shadow for window chrome. Dark mode drops the soft shadow and relies on borders.

### The window frame

The signature component. Used for stat blocks, quest boxes, reward lists, and the "where to train" table.

- A slim title bar in the title bar color with a 3 pixel mood colored stripe on the left, the window title in Silkscreen, and a build chip on the right.
- A 1 pixel outer border in ink at 20 percent and a 1 pixel inner highlight in panel white.
- A cream body with labeled rows: label in muted Nunito, value in ink Nunito with tabular figures. Unknown values say Unknown in muted italic, with a small "Add it" link.
- Pure CSS. No images, no nine slice frames, no copy of the client skin.

On phones the rows stack label over value. Past four columns, a table inside a window scrolls in its own container with a sticky first column.

### The library of places

The rules from `docs/research/ui.md`, made concrete.

Changes per page: the scene band, the mood, the emblem, the subtitle, and on map pages the "what is here" dock.

Never changes: the grid, panel width, panel overlap, type, navigation, table and window components, panel colors, and the footer.

The scene band. A wide low strip at the top of every page, 160 pixels tall on phones and 220 on desktop, full width behind the header. The title panel overlaps its bottom edge by 48 pixels. The band is an inline SVG of under 6 KB: a two stop sky in the mood colors, a ground silhouette, and one or two original motifs. No text in the art. `aria-hidden` and no alt text, since the title says where we are.

Launch scenes, drawn as simple original silhouettes:

| Scene | Motifs | Default mood |
| --- | --- | --- |
| `maple-island` | Low hills, a small dock, one sail | morning |
| `henesys` | Round green hills, a cream cottage, a generic mushroom roof | midday |
| `ellinia` | Tall tree trunks, hanging lanterns | dawn |
| `perion` | Rock mesas, a totem post | dusk |
| `kerning-city` | Rooftops, a water tower, lit windows | night |
| `sleepywood` | Roots, a lantern, mist | cave |
| `default` | A cream field with the wordmark leaf | morning |

The mushroom roof is a generic mushroom with its own shape and spots, not the Orange Mushroom sprite, per the owner's decision.

The subtitle names the place and a moment, under the factual title. Examples: "Kerning City, after dark." "Henesys, a slow afternoon." The H1, URL, navigation, and search always use the factual name.

The emblem is one small original glyph per entity type, from the Pixelarticons free set, in the panel corner and on index cards.

Day and night. Light mode is the scene in its own mood. Dark mode is the same scene at night. This is the only theme pair. No extra themes.

### Tying scenes to data

Schema change, needs owner approval before implementation.

- `entityBase` gains two optional fields: `scene`, one of the seven scene ids, and `mood`, one of the six moods.
- Starlight docs frontmatter gains the same two optional fields plus an optional `subtitle`.
- One function, `resolveScene` in `src/lib/scenes.ts`, picks the scene at build time: the page's own value, else the category rule, else `default`. Category rules: a monster takes the scene of the first map that lists it. A map takes its region's hub. A class takes its `scene` field. A profession takes `henesys` until workshops exist. A patch takes `default`. A guide takes its own frontmatter or `default`.
- Scene and mood are presentation, not game facts, so they need no source or build.

For the mockups and launch: `data/classes/thief.yaml` gets `scene: kerning-city` and `mood: night`. Kerning City is where the Thief path traditionally starts. That is a presentation choice, so it needs no verification status.

### Page by page

Home. A splash page with a tall scene band in the Henesys scene. A wordmark, one sentence on what the wiki is, a search field, and the current build line. Then six task cards: Where to train, Job advancement, Quests, Monsters, Crafting, What changed. Then the shelf: one row of place cards in the order a player meets them. Then "How to read this wiki" with the three status badges. Footer with the disclaimer and the Sirux credit.

Thief page. Kerning City scene at night. Title "Thief", subtitle "Kerning City, after dark." A window titled "Job path" with rows for first job level, job instructor, where, and requirements, all Unknown today with an "Add it" link. A window titled "Skills that changed" with the empty state from the data. A short "Where to train" window that links to the route skeleton. History at the bottom.

Crimson Balrog page. The monster has no map yet, so it inherits the default scene in the cave mood set on its data. A "Monster" window with level, HP, MP, EXP, weak to, strong to, found in, all Unknown, and the unverified badge. The `differs_from_original` note as a set apart lead. History at the bottom.

### Scene art changed by decision 0006

The owner rejected the scripted pixel scenes on 2026-10-13. Scenes are now painted pictures made with an image model or by hand, following `docs/art-direction.md`. The scene band and shelf cards show the picture when it exists and a plain mood gradient until then. A page's own sprite stands in its scene. Band heights grew to 190 and 260 pixels, and 260 and 380 on the home page, to give painted art room. The rest of the mix below still holds.

### The pick: a mix

Chosen 2026-10-13. The owner was open to both and asked for a mix. The build takes B's character and A's readability:

- From B: the pixel grid scenes, the window frame on every boxed component, Silkscreen window titles and chips, dotted dividers inside windows only, and one invitation box plus muted Unknown rows when a window has no data yet.
- From A: page titles in Nunito 800, so long titles stay readable on a phone, the calm centered home hero, and soft paper backgrounds outside windows.

One change from the mockups, forced by Starlight's frame: the scene band sits at the top of the content column, not behind the fixed header. On phones the content column is full width, so the band is full bleed there. On desktop it reads as a wide window into the place, between the sidebar and the table of contents.

### Two directions

Both are modern plus vintage, at different balances. Both use the same tokens, the same scenes, and the same data.

Direction A, "Morning Shelf". About 70 percent modern. Nunito for every title. Silkscreen only in the wordmark, window titles, and chips. Panels with 10 pixel radius and a soft shadow. Scenes as smooth vector silhouettes. The window frame is light: title bar, stripe, thin border. Feels like a calm modern product that remembers the game.

Direction B, "Old Window". About 45 percent modern. Silkscreen for page titles and section headings, Nunito for body. Every panel is a window with a title bar. 4 pixel radius, a 2 pixel offset shadow, a 1 pixel highlight. Scenes drawn on a pixel grid with crisp stepped edges. Dotted dividers. Feels like opening the old client in a new monitor.

Mockups live in `public/mockups/a/` and `public/mockups/b/` on a pull request branch, so the Vercel preview link shows them on a phone. They are deleted before the branch merges.

### Dependencies

None added. Fonts are committed files. Icons from the Pixelarticons free set are copied as SVG with the MIT notice in `public/fonts/LICENSES.md` and `public/icons/LICENSE`. If the owner prefers the npm packages, that is a dependency and needs approval.

## Tasks

Phase A, before the pick:

- [x] Research in `docs/research/ui.md` and `docs/research/assets.md`.
- [x] Decision 0003, original art only.
- [x] Decision 0004, keep Starlight with a custom theme. Status proposed.
- [x] This spec. Status draft.
- [x] Mockups for directions A and B, three pages each, on a pull request with a preview link. They load fonts from Google Fonts for now. The real site self hosts them.
- [x] Contrast and layout check of both mockups at 360 and 1280 pixels, light and dark.
- [x] Stop. The owner approves this spec, decision 0004, the schema change, and picks a direction.

Phase B, after the pick:

- [x] `src/styles/tokens.css` and the Starlight variable mapping in `src/styles/custom.css`.
- [x] Self hosted font files and their license notices.
- [x] Schema fields `scene`, `mood`, `subtitle`, and `resolveScene`.
- [x] The seven scene SVGs.
- [x] `PageTitle` and `Hero` overrides.
- [x] `Window` component. `MonsterTable` and `SkillList` moved into it, with phone reflow.
- [x] Home, Thief, and Crimson Balrog pages in the chosen direction.
- [x] Remove `public/mockups/`.
- [x] Contrast script run on the final tokens. Lighthouse mobile run on a local production build: home 99, Thief 98, Crimson Balrog 98, accessibility 100, layout shift 0. Not yet run on the Vercel preview.
- [x] `npm run validate` and `npm run build`.
- [x] Update `BACKLOG.md` and rewrite `HANDOFF.md`.

## Open questions

- Answered 2026-10-13: a mix, defined under The pick.
- Answered 2026-10-13: decision 0004 approved.
- Answered 2026-10-13: schema change approved.
- Answered 2026-10-13: Silkscreen confirmed as the display font.
- Answered 2026-10-13: moods are dawn, morning, midday, dusk, night, cave. Launch scenes are Maple Island, Henesys, Ellinia, Perion, Kerning City, Sleepywood, and a default.
- Answered 2026-10-13: all ten asset defaults in `docs/research/assets.md`.
