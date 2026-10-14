/*
   The library (spec 0004): every entry in data/ as one inventory card.
   This module reads every data collection and turns each entry into the
   same small record, so the library page and its cards never need to
   know how each collection is shaped.

   A card's fact is one short line taken straight from the data, the way
   a game database shows a level or a slot under the name. When the data
   has no value, the fact says the value is unknown. Nothing is guessed.
   Every card links to a page that exists: monsters, items, and maps to
   their own pages, NPCs, quests, and shops to theirs, classes to their guide, professions and systems to
   the guide that covers them.
*/
import { getCollection } from 'astro:content';
import type { Sprite, Verification } from '../../schemas/shared';
import type { GlyphName } from './glyphs';

export type LibraryType = 'monster' | 'item' | 'map' | 'npc' | 'quest' | 'shop' | 'class' | 'profession' | 'system';

/*
   One card: what it is, what it is called, the one fact it shows, where
   it leads, its sprite when an allowed source has one, and how far it is
   verified.
*/
export interface LibraryCard {
	type: LibraryType;
	identifier: string;
	name: string;
	fact: string;
	href: string;
	spriteFile?: string;
	verified: Verification;
}

/*
   The label, glyph, and filter order of each type. The order is the
   order of the filter pills and of the grid.
*/
export const libraryTypes: { type: LibraryType; label: string; pluralLabel: string; glyph: GlyphName }[] = [
	{ type: 'monster', label: 'Monster', pluralLabel: 'Monsters', glyph: 'monster' },
	{ type: 'item', label: 'Item', pluralLabel: 'Items', glyph: 'potion' },
	{ type: 'map', label: 'Map', pluralLabel: 'Maps', glyph: 'flag' },
	{ type: 'npc', label: 'NPC', pluralLabel: 'NPCs', glyph: 'person' },
	{ type: 'quest', label: 'Quest', pluralLabel: 'Quests', glyph: 'scroll' },
	{ type: 'shop', label: 'Shop', pluralLabel: 'Shops', glyph: 'bag' },
	{ type: 'class', label: 'Class', pluralLabel: 'Classes', glyph: 'mask' },
	{ type: 'profession', label: 'Profession', pluralLabel: 'Professions', glyph: 'hammer' },
	{ type: 'system', label: 'System', pluralLabel: 'Systems', glyph: 'podium' },
];

/*
   Turns a lowercase word from the data, such as "equipment", into a
   label for reading.
*/
function capitalize(word: string): string {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

/*
   Systems link to their own guide when one exists under economy, which
   is where the system guides live today. Anything else falls back to the
   library itself rather than a page that does not exist.
*/
async function systemGuidePath(identifier: string): Promise<string> {
	const guides = await getCollection('docs');
	const match = guides.find((guide) => guide.id === `economy/${identifier}`);
	return match ? `/economy/${identifier}/` : '/library/';
}

/*
   Every card in the library, grouped by type in filter order and sorted
   by name inside each type.
*/
export async function libraryCards(): Promise<LibraryCard[]> {
	const cards: LibraryCard[] = [];

	for (const { data } of await getCollection('monsters')) {
		cards.push({
			type: 'monster',
			identifier: data.id,
			name: data.name,
			fact: data.level === undefined ? 'Level unknown' : `Lv. ${data.level}`,
			href: `/monsters/${data.id}/`,
			spriteFile: (data.sprite as Sprite | undefined)?.file,
			verified: data.verified,
		});
	}
	for (const { data } of await getCollection('items')) {
		cards.push({
			type: 'item',
			identifier: data.id,
			name: data.name,
			fact: data.required_level === undefined ? capitalize(data.category) : `${capitalize(data.category)}, Lv. ${data.required_level}`,
			href: `/items/${data.id}/`,
			spriteFile: (data.sprite as Sprite | undefined)?.file,
			verified: data.verified,
		});
	}
	for (const { data } of await getCollection('maps')) {
		cards.push({
			type: 'map',
			identifier: data.id,
			name: data.name,
			fact: data.region ?? 'Region unknown',
			href: `/maps/${data.id}/`,
			verified: data.verified,
		});
	}
	for (const { data } of await getCollection('npcs')) {
		cards.push({
			type: 'npc',
			identifier: data.id,
			name: data.name,
			fact: data.region ?? 'Region unknown',
			href: `/npcs/${data.id}/`,
			verified: data.verified,
		});
	}
	for (const { data } of await getCollection('quests')) {
		cards.push({
			type: 'quest',
			identifier: data.id,
			name: data.name,
			fact: data.region ?? 'Region unknown',
			href: `/quests/${data.id}/`,
			verified: data.verified,
		});
	}
	for (const { data } of await getCollection('shops')) {
		cards.push({
			type: 'shop',
			identifier: data.id,
			name: data.name,
			fact: data.items.length === 0 ? 'Stock unknown' : `${data.items.length} ${data.items.length === 1 ? 'item' : 'items'} for sale`,
			href: `/shops/${data.id}/`,
			verified: data.verified,
		});
	}
	for (const { data } of await getCollection('classes')) {
		cards.push({
			type: 'class',
			identifier: data.id,
			name: data.name,
			fact:
				data.skills.length === 0
					? 'No skills recorded yet'
					: `${data.skills.length} ${data.skills.length === 1 ? 'skill' : 'skills'} recorded`,
			href: `/classes/${data.id}/`,
			verified: data.verified,
		});
	}
	for (const { data } of await getCollection('professions')) {
		cards.push({
			type: 'profession',
			identifier: data.id,
			name: data.name,
			fact: data.required_level === undefined ? 'Unlock level unknown' : `Unlocks at Lv. ${data.required_level}`,
			href: '/economy/crafting/',
			verified: data.verified,
		});
	}
	for (const { data } of await getCollection('systems')) {
		cards.push({
			type: 'system',
			identifier: data.id,
			name: data.name,
			fact: data.required_level === undefined ? 'Unlock level unknown' : `Unlocks at Lv. ${data.required_level}`,
			href: await systemGuidePath(data.id),
			verified: data.verified,
		});
	}

	const typeOrder = libraryTypes.map((entry) => entry.type);
	return cards.sort(
		(first, second) =>
			typeOrder.indexOf(first.type) - typeOrder.indexOf(second.type) || first.name.localeCompare(second.name)
	);
}
