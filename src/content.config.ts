import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { build, dataSchemas, routeFrontmatter } from '../schemas';

/*
   Wires the repository layout into Astro content collections.

   Guides live in src/content/docs and use the Starlight schema, extended
   with the optional leveling route fields. Game data lives in data/, one
   YAML file per entity, and every folder is checked against its schema at
   build time. Builds are the one exception: they are an ordered list, so
   they share a single file.
*/
function dataFolder(folderName: string) {
	return glob({ pattern: '*.yaml', base: `./data/${folderName}` });
}

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({ extend: routeFrontmatter }),
	}),
	builds: defineCollection({
		loader: file('data/builds.yaml'),
		schema: build,
	}),
	monsters: defineCollection({ loader: dataFolder('monsters'), schema: dataSchemas.monsters }),
	maps: defineCollection({ loader: dataFolder('maps'), schema: dataSchemas.maps }),
	items: defineCollection({ loader: dataFolder('items'), schema: dataSchemas.items }),
	classes: defineCollection({ loader: dataFolder('classes'), schema: dataSchemas.classes }),
	professions: defineCollection({ loader: dataFolder('professions'), schema: dataSchemas.professions }),
	systems: defineCollection({ loader: dataFolder('systems'), schema: dataSchemas.systems }),
	patches: defineCollection({ loader: dataFolder('patches'), schema: dataSchemas.patches }),
};
