import { getCollection } from 'astro:content';
import type { Change } from '../../schemas/shared';

/*
   Small helpers shared by the generated pages and the table components.
   A missing number or an empty list reads Unknown, the one word the site
   uses for any value nobody has recorded yet.

   The change log is not stored anywhere on its own. It is assembled at
   build time from the "changes" list on every entity, then ordered by the
   date of the build each change landed in, newest first.
*/
const entityCollectionNames = ['monsters', 'maps', 'items', 'npcs', 'quests', 'shops', 'classes', 'professions', 'systems'] as const;

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
	return values.length === 0 ? 'Unknown' : values.join(', ');
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

/*
   A drop rate reads best as "about 1 in N" next to the percentage, the way
   players talk about drops. Both come from the same observed share.
*/
export function formatDropChance(ratePercent: number): string {
	if (ratePercent <= 0) return 'Not seen';
	return `about 1 in ${Math.max(1, Math.round(100 / ratePercent))} (${ratePercent}%)`;
}
