import { z } from 'astro/zod';
import { entityBase, identifier, mood, positiveInteger, sceneIdentifier, sprite, verification } from './shared';

/*
   One schema per data type. Numeric fields are optional on purpose: an
   unknown value is left out rather than guessed, and the site shows it as
   "Unknown" until someone confirms it in game.

   The site (src/content.config.ts) and the validation script
   (scripts/validate.ts) both read the dataSchemas map at the bottom, so a
   new data type is added in exactly one place.
*/
export const element = z.enum(['fire', 'ice', 'lightning', 'poison', 'holy']);

export const build = z.strictObject({
	id: identifier,
	name: z.string().min(1),
	date: z.coerce.date(),
	notes: z.string().optional(),
});

/*
   One drop a player observed (spec 0005): which item, the share of kills
   that dropped it, the stack size range when known, and the observation
   behind the number, so a reader can judge how solid it is. "meso" stands
   for the meso drop and needs no item file. Observer names are never
   stored.
*/
export const drop = z.strictObject({
	item: identifier,
	rate_percent: z.number().min(0).max(100),
	quantity: z.tuple([positiveInteger, positiveInteger]).optional(),
	observed_on: z.coerce.date(),
	sample_kills: positiveInteger,
	sample_drops: z.int().nonnegative(),
	build: identifier,
	source: z.url(),
});

export const monster = entityBase.extend({
	level: positiveInteger.optional(),
	hp: positiveInteger.optional(),
	mp: z.int().nonnegative().optional(),
	exp: z.int().nonnegative().optional(),
	boss: z.boolean().default(false),
	weak_to: z.array(element).default([]),
	strong_to: z.array(element).default([]),
	immune_to: z.array(element).default([]),
	location: identifier.optional(),
	region: z.string().optional(),
	drops: z.array(drop).default([]),
	sprite: sprite.optional(),
});

/*
   One site we may take plain identification sprites from, or one of the
   two built in sources: "original" (drawn by us) and "own-screenshot".
   Only the owner changes a status. The rules for each status are in
   docs/policies/images.md.
*/
export const spriteSource = z.strictObject({
	id: identifier,
	name: z.string().min(1),
	url: z.url().optional(),
	status: z.enum(['allowed', 'allowed-with-credit', 'ask-first', 'blocked']),
	terms_url: z.url().optional(),
	credit: z.string().optional(),
	checked: z.coerce.date(),
	reason: z.string().min(1),
});

export const map = entityBase.extend({
	region: z.string().optional(),
	town: z.string().optional(),
	kind: z.enum(['town', 'field', 'dungeon', 'hunting-ground', 'trading-hub', 'town-interior', 'hidden-street']).optional(),
	exits: z
		.array(
			z.strictObject({
				to: identifier,
				kind: z.enum(['walking', 'hidden', 'door', 'transport']).optional(),
				direction: z.enum(['north', 'south', 'east', 'west', 'up', 'down']).optional(),
			})
		)
		.default([]),
	recommended_level: z.tuple([positiveInteger, positiveInteger]).optional(),
	monsters: z.array(identifier).default([]),
});

export const item = entityBase.extend({
	category: z.enum(['equipment', 'consumable', 'material', 'other']),
	required_level: positiveInteger.optional(),
	stats: z.record(z.string(), z.number()).default({}),
	crafted_by: identifier.optional(),
	sprite: sprite.optional(),
});

export const skill = z.strictObject({
	id: identifier,
	name: z.string().min(1),
	job: z.int().min(1).max(4),
	max_level: positiveInteger.optional(),
	summary: z.string().optional(),
	differs_from_original: z.string().optional(),
	verified: verification,
});

export const characterClass = entityBase.extend({
	skills: z.array(skill).default([]),
});

export const profession = entityBase.extend({
	required_level: positiveInteger.optional(),
	summary: z.string().optional(),
	related_professions: z.array(identifier).default([]),
});

export const system = entityBase.extend({
	required_level: positiveInteger.optional(),
	summary: z.string().optional(),
});

/*
   NPCs, quests, and shops (spec 0005). Each records only what a player can
   see for themselves: where an NPC stands, who gives and takes a quest and
   which quest comes first, and what a shop sells. Prices, rewards, and
   requirements that come from game files are left for players to confirm,
   and get their own fields only when a sourced value exists.
*/
export const npc = entityBase.extend({
	role: z.string().optional(),
	sprite: sprite.optional(),
	map: identifier.optional(),
	region: z.string().optional(),
});

export const quest = entityBase.extend({
	giver: identifier.optional(),
	turn_in: identifier.optional(),
	prerequisites: z.array(identifier).default([]),
	region: z.string().optional(),
});

export const shop = entityBase.extend({
	npc: identifier.optional(),
	map: identifier.optional(),
	region: z.string().optional(),
	items: z.array(identifier).default([]),
});

export const patch = z.strictObject({
	id: z.string().regex(/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(-[a-z0-9]+)*$/, 'Use YYYY-MM-DD-short-name'),
	name: z.string().min(1),
	date: z.coerce.date(),
	build: identifier,
	source: z.url(),
	summary: z.string().optional(),
	affects: z
		.array(z.string().regex(/^[a-z]+\/[a-z0-9-]+$/, 'Use "collection/id", for example "monsters/green-mushroom"'))
		.default([]),
});

export const routeFrontmatter = z.object({
	level_range: z.tuple([positiveInteger, positiveInteger]).optional(),
	party_size: positiveInteger.optional(),
	classes: z.array(identifier).optional(),
	tested_in: identifier.optional(),
});

/*
   Every guide page can also name its scene, mood, and a one line subtitle
   that pairs the place with a moment, such as "Kerning City, after dark."
   The H1, URL, and search keep the factual title.
*/
export const pageFrontmatter = routeFrontmatter.extend({
	scene: sceneIdentifier.optional(),
	mood: mood.optional(),
	subtitle: z.string().optional(),
});

export const dataSchemas = {
	monsters: monster,
	maps: map,
	items: item,
	classes: characterClass,
	professions: profession,
	systems: system,
	npcs: npc,
	quests: quest,
	shops: shop,
	patches: patch,
} as const;

export type DataCollectionName = keyof typeof dataSchemas;
