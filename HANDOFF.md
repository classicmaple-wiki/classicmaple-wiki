# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

Phase 1 is done. The site is live at https://classicmaple.wiki, deployed by Vercel from GitHub on every push to `main`. Every pull request gets a preview link. `main` is protected by a ruleset: pull request required, `validate-and-build` check required. Vercel hosts the DNS for the domain. `www` redirects to the apex.

## Just done

- Verified over https: home page 200, `www` 308 to the apex, robots.txt and the sitemap show the real domain, monsters page 200.
- Confirmed a Vercel preview and bot comment on pull request 2.
- Closed spec 0001. Marked P1 done.

## In progress

Nothing. Phase 2 has not started and has no spec.

## Next step

Owner review of Phase 1. Then move P2 into Now and write spec 0002 for design research and the design system. The spec comes first and waits for approval.

## Blockers and questions for the owner

- Q7: add a ruleset bypass for the repository Admin role in GitHub settings. The agent's harness refused to change the ruleset itself.
- Set a Vercel spend limit before 2026-10-21.
- Q2 and Q3 in `BACKLOG.md` are still open for Phase 3.

## Verify

```bash
npm run validate
npm run build
curl -sI https://classicmaple.wiki/ | head -1
curl -s https://classicmaple.wiki/robots.txt
```
