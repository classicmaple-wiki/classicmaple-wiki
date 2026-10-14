/*
   Which of the six places on the home shelf each entry belongs to (spec
   0007). A map belongs to the place of its nearest town, as recorded in
   its data. Maple Island's small towns all count as Maple Island, and
   Ellinia Station as Ellinia. NPCs and shops belong to the place of the
   map they stand on, a quest to the place of the NPC who gives it, and a
   monster to every place where one of its maps is.

   Lith Harbor, Florina Beach, and other towns without a painted place of
   their own belong to none, and are still in the library.
*/
import { getCollection } from 'astro:content';
import type { SceneIdentifier } from '../../schemas/shared';

const placeByTown: Record<string, SceneIdentifier> = {
	Henesys: 'henesys',
	Ellinia: 'ellinia',
	'Ellinia Station': 'ellinia',
	Perion: 'perion',
	'Kerning City': 'kerning-city',
	Sleepywood: 'sleepywood',
	Amherst: 'maple-island',
	Southperry: 'maple-island',
	'Mushroom Town (Nina)': 'maple-island',
	'Mushroom Town (Roger)': 'maple-island',
	'Mushroom Town - West Entrance': 'maple-island',
};

/*
   The place of a town name, or undefined when it has no place page.
*/
export function placeForTown(town: string | undefined): SceneIdentifier | undefined {
	return town ? placeByTown[town] : undefined;
}

/*
   Everything that belongs to one place, as sets of ids per collection,
   plus the maps themselves for listing by kind.
*/
export async function placeContents(place: SceneIdentifier) {
	const maps = (await getCollection('maps')).map((entry) => entry.data);
	const placeMaps = maps.filter((map) => placeForTown(map.town ?? (map.kind === 'town' ? map.name : undefined)) === place);
	const mapIds = new Set(placeMaps.map((map) => map.id));

	const monsterIds = new Set<string>();
	for (const map of placeMaps) for (const monsterId of map.monsters) monsterIds.add(monsterId);
	for (const { data } of await getCollection('monsters')) if (data.location && mapIds.has(data.location)) monsterIds.add(data.id);

	const npcs = (await getCollection('npcs')).map((entry) => entry.data);
	const npcIds = new Set(npcs.filter((npc) => npc.map && mapIds.has(npc.map)).map((npc) => npc.id));

	const shopIds = new Set(
		(await getCollection('shops'))
			.map((entry) => entry.data)
			.filter((shop) => (shop.map && mapIds.has(shop.map)) || (shop.npc && npcIds.has(shop.npc)))
			.map((shop) => shop.id)
	);
	const questIds = new Set(
		(await getCollection('quests'))
			.map((entry) => entry.data)
			.filter((quest) => quest.giver && npcIds.has(quest.giver))
			.map((quest) => quest.id)
	);

	return { maps: placeMaps, monsterIds, npcIds, shopIds, questIds };
}

/*
   The place one entry belongs to, for its breadcrumb: a map by its town,
   an NPC by its map, a shop by its map or its NPC, a quest by the NPC who
   gives it, and a monster by its main map or the first map it lives on.
   Undefined when the entry belongs to no shelf place.
*/
export async function placeOfEntry(section: string, identifier: string): Promise<SceneIdentifier | undefined> {
	const maps = new Map((await getCollection('maps')).map((entry) => [entry.data.id, entry.data]));
	const npcs = new Map((await getCollection('npcs')).map((entry) => [entry.data.id, entry.data]));
	const placeOfMap = (mapId: string | undefined) => {
		const map = mapId ? maps.get(mapId) : undefined;
		return map ? placeForTown(map.town ?? (map.kind === 'town' ? map.name : undefined)) : undefined;
	};
	const placeOfNpc = (npcId: string | undefined) => placeOfMap(npcId ? npcs.get(npcId)?.map : undefined);

	if (section === 'maps') return placeOfMap(identifier);
	if (section === 'npcs') return placeOfNpc(identifier);
	if (section === 'shops') {
		const shop = (await getCollection('shops')).find((entry) => entry.data.id === identifier)?.data;
		return placeOfMap(shop?.map) ?? placeOfNpc(shop?.npc);
	}
	if (section === 'quests') {
		const quest = (await getCollection('quests')).find((entry) => entry.data.id === identifier)?.data;
		return placeOfNpc(quest?.giver);
	}
	if (section === 'monsters') {
		const monster = (await getCollection('monsters')).find((entry) => entry.data.id === identifier)?.data;
		const homeMap = monster?.location ?? [...maps.values()].find((map) => map.monsters.includes(identifier))?.id;
		return placeOfMap(homeMap);
	}
	return undefined;
}
