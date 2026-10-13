import { getCollection } from 'astro:content';
import type { Change } from '../../schemas/shared';

/*
   Small helpers shared by the generated pages and the table components.

   The change log is not stored anywhere on its own. It is assembled at
   build time from the "changes" list on every entity, then ordered by the
   date of the build each change landed in, newest first.
*/
const entityCollectionNames = ['monsters', 'maps', 'items', 'classes', 'professions', 'systems'] as const;

export interface RecordedChange extends Change {
	collectionName: (typeof entityCollectionNames)[number];
	entityIdentifier: string;
	entityName: string;
	buildName: string;
	buildDate: Date;
}

export function formatStatistic(value: number | undefined): string {
	return value === undefined ? 'Unknown' : value.toLocaleString('en-US');
}

export function formatList(values: string[]): string {
	return values.length === 0 ? 'None recorded' : values.join(', ');
}

export async function getBuildsNewestFirst() {
	const builds = await getCollection('builds');
	return builds.map((buildEntry) => buildEntry.data).sort((first, second) => second.date.getTime() - first.date.getTime());
}

export async function collectChanges(): Promise<RecordedChange[]> {
	const builds = await getBuildsNewestFirst();
	const buildsByIdentifier = new Map(builds.map((build) => [build.id, build]));
	const recordedChanges: RecordedChange[] = [];

	for (const collectionName of entityCollectionNames) {
		for (const entity of await getCollection(collectionName)) {
			for (const change of entity.data.changes) {
				const build = buildsByIdentifier.get(change.build);
				if (!build) continue;
				recordedChanges.push({
					...change,
					collectionName,
					entityIdentifier: entity.data.id,
					entityName: entity.data.name,
					buildName: build.name,
					buildDate: build.date,
				});
			}
		}
	}

	return recordedChanges.sort((first, second) => second.buildDate.getTime() - first.buildDate.getTime());
}
