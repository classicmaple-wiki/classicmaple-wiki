/*
   The entries behind What's new on the home page and the RSS feed (spec
   0014). Four sources, one shape: player guides by the day we watched
   them, guides and news pages by their published date, patch notes by
   their date, and builds that have gone live by their date. A build in
   the future stays out, so launch day's deploy adds "Grand Launch is
   live" on its own. Entries sort newest first. On the same day a build
   comes before patch notes, then news, then player guides, then guides.
   Dates compare as calendar days in UTC, like the hero's build line.
*/
import { getCollection } from 'astro:content';

export type WhatsNewType = 'Build' | 'Patch notes' | 'News' | 'Player guide' | 'Guide';

export interface WhatsNewEntry {
	date: Date;
	type: WhatsNewType;
	title: string;
	href: string;
	line: string;
}

const typeOrder: WhatsNewType[] = ['Build', 'Patch notes', 'News', 'Player guide', 'Guide'];

/*
   The calendar day of a date in UTC, so a build that goes live today
   counts as live whatever hour the site is built.
*/
function calendarDay(date: Date): string {
	return date.toISOString().slice(0, 10);
}

/*
   The first sentence of a summary, so a long patch summary reads as one
   line on the home page.
*/
function firstSentence(text: string | undefined): string {
	if (!text) return '';
	const match = text.trim().match(/^.*?[.!?](?=\s|$)/);
	return match ? match[0] : text.trim();
}

/*
   A player guide's line names its creator unless the description already
   does, so the name never appears twice in one row.
*/
function playerGuideLine(creator: string | undefined, description: string | undefined): string {
	const text = description ?? '';
	if (!creator || text.includes(creator)) return text;
	return `By ${creator}. ${text}`.trim();
}

export async function whatsNewEntries(limit: number, today = new Date()): Promise<WhatsNewEntry[]> {
	const todayDay = calendarDay(today);
	const entries: WhatsNewEntry[] = [];

	for (const build of await getCollection('builds')) {
		if (calendarDay(build.data.date) > todayDay) continue;
		entries.push({
			date: build.data.date,
			type: 'Build',
			title: `${build.data.name} is live`,
			href: '/changes/#builds',
			line: build.data.notes ?? 'Every number on the site says which build it was seen in.',
		});
	}

	for (const patch of await getCollection('patches')) {
		entries.push({
			date: patch.data.date,
			type: 'Patch notes',
			title: patch.data.name,
			href: '/changes/#patch-notes',
			line: firstSentence(patch.data.summary),
		});
	}

	for (const page of await getCollection('docs')) {
		const isPlayerGuide = page.id.startsWith('player-guides/') && page.data.guide_url !== undefined;
		const date = isPlayerGuide ? page.data.watched_on : page.data.published;
		if (!date) continue;
		entries.push({
			date,
			type: isPlayerGuide ? 'Player guide' : page.id.startsWith('news/') ? 'News' : 'Guide',
			title: page.data.title,
			href: `/${page.id}/`,
			line: playerGuideLine(isPlayerGuide ? page.data.creator : undefined, page.data.description),
		});
	}

	return entries
		.sort(
			(first, second) =>
				second.date.getTime() - first.date.getTime() || typeOrder.indexOf(first.type) - typeOrder.indexOf(second.type)
		)
		.slice(0, limit);
}
