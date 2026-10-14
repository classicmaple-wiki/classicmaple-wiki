# 0007: The painted art leads the design

Date: 2026-10-13. Status: accepted by the owner 2026-10-13. Builds on 0006.

## Context

The owner made three pictures with ChatGPT following decision 0006: Henesys by day, Henesys by night, and Kerning City at dusk. The owner judged them better than every interface design built so far, and asked to pivot the whole site to this art direction. Until now the interface was designed first and the scenes were filled in behind it. The windows, the Silkscreen headings, and the cream panels were made for scripted scenes and now sit beside much richer art.

## Decision

The painted HD pixel art is the site's identity. `docs/art-direction.md` defines the look, the three reference pictures, and the prompt kit for every picture the site needs. It is the single source for art.

The interface follows the art, not the other way round. It frames the pictures, takes its colors and materials from them, and stays quiet so they carry the mood. Spec 0003 designs that interface. Until spec 0003 is approved and built, the current interface stays, with the painted pictures in place.

## Consequences

- New pictures are judged against the three references, not against the interface.
- The look of spec 0002 is superseded where spec 0003 changes it. Its structure stays: scenes per page, windows for data, tokens, self hosted fonts, and the performance and accessibility rules.
- Every page needs art to look its best, so painting the remaining scenes is the most visible work left.
- Interface materials, such as wood or parchment, may themselves come from the prompt kit as small seamless textures, kept light enough for the Lighthouse target.
