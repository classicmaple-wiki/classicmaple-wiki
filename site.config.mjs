/*
   The single source of truth for where the site and its repository live.
   Everything that builds a link (canonical addresses, the sitemap, edit
   links, robots.txt, the footer credits) reads from here, so moving the domain or the
   repository is a change to this file and nothing else.
*/
export const siteTitle = 'Classic Maple Wiki';

export const siteDescription =
	'Unofficial, version-aware knowledge base for MapleStory Classic World: class changes, leveling routes, crafting, and monster data.';

export const siteUrl = 'https://classicmaple.wiki';

export const repositoryUrl = 'https://github.com/classicmaple-wiki/classicmaple-wiki';

export const defaultBranch = 'main';

export const editBaseUrl = `${repositoryUrl}/edit/${defaultBranch}/`;

export const officialGameUrl = 'https://www.nexon.com/maplestory/classic';

export const builderName = 'Sirux';

export const builderUrl = 'https://sirux.io';

/*
   The correction form players use without GitHub (spec 0010), a Tally
   form the owner made. Paste its share link here, such as
   'https://tally.so/r/abc123'. While it is empty, the site's correction
   links go to the How to contribute page instead. Each link passes the
   page it came from as ?page=, which the form keeps in a hidden field.
*/
export const correctionFormUrl = 'https://tally.so/r/GeveVj';
