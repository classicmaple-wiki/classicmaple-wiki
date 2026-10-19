import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import {
	editBaseUrl,
	repositoryUrl,
	siteDescription,
	siteTitle,
	siteUrl,
} from './site.config.mjs';
import { satteri } from '@astrojs/markdown-satteri';
import { createEntityLinksPlugin } from './src/lib/entityLinks.mjs';

/*
   The brand icon from scripts/make-icons.ts, once the owner's logo is in.
   Until then the site uses the leaf in public/favicon.svg. The social
   card in public/social-card.jpg is a 1200 by 630 crop of the Henesys
   painting, so a shared link shows a picture. Replace it with a painted
   social share image from docs/art-direction.md when one exists.
*/
const hasBrandIcon = existsSync('public/favicon-32.png');

export default defineConfig({
	site: siteUrl,
	markdown: {
		processor: satteri({
			mdastPlugins: [createEntityLinksPlugin()],
			features: { gfm: { footnotes: { label: 'Sources', backLabel: 'Back to the text' } } },
		}),
	},
	integrations: [
		starlight({
			title: siteTitle,
			description: siteDescription,
			logo: { src: './src/assets/brand/icon.webp' },
			favicon: hasBrandIcon ? '/favicon-32.png' : '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: repositoryUrl }],
			editLink: { baseUrl: editBaseUrl },
			lastUpdated: true,
			customCss: [
				'./src/styles/tokens.css',
				'./src/styles/custom.css',
				'./src/styles/scenes.css',
				'./src/styles/window.css',
				'./src/styles/pages.css',
			],
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}/social-card.jpg` } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: `${siteUrl}/social-card.jpg` } },
				...(hasBrandIcon
					? [
							{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
							{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' } },
						]
					: []),
				{
					tag: 'link',
					attrs: {
						rel: 'preload',
						href: '/fonts/nunito-latin.woff2',
						as: 'font',
						type: 'font/woff2',
						crossorigin: '',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preload',
						href: '/fonts/fredoka-latin.woff2',
						as: 'font',
						type: 'font/woff2',
						crossorigin: '',
					},
				},
			],
			components: {
				Footer: './src/components/Footer.astro',
				PageTitle: './src/components/PageTitle.astro',
				Hero: './src/components/Hero.astro',
			},
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Welcome', link: '/' },
						{ label: 'How to contribute', slug: 'contributing' },
						{ label: 'Credits and privacy', slug: 'legal' },
					],
				},
				{
					label: 'Places',
					items: [
						{ label: 'All places', link: '/places/' },
						{ label: 'Maple Island', link: '/places/maple-island/' },
						{ label: 'Henesys', link: '/places/henesys/' },
						{ label: 'Ellinia', link: '/places/ellinia/' },
						{ label: 'Perion', link: '/places/perion/' },
						{ label: 'Kerning City', link: '/places/kerning-city/' },
						{ label: 'Sleepywood', link: '/places/sleepywood/' },
					],
				},
				{ label: 'Classes', items: [{ autogenerate: { directory: 'classes' } }] },
				{ label: 'Leveling', items: [{ autogenerate: { directory: 'leveling' } }] },
				{ label: 'Economy and systems', items: [{ autogenerate: { directory: 'economy' } }] },
				{ label: 'Player guides', items: [{ autogenerate: { directory: 'player-guides' } }] },
				{
					label: 'Database',
					items: [
						{ label: 'Everything', link: '/library/' },
						{ label: 'Monsters', link: '/library/?type=monster' },
						{ label: 'Items', link: '/library/?type=item' },
						{ label: 'Maps', link: '/library/?type=map' },
						{ label: 'NPCs', link: '/library/?type=npc' },
						{ label: 'Quests', link: '/library/?type=quest' },
						{ label: 'Shops', link: '/library/?type=shop' },
						{ label: 'What changed', link: '/changes/' },
					],
				},
			],
		}),
	],
});
