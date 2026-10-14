# 0006: The field guide look

Status: draft. Direction chosen by the owner on 2026-10-14: "Strong A, and just a bit of B."

## Problem

The owner finds the interface too pixel-heavy: Silkscreen headings and chips, pixel glyphs, and wooden window bars. Spec 0003 made the painted scenes lead. The interface around them still looks dated. The owner compared three mockups and picked A, the clean field guide, with some warmth from B, the storybook. Reasoning: "A is clean, but a bit plain, B is good on the eye, but feel old."

Mockup: https://claude.ai/artifact/WEyznwnLvg65qadFP8C5gv, section "A with a bit of B".

## Goals and non-goals

Goals:

- One restyle of every page to match the mockup, by day and by night.
- No pixel font anywhere. No pixel glyphs in the interface.
- Keep the painted scenes, the sprites, and the page structure.

Non-goals:

- New pages or new data. Layout and navigation stay as they are after spec 0005.
- New scene art.
- The home page layout. It keeps the search card over the veiled scene from spec 0003, restyled.

## Requirements

- [ ] Silkscreen is removed from `public/fonts` and from every stylesheet.
- [ ] Headings, the page title, card titles, and the wordmark use Fredoka. Body text stays Nunito. Both are self-hosted under the SIL Open Font License, like Nunito today.
- [ ] Windows become cards: a warm tinted header strip with a Fredoka title, a white body, a 16 px radius, a 1 px line, and a 3 px drop edge in the line color. No wood title bars.
- [ ] Inner pages show the scene as a rounded banner with the title over a soft gradient. A small wooden pill above the title holds the section and region.
- [ ] Library cards and sprite slots use the glowing slot from the mockup.
- [ ] Interface glyphs are simple line icons, drawn by us, in one stroke style.
- [ ] Night mode uses the indigo palette from the mockup. Every text and link pair is WCAG AA in both themes.
- [ ] Lighthouse mobile is 95 or more on the home page, the library, and a monster page. Accessibility is 100.
- [ ] `npm run validate` and `npm run build` pass.

## Design

### Type

- Fredoka, weights 500 and 600, self-hosted as woff2 with its OFL text in `public/fonts`. Headings, card titles, the wordmark, and card names.
- Nunito stays for everything else. Labels stop being uppercase pixel chips and become small Nunito bold.

### Color tokens, in `src/styles/tokens.css`

| Token | Day | Night |
| --- | --- | --- |
| page | `#f8f5ef` | `#121729` |
| card | `#fffdf9` | `#1a2138` |
| card header | `#f5eddd` | `#222b47` |
| ink | `#2a2620` | `#eceef8` |
| muted | `#6f6556` | `#a7aec8` |
| line | `#e9e0cf` | `#2e3757` |
| accent | `#e8731a` | `#ff9a3c` |
| link | `#2f7d3b` | `#8fd49a` |
| wood pill | `#8b5a2b` with cream text | the same |

### Components

- `Window.astro` keeps its props and markup, so no page changes. Only `window.css` changes.
- `PageTitle.astro`: the hanging sign and the wooden strip become the rounded banner with the wooden pill. The breadcrumb and the status line move under the banner as plain text.
- `glyphs.ts` and its uses: pixel grids are replaced by line icons in one small SVG set.
- `Footer.astro`: the stone ledge becomes a plain card-colored band with a top line.
- `Hero.astro`: the wooden wordmark sign becomes a Fredoka wordmark. The search card restyles to the card look.

### Process

Restyle tokens first, then windows, then the title banner, then cards and icons, then the home page and footer. Screenshot day and night at phone and desktop width after each step.

## Tasks

- [ ] Owner approves this spec.
- [ ] Add Fredoka, remove Silkscreen.
- [ ] Tokens, windows, title banner, library cards, icons, home, footer.
- [ ] Decision 0009 records the change from the pixel interface.
- [ ] Update `docs/art-direction.md` where it describes the interface.
- [ ] Lighthouse on home, library, and a monster page.
- [ ] Run `npm run validate` and `npm run build`.
- [ ] Update `BACKLOG.md` and rewrite `HANDOFF.md`.

## Open questions

- None yet. The owner can still tune the amount of warmth on the live preview.
