import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import type { z } from 'astro/zod';
import { build, dataSchemas, pageFrontmatter, spriteSource, type DataCollectionName } from '../schemas';

/*
   Checks every file a contributor can touch before the site is built.

   Astro already validates data against the schemas at build time, but it
   stops at the first problem and cannot see across files. This script
   reports every problem at once, with the file path, and adds the checks a
   schema cannot express on its own: the filename matches the id, every
   build id exists in data/builds.yaml, references between entities point
   at real files, and leveling routes carry their required frontmatter.

   It exits with a non-zero code when anything fails, so CI blocks the
   pull request.
*/
const dataDirectory = path.resolve('data');
const routesDirectory = path.resolve('src/content/docs/leveling');
const spritesDirectory = path.resolve('public/sprites');
const maximumSpriteSide = 192;
const maximumSpriteBytes = 40 * 1024;
const minimapsDirectory = path.resolve('public/minimaps');
const maximumMinimapSide = 640;
const maximumMinimapBytes = 80 * 1024;
const problems: string[] = [];

function report(filePath: string, message: string) {
	problems.push(`${path.relative(process.cwd(), filePath)}: ${message}`);
}

function readYamlFile(filePath: string): unknown {
	try {
		return parseYaml(readFileSync(filePath, 'utf-8'));
	} catch (error) {
		report(filePath, `Could not read YAML. ${(error as Error).message}`);
		return undefined;
	}
}

function checkAgainstSchema<Schema extends z.ZodType>(
	filePath: string,
	schema: Schema,
	content: unknown
): z.infer<Schema> | undefined {
	const result = schema.safeParse(content);
	if (result.success) return result.data;
	for (const issue of result.error.issues) {
		const location = issue.path.length > 0 ? `${issue.path.join('.')}: ` : '';
		report(filePath, `${location}${issue.message}`);
	}
	return undefined;
}

function listYamlFiles(directory: string): string[] {
	if (!existsSync(directory)) return [];
	return readdirSync(directory)
		.filter((fileName) => fileName.endsWith('.yaml'))
		.sort()
		.map((fileName) => path.join(directory, fileName));
}

/*
   Builds are loaded first because every other check depends on knowing
   which build ids are valid.
*/
function loadBuildIdentifiers(): Set<string> {
	const buildsFilePath = path.join(dataDirectory, 'builds.yaml');
	const content = readYamlFile(buildsFilePath);
	const buildIdentifiers = new Set<string>();
	if (!Array.isArray(content)) {
		report(buildsFilePath, 'Expected a list of builds');
		return buildIdentifiers;
	}
	for (const entry of content) {
		const parsedBuild = checkAgainstSchema(buildsFilePath, build, entry);
		if (!parsedBuild) continue;
		if (buildIdentifiers.has(parsedBuild.id)) report(buildsFilePath, `Duplicate build id "${parsedBuild.id}"`);
		buildIdentifiers.add(parsedBuild.id);
	}
	return buildIdentifiers;
}

/*
   Walks any parsed entity and collects every build id it mentions, no
   matter how deeply nested, so new schema fields with a "build" key are
   covered without touching this script.
*/
function collectBuildReferences(value: unknown, found: string[] = []): string[] {
	if (Array.isArray(value)) {
		for (const element of value) collectBuildReferences(element, found);
	} else if (value !== null && typeof value === 'object' && !(value instanceof Date)) {
		for (const [key, nestedValue] of Object.entries(value)) {
			if (key === 'build' && typeof nestedValue === 'string') found.push(nestedValue);
			else collectBuildReferences(nestedValue, found);
		}
	}
	return found;
}

function validateDataFiles(buildIdentifiers: Set<string>) {
	const collectionNames = Object.keys(dataSchemas) as DataCollectionName[];
	const parsedEntities = new Map<string, { filePath: string; data: Record<string, unknown> }>();

	for (const collectionName of collectionNames) {
		for (const filePath of listYamlFiles(path.join(dataDirectory, collectionName))) {
			const content = readYamlFile(filePath);
			if (content === undefined) continue;
			const parsedEntity = checkAgainstSchema(filePath, dataSchemas[collectionName], content);
			if (!parsedEntity) continue;

			const expectedIdentifier = path.basename(filePath, '.yaml');
			if (parsedEntity.id !== expectedIdentifier) {
				report(filePath, `id "${parsedEntity.id}" must match the filename "${expectedIdentifier}"`);
			}
			for (const buildIdentifier of collectBuildReferences(parsedEntity)) {
				if (!buildIdentifiers.has(buildIdentifier)) {
					report(filePath, `Unknown build "${buildIdentifier}". Add it to data/builds.yaml first`);
				}
			}
			parsedEntities.set(`${collectionName}/${parsedEntity.id}`, { filePath, data: parsedEntity });
		}
	}

	const referenceFields: { collection: DataCollectionName; field: string; target: DataCollectionName }[] = [
		{ collection: 'maps', field: 'monsters', target: 'monsters' },
		{ collection: 'items', field: 'crafted_by', target: 'professions' },
		{ collection: 'professions', field: 'related_professions', target: 'professions' },
		{ collection: 'monsters', field: 'location', target: 'maps' },
		{ collection: 'npcs', field: 'map', target: 'maps' },
		{ collection: 'quests', field: 'giver', target: 'npcs' },
		{ collection: 'quests', field: 'turn_in', target: 'npcs' },
		{ collection: 'quests', field: 'prerequisites', target: 'quests' },
		{ collection: 'shops', field: 'npc', target: 'npcs' },
		{ collection: 'shops', field: 'map', target: 'maps' },
		{ collection: 'shops', field: 'items', target: 'items' },
	];

	for (const [entityKey, { filePath, data }] of parsedEntities) {
		const collectionName = entityKey.split('/')[0];
		for (const { collection, field, target } of referenceFields) {
			if (collection !== collectionName || data[field] === undefined) continue;
			for (const referencedIdentifier of [data[field]].flat() as string[]) {
				if (!parsedEntities.has(`${target}/${referencedIdentifier}`)) {
					report(filePath, `${field}: "${referencedIdentifier}" does not exist in data/${target}/`);
				}
			}
		}
		if (collectionName === 'maps') {
			for (const exit of (data.exits as { to: string }[] | undefined) ?? []) {
				if (!parsedEntities.has(`maps/${exit.to}`)) report(filePath, `exits: "${exit.to}" does not exist in data/maps/`);
			}
		}
		if (collectionName === 'monsters') {
			for (const monsterDrop of (data.drops as { item: string; build: string }[] | undefined) ?? []) {
				if (monsterDrop.item !== 'meso' && !parsedEntities.has(`items/${monsterDrop.item}`)) {
					report(filePath, `drops: "${monsterDrop.item}" does not exist in data/items/`);
				}
			}
		}
		if (collectionName === 'patches') {
			for (const affectedKey of data.affects as string[]) {
				if (!parsedEntities.has(affectedKey)) report(filePath, `affects: "${affectedKey}" does not exist in data/`);
			}
		}
	}

	return parsedEntities;
}

/*
   Leveling routes are guides, not data, but they promise readers a level
   range, a party size, and a class list. The check reads only the
   frontmatter block at the top of each file. "tested_in" may be left out
   for an untested draft; the page then shows an Untested badge.
*/
function validateLevelingRoutes(buildIdentifiers: Set<string>) {
	if (!existsSync(routesDirectory)) return 0;
	const routeFilePaths = readdirSync(routesDirectory)
		.filter((fileName) => /\.mdx?$/.test(fileName) && !fileName.startsWith('index.'))
		.map((fileName) => path.join(routesDirectory, fileName));

	for (const filePath of routeFilePaths) {
		const frontmatterMatch = readFileSync(filePath, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
		if (!frontmatterMatch) {
			report(filePath, 'Missing frontmatter block');
			continue;
		}
		const frontmatter = checkAgainstSchema(filePath, pageFrontmatter, parseYaml(frontmatterMatch[1]));
		if (!frontmatter) continue;
		for (const requiredField of ['level_range', 'party_size', 'classes'] as const) {
			if (frontmatter[requiredField] === undefined) report(filePath, `Leveling routes need "${requiredField}"`);
		}
		if (frontmatter.tested_in !== undefined && !buildIdentifiers.has(frontmatter.tested_in)) {
			report(filePath, `tested_in: unknown build "${frontmatter.tested_in}"`);
		}
	}
	return routeFilePaths.length;
}

/*
   Sprite sources are loaded once. Only allowed sources may back a sprite;
   the statuses and the reasons behind them live in docs/policies/images.md.
*/
function loadSpriteSourceStatuses(): Map<string, string> {
	const sourcesFilePath = path.join(dataDirectory, 'sprite-sources.yaml');
	const statuses = new Map<string, string>();
	if (!existsSync(sourcesFilePath)) return statuses;
	const content = readYamlFile(sourcesFilePath);
	if (!Array.isArray(content)) {
		report(sourcesFilePath, 'Expected a list of sprite sources');
		return statuses;
	}
	for (const entry of content) {
		const parsedSource = checkAgainstSchema(sourcesFilePath, spriteSource, entry);
		if (!parsedSource) continue;
		if (statuses.has(parsedSource.id)) report(sourcesFilePath, `Duplicate sprite source "${parsedSource.id}"`);
		statuses.set(parsedSource.id, parsedSource.status);
	}
	return statuses;
}

/*
   Reads width and height straight from the PNG header, so the check needs
   no image library. Returns undefined when the file is not a PNG.
*/
function readPngSize(filePath: string): { width: number; height: number } | undefined {
	const header = readFileSync(filePath).subarray(0, 24);
	const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
	if (header.length < 24 || !header.subarray(0, 8).equals(pngSignature)) return undefined;
	return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

/*
   Every picture block must point at an allowed source and an existing,
   small PNG named after its entry. Sprites live in public/sprites under
   their collection, and map minimaps in public/minimaps (decision 0010).
   Every file in those folders must be claimed by an entry, so nothing
   sits on the site without a record of where it came from.
*/
function validatePictures(
	parsedEntities: Map<string, { filePath: string; data: Record<string, unknown> }>,
	sourceStatuses: Map<string, string>,
	picture: { field: string; root: string; directory: string; filePrefix: (entityKey: string) => string; maximumSide: number; maximumBytes: number }
) {
	const claimedFiles = new Set<string>();
	for (const [entityKey, { filePath, data }] of parsedEntities) {
		const record = data[picture.field] as { file: string; source: string } | undefined;
		if (!record) continue;
		const expectedFile = `${picture.filePrefix(entityKey)}.png`;
		if (record.file !== expectedFile) report(filePath, `${picture.field}.file must be "${expectedFile}"`);
		const status = sourceStatuses.get(record.source);
		if (status === undefined) {
			report(filePath, `${picture.field}.source "${record.source}" is not in data/sprite-sources.yaml`);
		} else if (status !== 'allowed' && status !== 'allowed-with-credit') {
			report(filePath, `${picture.field}.source "${record.source}" is ${status}. See docs/policies/images.md`);
		}
		const picturePath = path.join(picture.root, record.file);
		claimedFiles.add(path.resolve(picturePath));
		if (!existsSync(picturePath)) {
			report(filePath, `${picture.field} file ${path.relative(process.cwd(), picturePath)} does not exist`);
			continue;
		}
		const size = readPngSize(picturePath);
		if (!size) report(filePath, `${path.relative(process.cwd(), picturePath)} is not a PNG`);
		else if (size.width > picture.maximumSide || size.height > picture.maximumSide) {
			report(filePath, `${path.relative(process.cwd(), picturePath)} is ${size.width} by ${size.height}. Keep it at most ${picture.maximumSide} by ${picture.maximumSide}`);
		}
		if (statSync(picturePath).size > picture.maximumBytes) {
			report(filePath, `${path.relative(process.cwd(), picturePath)} is over ${picture.maximumBytes / 1024} KB`);
		}
	}
	if (!existsSync(picture.directory)) return;
	const unclaimed = (directory: string) => {
		for (const name of readdirSync(directory)) {
			const fullPath = path.resolve(directory, name);
			if (statSync(fullPath).isDirectory()) unclaimed(fullPath);
			else if (!claimedFiles.has(fullPath)) report(fullPath, 'No data entry claims this picture. Add a picture block or delete the file');
		}
	};
	unclaimed(picture.directory);
}

/*
   Every record copied from MapleClassic Wiki must be traceable (spec
   0005). Its source page, and the page behind each of its drops, must be
   listed in data/imports/mapleclassic.yaml with the revision copied, and
   the manifest must name the license and the date. Without that the site
   could not show which version it used under which terms.
*/
function validateImportProvenance(parsedEntities: Map<string, { filePath: string; data: Record<string, unknown> }>) {
	const manifestPath = path.join(dataDirectory, 'imports', 'mapleclassic.yaml');
	const importedPages: { filePath: string; url: string }[] = [];
	for (const { filePath, data } of parsedEntities.values()) {
		const sourcePage = data.source_page;
		if (typeof sourcePage === 'string' && sourcePage.startsWith('https://mapleclassic.wiki/')) {
			importedPages.push({ filePath, url: sourcePage });
		}
		for (const monsterDrop of (data.drops as { source: string }[] | undefined) ?? []) {
			if (monsterDrop.source.startsWith('https://mapleclassic.wiki/')) importedPages.push({ filePath, url: monsterDrop.source });
		}
	}
	if (importedPages.length === 0) return;
	if (!existsSync(manifestPath)) {
		report(manifestPath, 'Missing. Records from MapleClassic Wiki exist, so the import manifest must too');
		return;
	}
	const manifest = readYamlFile(manifestPath) as
		| { license?: string; imported_on?: string; pages?: { url?: string; revision?: number }[] }
		| undefined;
	if (!manifest?.license || !manifest.imported_on) report(manifestPath, 'Needs license and imported_on');
	const revisionByUrl = new Map((manifest?.pages ?? []).map((page) => [page.url, page.revision]));
	for (const { filePath, url } of importedPages) {
		if (typeof revisionByUrl.get(url) !== 'number') {
			report(filePath, `${url} is not in the import manifest with a revision. Rerun the importer or remove the record`);
		}
	}
}

const buildIdentifiers = loadBuildIdentifiers();
const parsedEntities = validateDataFiles(buildIdentifiers);
const entityCount = parsedEntities.size;
validateImportProvenance(parsedEntities);
const spriteSourceStatuses = loadSpriteSourceStatuses();
validatePictures(parsedEntities, spriteSourceStatuses, {
	field: 'sprite',
	root: spritesDirectory,
	directory: spritesDirectory,
	filePrefix: (entityKey) => entityKey,
	maximumSide: maximumSpriteSide,
	maximumBytes: maximumSpriteBytes,
});
validatePictures(parsedEntities, spriteSourceStatuses, {
	field: 'minimap',
	root: path.resolve('public'),
	directory: minimapsDirectory,
	filePrefix: (entityKey) => `minimaps/${entityKey.split('/')[1]}`,
	maximumSide: maximumMinimapSide,
	maximumBytes: maximumMinimapBytes,
});
const routeCount = validateLevelingRoutes(buildIdentifiers);

if (problems.length > 0) {
	console.error(`\nFound ${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
	for (const problem of problems) console.error(`  ${problem}`);
	console.error('\nSee CONTRIBUTING.md for the data format.\n');
	process.exit(1);
}

console.log(`Data is valid. Builds: ${buildIdentifiers.size}. Entities: ${entityCount}. Leveling routes: ${routeCount}.`);
