# Scene art guide

How to make the painted picture at the top of each page. Decision 0006. One picture per scene, plus an optional night picture for dark mode. Drop the file in `src/assets/scenes/` and the site uses it on the next build. No code change.

## The look

The reference is the Slow Snails style: a richly painted pixel art room or place, seen from the side like a 2D game stage, in warm light, with depth and lots of small props. It should feel like the 2006 to 2009 MapleStory era without copying any real map.

- Painted HD pixel art. Visible pixels, soft bloom on lights, rich texture.
- Side view, like a stage in a 2D side-scrolling game. A clear floor line.
- One dominant light per scene: lamp light, neon, sunrise, sunset, moon.
- Layered depth: a busy back wall, a middle with props, a calm floor in front.
- Cozy and lived in, but empty of people. The site adds characters on top.

## Hard rules

- No people, no creatures, no characters painted in. Real sprites are layered on by the site.
- No readable text, letters, or logos. Signs show simple shapes or symbols. The page title says where we are.
- No Nexon or MapleStory logos, and nothing traced from a real map, background, or character. Evoke the era, do not copy it.
- Do not write "MapleStory" in the prompt. Describe the style instead. It keeps logos and real characters out of the result.
- Hand edit every picture before it goes in. Remove garbled details, stray figures, and anything that looks like a real logo.
- AI use is disclosed in the site credits. Keep the prompt you used in the pull request.

## Size and layout

- Master file: PNG, 2:1 or 16:9, at least 1920 pixels wide. Bigger is fine. The build makes the small versions.
- The page shows a wide strip of the picture. On desktop it keeps about the middle third, top to bottom. On phones it keeps about the middle 55 percent, side to side.
- Put the focal point in the middle: the center 60 percent of the width, between 25 and 70 percent of the height.
- Keep the bottom 20 percent a calm floor. The title panel overlaps it, and sprites stand on it.
- Leave open floor space just right of center. That is where the page's own sprite stands.

## File names

| Scene | Day file | Night file, optional |
| --- | --- | --- |
| Default | `default.png` | `default-night.png` |
| Maple Island | `maple-island.png` | `maple-island-night.png` |
| Henesys | `henesys.png` | `henesys-night.png` |
| Ellinia | `ellinia.png` | `ellinia-night.png` |
| Perion | `perion.png` | `perion-night.png` |
| Kerning City | `kerning-city.png` | `kerning-city-night.png` |
| Sleepywood | `sleepywood.png` | `sleepywood-night.png` |

`.jpg` and `.webp` work too. Without a night file, dark mode dims the day picture.

## Prompts

Start every prompt with the shared style line, then add the scene line. Ask for a 2:1 or 16:9 image. For the night version, give the model the day picture and ask for the same scene at night, same composition, lamps lit. Image editing keeps the layout, where a fresh prompt would not.

Shared style line:

> Detailed HD pixel art scene, side view like a stage in a 2D side-scrolling fantasy MMORPG from the mid 2000s, cozy and nostalgic, painted pixel textures, soft bloom on light sources, layered depth with a busy background, props in the middle, and a calm open floor in the foreground. No people, no characters, no creatures, no text, no letters, no logos. Wide 2:1 composition, focal point in the center.

Scene lines:

- **Default, the library of places.** A cozy wooden archive room in warm afternoon light. Tall shelves of scrolls and bound books, a notice board with pinned papers, a brass lantern, a round window with orange maple leaves drifting past, a reading desk with an open map.
- **Maple Island, first light.** A small grassy island at sunrise. A short wooden dock on posts, a little sailboat with one cream sail, calm blue sea, low green hills, a signpost with no words, soft pink and gold morning light.
- **Henesys, a slow afternoon.** A sunny village of round green hills and cottages with big spotted mushroom cap roofs, a small market stall with fruit baskets, a wooden fence, a windmill in the distance, warm midday light, fluffy clouds.
- **Ellinia, at dawn.** A forest of giant tall trees with wooden platforms and rope bridges between trunks, hanging paper lanterns, soft blue morning mist, light rays through the canopy, glowing moss.
- **Perion, dusk on the rocks.** A red rock canyon village at sunset. Carved wooden totem poles, tents and wooden huts on stone ledges, a campfire, long orange light and purple shadows.
- **Kerning City, after dark.** A back alley bar in a gritty city at night. Exposed brick walls, shelves of bottles, a polished bar counter with round stools, glowing neon signs showing simple shapes, warm hanging bulbs, pipes, faded graffiti made of shapes not letters.
- **Sleepywood, below the roots.** An underground hollow beneath enormous tree roots. A lantern on a crooked post, glowing mushrooms, low mist, a small wooden shrine, fireflies, a dim green and gold glow.

## Steps

1. Make the picture with the shared style line plus the scene line.
2. Hand edit it. Check the rules above.
3. Save it as the file name in the table, in `src/assets/scenes/`.
4. Run `npm run build` and look at the page on a phone and a desktop, in light and dark.
5. Open a pull request with the `site:` prefix. Paste the prompt and the tool you used.
