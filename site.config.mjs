/*
   The single source of truth for where the site and its repository live.
   Everything that builds a link (canonical addresses, the sitemap, edit
   links, robots.txt) reads from here, so moving the domain or the
   repository is a change to this file and nothing else.
*/
export const siteTitle = 'Classic Maple Wiki';

export const siteDescription =
	'Unofficial, version-aware knowledge base for MapleStory Classic World: class changes, leveling routes, crafting, and monster data.';

export const siteUrl = 'https://classicmaple.wiki';

export const repositoryUrl = 'https://github.com/classicmaple/wiki';

export const defaultBranch = 'main';

export const editBaseUrl = `${repositoryUrl}/edit/${defaultBranch}/`;
