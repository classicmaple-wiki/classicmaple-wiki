# 0008: MapleClassic Wiki as a data source, and a non-commercial license

Date: 2026-10-14. Status: accepted by the owner 2026-10-14. Implements spec 0005.

## Context

The wiki was nearly empty a week before launch. MapleClassic Wiki has structured Classic World data and states CC BY-NC-SA 4.0 in its footer and API. The owner chose option 2 of spec 0005: names, locations, links between entities, and player observed drops only. The legal review is in `docs/research/mapleclassic-legal-review.md`.

The source also says, on its About page, that editor prose is CC BY-SA 4.0. The two licenses cannot be mixed. The review suggested asking the maintainers first. The license does not require it, and the owner chose not to.

## Decision

- MapleClassic Wiki is an allowed source for the option 2 fields, imported only by `scripts/import-mapleclassic.ts`. It is the one exception to the rule in `docs/data-research.md` against copying other wikis. No prose, game text, stats, prices, rewards, images, or observer names.
- We rely on the footer license, CC BY-NC-SA 4.0. The basis is recorded in `data/imports/mapleclassic-license.md`.
- All site content, our own writing included, is CC BY-NC-SA 4.0 from 2026-10-14. Code stays MIT. One license for the whole site is simpler than marking imported parts.
- Imported records enter as `unverified`. Players confirm them like any other value.

## Consequences

- The site stays non-commercial while imported data is on it: no ads, paid features, paywalls, affiliate links, or sponsors. A donation link may exist only for hosting costs and unlocks nothing. The Sirux credit stays one small footer line, and imported data is never used in Sirux marketing or client work.
- Every imported page shows a credit with the source page, its contributors, the license, and what changed. The build fails if an import cannot be traced in the manifest.
- No terms of use, API keys, or other limits on reuse.
- A removal request is handled with one command, within days.
- Content released before 2026-10-14 under CC BY-SA 4.0 stays available under that license for anyone who got it then.

## Amendment, 2026-10-14

The owner widened the import to core numbers before launch: a monster's level, HP, and EXP, an item's required level, and a map's recommended levels. Item stats, prices, and rewards stay out. These numbers come from the source's closed beta data, which is client-derived, so this knowingly bends the rule against datamined sources for these fields only. Records that carry them name the Closed Online Test 2 build (`cot2`) and stay `unverified`, and each page says the numbers may differ at launch. The legal review covered option 2. The same reasoning applies, since these are facts, but the Nexon risk it describes is a little higher.
