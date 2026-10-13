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
			social: [{ icon: 'github', label: 'GitHub', href: repositoryUrl }],
			editLink: { baseUrl: editBaseUrl },
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			components: {
				Footer: './src/components/Footer.astro',
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
						{ label: 'Monsters', link: '/monsters/' },
						{ label: 'What changed', link: '/changes/' },
					],
				},
			],
		}),
	],
});
