/*
   Fetches identification sprites from maplestory.io for every monster,
   NPC, and item that has none yet (docs/policies/images.md). maplestory.io
   is on the allowed list in data/sprite-sources.yaml, and the owner
   approved fetching from it by script on 2026-10-14.

   For each entry it searches maplestory.io by the entry's exact name, in
   the old Global data (GMS 83), which shares Classic World's sprites. When
   several game ids share the name, it takes the lowest, since event copies
   of a monster or NPC get higher ids. It then downloads one still frame:
   the first standing frame of a monster or NPC, or an item's icon. Never
   an animation, a character render, or a composite.

   A sprite is kept only if it is a PNG of at most 192 by 192 pixels and
   40 KB, the limits npm run validate enforces. Anything larger, and any
   name with no match, is listed in the summary and left without a sprite
   for a person to handle.

   It is polite: one request at a time, at least 1.1 seconds apart, with a
   User-Agent naming the site and a contact. It never replaces a sprite a
   person added. By default it is a dry run that only searches. Pass
   --write to download the files and add the sprite blocks.

   Run: npx tsx scripts/fetch-sprites.ts [--write]
*/
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const apiBaseUrl = 'https://maplestory.io/api/GMS/83';
const userAgent =
	'ClassicMapleWikiSprites/1.0 (https://classicmaple.wiki; https://github.com/classicmaple-wiki/classicmaple-wiki)';
const minimumGapMilliseconds = 1100;
const maximumSpriteSide = 192;
const maximumSpriteBytes = 40 * 1024;
const shouldWrite = process.argv.includes('--write');
const dataDirectory = path.resolve('data');
const spritesDirectory = path.resolve('public/sprites');
const today = new Date().toISOString().slice(0, 10);

/*
   Where each collection searches and which still frame it downloads.
*/
const collections = [
	{ name: 'monsters', searchPath: 'mob', framePath: (gameId: number) => `mob/${gameId}/render/stand/0` },
	{ name: 'npcs', searchPath: 'npc', framePath: (gameId: number) => `npc/${gameId}/render/stand/0` },
	{ name: 'items', searchPath: 'item', framePath: (gameId: number) => `item/${gameId}/icon` },
];

type DataRecord = Record<string, unknown>;

let lastRequestTime = 0;
let requestCount = 0;

/*
   Waits until at least the minimum gap has passed since the last request.
*/
async function waitForTurn(): Promise<void> {
	const waitMilliseconds = lastRequestTime + minimumGapMilliseconds - Date.now();
	if (waitMilliseconds > 0) await new Promise((resolve) => setTimeout(resolve, waitMilliseconds));
	lastRequestTime = Date.now();
	requestCount += 1;
}

/*
   One GET to maplestory.io with the script's User-Agent and a timeout.
   A 429 or 403 stops the whole run, since it means the site wants us to
   slow down or stop.
*/
async function request(url: string): Promise<Response | undefined> {
	await waitForTurn();
	const response = await fetch(url, { headers: { 'User-Agent': userAgent }, signal: AbortSignal.timeout(30000) }).catch(
		() => undefined
	);
	if (response && (response.status === 429 || response.status === 403)) {
		throw new Error(`maplestory.io answered ${response.status}. Stopping.`);
	}
	return response?.ok ? response : undefined;
}

/*
   Folds a name for comparison, so curly and straight apostrophes and
   letter case do not stop a match.
*/
function foldName(name: string): string {
	return name.toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, ' ').trim();
}

/*
   The game id for a name: the lowest id among exact name matches, or
   undefined when nothing matches exactly.
*/
async function findGameId(searchPath: string, name: string): Promise<number | undefined> {
	const response = await request(`${apiBaseUrl}/${searchPath}?searchFor=${encodeURIComponent(name)}&count=50`);
	if (!response) return undefined;
	const results = (await response.json().catch(() => [])) as { id: number; name: string }[];
	const matches = results.filter((result) => foldName(result.name ?? '') === foldName(name)).map((result) => result.id);
	return matches.length === 0 ? undefined : Math.min(...matches);
}

/*
   Width and height from a PNG header, or undefined when the bytes are
   not a PNG.
*/
function pngSize(bytes: Buffer): { width: number; height: number } | undefined {
	if (bytes.length < 24 || bytes.toString('ascii', 1, 4) !== 'PNG') return undefined;
	return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

/*
   Searches, downloads, and records sprites for every entry without one,
   then prints what happened, by collection.
*/
async function main(): Promise<void> {
	console.log(`Sprite fetch from maplestory.io, ${shouldWrite ? 'WRITE' : 'dry run, search only'}`);
	const summary: Record<string, Record<string, number>> = {};
	const leftForPeople: string[] = [];

	for (const collection of collections) {
		const directory = path.join(dataDirectory, collection.name);
		if (!existsSync(directory)) continue;
		const tally: Record<string, number> = {};
		summary[collection.name] = tally;
		const count = (outcome: string): void => {
			tally[outcome] = (tally[outcome] ?? 0) + 1;
		};

		for (const fileName of readdirSync(directory).filter((name) => name.endsWith('.yaml')).sort()) {
			const filePath = path.join(directory, fileName);
			const record = parseYaml(readFileSync(filePath, 'utf-8')) as DataRecord;
			if (record.sprite) {
				count('already has a sprite');
				continue;
			}
			const name = String(record.name);
			const gameId = await findGameId(collection.searchPath, name);
			if (gameId === undefined) {
				count('no exact name match');
				leftForPeople.push(`${collection.name}/${record.id}: no match for "${name}"`);
				continue;
			}
			if (!shouldWrite) {
				count('match found');
				continue;
			}

			const sourceUrl = `${apiBaseUrl}/${collection.framePath(gameId)}`;
			const response = await request(sourceUrl);
			const bytes = response ? Buffer.from(await response.arrayBuffer()) : undefined;
			const size = bytes && pngSize(bytes);
			if (!bytes || !size) {
				count('download failed or not a PNG');
				leftForPeople.push(`${collection.name}/${record.id}: download failed`);
				continue;
			}
			if (size.width > maximumSpriteSide || size.height > maximumSpriteSide || bytes.length > maximumSpriteBytes) {
				count('too large, needs a person to trim');
				leftForPeople.push(`${collection.name}/${record.id}: ${size.width} by ${size.height}, ${Math.round(bytes.length / 1024)} KB at ${sourceUrl}`);
				continue;
			}

			const spriteFile = `${collection.name}/${record.id}.png`;
			mkdirSync(path.join(spritesDirectory, collection.name), { recursive: true });
			writeFileSync(path.join(spritesDirectory, spriteFile), bytes);
			record.sprite = { file: spriteFile, source: 'maplestory-io', source_url: sourceUrl, retrieved: today };
			writeFileSync(filePath, stringifyYaml(record, { lineWidth: 0 }));
			count('sprite added');
		}
	}

	console.log(`\nRequests sent: ${requestCount}`);
	for (const [collectionName, tally] of Object.entries(summary)) {
		console.log(`  ${collectionName.padEnd(9)} ${Object.entries(tally).map(([outcome, total]) => `${outcome} ${total}`).join(', ')}`);
	}
	console.log(`\nLeft for people (${leftForPeople.length}):`);
	for (const line of leftForPeople) console.log(`  ${line}`);
	if (!shouldWrite) console.log('\nDry run complete. Run with --write to download.');
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
