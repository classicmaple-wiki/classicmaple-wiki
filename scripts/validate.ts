import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import type { z } from 'astro/zod';
import { build, dataSchemas, pageFrontmatter, type DataCollectionName } from '../schemas';

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
		if (collectionName === 'patches') {
			for (const affectedKey of data.affects as string[]) {
				if (!parsedEntities.has(affectedKey)) report(filePath, `affects: "${affectedKey}" does not exist in data/`);
			}
		}
	}

	return parsedEntities.size;
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

const buildIdentifiers = loadBuildIdentifiers();
const entityCount = validateDataFiles(buildIdentifiers);
const routeCount = validateLevelingRoutes(buildIdentifiers);

if (problems.length > 0) {
	console.error(`\nFound ${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
	for (const problem of problems) console.error(`  ${problem}`);
	console.error('\nSee CONTRIBUTING.md for the data format.\n');
	process.exit(1);
}

console.log(`Data is valid. Builds: ${buildIdentifiers.size}. Entities: ${entityCount}. Leveling routes: ${routeCount}.`);
