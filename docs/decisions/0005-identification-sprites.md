# 0005: Identification sprites from other fan sites

Date: 2026-10-13. Status: accepted by the owner 2026-10-13. Amends 0003.

## Context

The owner reviewed mockups A and B and rejected both. The original-only, pixel-grid look does not feel like Maple, and a monster table without the monster's picture is harder to read. Every large Maple fan wiki shows small sprites under a fair use claim. The inventory in `docs/research/assets.md` found no Nexon action against an information-only fan wiki. All confirmed actions targeted private servers, emulators, cheats, and piracy.

Decision 0003 allowed only the owner's own screenshots. The owner will not capture sprites by hand. A plain sprite copied from another fan site is still Nexon's work. The fan site holds no copyright in it, so taking it adds no new rights holder. The exposure is the same as for any other copy of that sprite.

## Decision

The wiki may show small game sprites of monsters, NPCs, and items, only to identify the entry they sit next to.

- Source: single sprite files downloaded from fan sites whose own terms allow it, saved into the repository, and served by our own site. Never hotlinked. Fetched one at a time, never bulk scraped. The allowed sites are listed in `data/sprite-sources.yaml` with the terms that were read and the date. Only the owner changes a site's status. When no allowed site has a sprite, we draw our own or crop our own screenshot.
- The process, the statuses, and the checks are in `docs/policies/images.md`. `npm run validate` enforces the source, the file, and the size.
- Plain sprites only. Nothing a fan site made itself: no edited composites, renders, custom icons, or fan art.
- Nothing extracted from the game client by us.
- Small, at most about native size, next to the entry's name. Not decoration.
- Each sprite carries a short "© Nexon, used for identification" note in its file record. The footer keeps the not affiliated line. The site names a takedown contact, and a takedown request is honored within a day.
- The site sends readers to the game. The footer and the home page link to the official MapleStory Classic World site and its Steam page, as plain text links. No Nexon logo on the link, and no wording that suggests the wiki is official or endorsed.
- Still not used: Nexon logos and wordmarks, map art, key art, wallpapers, backgrounds, music, and sound.

The rest of the identity stays original, as 0003 says. It moves from a pixel grid toward the game's own style: rounded lettering with a thick dark outline, parchment and scroll labels, soft painted gradients, and a warm storybook palette. Style is not protected. Specific art is.

## Consequences

- The wiki depends on fair use and on Nexon's tolerance, as every other Maple fan wiki does. There is no written permission. A short request to Nexon America for written acknowledgment is still worth sending.
- Unlike Fandom, the wiki has no legal team and carries Sirux's name. A takedown is handled by removing the files, quickly and without argument.
- Linking to the official site shows good faith and supports the fair use case, because the wiki adds players to the game rather than replacing anything Nexon sells. It is not permission.
- Donations make the fair use case weaker. They stay tied to hosting, and no ads sit next to sprites.
- AGENTS.md and CONTRIBUTING.md now point at the images policy. Data and text stay our own words.
- Spec 0002 gains a direction C, the Maple storybook look, after the owner has seen the current build.
