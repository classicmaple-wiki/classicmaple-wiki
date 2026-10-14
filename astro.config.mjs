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
			logo: { src: './src/assets/leaf.svg' },
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
						{ label: 'Legal and credits', slug: 'legal' },
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
