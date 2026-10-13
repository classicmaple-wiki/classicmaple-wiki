import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { dataSchemas, type DataCollectionName } from '../../../schemas';

/*
   Publishes every data collection as a plain JSON file, for example
   /data/monsters.json, so tools, bots, and spreadsheets can use the same
   numbers the site shows. The files are generated at build time and served
   as static assets.
*/
const exportedCollectionNames = [...(Object.keys(dataSchemas) as DataCollectionName[]), 'builds'] as const;

export const getStaticPaths = (() =>
	exportedCollectionNames.map((collectionName) => ({
		params: { collection: collectionName },
	}))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
	const collectionName = params.collection as (typeof exportedCollectionNames)[number];
	const entries = await getCollection(collectionName);
	const records = entries.map((entry) => entry.data);
	return new Response(JSON.stringify(records, null, 2), {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
};
