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

Each prompt below is complete. Paste one as is into ChatGPT or Gemini.

- **ChatGPT:** ask for a wide landscape image. It returns 3:2, which works.
- **Gemini:** add "16:9" if it does not offer a wide size.
- **Retries:** if the result has people, text, or a logo, say "same image, remove the people and all text" rather than starting over.
- **Style references:** do not upload someone else's picture, such as a Slow Snails thumbnail, as a style reference. The prompts describe the style instead, so the result stays ours.

### Kerning City, after dark

> A detailed HD pixel art scene of a cozy back alley bar at night in a gritty fantasy city, side view like a stage in a cute 2D side-scrolling MMORPG from the mid 2000s. Exposed red brick walls, tall wooden shelves full of glowing bottles, a long polished dark marble bar counter with round chrome stools, warm hanging Edison bulbs, a few neon signs made only of simple shapes like a star and a moon, copper pipes along the wall, a dartboard, small framed pictures, faded graffiti made of abstract shapes. Warm amber lamp light mixed with soft pink and teal neon glow, gentle bloom on every light. Painted pixel textures, soft rounded friendly shapes, rich detail in the background, calm open wooden floor in the foreground. Completely empty: no people, no characters, no creatures, no animals. No text, no letters, no words, no logos anywhere. Wide landscape composition with the bar counter in the center.

### Henesys, a slow afternoon

> A detailed HD pixel art scene of a peaceful village in rolling green hills on a sunny afternoon, side view like a stage in a cute 2D side-scrolling MMORPG from the mid 2000s. Cream colored cottages with big round orange spotted mushroom cap roofs, a small wooden market stall with baskets of apples and potions, a wooden fence with flowers, a little windmill on a far hill, tall leafy trees, fluffy white clouds in a bright blue sky. Warm golden midday light, soft shadows, gentle bloom on the sun. Painted pixel textures, soft rounded friendly shapes, saturated warm colors, layered hills for depth, calm open grassy path in the foreground. Completely empty: no people, no characters, no creatures, no animals. No text, no letters, no words, no logos anywhere. Wide landscape composition with the mushroom houses in the center.

### Maple Island, first light

> A detailed HD pixel art scene of a small grassy island at sunrise, side view like a stage in a cute 2D side-scrolling MMORPG from the mid 2000s. A short wooden dock on posts, a little sailboat with one cream sail tied to it, calm sparkling blue sea, low green hills, a few palm-like trees, a blank wooden signpost, soft pink and gold morning sky with small clouds. Painted pixel textures, soft rounded friendly shapes, gentle bloom on the rising sun, calm open sandy ground in the foreground. Completely empty: no people, no characters, no creatures, no animals. No text, no letters, no words, no logos anywhere. Wide landscape composition with the dock in the center.

### Ellinia, at dawn

> A detailed HD pixel art scene of a magical forest of giant tall trees at dawn, side view like a stage in a cute 2D side-scrolling MMORPG from the mid 2000s. Huge trunks with wooden platforms and rope bridges between them, hanging paper lanterns glowing softly, glowing moss and small mushrooms, light rays falling through the canopy, soft blue and lilac morning mist. Painted pixel textures, soft rounded friendly shapes, layered trunks for depth, calm open mossy ground in the foreground. Completely empty: no people, no characters, no creatures, no animals. No text, no letters, no words, no logos anywhere. Wide landscape composition with a rope bridge in the center.

### Perion, dusk on the rocks

> A detailed HD pixel art scene of a warrior village in a red rock canyon at sunset, side view like a stage in a cute 2D side-scrolling MMORPG from the mid 2000s. Tall carved wooden totem poles, hide tents and wooden huts on stone ledges, a crackling campfire, training dummies made of straw, layered red mesas in the distance. Long orange sunset light, purple shadows, gentle bloom on the sun and the fire. Painted pixel textures, soft rounded friendly shapes, calm open dusty ground in the foreground. Completely empty: no people, no characters, no creatures, no animals. No text, no letters, no words, no logos anywhere. Wide landscape composition with a totem pole in the center.

### Sleepywood, below the roots

> A detailed HD pixel art scene of a quiet underground hollow beneath enormous tree roots, side view like a stage in a cute 2D side-scrolling MMORPG from the mid 2000s. Thick roots arching down from the ceiling, a lantern on a crooked wooden post, glowing blue and green mushrooms, a small wooden shrine, a calm hot spring pool with steam, fireflies, low mist. Dim green and gold glow, gentle bloom on every light source. Painted pixel textures, soft rounded friendly shapes, layered roots for depth, calm open stone floor in the foreground. Completely empty: no people, no characters, no creatures, no animals. No text, no letters, no words, no logos anywhere. Wide landscape composition with the lantern in the center.

### Default, the library of places

> A detailed HD pixel art scene of a cozy wooden archive room in warm afternoon light, side view like a stage in a cute 2D side-scrolling MMORPG from the mid 2000s. Tall shelves of rolled scrolls and bound books, a cork notice board with pinned blank papers, a brass lantern, a big round window with orange maple leaves drifting past outside, a reading desk with an open blank map, a potted plant, a small ladder. Warm golden light through the window, gentle bloom. Painted pixel textures, soft rounded friendly shapes, rich detail on the shelves, calm open wooden floor in the foreground. Completely empty: no people, no characters, no creatures, no animals. No text, no letters, no words, no logos anywhere. Wide landscape composition with the round window in the center.

### Night version, for dark mode

Upload the finished day picture, then send:

> Make this exact scene at night. Keep the same composition, layout, and every object in the same place. Deep blue night outside, warm lamps and lights glowing brighter, soft moonlight, gentle bloom. Still no people, no text, no logos.

## Steps

1. Make the picture with the shared style line plus the scene line.
2. Hand edit it. Check the rules above.
3. Save it as the file name in the table, in `src/assets/scenes/`.
4. Run `npm run build` and look at the page on a phone and a desktop, in light and dark.
5. Open a pull request with the `site:` prefix. Paste the prompt and the tool you used.
