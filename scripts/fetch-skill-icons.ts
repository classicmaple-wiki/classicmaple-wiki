/*
   Fetches skill icons from maplestory.io for every class skill in
   data/classes/ that has none yet (docs/policies/images.md). One request
   per job reads that job's whole skill book, which holds each skill's
   name and its 32 pixel icon, so a full run is thirteen requests, at
   least 1.1 seconds apart.

   A skill matches by its name within its own class's books. Branches are
   not taken from the books, since Classic World moved some skills; they
   come from Nexon's official class pages. Icons are saved to public/sprites/skills/ as
   <class>-<skill>.png. A skill a person already gave an icon is left
   alone. Skills with no match are listed for a person to handle.

   Run: npx tsx scripts/fetch-skill-icons.ts [--write]
*/
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const apiBaseUrl = 'https://maplestory.io/api/GMS/83';
const userAgent =
	'ClassicMapleWikiSprites/1.0 (https://classicmaple.wiki; https://github.com/classicmaple-wiki/classicmaple-wiki)';
const shouldWrite = process.argv.includes('--write');
const today = new Date().toISOString().slice(0, 10);
const iconsDirectory = path.resolve('public/sprites/skills');
const classesDirectory = path.resolve('data/classes');

/*
   The skill books of each class, with the branch name each book teaches,
   as Classic World's official class pages name them.
*/
const booksByClass: Record<string, { job: number; branch: string }[]> = {
	warrior: [
		{ job: 100, branch: 'Warrior' },
		{ job: 110, branch: 'Fighter' },
		{ job: 120, branch: 'Page' },
		{ job: 130, branch: 'Spearman' },
	],
	magician: [
		{ job: 200, branch: 'Magician' },
		{ job: 210, branch: 'Wizard (Fire/Poison)' },
		{ job: 220, branch: 'Wizard (Ice/Lightning)' },
		{ job: 230, branch: 'Cleric' },
	],
	bowman: [
		{ job: 300, branch: 'Archer' },
		{ job: 310, branch: 'Hunter' },
		{ job: 320, branch: 'Crossbowman' },
	],
	thief: [
		{ job: 400, branch: 'Rogue' },
		{ job: 410, branch: 'Assassin' },
		{ job: 420, branch: 'Bandit' },
	],
};

let lastRequestTime = 0;

/*
   One skill book, with a pause first so requests stay a second apart.
*/
async function readSkillBook(job: number): Promise<{ name: string; icon: string }[]> {
	const waitMilliseconds = lastRequestTime + 1100 - Date.now();
	if (waitMilliseconds > 0) await new Promise((resolve) => setTimeout(resolve, waitMilliseconds));
	lastRequestTime = Date.now();
	const response = await fetch(`${apiBaseUrl}/job/${job}/skillbook`, {
		headers: { 'User-Agent': userAgent },
		signal: AbortSignal.timeout(30000),
	});
	if (response.status === 429 || response.status === 403) throw new Error(`maplestory.io answered ${response.status}. Stopping.`);
	if (!response.ok) return [];
	const book = (await response.json()) as { skills?: { icon?: string; description?: { name?: string } }[] };
	return (book.skills ?? []).flatMap((skill) =>
		skill.icon && skill.description?.name ? [{ name: skill.description.name, icon: skill.icon }] : []
	);
}

/*
   Folds a name for comparison. The old skill books spell some names
   differently, such as "Final Attack : BW" or "Power Knock-Back", so case,
   apostrophes, hyphens, the space before a colon, and two short forms
   are evened out.
*/
function foldName(name: string): string {
	return name
		.toLowerCase()
		.replace(/[’`]/g, "'")
		.replace(/\s*:\s*/g, ': ')
		.replace(/-/g, '')
		.replace(/\bbw\b/g, 'blunt weapon')
		.replace(/\bpole arm\b/g, 'polearm')
		.replace(/\s+/g, ' ')
		.trim();
}

/*
   Reads every class's books, matches skills, and writes icons and
   branches, then lists what is left.
*/
async function main(): Promise<void> {
	console.log(`Skill icons from maplestory.io, ${shouldWrite ? 'WRITE' : 'dry run'}`);
	const leftForPeople: string[] = [];
	let added = 0;
	for (const fileName of readdirSync(classesDirectory).filter((name) => name.endsWith('.yaml'))) {
		const filePath = path.join(classesDirectory, fileName);
		const record = parseYaml(readFileSync(filePath, 'utf-8')) as { id: string; skills?: Record<string, unknown>[] };
		const books = booksByClass[record.id];
		if (!books || !record.skills?.length) continue;
		const found = new Map<string, { icon: string; job: number; branch: string }>();
		for (const book of books) {
			for (const skill of await readSkillBook(book.job)) {
				const key = foldName(skill.name);
				const entry = { icon: skill.icon, job: book.job, branch: book.branch };
				if (!found.has(key)) found.set(key, entry);
				const withoutWeapon = key.replace(/: [a-z ]+$/, '');
				if (withoutWeapon !== key && !found.has(withoutWeapon)) found.set(withoutWeapon, entry);
			}
		}
		for (const skill of record.skills) {
			const match = found.get(foldName(String(skill.name)));
			if (!match) {
				leftForPeople.push(`${record.id}: no icon for "${skill.name}"`);
				continue;
			}
			if (skill.icon) continue;
			const iconFile = `skills/${record.id}-${skill.id}.png`;
			if (shouldWrite) {
				mkdirSync(iconsDirectory, { recursive: true });
				writeFileSync(path.resolve('public/sprites', iconFile), Buffer.from(match.icon, 'base64'));
				skill.icon = {
					file: iconFile,
					source: 'maplestory-io',
					source_url: `${apiBaseUrl}/job/${match.job}/skillbook`,
					retrieved: today,
				};
			}
			added += 1;
		}
		if (shouldWrite) writeFileSync(filePath, stringifyYaml(record, { lineWidth: 0 }));
	}
	console.log(`Icons ${shouldWrite ? 'added' : 'to add'}: ${added}`);
	console.log(`Left for people (${leftForPeople.length}):`);
	for (const line of leftForPeople) console.log(`  ${line}`);
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
