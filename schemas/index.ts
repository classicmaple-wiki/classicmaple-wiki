import { z } from 'astro/zod';
import { entityBase, identifier, positiveInteger, verification } from './shared';

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

export const monster = entityBase.extend({
	level: positiveInteger.optional(),
	hp: positiveInteger.optional(),
	mp: z.int().nonnegative().optional(),
	exp: z.int().nonnegative().optional(),
	boss: z.boolean().default(false),
	weak_to: z.array(element).default([]),
	strong_to: z.array(element).default([]),
	immune_to: z.array(element).default([]),
});

export const map = entityBase.extend({
	region: z.string().optional(),
	recommended_level: z.tuple([positiveInteger, positiveInteger]).optional(),
	monsters: z.array(identifier).default([]),
});

export const item = entityBase.extend({
	category: z.enum(['equipment', 'consumable', 'material', 'other']),
	required_level: positiveInteger.optional(),
	stats: z.record(z.string(), z.number()).default({}),
	crafted_by: identifier.optional(),
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

export const dataSchemas = {
	monsters: monster,
	maps: map,
	items: item,
	classes: characterClass,
	professions: profession,
	systems: system,
	patches: patch,
} as const;

export type DataCollectionName = keyof typeof dataSchemas;
