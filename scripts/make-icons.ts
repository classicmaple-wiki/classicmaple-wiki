/*
   Turns the owner's logo into every icon the site and GitHub need
   (docs/art-direction.md, Brand icon). The master is a square picture at
   src/assets/brand/icon.png, or .webp, at least 512 pixels a side. It
   writes four PNG files to public/:

   - favicon-32.png, the browser tab icon
   - favicon-192.png, for Android home screens
   - apple-touch-icon.png, 180 pixels, for iPhone home screens
   - icon-512.png, the large copy, also the one to upload as the GitHub
     organization's profile picture

   astro.config.mjs uses these as soon as favicon-32.png exists, and falls
   back to public/favicon.svg until then.

   Run: npx tsx scripts/make-icons.ts
*/
import { existsSync } from 'node:fs';
import sharp from 'sharp';

const candidates = ['src/assets/brand/icon.png', 'src/assets/brand/icon.webp'];
const sizes = [
	{ file: 'public/favicon-32.png', side: 32 },
	{ file: 'public/favicon-192.png', side: 192 },
	{ file: 'public/apple-touch-icon.png', side: 180 },
	{ file: 'public/icon-512.png', side: 512 },
];

/*
   Checks the master, then writes each size, scaled down with a sharp
   kernel so the pixel art stays crisp.
*/
async function main(): Promise<void> {
	const master = candidates.find((candidate) => existsSync(candidate));
	if (!master) throw new Error(`No master icon. Save it as ${candidates[0]}.`);
	const { width, height } = await sharp(master).metadata();
	if (!width || !height || width !== height || width < 512) {
		throw new Error(`${master} is ${width} by ${height}. Use a square picture at least 512 pixels a side.`);
	}
	for (const { file, side } of sizes) {
		await sharp(master).resize(side, side, { kernel: side <= 64 ? 'nearest' : 'lanczos3' }).png({ compressionLevel: 9 }).toFile(file);
		console.log(`Wrote ${file}`);
	}
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
