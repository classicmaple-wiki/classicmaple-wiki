/*
   Finds the painted picture for a scene (decisions 0006 and 0007). A
   picture lives in src/assets/scenes/ under the scene's name, with an
   optional "-night" twin for dark mode, in any common image format.

   The scene component uses the WebP sources. The page title and home
   hero use the aspect ratio, so a band takes the shape of its own
   picture and a wide panorama is not cropped like a 16:9 one. Keeping
   both in one module means the two can never disagree about which
   picture a scene has.
*/
import { getImage } from 'astro:assets';
import type { SceneIdentifier } from '../../schemas/shared';

/*
   Where a scene is shown: a page band, the home hero, or a shelf card.
   Each gets its own target widths.
*/
export type SceneVariant = 'band' | 'home' | 'card';

/*
   The two WebP files made for one picture: small for phones, large for
   wide screens.
*/
export interface SceneSources {
	small: string;
	large: string;
}

/*
   Everything a scene needs: its day sources, its night sources when a
   night picture exists, and the day picture's aspect ratio.
*/
export interface ScenePictures {
	day: SceneSources;
	night?: SceneSources;
	aspectRatio: string;
}

const sceneFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/scenes/*.{png,jpg,jpeg,webp}', {
	eager: true,
});

/*
   Matches a picture by its file name without the extension, so
   "kerning-city.png" and "kerning-city.webp" both count.
*/
function findPicture(name: string): ImageMetadata | undefined {
	const match = Object.entries(sceneFiles).find(([filePath]) => {
		const fileName = filePath.split('/').pop() ?? '';
		return fileName.replace(/\.[a-z]+$/, '') === name;
	});
	return match?.[1].default;
}

/*
   The width and height of a scene's day picture, as a CSS aspect ratio,
   or undefined when the scene has no picture yet.
*/
export function sceneAspectRatio(scene: SceneIdentifier): string | undefined {
	const picture = findPicture(scene);
	return picture && `${picture.width} / ${picture.height}`;
}

const targetWidths: Record<SceneVariant, { small: number; large: number }> = {
	card: { small: 320, large: 560 },
	band: { small: 720, large: 1440 },
	home: { small: 900, large: 1920 },
};

/*
   Two WebP sizes per picture, small for phones and large for wide
   screens. A picture smaller than the target width is never scaled up.
*/
async function pictureSources(picture: ImageMetadata, variant: SceneVariant): Promise<SceneSources> {
	const widths = targetWidths[variant];
	const [small, large] = await Promise.all(
		[widths.small, widths.large].map((width) =>
			getImage({ src: picture, width: Math.min(width, picture.width), format: 'webp', quality: 68 })
		)
	);
	return { small: small.src, large: large.src };
}

/*
   The day picture's sources, its night twin's when one exists, and its
   aspect ratio, or undefined when the scene has no picture yet.
*/
export async function scenePictures(scene: SceneIdentifier, variant: SceneVariant): Promise<ScenePictures | undefined> {
	const dayPicture = findPicture(scene);
	if (!dayPicture) return undefined;
	const nightPicture = findPicture(`${scene}-night`);
	return {
		day: await pictureSources(dayPicture, variant),
		night: nightPicture && (await pictureSources(nightPicture, variant)),
		aspectRatio: `${dayPicture.width} / ${dayPicture.height}`,
	};
}
