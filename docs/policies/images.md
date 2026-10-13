# Images policy

The rules for every picture on Classic Maple Wiki. Agents and contributors follow this page. `npm run validate` enforces the parts a script can check. Decisions behind it: 0003 (original art) and 0005 (identification sprites).

## What may appear on the site

| Kind | Allowed | Where it comes from |
| --- | --- | --- |
| Small sprite of a monster, NPC, or item | Yes, only next to that entry's name, to identify it | A site on the approved list, our own drawing, or your own screenshot crop |
| Scenes, page headers, the shelf of places | Yes | Our own art only, drawn by `scripts/draw-scenes.py` |
| Wordmark, icons, interface glyphs | Yes | Our own art, or the open icon sets listed in `docs/research/assets.md` |
| Your own in-game screenshot | Yes, small, in a guide, as evidence | You took it yourself |
| Map art, key art, wallpapers, backgrounds | No | |
| Nexon or MapleStory logos and wordmarks | No | Name the game in plain text instead |
| Music and sound | No | |
| Anything a fan site made itself: renders, composites, custom icons, fan art | No | |
| Anything extracted from the game client by us | No | |
| Anything from a private server or its tools | No | |

## Sprites, step by step

1. Look up the entry's id. The sprite file is named after it: `public/sprites/<collection>/<id>.png`. Example: `public/sprites/monsters/orange-mushroom.png`.
2. Find a source site in `data/sprite-sources.yaml` with status `allowed` or `allowed-with-credit`. Never use a site that is missing from the list, marked `ask-first`, or marked `blocked`.
3. Download that one sprite. One file per entry, fetched one page at a time. Never scrape or bulk download.
4. Check it is a plain sprite: the game's own picture, nothing added. No background scene, no edits, no watermark, no composite.
5. Save it as PNG, at the game's own size or smaller. At most 128 by 128 pixels and 40 KB. Keep transparency.
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
- If Nexon or a source site asks us to remove something, remove it the same day. Open a pull request with the `takedown` label that deletes the files and their `sprite` blocks. No argument.

## Rules for agents

- Never add a sprite from memory, a search result thumbnail, or a site not on the list.
- Never change a site's status. Propose the change in a pull request and wait for the owner.
- Never draw something that copies or traces a Nexon sprite. Original means designed from scratch.
- AI-drafted pull requests that add sprites carry the `ai-drafted` label like any other.
