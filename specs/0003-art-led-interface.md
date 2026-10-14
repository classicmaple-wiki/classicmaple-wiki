# 0003: An interface that serves the art

Status: done 2026-10-14. Approved with the recommended answers, reviewed on the preview, merged in pull request 3. Production Lighthouse mobile 100 on home, Thief, and Crimson Balrog.

## Problem

Decision 0007 makes the painted art the identity. The interface was designed before that art existed, and it shows:

- The pictures sit in a thin band inside the content column. The title panel covers their bottom quarter, which is exactly the walkable ground where the page's sprite stands. On Kerning City it hides the bar stools.
- On the home page the best picture is boxed into the content width, not shown as a hero.
- The interface speaks a different language from the art. Uppercase Silkscreen titles, double line title bars, and flat cream panels read as a retro terminal. The art reads as warm wood, stone, lantern light, and sky.
- Dark mode is brown and charcoal, while the night art is deep indigo with warm lights.

## Goals and non-goals

Goals:

- The picture is the first and largest thing on every page, and nothing important in it is covered.
- Interface colors and materials come from the art: wood, stone, parchment, lantern gold, sky blue, mushroom orange, night indigo.
- Data stays easy to read. Windows, tables, and the Unknown invitations keep working.
- Same budgets: Lighthouse mobile 95 or more, accessibility 100, layout shift under 0.02, no horizontal scroll at 360 pixels.

Non-goals:

- New page types or new data. P3 stays separate.
- Animation, parallax scrolling, or sound.
- Painting the remaining scenes. That is P2e, the owner's work.

## Requirements

- [x] Home: the scene is full width of the page, at least 55 percent of the first screen on desktop and 40 percent on a 360 pixel phone, and the wordmark panel sits below or at its bottom edge.
- [x] Inner pages: the title panel overlaps at most the bottom 12 percent of the scene, so the walkable ground strip and the page sprite stay visible.
- [x] Scene height follows the picture's own shape on desktop instead of one fixed height, within a minimum and maximum, so wide panoramas like Kerning City are not over cropped.
- [x] Every interface color token is either sampled from a reference picture or a checked AA variant of one. The table of tokens records where each came from.
- [x] Dark mode uses the night palette: indigo backgrounds and warm lantern accents, matching `henesys-night.webp`.
- [x] Window title bars and panels use the art's materials, such as wood and parchment. Any texture image is under 6 KB and tileable.
- [x] Page titles and window titles read as friendly game text, not a terminal. The choice of font is settled in the open questions below.
- [x] All existing checks still pass: contrast AA, no text on art, no em dashes, the disclaimer, the footer credits, the table of contents.

## Design

### The stage

Changed 2026-10-13 after the owner reviewed the first build, which had a title panel floating half over the picture:

- Home: centered on search. The picture fills a tall hero as a background under a soft veil, parchment by day and indigo by night. The wordmark hangs as a wooden sign in the middle, and under it a solid parchment card holds the tagline, a large search field, the build line, and the actions.
- Inner pages: the page name hangs on a wooden sign in the picture's top left corner, like the map name banner in the game. A wooden strip attached under the picture holds the breadcrumb, the status, and the emblem. Nothing floats over the picture. A page with no picture gets a short mood strip that holds the sign.

The first plan, kept for the record:

- Home: a full width hero. The picture keeps its aspect ratio up to a maximum height of 70 percent of the screen, then crops from the center. The wordmark, tagline, search, and build line sit on a panel that starts on the picture's bottom ledge.
- Inner pages: the band uses `aspect-ratio` from the picture, clamped between 200 and 340 pixels tall on desktop and 180 to 240 on phones. The title panel moves down so it covers only the ledge.
- The page's sprite stands on the ground strip at 62 percent from the left, as now.

### Materials and color

- Panels: warm parchment, light, nearly flat, with an optional tiny parchment texture from the prompt kit.
- Window title bars: warm wood, the color of the fences and stalls in the art, with light text, replacing the double lines.
- Accent: mushroom roof orange for buttons and highlights, kept at AA for links by darkening it one step, as today.
- Status badges: in game uses sky blue, official uses leaf green, unverified uses lantern gold. All checked for AA.
- Dark mode: night indigo page background, deep blue panels, warm lantern gold accent, cream text.
- Footer: a stone or brick band, echoing the ledges at the bottom of each picture.

### Token sources

Approximate colors were sampled from the reference pictures, then adjusted until every text pair passes AA. Ratios are measured against the token they sit on.

| Token | Light | Dark | Comes from | Text contrast |
| --- | --- | --- | --- | --- |
| `--color-paper` | `#F6EFDF` | `#0B1230` | Sunny path and parchment / Henesys night sky | Ink 14.0 / 15.5 |
| `--color-panel` | `#FFF9EC` | `#141C42` | Cream cottage walls / night sky, one step lighter | Ink 15.3 / 13.9, muted 7.9 / 9.8 |
| `--color-accent` | `#9A3D08` | `#F7C14B` | Mushroom roof orange, darkened / lantern gold | 6.6 / 10.0 on panel |
| `--color-accent-fill` | `#E8711C` | `#E8711C` | Mushroom roof orange | Fill only, never behind small text |
| `--color-wood` | `#7A4A26` | `#5A361D` | Fences and the market stall | Wood text 6.8 / 9.7 |
| `--color-sign` | `#5A361D` | `#3E2414` | Dark lamp posts and signboards | Sign text 6.2 / 8.4 |
| `--color-sign-text` | `#FFB85C` | `#FFB85C` | Lantern and window glow | See sign |
| `--color-stone` | `#E4D9C4` | `#1B2350` | Pale stone ledge / stone at night | Ink 11.5 / 12.7, muted 5.9 / 8.9 |
| `--color-chip` | `#F3E3C7` | `#1E2856` | Parchment, one step darker / night | Accent 5.5 / 8.5 |

Status badges were already in the art's colors and stay: in game is sky blue, official is leaf green, unverified is lantern gold.

### Type

Body text stays Nunito. Silkscreen stays only for tiny labels such as chips. Titles move to rounded, friendly game text. Two ways to get there, listed in the open questions.

### Process

Build it on the spec 0002 branch for the three pages that have art or matter most: home, Thief, and Crimson Balrog. Then the rest of the pages follow from the shared components. The owner reviews the preview before merge.

## Tasks

- [x] Owner approves this spec and answers the open questions.
- [x] Sample and record the token palette from the three reference pictures. Check every pair for AA.
- [x] Stage: home hero and inner page band with aspect ratio, reduced overlap.
- [x] Materials: wood title bars, parchment panels, night indigo dark mode, stone footer.
- [x] Title type as decided.
- [x] Screenshots of all pages at 360 and 1280, light and dark. Lighthouse mobile on a local build: home 97, Thief 98, Crimson Balrog 99, accessibility 100, layout shift 0.
- [x] `npm run validate` and `npm run build`.
- [x] Update `BACKLOG.md` and rewrite `HANDOFF.md`.

## Open questions

- Title font. Option one: a rounded display font with a soft outline, such as Fredoka or Baloo 2, both OFL licensed. That adds a third font file of about 30 KB. Option two: no new font, Nunito at its heaviest weight with a dark outline and drop shadow, like in-game text. Recommendation: try option two first, since it costs nothing; move to option one only if it looks weak.
- Textures. Use small seamless textures from the prompt kit for wood and parchment, or pure CSS colors only. Recommendation: CSS only first, textures later if the panels feel flat.
- Should the left sidebar stay on desktop, or become a top menu so the picture can run the full page width? Recommendation: keep it for now. Starlight's sidebar is how readers find pages.

Answered 2026-10-13: Nunito heavy with an outline and shadow for titles, no new font. CSS colors only, no textures yet. Keep the sidebar on desktop. Graffiti and signs in pictures do not need to be perfect shapes; the art should not look too close to the original game anyway.
