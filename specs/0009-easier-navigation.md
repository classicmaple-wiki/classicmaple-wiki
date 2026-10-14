# 0009: Easier navigation

Status: built 2026-10-14, for owner review. From the owner: "some of links are still broken, and the maps doesn't have images, some quests doesn't show NPC image too. Make it easier to navigate."

## What was wrong

- A crawl of the live site found no dead links. What felt broken was text that looked like a link but went nowhere, or nowhere useful. The Places and Classes breadcrumb steps had no page, and a quest's earlier quests were plain text.
- Maps had no picture. Our images policy does not allow Nexon map art.
- Quest pages named their NPCs in text, with no sprite.

## What changed

- **Map pictures:** every map uses its town's painted scene, on its banner and its card, with its kind written under the name. This is the safe and fast option the owner asked for. Lith Harbor uses the harbor pier scene.
- **Map exits:** maps record their portals (`exits`: target map, kind, direction) from MapleClassic Wiki's `portals` table, a link between entries under option 2. Each map page shows Exits, and Ways in for one-way portals, as cards. 251 maps have exits.
- **Quests:** the start and end NPCs show as cards with sprites, the chain as quest cards, and the page sits in the scene of the starting town.
- **Shops:** the shopkeeper and the stock show as cards, like a shop window.
- **NPCs:** their map and quests show as cards.
- **Breadcrumbs:** they follow geography (Home › Henesys › Athena Pierce). The section tag on the banner links to the library type. New index pages for Places, Classes, and Economy mean every step links.
- **Sprites:** a second pass that drops a note in brackets ("Regular Cab (Henesys)") added 17 NPC and 14 item sprites.
- **Library:** cards off screen skip rendering until scrolled near. Card chips leave out the build, so they fit on one line.

## Checks

- `npm run validate` and `npm run build` pass, 1,308 pages, no broken internal links.
