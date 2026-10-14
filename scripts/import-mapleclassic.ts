/*
   Seeds data/ from MapleClassic Wiki (spec 0005, option 2 plus core
   numbers), a Classic World wiki licensed CC BY-NC-SA 4.0.

   What it takes is deliberately narrow. Names, where things are, who gives
   a quest and which quests come first, which maps connect through
   portals, what a shop sells, and monster
   drops that players observed, with the date and the number of kills
   behind each rate. Since 2026-10-14 the owner also allows the core
   numbers players look up most: a monster's level, HP, and EXP, an item's
   required level, and a map's recommended levels. They come from the
   source's closed beta data, so a record that has any of them names the
   Closed Online Test 2 build. It never takes item stats, prices, rewards,
   or any other number, never takes description or dialogue text, never
   takes images, and never stores the names of the players who observed a
   drop.

   It is polite to the source. It reads only api.php with action=cargoquery
   and one category listing, never index.php or Special pages, waits at
   least 1.1 seconds between requests, and names itself and a contact in
   its User-Agent. A full run is about twenty requests.

   It checks the source's license before reading anything and stops if it
   is no longer CC BY-NC-SA 4.0, or if the source has started using a page
   level license template, which could put some pages under other terms.
   Each write also records the run in data/imports/mapleclassic.yaml: the
   date, the license, and the revision of every page copied.

   Writing is gated on a recorded decision. --write refuses to run until
   data/imports/mapleclassic-license.md exists and says which license the
   import relies on and why, such as a written reply from the source's
   maintainers. The legal review behind this rule is in spec 0005.

   It is safe to rerun. Every record it writes carries source_page, the
   page it came from, and enters as unverified. Imported files whose page
   has left the source are removed, unless a person verified them. An existing file without
   source_page was written by hand and is never touched. An imported file
   that a person has since verified is never touched either. When it
   updates an imported file, it keeps fields a person added, such as a
   sprite, scene, mood, notes, or history.

   By default it is a dry run: it reads the source, builds every record,
   and prints what it would do, writing nothing. Pass --write to write.

   Removal is one command, for a takedown or a license change, and needs
   no network. --remove-all deletes every imported file, verified or not.
   --remove-page "Page title" deletes the files from that one source page
   and the drops credited to it. Both update the manifest.

   Run: npx tsx scripts/import-mapleclassic.ts [--write]
        npx tsx scripts/import-mapleclassic.ts --remove-all
        npx tsx scripts/import-mapleclassic.ts --remove-page "Blue Snail"
*/
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const apiUrl = 'https://mapleclassic.wiki/api.php';
const wikiPageBaseUrl = 'https://mapleclassic.wiki/wiki/';
const userAgent =
	'ClassicMapleWikiImporter/1.0 (https://classicmaple.wiki; https://github.com/classicmaple-wiki/classicmaple-wiki)';
const minimumGapMilliseconds = 1100;
const rowsPerRequest = 500;
const shouldWrite = process.argv.includes('--write');
const dropBuild = 'founders-2026-10-06';
const closedBetaBuild = 'cot2';
const foundersAccessStart = '2026-10-06';
const dataDirectory = path.resolve('data');
const expectedLicenseUrl = 'https://creativecommons.org/licenses/by-nc-sa/4.0/';
const manifestPath = path.join(dataDirectory, 'imports', 'mapleclassic.yaml');
const licenseDecisionPath = path.join(dataDirectory, 'imports', 'mapleclassic-license.md');
const importedCollections = ['items', 'maps', 'monsters', 'npcs', 'quests', 'shops'];

type SourceRow = Record<string, string | null>;
type DataRecord = Record<string, unknown>;

let lastRequestTime = 0;
let requestCount = 0;

/*
   Waits until at least the minimum gap has passed since the last request,
   so the importer never sends more than one request a second.
*/
async function waitForTurn(): Promise<void> {
	const waitMilliseconds = lastRequestTime + minimumGapMilliseconds - Date.now();
	if (waitMilliseconds > 0) await new Promise((resolve) => setTimeout(resolve, waitMilliseconds));
	lastRequestTime = Date.now();
	requestCount += 1;
}

/*
   One GET to api.php with the importer's User-Agent. Any API error stops
   the run, so a half read source never becomes half written data.
*/
async function requestApi(parameters: Record<string, string>): Promise<any> {
	await waitForTurn();
	const query = new URLSearchParams({ ...parameters, format: 'json' });
	const response = await fetch(`${apiUrl}?${query}`, { headers: { 'User-Agent': userAgent } });
	if (!response.ok) throw new Error(`MapleClassic Wiki answered ${response.status} for ${parameters.tables ?? parameters.list}`);
	const body = await response.json();
	if (body.error) throw new Error(`MapleClassic Wiki API error: ${body.error.info ?? body.error.code}`);
	return body;
}

/*
   Reads every row of one Cargo table, a page of rows at a time, and
   returns plain objects keyed by the requested field aliases.
*/
async function cargoQuery(table: string, fields: string): Promise<SourceRow[]> {
	const rows: SourceRow[] = [];
	for (let offset = 0; ; offset += rowsPerRequest) {
		const body = await requestApi({
			action: 'cargoquery',
			tables: table,
			fields,
			limit: String(rowsPerRequest),
			offset: String(offset),
		});
		const page = (body.cargoquery ?? []).map((entry: { title: SourceRow }) => entry.title);
		rows.push(...page);
		if (page.length < rowsPerRequest) return rows;
	}
}

/*
   Stops the run unless the source still states the license this import
   was cleared for. If MapleClassic Wiki ever changes its license, nothing
   is read or written until a person reviews the new terms.
*/
async function confirmSourceLicense(): Promise<string> {
	const body = await requestApi({ action: 'query', meta: 'siteinfo', siprop: 'rightsinfo', formatversion: '2' });
	const licenseUrl: string = body.query.rightsinfo?.url ?? '';
	if (licenseUrl.replace(/^http:/, 'https:') !== expectedLicenseUrl) {
		throw new Error(`MapleClassic Wiki now states "${licenseUrl}", not ${expectedLicenseUrl}. Stopping. Review the new license first.`);
	}
	return licenseUrl;
}

/*
   Stops the run if the source has any template whose name suggests a
   license or credit notice. The site footer applies "unless otherwise
   noted", and a page level notice is how a wiki notes otherwise. Today
   there are none, so if one appears a person must look before importing.
*/
async function confirmNoPageLicenseTemplates(): Promise<void> {
	const body = await requestApi({ action: 'query', list: 'allpages', apnamespace: '10', aplimit: '500', formatversion: '2' });
	const noticeTemplates = (body.query.allpages as { title: string }[])
		.map((page) => page.title)
		.filter((title) => /licen[cs]e|copyright|attribution|cc[- ]by|public domain/i.test(title));
	if (body.continue) throw new Error('The source has more than 500 templates. Update the template check before importing.');
	if (noticeTemplates.length > 0) {
		throw new Error(`MapleClassic Wiki now has license or credit templates: ${noticeTemplates.join(', ')}. Stopping. Review them first.`);
	}
}

/*
   The latest revision id of each source page, fifty titles per request,
   so the manifest can say exactly which version of each page was copied.
*/
async function latestRevisions(pageNames: string[]): Promise<Map<string, number>> {
	const revisions = new Map<string, number>();
	for (let start = 0; start < pageNames.length; start += 50) {
		const body = await requestApi({
			action: 'query',
			prop: 'info',
			titles: pageNames.slice(start, start + 50).join('|'),
			formatversion: '2',
		});
		for (const page of body.query.pages ?? []) {
			if (typeof page.lastrevid === 'number') revisions.set(page.title, page.lastrevid);
		}
	}
	return revisions;
}

/*
   The page titles in the source's "Not at launch" category, which the
   source marks as absent from the launch game. They are left out.
*/
async function notAtLaunchTitles(): Promise<Set<string>> {
	const titles = new Set<string>();
	let continueToken: string | undefined;
	do {
		const body = await requestApi({
			action: 'query',
			list: 'categorymembers',
			cmtitle: 'Category:Not at launch',
			cmlimit: '500',
			formatversion: '2',
			...(continueToken ? { cmcontinue: continueToken } : {}),
		});
		for (const member of body.query.categorymembers) titles.add(member.title);
		continueToken = body.continue?.cmcontinue;
	} while (continueToken);
	return titles;
}

/*
   Undoes the HTML entities the API returns, such as &#039; and &quot;, so
   names read as they do on the page.
*/
function decodeEntities(text: string | null | undefined): string | undefined {
	if (text === null || text === undefined) return undefined;
	const decoded = text
		.replace(/&quot;/g, '"')
		.replace(/&#0?39;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.trim();
	return decoded === '' ? undefined : decoded;
}

/*
   Turns a page name into our lowercase kebab case id. Apostrophes and
   quotes vanish, "&" becomes "and", and anything else that is not a letter
   or a digit becomes a single hyphen.
*/
function toIdentifier(name: string | undefined): string | undefined {
	if (!name) return undefined;
	const identifier = name
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/&/g, ' and ')
		.replace(/['"’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return identifier === '' ? undefined : identifier;
}

/*
   The address of a page on MapleClassic Wiki, in the form its links use.
*/
function sourcePageUrl(pageName: string): string {
	return wikiPageBaseUrl + encodeURIComponent(pageName.replace(/ /g, '_')).replace(/%2F/g, '/');
}

/*
   The verification block every imported record starts with: unverified,
   pointing at its source page. A record that carries core numbers names
   the build they were seen in, the closed beta (spec 0005). A record with
   no numbers names no build.
*/
function importedVerification(pageName: string, hasNumbers = false): DataRecord {
	return compact({ status: 'unverified', source: sourcePageUrl(pageName), build: hasNumbers ? closedBetaBuild : undefined });
}

/*
   A positive whole number from a Cargo value, or undefined when the value
   is empty, zero where zero means unknown, or not a number.
*/
function positiveNumber(value: string | null | undefined, allowZero = false): number | undefined {
	if (value === null || value === undefined || value.trim() === '') return undefined;
	const parsed = Number(value);
	if (!Number.isInteger(parsed) || parsed < 0 || (!allowZero && parsed === 0)) return undefined;
	return parsed;
}

/*
   Drops empty values, so a record only lists fields that have a value and
   the site shows the rest as Unknown.
*/
function compact(record: DataRecord): DataRecord {
	return Object.fromEntries(
		Object.entries(record).filter(
			([, value]) => value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0)
		)
	);
}

interface PlannedRecord {
	collection: string;
	identifier: string;
	record: DataRecord;
	pageName: string;
}

interface Report {
	excluded: Record<string, number>;
	collisions: string[];
	droppedReferences: Record<string, number>;
}

const report: Report = { excluded: {}, collisions: [], droppedReferences: {} };

/*
   Counts something left out, by reason, for the summary.
*/
function countExcluded(reason: string): void {
	report.excluded[reason] = (report.excluded[reason] ?? 0) + 1;
}

/*
   Counts a link that pointed at an entity we did not import, for the
   summary. The link is left out rather than pointing nowhere.
*/
function countDroppedReference(kind: string): void {
	report.droppedReferences[kind] = (report.droppedReferences[kind] ?? 0) + 1;
}

/*
   Gives each page a unique id within its collection. A second page that
   would land on the same id gets a numbered suffix and is reported.
*/
function makeIdentifierAllocator(collection: string) {
	const byPage = new Map<string, string>();
	const used = new Set<string>();
	return (pageName: string): string | undefined => {
		const existing = byPage.get(pageName);
		if (existing) return existing;
		const base = toIdentifier(pageName);
		if (!base) return undefined;
		let identifier = base;
		for (let suffix = 2; used.has(identifier); suffix += 1) identifier = `${base}-${suffix}`;
		if (identifier !== base) report.collisions.push(`${collection}: "${pageName}" became ${identifier}`);
		used.add(identifier);
		byPage.set(pageName, identifier);
		return identifier;
	};
}

/*
   Reads the source and builds every record we would write, applying the
   option 2 allow list. Nothing is written here.
*/
async function planImport(): Promise<PlannedRecord[]> {
	const excludedTitles = await notAtLaunchTitles();
	const [maps, spawns, portals, monsters, drops, npcs, quests, prerequisiteRows, shops, shopItems, items] = [
		await cargoQuery('maps', '_pageName=page,region,nearest_town=town,map_type=kind,recommended_level_min=levelmin,recommended_level_max=levelmax'),
		await cargoQuery('monster_spawns', 'monster_id=monster,map_id=map'),
		await cargoQuery('portals', '_pageName=page,to_map=to,portal_type=kind,direction'),
		await cargoQuery('monsters', '_pageName=page,primary_location=location,region,boss,released,variant,level,hp,exp'),
		await cargoQuery(
			'monster_drops',
			'monster_id=monster,item_id=item,drop_rate=rate,min_quantity=minimum,max_quantity=maximum,observed_on=observed,sample_kills=kills,sample_drops=dropped'
		),
		await cargoQuery('npcs', '_pageName=page,map,region'),
		await cargoQuery('quests', '_pageName=page,giver,turn_in=turnin,region'),
		await cargoQuery('quests', '_pageName=page,prerequisite__full=prerequisites'),
		await cargoQuery('shops', '_pageName=page,npc,map,region'),
		await cargoQuery('shop_items', 'shop_id=shop,item_id=item'),
		await cargoQuery('items', '_pageName=page,category,required_level=requiredlevel'),
	];

	const isExcluded = (pageName: string | undefined): boolean => {
		if (!pageName) return true;
		if (/^(Module|Template|Category|User|File|Help|Special|MapleWiki|MediaWiki)( talk)?:/i.test(pageName)) {
			countExcluded('technical page, not an article');
			return true;
		}
		if (excludedTitles.has(pageName)) {
			countExcluded('marked "Not at launch" by the source');
			return true;
		}
		return false;
	};

	const mapIdentifier = makeIdentifierAllocator('maps');
	const monsterIdentifier = makeIdentifierAllocator('monsters');
	const itemIdentifier = makeIdentifierAllocator('items');
	const npcIdentifier = makeIdentifierAllocator('npcs');
	const questIdentifier = makeIdentifierAllocator('quests');
	const shopIdentifier = makeIdentifierAllocator('shops');

	const mapPages = new Map<string, SourceRow>();
	for (const row of maps) {
		const page = decodeEntities(row.page);
		if (page && !isExcluded(page) && !mapPages.has(page)) mapPages.set(page, row);
	}
	const monsterPages = new Map<string, SourceRow>();
	for (const row of monsters) {
		const page = decodeEntities(row.page);
		if (!page || isExcluded(page)) continue;
		if (decodeEntities(row.variant)) {
			countExcluded('monster variant row, base row kept');
			continue;
		}
		if (row.released !== 'yes') {
			countExcluded('monster not released');
			continue;
		}
		if (!monsterPages.has(page)) monsterPages.set(page, row);
	}

	const observedDrops = drops.filter((row) => {
		const kills = Number(row.kills);
		const observed = decodeEntities(row.observed);
		const isObserved = observed !== undefined && observed >= foundersAccessStart && kills > 0 && row.rate !== null;
		if (!isObserved) countExcluded('drop row without a player observation');
		return isObserved;
	});

	const itemPages = new Map<string, SourceRow>();
	for (const row of items) {
		const page = decodeEntities(row.page);
		if (page && !itemPages.has(page)) itemPages.set(page, row);
	}
	const referencedItemPages = new Set<string>();
	for (const row of observedDrops) {
		const item = decodeEntities(row.item);
		if (item && item !== 'Meso') referencedItemPages.add(item);
	}
	for (const row of shopItems) {
		const item = decodeEntities(row.item);
		if (item) referencedItemPages.add(item);
	}

	const planned: PlannedRecord[] = [];
	const categoryNames: Record<string, string> = {
		equip: 'equipment',
		use: 'consumable',
		etc: 'material',
		setup: 'other',
		cash: 'other',
	};

	for (const page of [...itemPages.keys()].sort()) {
		if (!referencedItemPages.has(page)) {
			countExcluded('item not dropped or sold anywhere in the source');
			continue;
		}
		if (isExcluded(page)) continue;
		const identifier = itemIdentifier(page);
		if (!identifier) continue;
		const category = categoryNames[itemPages.get(page)!.category ?? ''] ?? 'other';
		const requiredLevel = positiveNumber(itemPages.get(page)!.requiredlevel);
		planned.push({
			pageName: page,
			collection: 'items',
			identifier,
			record: compact({
				id: identifier,
				name: page,
				category,
				required_level: requiredLevel,
				source_page: sourcePageUrl(page),
				verified: importedVerification(page, requiredLevel !== undefined),
			}),
		});
	}
	const importedItems = new Set(planned.filter((entry) => entry.collection === 'items').map((entry) => entry.identifier));

	for (const page of [...mapPages.keys()].sort()) mapIdentifier(page);
	const resolveMap = (name: string | undefined): string | undefined => {
		const page = decodeEntities(name);
		if (!page) return undefined;
		if (!mapPages.has(page)) {
			countDroppedReference('map not imported');
			return undefined;
		}
		return mapIdentifier(page);
	};

	for (const page of [...monsterPages.keys()].sort()) monsterIdentifier(page);
	const monstersOnMap = new Map<string, Set<string>>();
	for (const row of spawns) {
		const mapPage = decodeEntities(row.map);
		const monsterPage = decodeEntities(row.monster);
		if (!mapPage || !monsterPage || !mapPages.has(mapPage) || !monsterPages.has(monsterPage)) continue;
		const list = monstersOnMap.get(mapPage) ?? new Set<string>();
		list.add(monsterIdentifier(monsterPage)!);
		monstersOnMap.set(mapPage, list);
	}

	const exitsByMap = new Map<string, DataRecord[]>();
	const portalKinds = new Set(['walking', 'hidden', 'door', 'transport']);
	const directions = new Set(['north', 'south', 'east', 'west', 'up', 'down']);
	for (const row of portals) {
		const fromPage = decodeEntities(row.page);
		const toPage = decodeEntities(row.to);
		if (!fromPage || !toPage || fromPage === toPage || !mapPages.has(fromPage) || !mapPages.has(toPage)) continue;
		const list = exitsByMap.get(fromPage) ?? [];
		const target = mapIdentifier(toPage)!;
		if (list.some((exit) => exit.to === target)) continue;
		const kind = decodeEntities(row.kind)?.toLowerCase();
		const direction = decodeEntities(row.direction)?.toLowerCase();
		list.push(
			compact({
				to: target,
				kind: kind && portalKinds.has(kind) ? kind : undefined,
				direction: direction && directions.has(direction) ? direction : undefined,
			})
		);
		exitsByMap.set(fromPage, list);
	}

	for (const [page, row] of [...mapPages.entries()].sort(([first], [second]) => first.localeCompare(second))) {
		const identifier = mapIdentifier(page)!;
		const levelMinimum = positiveNumber(row.levelmin);
		const levelMaximum = positiveNumber(row.levelmax);
		const recommendedLevel =
			levelMinimum !== undefined && levelMaximum !== undefined && levelMinimum <= levelMaximum
				? [levelMinimum, levelMaximum]
				: undefined;
		planned.push({
			pageName: page,
			collection: 'maps',
			identifier,
			record: compact({
				id: identifier,
				name: page,
				region: decodeEntities(row.region),
				town: decodeEntities(row.town),
				kind: toIdentifier(decodeEntities(row.kind)),
				recommended_level: recommendedLevel,
				monsters: [...(monstersOnMap.get(page) ?? [])].sort(),
				exits: exitsByMap.get(page)?.sort((first, second) => String(first.to).localeCompare(String(second.to))),
				source_page: sourcePageUrl(page),
				verified: importedVerification(page, recommendedLevel !== undefined),
			}),
		});
	}

	const dropsByMonster = new Map<string, DataRecord[]>();
	for (const row of observedDrops) {
		const monsterPage = decodeEntities(row.monster);
		const itemPage = decodeEntities(row.item);
		if (!monsterPage || !monsterPages.has(monsterPage) || !itemPage) continue;
		const item = itemPage === 'Meso' ? 'meso' : itemIdentifier(itemPage);
		if (!item || (item !== 'meso' && !importedItems.has(item))) {
			countDroppedReference('drop item not imported');
			continue;
		}
		const minimum = Number(row.minimum);
		const maximum = Number(row.maximum);
		const list = dropsByMonster.get(monsterPage) ?? [];
		list.push(
			compact({
				item,
				rate_percent: Math.round(Number(row.rate) * 100) / 100,
				quantity: minimum > 0 && maximum >= minimum ? [minimum, maximum] : undefined,
				observed_on: decodeEntities(row.observed),
				sample_kills: Number(row.kills),
				sample_drops: Number(row.dropped ?? 0),
				build: dropBuild,
				source: sourcePageUrl(monsterPage),
			})
		);
		dropsByMonster.set(monsterPage, list);
	}

	for (const [page, row] of [...monsterPages.entries()].sort(([first], [second]) => first.localeCompare(second))) {
		const identifier = monsterIdentifier(page)!;
		const level = positiveNumber(row.level);
		const hp = positiveNumber(row.hp);
		const exp = positiveNumber(row.exp, true);
		planned.push({
			pageName: page,
			collection: 'monsters',
			identifier,
			record: compact({
				id: identifier,
				name: page,
				level,
				hp,
				exp,
				boss: row.boss === '1' ? true : undefined,
				location: resolveMap(row.location ?? undefined),
				region: decodeEntities(row.region),
				drops: dropsByMonster.get(page),
				source_page: sourcePageUrl(page),
				verified: importedVerification(page, level !== undefined || hp !== undefined || exp !== undefined),
			}),
		});
	}

	const npcPages = new Map<string, SourceRow>();
	for (const row of npcs) {
		const page = decodeEntities(row.page);
		if (page && !isExcluded(page) && !npcPages.has(page)) npcPages.set(page, row);
	}
	for (const page of [...npcPages.keys()].sort()) npcIdentifier(page);
	const resolveNpc = (name: string | null | undefined): string | undefined => {
		const page = decodeEntities(name);
		if (!page) return undefined;
		if (!npcPages.has(page)) {
			countDroppedReference('NPC not imported');
			return undefined;
		}
		return npcIdentifier(page);
	};
	for (const [page, row] of [...npcPages.entries()].sort(([first], [second]) => first.localeCompare(second))) {
		const identifier = npcIdentifier(page)!;
		planned.push({
			pageName: page,
			collection: 'npcs',
			identifier,
			record: compact({
				id: identifier,
				name: page,
				map: resolveMap(row.map ?? undefined),
				region: decodeEntities(row.region),
				source_page: sourcePageUrl(page),
				verified: importedVerification(page),
			}),
		});
	}

	const questPages = new Map<string, SourceRow>();
	for (const row of quests) {
		const page = decodeEntities(row.page);
		if (page && !isExcluded(page) && !questPages.has(page)) questPages.set(page, row);
	}
	for (const page of [...questPages.keys()].sort()) questIdentifier(page);
	const prerequisitesByQuest = new Map<string, string[]>();
	for (const row of prerequisiteRows) {
		const page = decodeEntities(row.page);
		const names = (decodeEntities(row.prerequisites) ?? '').split(',').map((name) => name.trim()).filter(Boolean);
		if (!page || names.length === 0) continue;
		const identifiers: string[] = [];
		for (const name of names) {
			if (questPages.has(name)) identifiers.push(questIdentifier(name)!);
			else countDroppedReference('prerequisite quest not imported');
		}
		prerequisitesByQuest.set(page, identifiers);
	}
	for (const [page, row] of [...questPages.entries()].sort(([first], [second]) => first.localeCompare(second))) {
		const identifier = questIdentifier(page)!;
		planned.push({
			pageName: page,
			collection: 'quests',
			identifier,
			record: compact({
				id: identifier,
				name: page,
				giver: resolveNpc(row.giver),
				turn_in: resolveNpc(row.turnin),
				prerequisites: prerequisitesByQuest.get(page),
				region: decodeEntities(row.region),
				source_page: sourcePageUrl(page),
				verified: importedVerification(page),
			}),
		});
	}

	const itemsByShop = new Map<string, Set<string>>();
	for (const row of shopItems) {
		const shopPage = decodeEntities(row.shop);
		const itemPage = decodeEntities(row.item);
		if (!shopPage || !itemPage) continue;
		const item = itemIdentifier(itemPage);
		if (!item || !importedItems.has(item)) {
			countDroppedReference('shop item not imported');
			continue;
		}
		const list = itemsByShop.get(shopPage) ?? new Set<string>();
		list.add(item);
		itemsByShop.set(shopPage, list);
	}
	for (const row of shops) {
		const page = decodeEntities(row.page);
		if (!page || isExcluded(page)) continue;
		const identifier = shopIdentifier(page);
		if (!identifier) continue;
		planned.push({
			pageName: page,
			collection: 'shops',
			identifier,
			record: compact({
				id: identifier,
				name: page,
				npc: resolveNpc(row.npc),
				map: resolveMap(row.map ?? undefined),
				region: decodeEntities(row.region),
				items: [...(itemsByShop.get(page) ?? [])].sort(),
				source_page: sourcePageUrl(page),
				verified: importedVerification(page),
			}),
		});
	}

	for (const entry of planned) entry.pageName = String(entry.record.name);
	return planned;
}

/*
   Decides what happens to one planned record given the file already on
   disk: create it, update it while keeping human additions, or leave it
   alone because a person wrote or verified it.
*/
function resolveAgainstDisk(entry: PlannedRecord): { action: 'create' | 'update' | 'keep-hand-written' | 'keep-verified'; record: DataRecord } {
	const filePath = path.join(dataDirectory, entry.collection, `${entry.identifier}.yaml`);
	if (!existsSync(filePath)) return { action: 'create', record: entry.record };
	const existing = parseYaml(readFileSync(filePath, 'utf-8')) as DataRecord;
	if (!existing.source_page) return { action: 'keep-hand-written', record: existing };
	const status = (existing.verified as { status?: string } | undefined)?.status;
	if (status && status !== 'unverified') return { action: 'keep-verified', record: existing };
	const humanFields = ['sprite', 'minimap', 'scene', 'mood', 'notes', 'differs_from_original', 'changes'];
	const kept = Object.fromEntries(humanFields.filter((field) => existing[field] !== undefined).map((field) => [field, existing[field]]));
	return { action: 'update', record: { ...entry.record, ...kept } };
}

/*
   Imported files on disk that this run did not plan, because the page was
   removed or renamed at the source. Only unverified files that came from
   MapleClassic Wiki are listed. Anything a person wrote or verified stays.
*/
function findStaleImports(planned: PlannedRecord[]): string[] {
	const plannedPaths = new Set(planned.map((entry) => path.join(dataDirectory, entry.collection, `${entry.identifier}.yaml`)));
	const stale: string[] = [];
	for (const collection of importedCollections) {
		const directory = path.join(dataDirectory, collection);
		if (!existsSync(directory)) continue;
		for (const fileName of readdirSync(directory).filter((name) => name.endsWith('.yaml'))) {
			const filePath = path.join(directory, fileName);
			if (plannedPaths.has(filePath)) continue;
			const existing = parseYaml(readFileSync(filePath, 'utf-8')) as DataRecord;
			const status = (existing.verified as { status?: string } | undefined)?.status;
			if (String(existing.source_page ?? '').startsWith(wikiPageBaseUrl) && status === 'unverified') stale.push(filePath);
		}
	}
	return stale;
}

/*
   Writes the record of this run: when it ran, the license the source
   stated, and the revision of every page copied, so it can always be shown
   which version was used and under which license.
*/
function writeManifest(planned: PlannedRecord[], revisions: Map<string, number>, licenseUrl: string): void {
	mkdirSync(path.dirname(manifestPath), { recursive: true });
	const pages = [...new Set(planned.map((entry) => entry.pageName))].sort().map((pageName) =>
		compact({ page: pageName, url: sourcePageUrl(pageName), revision: revisions.get(pageName) })
	);
	const manifest = {
		source: 'MapleClassic Wiki',
		site: 'https://mapleclassic.wiki/',
		license: licenseUrl,
		imported_on: new Date().toISOString().slice(0, 10),
		policy: 'spec 0005, option 2 plus core numbers: names, locations, links between entities, player observed drops, monster level, HP, and EXP, item required level, and map recommended levels',
		pages,
	};
	writeFileSync(manifestPath, stringifyYaml(manifest, { lineWidth: 0 }));
}

/*
   Deletes imported data without touching the network: every file whose
   source_page is on MapleClassic Wiki, or only those from one page when a
   title is given. Drops credited to a removed page are also taken off the
   monsters that keep their files. Hand written files are never touched.
*/
function removeImported(pageTitle: string | undefined): void {
	const targetUrl = pageTitle ? sourcePageUrl(pageTitle) : undefined;
	const matches = (url: unknown): boolean =>
		typeof url === 'string' && url.startsWith(wikiPageBaseUrl) && (targetUrl === undefined || url === targetUrl);
	let removedFiles = 0;
	let removedDrops = 0;
	for (const collection of importedCollections) {
		const directory = path.join(dataDirectory, collection);
		if (!existsSync(directory)) continue;
		for (const fileName of readdirSync(directory).filter((name) => name.endsWith('.yaml'))) {
			const filePath = path.join(directory, fileName);
			const existing = parseYaml(readFileSync(filePath, 'utf-8')) as DataRecord;
			if (matches(existing.source_page)) {
				rmSync(filePath);
				removedFiles += 1;
				continue;
			}
			if (!Array.isArray(existing.drops)) continue;
			const keptDrops = (existing.drops as DataRecord[]).filter((monsterDrop) => !matches(monsterDrop.source));
			if (keptDrops.length === existing.drops.length) continue;
			removedDrops += existing.drops.length - keptDrops.length;
			writeFileSync(filePath, stringifyYaml(compact({ ...existing, drops: keptDrops }), { lineWidth: 0 }));
		}
	}
	if (existsSync(manifestPath)) {
		if (targetUrl === undefined) {
			rmSync(manifestPath);
		} else {
			const manifest = parseYaml(readFileSync(manifestPath, 'utf-8')) as { pages?: { url: string }[] };
			manifest.pages = (manifest.pages ?? []).filter((page) => page.url !== targetUrl);
			writeFileSync(manifestPath, stringifyYaml(manifest, { lineWidth: 0 }));
		}
	}
	console.log(`Removed ${removedFiles} files and ${removedDrops} drops${pageTitle ? ` from "${pageTitle}"` : ''}. Run npm run validate next.`);
}

/*
   Runs the import: plans every record, compares with disk, prints the
   summary and a sample of each collection, and writes only with --write.
*/
async function main(): Promise<void> {
	const removePageIndex = process.argv.indexOf('--remove-page');
	if (process.argv.includes('--remove-all')) return removeImported(undefined);
	if (removePageIndex !== -1) {
		const pageTitle = process.argv[removePageIndex + 1];
		if (!pageTitle) throw new Error('Give the source page title after --remove-page.');
		return removeImported(pageTitle);
	}
	if (shouldWrite && !existsSync(licenseDecisionPath)) {
		throw new Error(
			`Refusing to write: ${path.relative(process.cwd(), licenseDecisionPath)} does not exist. Record which license this import relies on, and why, first (spec 0005).`
		);
	}
	console.log(`MapleClassic Wiki import, ${shouldWrite ? 'WRITE' : 'dry run, nothing will be written'}`);
	const licenseUrl = await confirmSourceLicense();
	console.log(`Source license confirmed: ${licenseUrl}`);
	await confirmNoPageLicenseTemplates();
	console.log('No page level license templates found.');
	const planned = await planImport();
	const tally: Record<string, Record<string, number>> = {};
	const samples = new Map<string, DataRecord>();

	for (const entry of planned) {
		const { action, record } = resolveAgainstDisk(entry);
		tally[entry.collection] ??= {};
		tally[entry.collection][action] = (tally[entry.collection][action] ?? 0) + 1;
		if (!samples.has(entry.collection) && action !== 'keep-hand-written') samples.set(entry.collection, record);
		if (shouldWrite && (action === 'create' || action === 'update')) {
			const directory = path.join(dataDirectory, entry.collection);
			mkdirSync(directory, { recursive: true });
			writeFileSync(path.join(directory, `${entry.identifier}.yaml`), stringifyYaml(record, { lineWidth: 0 }));
		}
	}

	const stale = findStaleImports(planned);
	tally.removed = { 'no longer at the source': stale.length };
	if (shouldWrite) {
		for (const filePath of stale) rmSync(filePath);
		const revisions = await latestRevisions([...new Set(planned.map((entry) => entry.pageName))]);
		writeManifest(planned, revisions, licenseUrl);
	}

	console.log(`\nRequests sent: ${requestCount}`);
	console.log('\nRecords by collection:');
	for (const [collection, actions] of Object.entries(tally)) {
		console.log(`  ${collection.padEnd(9)} ${Object.entries(actions).map(([action, count]) => `${action} ${count}`).join(', ')}`);
	}
	console.log('\nLeft out, by reason:');
	for (const [reason, count] of Object.entries(report.excluded)) console.log(`  ${count} ${reason}`);
	console.log('\nLinks left out because the target was not imported:');
	for (const [kind, count] of Object.entries(report.droppedReferences)) console.log(`  ${count} ${kind}`);
	console.log(`\nId collisions: ${report.collisions.length}`);
	for (const collision of report.collisions.slice(0, 20)) console.log(`  ${collision}`);
	console.log('\nOne sample per collection:');
	for (const [collection, record] of samples) {
		console.log(`\n--- data/${collection}/${record.id}.yaml\n${stringifyYaml(record, { lineWidth: 0 })}`);
	}
	if (!shouldWrite) console.log('Dry run complete. Run with --write to write these files.');
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
