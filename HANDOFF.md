# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

Phase 1 is blocked on the domain only. The site is live at https://classicmaple-wiki.vercel.app, deployed by Vercel from GitHub. robots.txt and the sitemap already show https://classicmaple.wiki. Both domains are attached in Vercel with `www` redirecting to the apex. The .wiki registry has no record of `classicmaple.wiki`, so DNS cannot resolve yet.

## Just done

- Owner merged pull request 1 and installed the Vercel GitHub app on the organization.
- Ran `vercel git connect`. Connected.
- First production deployment from the command line. Home page returns 200.
- Checked DNS from two resolvers and the registry. Nothing resolves. RDAP returns 404 for the domain.

## In progress

Spec `specs/0001-github-and-vercel.md`. Remaining: domain resolves over https, test pull request gets a preview, `CONTRIBUTING.md` promises the preview link.

## Next step

Once the owner confirms the domain is registered and delegated, rerun the DNS check in Verify. Then open a test pull request, confirm the Vercel preview comment, add the preview promise to `CONTRIBUTING.md`, and close spec 0001.

## Blockers and questions for the owner

- Q6: where was `classicmaple.wiki` bought, and did the purchase complete?
- The ruleset blocks direct pushes to `main`, so every agent change needs a pull request the owner merges. Consider a bypass for the repository admin role.
- Set a Vercel spend limit before launch day.

## Verify

```bash
npm run validate
npm run build
dig +short NS classicmaple.wiki @1.1.1.1
curl -sI https://classicmaple.wiki/ | head -1
vercel domains inspect classicmaple.wiki
```
