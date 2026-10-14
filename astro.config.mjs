import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import {
	editBaseUrl,
	repositoryUrl,
	siteDescription,
	siteTitle,
	siteUrl,
} from './site.config.mjs';

export default defineConfig({
	site: siteUrl,
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
						href: '/fonts/silkscreen-400-latin.woff2',
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
					],
				},
				{ label: 'Classes', items: [{ autogenerate: { directory: 'classes' } }] },
				{ label: 'Leveling', items: [{ autogenerate: { directory: 'leveling' } }] },
				{ label: 'Economy and systems', items: [{ autogenerate: { directory: 'economy' } }] },
				{
					label: 'Database',
					items: [
						{ label: 'Library', link: '/library/' },
						{ label: 'Monsters', link: '/monsters/' },
						{ label: 'What changed', link: '/changes/' },
					],
				},
			],
		}),
	],
});
