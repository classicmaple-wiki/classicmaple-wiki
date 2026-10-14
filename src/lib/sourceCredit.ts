/*
   Turns stored MapleClassic Wiki page addresses into credit lines (spec
   0005): the page title for reading, the page link, and the link to its
   history, where the editors who wrote it are named. Addresses from any
   other site are ignored, and each page appears once however many records
   on the page point at it.
*/
const sourceWikiPrefix = 'https://mapleclassic.wiki/wiki/';

/*
   One credit line: what the source page is called and where to find it
   and its contributors.
*/
export interface CreditLine {
	pageTitle: string;
	pageUrl: string;
	historyUrl: string;
}

/*
   The credit lines for a page, in the order given, without repeats.
*/
export function creditLines(sources: (string | undefined)[]): CreditLine[] {
	const seen = new Set<string>();
	const lines: CreditLine[] = [];
	for (const source of sources) {
		if (!source || !source.startsWith(sourceWikiPrefix) || seen.has(source)) continue;
		seen.add(source);
		const encodedTitle = source.slice(sourceWikiPrefix.length);
		const pageTitle = decodeURIComponent(encodedTitle).replace(/_/g, ' ');
		lines.push({
			pageTitle,
			pageUrl: source,
			historyUrl: `https://mapleclassic.wiki/index.php?title=${encodedTitle}&action=history`,
		});
	}
	return lines;
}
