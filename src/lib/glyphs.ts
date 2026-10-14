/*
   The site's interface icons (spec 0006): simple line drawings on a 24 by
   24 grid, drawn by us in one stroke style. Each is path data for an SVG
   stroked with round caps and joins, rendered by Icon.astro, so every
   icon has the same weight wherever it appears. A path may hold several
   subpaths. A short subpath like "h.01" draws a dot.

   Sections use them on the home task cards and the library uses them for
   entries that have no sprite yet.
*/
export const glyphs = {
	flag: 'M5 21V4M5 4h11l-2.5 4L16 12H5',
	podium: 'M3 20h18M4 20v-5h5v5M9 20V9h6v11M15 20V5h5v15',
	scroll: 'M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9M7 4a2 2 0 0 0-2 2v2h4V6a2 2 0 0 0-2-2zM9 8v10a2 2 0 1 1-4 0M12 9h4M12 12h4M12 15h2',
	monster: 'M3.5 12.5a8.5 7.5 0 0 1 17 0zM9 12.5v4.5a3 3 0 0 0 6 0v-4.5M8.5 9h.01M13.5 7.5h.01M15.5 10h.01',
	hammer: 'M13 3.5l7.5 7.5-3 3L10 6.5zM12.5 8.5L4.2 16.8a1.6 1.6 0 0 0 2.3 2.3l8.3-8.3',
	arrows: 'M4 8h15M15.5 4.5L19 8l-3.5 3.5M20 16H5M8.5 12.5L5 16l3.5 3.5',
	mask: 'M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z',
	potion: 'M10 3h4M10.5 3v5.5L6 15.5A3.8 3.8 0 0 0 9.3 21h5.4a3.8 3.8 0 0 0 3.3-5.5l-4.5-7V3M7.5 14.5h9',
	person: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 21a7.5 7.5 0 0 1 15 0',
	bag: 'M5 8h14l-1.2 12.2H6.2zM9 8V6.5a3 3 0 0 1 6 0V8',
	search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
	check: 'M5 12.5l4.5 4.5L19 7.5',
	eye: 'M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
	question: 'M9.2 9a2.9 2.9 0 1 1 4.1 2.6c-.8.4-1.3 1.1-1.3 2v.6M12 18h.01',
} as const;

export type GlyphName = keyof typeof glyphs;
