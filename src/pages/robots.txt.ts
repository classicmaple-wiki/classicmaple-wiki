import type { APIRoute } from 'astro';

/*
   Generated instead of hand-written so the sitemap address always follows
   the site address in site.config.mjs.
*/
export const GET: APIRoute = ({ site }) => {
	const sitemapUrl = new URL('sitemap-index.xml', site);
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl.href}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
