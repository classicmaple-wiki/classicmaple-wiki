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

- Master file: PNG, a wide landscape of 2:1, 16:9, or 3:2, at least 1500 pixels wide. Bigger is fine. The build makes the small versions.
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

The approved reference is `src/assets/scenes/henesys.webp`, made with ChatGPT on 2026-10-13. Every other scene must look like it came from the same game. Each prompt has four parts: the style block, the scene, the layout block, and the exclusions. Paste the whole thing as one message.

Tips:

- **ChatGPT:** ask for a wide landscape image.
- **Gemini:** add "16:9".
- **Matching the style:** you may upload our own `henesys.webp` as a style reference and add "match the art style of this image exactly". Never upload someone else's picture.
- **Fixing a result:** if something is wrong, ask for "same image, but ..." rather than starting over.

### Style block

> Modern HD pixel art in the style of a cozy mid 2000s 2D side-scrolling fantasy MMORPG, like a 32-bit game redrawn at high resolution with modern lighting. Crisp visible pixel edges, small pixel clusters and soft dithering inside shapes, painterly shading, rounded friendly cartoon proportions, chunky outlined props. Saturated warm palette, high contrast, clean bright highlights, soft cast shadows. Layered parallax depth: sky and far scenery at the back, the main buildings and props in the middle, a framing ledge with plants at the very front.

### Layout block

> Wide 16:9 landscape. Eye level side view, like a game stage. The main building or focal object sits in the center, between 30 and 70 percent of the width. A wide, flat, open walkable ground strip runs across the whole image at about 70 to 78 percent of the height, clear of objects in the center so characters could stand there. Below it, the bottom 20 percent is a low decorative ledge, such as a mossy stone wall, wooden planks, or rocks, with a few plants. The top 25 percent is sky, ceiling, or far background with nothing important in it.

### Exclusions

> No people, no characters, no creatures, no animals. No text, letters, numbers, or logos anywhere, signs show only simple shapes. No user interface, no border, no frame, no watermark. Not a 3D render, not a photo, not blurry.

### Scenes

Use the style block, then one scene below, then the layout block, then the exclusions.

- **Henesys, a slow afternoon (done).** A sunny village of cream colored cottages with big round orange mushroom cap roofs with cream spots, a giant leafy tree behind them, a wooden market stall with a striped orange and cream awning, baskets of red apples and potion bottles, barrels, lanterns on wooden posts, wooden fences, sunflowers and daisies, rolling green hills with waterfalls, stone bridges, distant mushroom houses and a windmill, mountains, bright blue sky with big white clouds, sun rays from the top right.
- **Kerning City, after dark.** A cozy back alley bar at night in a gritty fantasy city. Red brick walls, tall wooden shelves full of glowing bottles, a long polished dark marble bar counter in the center with round chrome stools, warm hanging bulbs, neon signs made only of simple shapes like a star and a moon in pink and teal, copper pipes, a dartboard, framed pictures, graffiti made of abstract shapes. Warm amber lamp light mixed with soft neon glow. The floor strip is dark wooden planks, the front ledge is a low wooden rail with a potted plant.
- **Maple Island, first light.** A small grassy island village at sunrise. A wooden dock on posts with a little sailboat with one cream sail, calm sparkling sea, small cottages with orange mushroom cap roofs, a blank wooden signpost, palm-like trees, soft pink and gold sky.
- **Ellinia, at dawn.** A magical forest of giant tall trees with wooden platforms, treehouse doors, and rope bridges between trunks, hanging paper lanterns, glowing moss and small mushrooms, light rays through the canopy, soft blue and lilac morning mist.
- **Perion, dusk on the rocks.** A warrior village in a red rock canyon at sunset. Carved wooden totem poles, hide tents and wooden huts on stone ledges, a campfire, straw training dummies, layered red mesas, long orange light and purple shadows.
- **Sleepywood, below the roots.** A quiet underground hollow beneath enormous tree roots. A lantern on a crooked post, glowing blue and green mushrooms, a small wooden shrine, a steaming hot spring pool, fireflies, low mist, dim green and gold glow.
- **Default, the library of places.** A cozy wooden archive room in warm afternoon light. Tall shelves of scrolls and books, a cork notice board with blank papers, a brass lantern, a big round window with orange maple leaves drifting past, a reading desk with an open blank map, a small ladder.

### Night version, for dark mode

Upload the finished day picture, then send:

> Make this exact scene at night. Keep the same composition, layout, art style, and every object in the same place. Deep blue night sky with stars and a soft moon, every lantern and window glowing warm, gentle bloom on lights, cool blue shadows. Still no people, no text, no logos.

## Steps

1. Make the picture with the shared style line plus the scene line.
2. Hand edit it. Check the rules above.
3. Save it as the file name in the table, in `src/assets/scenes/`.
4. Run `npm run build` and look at the page on a phone and a desktop, in light and dark.
5. Open a pull request with the `site:` prefix. Paste the prompt and the tool you used.
