# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

Phase 1 is in progress. The repository is live at https://github.com/classicmaple-wiki/classicmaple-wiki with `main` pushed. The four labels exist. The site validates and builds. Hosting is still not set up.

## Just done

- Pointed `repositoryUrl` in `site.config.mjs`, the clone command in `CONTRIBUTING.md`, and the README note at the new repository.
- Added `origin` and pushed `main`.
- Created labels `data`, `guide`, `patch`, and `ai-drafted`.
- Updated spec 0001 to in progress with the GitHub tasks checked off.

## In progress

Spec `specs/0001-github-and-vercel.md`. Remaining tasks: protect `main`, remove the Cloudflare workflow and README steps, connect Vercel, confirm a preview, add the domain, verify production.

## Next step

Protect `main` once the owner answers Q4. Then ask for approval to delete `.github/workflows/deploy.yml` and move to the Vercel tasks. The Vercel Git integration needs the owner logged in.

## Blockers and questions for the owner

- Q4: should `main` require one review as well as the passing CI check.
- Approval to delete `.github/workflows/deploy.yml`.
- Vercel login, when the Vercel tasks start.

## Verify

```bash
npm run validate
npm run build
git remote -v
gh label list -R classicmaple-wiki/classicmaple-wiki
```
