/*
   Links guide text into the wiki (spec 0008). When a guide mentions a
   place, NPC, monster, map, quest, shop, item, or class by its exact
   name, the first mention on the page becomes a link to that entry's own
   page, so every guide connects into the database without anyone adding
   links by hand.

   Names come from data/ when the site is built, so a new entry is linked
   everywhere on the next build. To keep links meaningful:

   - A name must be at least four characters long.
   - A one-word name links only for places, NPCs, monsters, and classes,
     whose names are proper names. Items, maps, quests, and shops need two
     words or more, so a common word never turns into a link.
   - When two entries share a name, the more central one wins: a place
     before a class, an NPC, a monster, a quest, a shop, a map, and an item.
   - Text that is already a link, a heading, or code is never touched, and
     a page never links to itself.
*/
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

const places = [
	['Maple Island', 'maple-island'],
	['Henesys', 'henesys'],
	['Ellinia', 'ellinia'],
	['Perion', 'perion'],
	['Kerning City', 'kerning-city'],
	['Sleepywood', 'sleepywood'],
];

const collections = [
	{ folder: 'classes', route: 'classes', singleWord: true },
	{ folder: 'npcs', route: 'npcs', singleWord: true },
	{ folder: 'monsters', route: 'monsters', singleWord: true },
	{ folder: 'quests', route: 'quests', singleWord: false },
	{ folder: 'shops', route: 'shops', singleWord: false },
	{ folder: 'maps', route: 'maps', singleWord: false },
	{ folder: 'items', route: 'items', singleWord: false },
];

/*
   Every linkable name with its page address, in priority order, with
   later duplicates of a name dropped.
*/
function loadTargets(dataDirectory) {
	const targets = new Map();
	for (const [name, identifier] of places) targets.set(name, `/places/${identifier}/`);
	for (const { folder, route, singleWord } of collections) {
		const directory = path.join(dataDirectory, folder);
		if (!existsSync(directory)) continue;
		for (const fileName of readdirSync(directory).filter((name) => name.endsWith('.yaml'))) {
			const record = parseYaml(readFileSync(path.join(directory, fileName), 'utf-8'));
			const name = String(record?.name ?? '').trim();
			if (name.length < 4 || targets.has(name)) continue;
			if (!singleWord && !name.includes(' ')) continue;
			targets.set(name, `/${route}/${record.id}/`);
		}
	}
	return targets;
}

/*
   One regular expression that finds any target name as a whole word,
   longest names first, so "Blue Snail" wins over "Snail".
*/
function buildPattern(names) {
	const escaped = [...names]
		.sort((first, second) => second.length - first.length)
		.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
	return new RegExp(`(?<![\\p{L}\\p{N}'’])(${escaped.join('|')})(?![\\p{L}\\p{N}'’])`, 'gu');
}

/*
   The page address of a content file, such as /classes/bowman/, so a
   page does not link to itself.
*/
function pageAddress(filePath) {
	const match = String(filePath ?? '').match(/src\/content\/docs\/(.+?)(?:\/index)?\.mdx?$/);
	return match ? `/${match[1]}/` : undefined;
}

/*
   The Markdown plugin for Astro's Sätteri processor. It is a factory, so
   each page starts with its own set of names already linked. Text inside a
   link, a heading, or a footnote is left alone.
*/
export function createEntityLinksPlugin(options = {}) {
	const targets = loadTargets(options.dataDirectory ?? path.resolve('data'));
	const pattern = buildPattern(targets.keys());
	const skippedAncestorTypes = new Set(['link', 'linkReference', 'heading', 'footnoteDefinition', 'tableCell']);

	return (factoryContext) => {
		const ownAddress = pageAddress(factoryContext.fileURL ? decodeURIComponent(factoryContext.fileURL.pathname) : undefined);
		const linked = new Set(ownAddress ? [ownAddress] : []);
		return {
			name: 'entity-links',
			text(node, context) {
				for (let ancestor = context.parent(node); ancestor; ancestor = context.parent(ancestor)) {
					if (skippedAncestorTypes.has(ancestor.type)) return;
				}
				const pieces = [];
				let lastIndex = 0;
				for (const match of node.value.matchAll(pattern)) {
					const href = targets.get(match[1]);
					if (!href || linked.has(href)) continue;
					linked.add(href);
					if (match.index > lastIndex) pieces.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
					pieces.push({ type: 'link', url: href, children: [{ type: 'text', value: match[1] }] });
					lastIndex = match.index + match[1].length;
				}
				if (pieces.length === 0) return;
				if (lastIndex < node.value.length) pieces.push({ type: 'text', value: node.value.slice(lastIndex) });
				context.replaceNode(node, pieces);
			},
		};
	};
}
