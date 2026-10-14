/*
   The small original pixel glyphs of the site, drawn as rows of text on a
   12 by 12 grid, where a hash is a filled pixel. The home task cards and
   the emblem in each page title panel share them, so a section looks the
   same wherever it appears. They are shown at 24 pixels, so every grid
   pixel is two screen pixels and the edges stay crisp.

   A page's emblem follows its section: monsters get the monster, classes
   the mask, leveling the flag, economy the hammer, the change log the two
   arrows, and every other page the scroll.
*/
export const glyphs = {
	flag: [
		'...#........',
		'...#####....',
		'...#######..',
		'...######...',
		'...####.....',
		'...#........',
		'...#........',
		'...#........',
		'...#........',
		'..###.......',
		'.#####..##..',
		'############',
	],
	podium: [
		'........#...',
		'.......###..',
		'......#####.',
		'........#...',
		'........#...',
		'......#####.',
		'......#####.',
		'...########.',
		'...########.',
		'###########.',
		'###########.',
		'............',
	],
	scroll: [
		'.##########.',
		'#..........#',
		'#.########.#',
		'.#........#.',
		'.#..####..#.',
		'.#........#.',
		'.#..####..#.',
		'.#........#.',
		'.#..##....#.',
		'#.########.#',
		'#..........#',
		'.##########.',
	],
	monster: [
		'....####....',
		'..##.##.##..',
		'.#.######.#.',
		'####.##.####',
		'############',
		'############',
		'...######...',
		'...#.##.#...',
		'...#.##.#...',
		'...######...',
		'...######...',
		'............',
	],
	hammer: [
		'............',
		'.#######....',
		'#########...',
		'#########...',
		'.#######....',
		'...##.......',
		'...##.......',
		'...##.......',
		'...##.......',
		'...##.......',
		'...##.......',
		'..####......',
	],
	arrows: [
		'........#...',
		'........##..',
		'###########.',
		'###########.',
		'........##..',
		'........#...',
		'...#........',
		'..##........',
		'.###########',
		'.###########',
		'..##........',
		'...#........',
	],
	mask: [
		'............',
		'.##########.',
		'.#........#.',
		'.#.######.#.',
		'.#.######.#.',
		'.##......##.',
		'..#.####.#..',
		'..##.##.##..',
		'...#....#...',
		'....#..#....',
		'.....##.....',
		'............',
	],
} as const satisfies Record<string, readonly string[]>;

export type GlyphName = keyof typeof glyphs;

/*
   Turns rows of text into one svg path. Each run of filled pixels in a
   row becomes a single rectangle, which keeps the path short.
*/
export function glyphPath(rows: readonly string[]): string {
	const rectangles: string[] = [];
	rows.forEach((row, rowIndex) => {
		let column = 0;
		while (column < row.length) {
			if (row[column] !== '#') {
				column += 1;
				continue;
			}
			const runStart = column;
			while (column < row.length && row[column] === '#') column += 1;
			const runLength = column - runStart;
			rectangles.push(`M${runStart} ${rowIndex}h${runLength}v1h-${runLength}z`);
		}
	});
	return rectangles.join('');
}

const sectionEmblems: Record<string, GlyphName> = {
	monsters: 'monster',
	classes: 'mask',
	leveling: 'flag',
	economy: 'hammer',
	changes: 'arrows',
};

/*
   The emblem for a page, chosen by the first segment of its path.
*/
export function emblemForSection(section: string | undefined): GlyphName {
	return (section && sectionEmblems[section]) || 'scroll';
}
