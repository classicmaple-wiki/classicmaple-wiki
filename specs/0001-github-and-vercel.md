# 0001: GitHub repository and Vercel hosting

Status: in progress

## Problem

The code lives only on the owner's machine. There is no remote, no deploy, and the deploy workflow still targets Cloudflare Pages, which is no longer the plan. Nothing can go live and nobody can contribute.

## Goals and non-goals

Goals:

- A public GitHub repository under the owner's account with protected `main`.
- The site deployed on Vercel at classicmaple.wiki, with preview deployments on every pull request.
- Repository address and clone command correct everywhere in the repository.

Non-goals:

- Design changes.
- New content or data.
- Changes at the domain registrar. The owner sets DNS records by hand.

## Requirements

- [x] `gh auth status` succeeds for the owner's account.
- [x] A public repository exists at the owner-chosen address. `repositoryUrl` in `site.config.mjs` and the clone command in `CONTRIBUTING.md` match it.
- [x] `main` has the first commit pushed. Labels `data`, `guide`, `patch`, and `ai-drafted` exist.
- [x] `main` is protected: pull requests required, the CI check must pass.
- [x] `docs/decisions/0002-hosting.md` records the move to Vercel. `.github/workflows/deploy.yml` and the Cloudflare steps in `README.md` are removed.
- [x] The Vercel project is linked through the Git integration with framework Astro, build `npm run build`, output `dist`.
- [ ] A test pull request gets a preview deployment, and `CONTRIBUTING.md` promises the preview link.
- [ ] The production URL loads over https. `robots.txt` and the sitemap show the real domain. `www` redirects to the apex.
- [ ] The owner has the exact DNS records and a reminder to set a Vercel spend limit before launch day.

## Design

Order of work: GitHub first, then Vercel, because the Vercel Git integration needs the repository to exist.

GitHub steps use the `gh` command. The agent asks the owner for the username and repository name before creating anything. Branch protection uses a ruleset or the classic protection API, whichever `gh` supports cleanly.

Vercel steps need the owner's login. The agent writes the exact settings and asks the owner to click through, or uses the Vercel command line only after the owner has logged in. The agent never handles tokens.

Removing `deploy.yml` is a file deletion and needs owner approval before it happens.

## Tasks

- [x] Ask the owner for the GitHub username and repository name.
- [x] Owner created the repository by hand. Addresses updated, first commits pushed.
- [x] Create the four labels.
- [x] Protect `main`. Ruleset: pull request required, `validate-and-build` check required, no review count. Add a review count to the same ruleset when a second reviewer or CodeRabbit arrives.
- [x] Write decision record 0002. Remove the Cloudflare workflow and README steps.
- [x] Connect Vercel. Done 2026-10-13 after the owner installed the GitHub app. First production deployment made from the command line and verified at classicmaple-wiki.vercel.app.
- [ ] Confirm a preview on a test pull request and update `CONTRIBUTING.md`.
- [x] Add the domain and the `www` redirect. DNS records handed to the owner on 2026-10-13: `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`.
- [ ] Verify production, `robots.txt`, and the sitemap.
- [ ] Run `npm run validate` and `npm run build`.
- [ ] Update `BACKLOG.md` and rewrite `HANDOFF.md`.

## Open questions

- Domain registration. On 2026-10-13 the .wiki registry RDAP returned 404 for `classicmaple.wiki` and published no nameservers. The owner reports having set DNS records. Where was the domain bought, and did the purchase complete?

- GitHub address. Answered: the owner created `classicmaple-wiki/classicmaple-wiki` under an organization, with `sirasitxp` as admin.
- Branch protection. Answered: CI check only for now. Must be easy to add a review rule later.
