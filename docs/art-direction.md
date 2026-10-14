# Art direction

The look of Classic Maple Wiki, and how to make any picture it needs. Decisions 0006 and 0007. This is the single source for art. Agents and contributors read this before making or placing any image.

## The direction

The site's identity is painted HD pixel art: cozy, sunlit or lamplit places from a mid 2000s side-scrolling fantasy MMORPG, redrawn at high resolution with modern light. New and old at the same time. Crisp pixel edges, painterly shading, saturated warm color, deep layered scenes full of small props, and no people. The characters come from real sprites the site stands in the scene.

The art leads. The interface is quiet and serves it: it frames the pictures and never competes with them. Since spec 0006 the interface is a clean field guide with a little storybook warmth: warm white cards, Fredoka headings, Nunito text, line icons, and wood only for small tags. No pixel fonts or pixel interface glyphs. Pixel art belongs to the scenes and sprites.

## Reference pictures

These three set the bar. Every new picture should look like it belongs with them.

| File | What it is | What it teaches |
| --- | --- | --- |
| `src/assets/scenes/henesys.webp` | A mushroom house village at midday | The core style: crisp pixels with painterly shading, saturated sunlit color, deep layers from mountains to a framing stone wall, many small props, a flat walkable path across the picture. |
| `src/assets/scenes/henesys-night.webp` | The same village at night | Night is the same picture relit: indigo sky, a big moon, warm glowing windows and lanterns, fireflies, cool blue shadows. Every object stays in place. |
| `src/assets/scenes/kerning-city.webp` | A rooftop bar district at dusk | The cutaway: a building with its front wall open, so a room reads as a stage. A wide panorama, a dramatic sky, and a solid ground band at the bottom made of brick and pipes. |

All three were made with ChatGPT image generation on 2026-10-13 and approved by the owner.

## The look in words

- **Pixels.** High resolution pixel art. Edges and outlines stay crisp and stepped. Inside shapes, shading is soft and painterly, with small dithered clusters.
- **Color.** Saturated and warm, high contrast, clean highlights. Approximate colors sampled from the references: day sky `#3A97FC`, cloud `#BCD6F9`, sunny path `#F9DA89`, pale stone `#CFBBA0`, night sky `#001655`, lantern `#FBE256`, window glow `#EC8B0F`, dusk magenta `#5C2443`. Mushroom roofs are orange with cream spots. Wood is a warm mid brown.
- **Light.** One strong light per scene: sun, moon, sunset, or lamps. Soft bloom on every light source. Warm lamps always glow, even in daytime.
- **Depth.** Three or more layers. Far: sky, mountains, skyline. Middle: the focal buildings and props. Front: a framing ledge of stone, brick, rails, or plants.
- **Density.** Lived in. Barrels, crates, lanterns, fences, flowers, bottles, pipes, signs with shapes. Busy at the back, calmer at the front.
- **Shapes.** Rounded and friendly, slightly cartoon, chunky props with dark outlines.
- **Empty of life.** No people or creatures painted in. The site places real sprites.

## Rules for every picture

- No people, characters, creatures, or animals.
- No readable text, letters, numbers, or logos. Signs show simple shapes, such as a star or a moon.
- No Nexon or MapleStory logos. Nothing traced from a real map, background, or character. Evoke the era, never copy it.
- Do not write "MapleStory" in a prompt. Describe the style instead.
- Never upload someone else's picture as a style reference. Our own reference pictures above are fine.
- Hand check every result. Remove stray figures, garbled letters, and anything that looks like a real logo.
- AI use is disclosed in the site footer, which appears automatically once a picture exists. Keep the prompt you used in the pull request.

## The prompt kit

Every prompt has four parts. Paste them together as one message.

1. **Style block.** The same every time.
2. **Subject.** The place, time, and props.
3. **Layout block.** Depends on what the picture is for.
4. **Exclusions.** The same every time.

To match the style closely, attach `henesys.webp` or `kerning-city.webp` and add: "Match the art style of the attached image exactly."

### Style block

> Modern HD pixel art in the style of a cozy mid 2000s 2D side-scrolling fantasy MMORPG, like a 32-bit game redrawn at high resolution with modern lighting. Crisp visible pixel edges, small pixel clusters and soft dithering inside shapes, painterly shading, rounded friendly cartoon proportions, chunky outlined props. Saturated warm palette, high contrast, clean bright highlights, soft bloom on every light source. Layered parallax depth: sky and far scenery at the back, the main buildings and props in the middle, a framing ledge at the very front. Rich lived-in detail.

### Exclusions

> No people, no characters, no creatures, no animals. No text, letters, numbers, or logos anywhere, signs show only simple shapes. No user interface, no border, no frame, no watermark. Not a 3D render, not a photo, not blurry.

### Layout block: scene band

For the picture at the top of a page. Wide pictures from 16:9 to 3:1 all work.

> Wide landscape, 16:9 or wider. Eye level side view, like a game stage. The main building or focal object sits in the center, between 30 and 70 percent of the width. A wide, flat, open walkable ground strip runs across the whole image at about 70 to 80 percent of the height, clear of objects in the center so characters could stand there. Below it, the bottom 20 percent is a low decorative ledge, such as a mossy stone wall, a brick wall with pipes, wooden planks, or rocks. The top 25 percent is sky, ceiling, or far background with nothing important in it.

For an indoor place, add: "Show the room as a cutaway: the front wall of the building is open, so we see the room inside like a stage, with the building's roof and the outside sky around it."

### Layout block: class character

For the character that stands on each class page's banner. Use the character exclusions below instead of the usual ones, because this picture is the one place a character belongs.

> A single character, full body, standing in a confident idle pose, turned three quarters toward the viewer's left, centered on a square canvas, filling about 85 percent of its height, feet just above the bottom edge. Cute chibi proportions about two and a half heads tall, a big head, large friendly eyes, small hands and feet, like an avatar from a classic 2D side-scrolling MMORPG. Fully transparent background. No ground, no cast shadow, no scenery.

Character exclusions, used only with this layout:

> Only this one character. No other people, creatures, or pets. Do not copy any existing game character, outfit, weapon, or official artwork; this is an original design. No emblems, crests, or insignia from any existing game. No text, letters, numbers, or logos. No user interface, no border, no frame, no watermark. Not a 3D render, not a photo, not blurry.

### Layout block: social share image

For the preview card when a page is shared. The site adds the page title on top later.

> Wide 1200 by 630 landscape. Eye level side view. The focal object sits in the right half. The left 45 percent is calm and simple, open sky or soft background, so a title can be placed over it later.

### Layout block: interface icon

For small item icons in the interface, such as the task cards. Generic objects only, never a monster or a character from the game.

> A single object, centered, filling about 80 percent of a square canvas, on a plain flat background of one solid color. Strong dark outline, clear readable silhouette at small sizes, front three quarter view.

### Layout block: seamless texture

For interface materials, such as a wooden frame or a parchment panel.

> A seamless tileable square texture that repeats with no visible edges. Flat, even lighting, no shadows that suggest a direction, no objects, only the material.

## Subjects

### Scenes

Status shows what is done.

| Scene | Status | Subject |
| --- | --- | --- |
| Henesys, a slow afternoon | Done, day and night | A sunny village of cream colored cottages with big round orange mushroom cap roofs with cream spots, a giant leafy tree behind them, a wooden market stall with a striped orange and cream awning, baskets of red apples and potion bottles, barrels, lanterns on wooden posts, wooden fences, sunflowers and daisies, rolling green hills with waterfalls, stone bridges, distant mushroom houses and a windmill, mountains, bright blue sky with big white clouds, sun rays from the top right. |
| Kerning City, rooftops at dusk | Done | A gritty city rooftop district at dusk. In the center, a cutaway rooftop bar with its front wall open: shelves of glowing bottles, a bar counter with round red stools, hanging warm lamps, a star shaped neon sign in pink and a moon shaped neon sign in teal, a dartboard, potted plants. A rooftop terrace above with a striped umbrella and a water tower. Construction cranes over the skyline, power poles with sagging wires, weathered apartment blocks with outdoor stairs, a small food stall with a blue awning, graffiti made of shapes. A dramatic magenta, gold, and purple sunset sky. The ground band is an old brick wall with pipes, ladders, and round sewer grates. |
| Maple Island, first light | Done | A small grassy island village at sunrise. A wooden dock on posts with a little sailboat with one cream sail, calm sparkling sea, small cottages with orange mushroom cap roofs, a blank wooden signpost, palm-like trees, soft pink and gold sky. |
| Ellinia, at dawn | Done | A magical forest of giant tall trees with wooden platforms, treehouse doors, and rope bridges between trunks, hanging paper lanterns, glowing moss and small mushrooms, light rays through the canopy, soft blue and lilac morning mist. |
| Perion, dusk on the rocks | Done | A warrior village in a red rock canyon at sunset. Carved wooden totem poles, hide tents and wooden huts on stone ledges, a campfire, straw training dummies, layered red mesas, long orange light and purple shadows. |
| Sleepywood, below the roots | Done | A quiet underground hollow beneath enormous tree roots. A lantern on a crooked post, glowing blue and green mushrooms, a small wooden shrine, a steaming hot spring pool, fireflies, low mist, dim green and gold glow. |
| Default, the library of places | Done | A cozy wooden archive room in warm afternoon light, shown as a cutaway. Tall shelves of scrolls and books, a cork notice board with blank papers, a brass lantern, a big round window with orange maple leaves drifting past, a reading desk with an open blank map, a small ladder. |

### Night version

Decided 2026-10-14: only the home page, Henesys, has a night picture. Every other scene uses its day picture in dark mode, dimmed with a night tint by the site. Use this prompt only if that decision changes.


Proven on Henesys. Attach the finished day picture, then send:

> Turn this exact image into the same scene at night. Keep the composition, camera, art style, pixel detail, and every object in exactly the same place and size. Do not add, remove, or move anything. Deep blue and indigo night sky with scattered small pixel stars and soft clouds. Replace the sun with a glowing full moon and a soft halo. Far scenery fades into cool blue silhouettes. Every lantern and window glows warm orange and yellow with soft bloom. A few tiny yellow fireflies. Cool blue shadows everywhere else, high contrast between warm lights and the cool night. Still no people, no characters, no creatures, no animals. No text, letters, or logos. Same size as the original.

For a scene that is already dusk or night, such as Kerning City, ask for "later at night, after the sunset" instead, with the sky turning deep indigo and every light switched on.

### Class characters

One original character per class, made with the class character layout. They are original designs that only suggest each class, never Nexon's own job instructors, outfits, or art. Attach `henesys.webp` and add "Match the art style of the attached image exactly" so the character fits the scenes. Make each one in two looks if you want a choice, then keep the best.

| Class | File | Subject |
| --- | --- | --- |
| Beginner | `beginner.png` | A fresh young adventurer just off the boat. A plain cream linen tunic with rolled sleeves, simple brown shorts, soft leather boots, a small travel satchel, holding a short wooden stick like a first sword. Messy brown hair, an eager smile. |
| Warrior | `warrior.png` | A sturdy young knight. Light bronze plate armor over a red tunic, a short red cape, a round wooden shield with an iron rim and a plain center, a broad one handed sword resting on the shoulder. Short spiky hair, a determined grin. |
| Magician | `magician.png` | An apprentice mage. A deep blue hooded robe with simple gold trim and wide sleeves, a wooden staff topped with a softly glowing blue crystal, a small floating spark of light near the free hand, a little satchel of scrolls. Calm, curious face. |
| Bowman | `bowman.png` | A forest ranger. A green tunic with a brown leather vest and bracers, a green cap with one long feather, a wooden longbow in one hand, a quiver of arrows with white fletching on the back. Focused, friendly look. |
| Thief | `thief.png` | A nimble street rogue at dusk. A dark navy hooded jacket with a scarf pulled up over the nose, fingerless gloves, a belt with small throwing stars, a short curved dagger held low. Sharp, playful eyes above the scarf. |

Ask for a few variations if the first is too plain: "Same character, more detail in the outfit, brighter colors, crisper pixel edges."

### Brand icon

The site's logo: the browser tab icon, the home screen icon, and the GitHub organization's picture. One square picture makes all of them. It has to read at 32 pixels, so keep it to one bold shape. It must be original: never copy or echo the MapleStory logo or any other game's logo.

> A square app icon, 1024 by 1024 pixels. Modern HD pixel art in the style of a cozy mid 2000s 2D side-scrolling fantasy MMORPG, crisp visible pixel edges, painterly shading, a saturated warm palette, soft bloom. One bright orange maple leaf with a darker red brown vein, tilted slightly, resting on a small open field guide book with cream pages, centered and filling about 70 percent of the canvas. Behind it, a rounded square tile with a warm cream to soft gold gradient and a thick dark brown outline, like a wooden sign. A bold, simple silhouette that still reads at 32 by 32 pixels. Original design: do not copy the MapleStory logo or any existing game logo. No text, letters, or numbers. Nothing outside the rounded square, no watermark, not a 3D render.

Variations to ask for: "Same icon, simpler, fewer details so it reads at 32 pixels." or "Same icon without the book, only the leaf on the tile."

Save the chosen picture as `src/assets/brand/icon.png`, square and at least 512 pixels a side, then run `npx tsx scripts/make-icons.ts`. It writes the favicons and `public/icon-512.png`, which is the file to upload as the GitHub organization's picture. Until then, the site uses the leaf tile in `public/favicon.svg`.

### Special pages

All four are done: `workshop.webp` for About, `harbor-board.webp` for What changed, `potion-shop.webp` for Support, and `closed-shop.webp` for the 404 page. Their scene names are in `src/lib/scenes.ts`.


Invented rooms inside real places, the Slow Snails trick. Use the scene band layout.

| Page | Subject |
| --- | --- |
| 404, page not found | A small closed shop in a busy market street at night, shutters down, a hanging lantern still glowing, crates stacked by the door, a blank sign. |
| Support, donations | The counter of a cozy potion shop in a mushroom village, shelves of colorful potion bottles, a brass scale, a tip jar shaped like a clay pot, an empty wooden stool, warm afternoon light, shown as a cutaway. |
| What changed, patch notes | A harbor notice board on a wooden pier at morning, pinned blank papers and ribbons, rope coils, barrels, calm sea and a ship in the distance. |
| About | A small cozy workshop at dusk, a drafting table with blank maps, pinned sketches made of shapes, a lamp, tools on a pegboard, a window onto a mushroom village. |

### Interface icons

Generic objects only. Use the interface icon layout. Examples: a red potion bottle with a cork, a rolled map with a ribbon, a quest scroll with a wax seal, a wooden signpost, a brass compass, an open book, a small treasure chest, a hammer and anvil. Never a monster, an NPC, or a character design from the game.

### Interface textures

Use the seamless texture layout. Examples: warm light wooden planks with soft grain, cream parchment with faint fibers, mossy grey stone blocks, old red brick, dark night sky with tiny pixel stars.

## Fixing a result

Reply in the same chat rather than starting over.

- "Same image, remove the people and all text."
- "Same image, keep everything in the exact same position, only change the lighting to night."
- "Same image, make the ground strip at the bottom flatter and clear in the center."
- "Same image, move the main building to the center."
- "Same image, make the pixel edges crisper and less blurry."

## Files and sizes

- Scene pictures go in `src/assets/scenes/`, named after the scene: `henesys.webp`, with `henesys-night.webp` for dark mode. Scene names: `default`, `maple-island`, `henesys`, `ellinia`, `perion`, `kerning-city`, `sleepywood`.
- Save the master as WebP at quality 92, at least 1500 pixels wide. PNG and JPG also work, but WebP keeps the repository small. A two line conversion with sharp, which the project already uses:

```bash
node -e "require('sharp')('in.png').webp({quality:92,effort:6}).toFile('src/assets/scenes/henesys.webp')"
```

- The build makes the small files for phones and desktops. Check Lighthouse mobile stays at 95 or more after each new picture.
- Class characters go in `src/assets/characters/`, named after the class id: `warrior.png`, `magician.png`, `bowman.png`, `thief.png`, and `beginner.png`. Keep the transparent background, so save as PNG or WebP with alpha, at least 1024 pixels tall. The class page shows its character on the banner as soon as the file is there.
- Sprites are not made here. They follow `docs/policies/images.md`.

## Steps

1. Build the prompt from the kit and make the picture.
2. Hand check it against the rules.
3. Convert and save it under the right name.
4. Run `npm run build` and look at the page on a phone and a desktop, in light and dark.
5. Open a pull request with the `site:` prefix. Paste the prompt and the tool you used.
