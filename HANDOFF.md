# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

Phase 1 is nearly done. GitHub is complete: repository, labels, and a ruleset on `main`. The Vercel project `classicmaple-wiki` exists on team `hisnameispums-projects` with both domains attached and `www` redirecting to the apex. The Vercel project is not yet connected to GitHub, so nothing has deployed. The Cloudflare workflow is gone.

## Just done

- Ruleset on `main`: pull request required, `validate-and-build` check required, no review count.
- Deleted `.github/workflows/deploy.yml`. Rewrote the README maintainer steps for Vercel.
- Added `vercel.json` pinning framework, build command, and output directory.
- Added `classicmaple.wiki` and `www.classicmaple.wiki` to the Vercel project. `www` redirects with 308.

## In progress

Spec `specs/0001-github-and-vercel.md`. Remaining: Git connection, preview check on a test pull request, `CONTRIBUTING.md` preview promise, production verification.

## Next step

Once the owner installs the Vercel GitHub app on the organization, run `vercel git connect --yes` from the repository root. Then open a test pull request, confirm the preview comment, and verify production, `robots.txt`, and the sitemap at the real domain.

## Blockers and questions for the owner

- Q5: install the Vercel GitHub app on `classicmaple-wiki` and set the two DNS records. Both are owner-only actions.
- Set a Vercel spend limit before launch day.

## Verify

```bash
npm run validate
npm run build
gh api repos/classicmaple-wiki/classicmaple-wiki/rulesets
vercel domains inspect classicmaple.wiki
```
