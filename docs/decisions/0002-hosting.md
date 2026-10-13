# 0002: Host on Vercel, not Cloudflare Pages

Date: 2026-10-13. Status: accepted. Carried out in spec 0001.

## Context

The scaffold shipped with a GitHub Actions workflow that uploads `dist/` to Cloudflare Pages. That needs two repository secrets and a hand-made Pages project, and it gives no preview per pull request without more setup. The owner already has a Vercel Pro account.

## Decision

Host on Vercel through its Git integration. Framework Astro, build `npm run build`, output `dist`. Every push to `main` deploys production. Every pull request gets a preview deployment. The domain classicmaple.wiki is attached in Vercel, with `www` redirecting to the apex.

The Cloudflare workflow and the Cloudflare steps in `README.md` are removed.

## Consequences

- No deploy secrets in GitHub. No deploy workflow to maintain. CI only validates and builds.
- Contributors see a preview link on every pull request.
- Cost is covered by the owner's Pro plan. Spend Management is on, capped at $50 a month, set 2026-10-13.
- The site is still plain static files, so moving hosts later is a one-day job.
