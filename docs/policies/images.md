# Images policy

The rules for every picture on Classic Maple Wiki. Agents and contributors follow this page. `npm run validate` enforces the parts a script can check. Decisions behind it: 0003 (original art), 0005 (identification sprites), and 0006 (painted scene art).

## What may appear on the site

| Kind | Allowed | Where it comes from |
| --- | --- | --- |
| Small sprite of a monster, NPC, or item | Yes, next to that entry's name, and standing in the scene band of that entry's own page | A site on the approved list, our own drawing, or your own screenshot crop |
| A skill's icon | Yes, next to that skill's name on its class page (owner, 2026-10-15) | maplestory.io, fetched by `scripts/fetch-skill-icons.ts` |
| Scenes, page headers, the shelf of places | Yes | Our own painted pictures, made with an image model or by hand, following `docs/art-direction.md` |
| Wordmark, icons, interface glyphs | Yes | Our own art, or the open icon sets listed in `docs/research/assets.md` |
| Your own in-game screenshot | Yes, small, in a guide, as evidence | You took it yourself |
| A map's minimap, the small overview the game shows in its corner | Yes, on that map's page only (decision 0010) | maplestory.io, fetched by `scripts/fetch-sprites.ts` |
| Other Nexon map art, full map renders, key art, wallpapers, backgrounds | No | Paint our own scene instead |
| Nexon or MapleStory logos and wordmarks | No | Name the game in plain text instead |
| Music and sound | No | |
| Anything a fan site made itself: renders, composites, custom icons, fan art | No | |
| Anything extracted from the game client by us | No | |
| Anything from a private server or its tools | No | |

## Sprites, step by step

1. Look up the entry's id. The sprite file is named after it: `public/sprites/<collection>/<id>.png`. Example: `public/sprites/monsters/orange-mushroom.png`.
2. Find a source site in `data/sprite-sources.yaml` with status `allowed` or `allowed-with-credit`. Never use a site that is missing from the list, marked `ask-first`, or marked `blocked`.
3. Download that one sprite. One file per entry, fetched one page at a time. Never scrape or bulk download. The one exception is `scripts/fetch-sprites.ts`, approved by the owner on 2026-10-14. It fetches from maplestory.io only, one still frame per entry, one request a second, and skips anything too large.
4. Check it is a plain sprite: the game's own picture, nothing added. No background scene, no edits, no watermark, no composite.
5. Save it as PNG, at the game's own size or smaller. At most 192 by 192 pixels and 40 KB. Large bosses may be trimmed and scaled down by a whole number, with nearest neighbour scaling so pixels stay crisp. Keep transparency.
6. Add a `sprite` block to the entry's YAML file:

```yaml
sprite:
  file: monsters/orange-mushroom.png
  source: maplestorywiki          # an id from data/sprite-sources.yaml
  source_url: https://link-to-the-exact-page-or-file
  retrieved: 2026-10-14
```

7. Run `npm run validate`. It fails if the file is missing, too big, not a PNG, from a site that is not allowed, or left in the folder with no entry pointing at it.
8. Use the `data:` commit prefix and put "sprite" in the pull request title.

## When no safe source exists

Draw our own. Use `source: original` and leave out `source_url`. Keep it the same size as a sprite, plainly drawn, and clearly not a copy or trace of a Nexon sprite. A simple stand in is better than a risky copy. Until someone draws one, the page simply shows no sprite. That is fine.

Your own screenshot crop is the other option: `source: own-screenshot`, with `source_url` pointing at the full screenshot in the pull request or issue.

## Adding a new source site

A site goes on the list only after someone reads its terms.

1. Read its terms, copyright, about, and reuse pages. Note whether it forbids copying images, asks for credit, or is tied to a private server.
2. Record the quotes you relied on in `docs/research/sprite-sources.md`. Add an entry to `data/sprite-sources.yaml` with the status, the terms URL, the date you checked, the exact credit line if one is asked for, and a one or two sentence reason.
3. Status rules:
   - `blocked` if it is a private server or its tools, or its terms forbid copying images.
   - `ask-first` if the terms are unclear, unreachable, or require permission. Write to the site and record the answer before using it.
   - `allowed-with-credit` if copying is not restricted but credit is asked for. The credits page lists it.
   - `allowed` only if copying is clearly not restricted and no credit is asked for.
4. The owner approves any change to the list. Agents never move a site out of `ask-first` or `blocked` on their own.
5. Recheck each allowed site every six months. Update `checked`.

## Credit and takedown

- Every sprite stays Nexon's work. The site footer keeps the not affiliated line.
- The credits page lists every `allowed-with-credit` site with its credit line.
- We never contact source sites. We use what their terms allow and draw our own otherwise.
- A takedown request is when Nexon or a site asks us to remove something. Anyone can open a GitHub issue with the `takedown` label. Remove it the same day: a pull request with the `takedown` label that deletes the files and their `sprite` blocks. No argument.

## Rules for agents

- Never add a sprite from memory, a search result thumbnail, or a site not on the list.
- Never change a site's status. Propose the change in a pull request and wait for the owner.
- Never draw something that copies or traces a Nexon sprite. Original means designed from scratch.
- AI-drafted pull requests that add sprites carry the `ai-drafted` label like any other.
