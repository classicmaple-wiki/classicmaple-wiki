import { getCollection } from 'astro:content';
import type { Mood, SceneIdentifier } from '../../schemas/shared';

/*
   The library of places (spec 0002). Every page sits in one of seven
   scenes and one of six moods. A page may name both itself. When it does
   not, it inherits from its category, so no page ever ships without a
   scene. The rules live here and nowhere else, so changing where a
   category sits is a one line edit.

   Scenes and moods are presentation, not game facts. They carry no source
   or build and never appear in the JSON export as data.
*/
export interface SceneDefinition {
	identifier: SceneIdentifier;
	label: string;
	defaultMood: Mood;
	moment: string;
}

export const scenes: Record<SceneIdentifier, SceneDefinition> = {
	'maple-island': { identifier: 'maple-island', label: 'Maple Island', defaultMood: 'morning', moment: 'First light.' },
	henesys: { identifier: 'henesys', label: 'Henesys', defaultMood: 'midday', moment: 'A slow afternoon.' },
	ellinia: { identifier: 'ellinia', label: 'Ellinia', defaultMood: 'dawn', moment: 'At dawn.' },
	perion: { identifier: 'perion', label: 'Perion', defaultMood: 'dusk', moment: 'Dusk on the rocks.' },
	'kerning-city': { identifier: 'kerning-city', label: 'Kerning City', defaultMood: 'dusk', moment: 'Rooftops at dusk.' },
	sleepywood: { identifier: 'sleepywood', label: 'Sleepywood', defaultMood: 'cave', moment: 'Below the roots.' },
	default: { identifier: 'default', label: 'Classic Maple Wiki', defaultMood: 'morning', moment: '' },
	workshop: { identifier: 'workshop', label: 'The workshop', defaultMood: 'dusk', moment: 'Lamps on at dusk.' },
	'harbor-board': { identifier: 'harbor-board', label: 'The harbor notice board', defaultMood: 'morning', moment: 'Fresh notes pinned.' },
	'potion-shop': { identifier: 'potion-shop', label: 'The potion shop', defaultMood: 'midday', moment: 'Open for the afternoon.' },
	'closed-shop': { identifier: 'closed-shop', label: 'A closed shop', defaultMood: 'night', moment: 'Shutters down for the night.' },
};

export const placeOrder: SceneIdentifier[] = [
	'maple-island',
	'henesys',
	'ellinia',
	'perion',
	'kerning-city',
	'sleepywood',
];

export interface ResolvedScene {
	scene: SceneIdentifier;
	mood: Mood;
}

interface PresentationFields {
	scene?: SceneIdentifier;
	mood?: Mood;
}

/*
   Applies the page's own choice first, then the inherited scene, then the
   scene's own default mood. A page can set only a mood and keep the
   inherited scene, which is how a monster with no map still gets a cave.
*/
function combine(own: PresentationFields, inherited: SceneIdentifier): ResolvedScene {
	const scene = own.scene ?? inherited;
	return { scene, mood: own.mood ?? scenes[scene].defaultMood };
}

/*
   Matches a free text region or map name to a hub, so a map whose region
   is "Kerning City" sits in that scene without a field of its own.
*/
function sceneFromPlaceName(placeName: string | undefined): SceneIdentifier | undefined {
	if (!placeName) return undefined;
	const normalized = placeName.trim().toLowerCase();
	return placeOrder.find((identifier) => scenes[identifier].label.toLowerCase() === normalized);
}

export function resolveGuideScene(frontmatter: PresentationFields): ResolvedScene {
	return combine(frontmatter, 'default');
}

export async function resolveMapScene(map: PresentationFields & { region?: string }): Promise<ResolvedScene> {
	return combine(map, sceneFromPlaceName(map.region) ?? 'default');
}

/*
   A monster takes the scene of the first map, by name, that lists it. The
   map's own scene choice wins over its region.
*/
export async function resolveMonsterScene(monster: PresentationFields & { id: string }): Promise<ResolvedScene> {
	const maps = (await getCollection('maps'))
		.map((mapEntry) => mapEntry.data)
		.filter((map) => map.monsters.includes(monster.id))
		.sort((first, second) => first.name.localeCompare(second.name));
	if (monster.scene || maps.length === 0) return combine(monster, 'default');
	const inherited = await resolveMapScene(maps[0]);
	return combine(monster, inherited.scene);
}

export function resolveClassScene(characterClass: PresentationFields): ResolvedScene {
	return combine(characterClass, 'default');
}

export function resolveProfessionScene(profession: PresentationFields): ResolvedScene {
	return combine(profession, 'henesys');
}

export function resolveSystemScene(system: PresentationFields): ResolvedScene {
	return combine(system, 'default');
}
