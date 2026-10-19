/*
   The RSS feed at /feed.xml (spec 0014): the newest twenty What's new
   entries, so players can follow the wiki in a reader. Written by hand
   as RSS 2.0 with the five characters XML needs escaped, so it needs no
   dependency. Links are absolute, from the site address in
   site.config.mjs.
*/
import type { APIRoute } from 'astro';
import { siteDescription, siteTitle, siteUrl } from '../../site.config.mjs';
import { whatsNewEntries } from '../lib/whatsNew';

function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
	const entries = await whatsNewEntries(20);
	const items = entries
		.map((entry) => {
			const link = new URL(entry.href, siteUrl).href;
			return [
				'<item>',
				`<title>${escapeXml(`${entry.type}: ${entry.title}`)}</title>`,
				`<link>${escapeXml(link)}</link>`,
				`<guid isPermaLink="false">${escapeXml(`${entry.type}:${entry.href}:${entry.date.toISOString().slice(0, 10)}`)}</guid>`,
				`<pubDate>${entry.date.toUTCString()}</pubDate>`,
				`<description>${escapeXml(entry.line)}</description>`,
				'</item>',
			].join('');
		})
		.join('\n');

	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
		'<channel>',
		`<title>${escapeXml(siteTitle)}</title>`,
		`<link>${escapeXml(siteUrl)}</link>`,
		`<description>${escapeXml(siteDescription)}</description>`,
		'<language>en</language>',
		`<atom:link href="${escapeXml(new URL('/feed.xml', siteUrl).href)}" rel="self" type="application/rss+xml"/>`,
		items,
		'</channel>',
		'</rss>',
	].join('\n');

	return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
