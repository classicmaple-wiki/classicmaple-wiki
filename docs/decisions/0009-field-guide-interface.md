# 0009: A field guide interface, no pixel interface

Date: 2026-10-14. Status: accepted by the owner 2026-10-14. Implements spec 0006. Updates 0007.

## Context

The owner found the interface too pixel heavy: the Silkscreen font on chips, pixel glyphs, a pixel leaf, and wooden window bars. The owner compared three mockups: A, a clean field guide; B, a warm storybook; and C, a game window. The pick was "Strong A, and just a bit of B", because "A is clean, but a bit plain, B is good on the eye, but feel old."

## Decision

- The interface is a field guide with a little storybook warmth. Warm white cards with a tinted header strip and a soft drop edge, Fredoka for headings, Nunito for text, simple line icons, and wood only for small tags and the chosen filter pill.
- No pixel font and no pixel interface glyphs. Silkscreen is removed.
- Pixel art stays where it belongs: the painted scenes and the game sprites.
- Day is warm white. Night is the indigo palette from the Henesys night picture.

## Consequences

- Every component kept its markup and props except the page title, which became a rounded scene banner with the name over a soft gradient.
- New icons are drawn as strokes on a 24 pixel grid in `src/lib/glyphs.ts`, rendered by `Icon.astro`.
- The interface parts of specs 0002 and 0003 are superseded where spec 0006 changes them.
