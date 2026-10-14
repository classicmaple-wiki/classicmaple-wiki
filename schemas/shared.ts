import { z } from 'astro/zod';

/*
   Building blocks shared by every data schema.

   Every entity carries a verification record (where the numbers came from
   and which build they were seen in) and a change log (how a value moved
   between builds). Those two fields are what make the wiki version-aware.

   All objects are strict, so a misspelled key fails validation instead of
   being silently ignored.
*/
export const identifier = z
	.string()
	.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase kebab-case, for example "green-mushroom"');

export const verificationStatus = z.enum(['official', 'in-game', 'unverified']);

export const verification = z
	.strictObject({
		status: verificationStatus,
		build: identifier.optional(),
		source: z.url().optional(),
		date: z.coerce.date().optional(),
	})
	.refine(
		(record) => record.status === 'unverified' || (record.build !== undefined && record.source !== undefined),
		{ message: 'A build and a source link are required unless status is "unverified"' }
	);

export const change = z.strictObject({
	build: identifier,
	field: z.string(),
	from: z.union([z.string(), z.number()]).optional(),
	to: z.union([z.string(), z.number()]).optional(),
	note: z.string().optional(),
	source: z.url(),
});

/*
   Presentation fields for the library of places (spec 0002). A page can
   name the scene it sits in and the mood of its light. Both are design
   choices, not game facts, so they need no source or build. When a page
   leaves them out, src/lib/scenes.ts picks them from the page's category.
*/
export const sceneIdentifier = z.enum([
	'maple-island',
	'henesys',
	'ellinia',
	'perion',
	'kerning-city',
	'sleepywood',
	'default',
]);

export const mood = z.enum(['dawn', 'morning', 'midday', 'dusk', 'night', 'cave']);

/*
   A small identification picture for one entry (decision 0005 and
   docs/policies/images.md). The file lives at public/sprites/<file>, the
   source names an entry in data/sprite-sources.yaml, and the validation
   script checks that the source is allowed, the file exists, and it is
   small. "original" and "own-screenshot" are sources too, so every
   picture says where it came from.
*/
export const sprite = z
	.strictObject({
		file: z
			.string()
			.regex(/^[a-z]+\/[a-z0-9]+(-[a-z0-9]+)*\.png$/, 'Use "collection/id.png", for example "monsters/orange-mushroom.png"'),
		source: identifier,
		source_url: z.url().optional(),
		retrieved: z.coerce.date(),
	})
	.refine((record) => record.source === 'original' || record.source_url !== undefined, {
		message: 'A source_url is required unless the source is "original"',
	});

export const entityBase = z.strictObject({
	id: identifier,
	name: z.string().min(1),
	differs_from_original: z.string().optional(),
	notes: z.string().optional(),
	scene: sceneIdentifier.optional(),
	mood: mood.optional(),
	verified: verification,
	changes: z.array(change).default([]),
});

export const positiveInteger = z.int().positive();

export type Verification = z.infer<typeof verification>;
export type Change = z.infer<typeof change>;
export type SceneIdentifier = z.infer<typeof sceneIdentifier>;
export type Mood = z.infer<typeof mood>;
export type Sprite = z.infer<typeof sprite>;
