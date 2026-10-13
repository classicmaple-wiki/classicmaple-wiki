# Handoff

Rewritten at the end of every session. Read this, then `AGENTS.md`, then the spec of the top Now item.

## Current state

Phase 0 is done. The repository has its workflow files: `AGENTS.md`, `BACKLOG.md`, this file, `specs/`, and `docs/decisions/`. Git is initialized on `main` with one commit. There is no remote yet. The site validates and builds. Content is a seeded skeleton, nearly all unverified.

## Just done

- Wrote `AGENTS.md`, `CLAUDE.md` pointer, `specs/README.md`, `specs/_template.md`.
- Wrote decision records 0001 (stack) and 0002 (hosting on Vercel).
- Drafted spec 0001 for Phase 1. It is not yet approved.
- Added `spec:` and `docs:` commit prefixes to `CONTRIBUTING.md` and the pull request template.
- Added a pointer to `AGENTS.md` in `README.md`.

## In progress

Nothing.

## Next step

Phase 1, item P1 in `BACKLOG.md`. Get spec `specs/0001-github-and-vercel.md` approved, then follow its Tasks in order. GitHub first, Vercel second.

## Blockers and questions for the owner

- Approve spec 0001.
- Q1: GitHub username and repository name. The `gh` account is `sirasitxp`.
- Spec 0001 asks whether `main` should also require one review.
- Deleting `.github/workflows/deploy.yml` needs approval when Phase 1 reaches it.

## Verify

```bash
npm run validate
npm run build
```
