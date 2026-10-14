/*
   Audits the built site for launch readiness (docs/launch-readiness.md).
   It reads every page in dist/ and reports three things: placeholder
   phrases that should not ship, how many Unknown values each section
   shows, and internal links that point at a page that does not exist.
   It only reads the main content of each page, so the sidebar and footer
   do not count.

   Run after a build: npx tsx scripts/audit-site.ts [dist]
*/
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const distDirectory = path.resolve(process.argv[2] ?? 'dist');
const placeholderPhrases = [
	'No pages yet',
	'Help start',
	'Still being painted',
	'coming soon',
	'TODO',
	'Place unknown',
	'Region unknown',
	'Untested',
	'No changes recorded yet',
	'Stock unknown',
	'No skills recorded',
];

/*
   Every HTML file under a folder, as paths relative to it.
*/
function listPages(directory: string, prefix = ''): string[] {
	return readdirSync(directory).flatMap((name) => {
		const fullPath = path.join(directory, name);
		if (statSync(fullPath).isDirectory()) return listPages(fullPath, path.join(prefix, name));
		return name.endsWith('.html') ? [path.join(prefix, name)] : [];
	});
}

/*
   The readable text of a page's main element, without scripts, styles,
   or tags.
*/
function mainText(html: string): string {
	const withoutCode = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, '');
	const main = withoutCode.match(/<main[\s\S]*?<\/main>/)?.[0] ?? withoutCode;
	return main
		.replace(/<[^>]+>/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&#39;|&#x27;/g, "'")
		.replace(/\s+/g, ' ');
}

/*
   True when an internal link resolves to a built file.
*/
function linkExists(href: string): boolean {
	const relative = decodeURIComponent(href.replace(/^\//, ''));
	return [relative, path.join(relative, 'index.html'), `${relative}.html`].some((candidate) =>
		existsSync(path.join(distDirectory, candidate))
	);
}

const pages = listPages(distDirectory);
const phraseHits = new Map<string, string[]>();
const unknownBySection = new Map<string, { values: number; pages: number }>();
const brokenLinks = new Map<string, Set<string>>();

for (const page of pages) {
	const html = readFileSync(path.join(distDirectory, page), 'utf-8');
	const text = mainText(html);
	const section = page.includes(path.sep) ? page.split(path.sep)[0] : '(root)';
	for (const phrase of placeholderPhrases) {
		if (text.toLowerCase().includes(phrase.toLowerCase())) phraseHits.set(phrase, [...(phraseHits.get(phrase) ?? []), page]);
	}
	const tally = unknownBySection.get(section) ?? { values: 0, pages: 0 };
	tally.values += text.split('Unknown').length - 1;
	tally.pages += 1;
	unknownBySection.set(section, tally);
	for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
		if (href.startsWith('//') || href.startsWith('/_astro') || href.startsWith('/pagefind')) continue;
		if (!linkExists(href)) brokenLinks.set(href, new Set([...(brokenLinks.get(href) ?? []), page]));
	}
}

console.log(`Pages: ${pages.length}`);
console.log('\nPlaceholder phrases, by pages that show them:');
for (const [phrase, hitPages] of [...phraseHits].sort((first, second) => second[1].length - first[1].length)) {
	console.log(`  ${String(hitPages.length).padStart(5)}  "${phrase}"  for example ${hitPages.slice(0, 3).join(', ')}`);
}
console.log('\nUnknown values by section (values / pages):');
for (const [section, tally] of [...unknownBySection].sort((first, second) => second[1].values - first[1].values)) {
	if (tally.values > 0) console.log(`  ${section.padEnd(14)} ${String(tally.values).padStart(6)} / ${tally.pages}`);
}
console.log(`\nBroken internal links: ${brokenLinks.size}`);
for (const [href, sources] of brokenLinks) console.log(`  ${href}  from ${[...sources].slice(0, 2).join(', ')}`);
