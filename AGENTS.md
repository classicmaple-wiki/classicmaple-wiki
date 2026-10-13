# AGENTS.md

The single set of instructions for every agent and human working on this repository. Other tool files only point here.

## Project

Classic Maple Wiki (classicmaple.wiki) is an open-source, version-aware fan wiki for MapleStory Classic World. Every fact carries a source and a game build. Grand Launch is 2026-10-21. A live, good-looking site on that date beats a perfect one later.

Owner and solo maintainer: Pum. Builder: Sirux, a web agency. The site credits Sirux and accepts donations. Later it grows into a community platform with AI-assisted maintenance. Design for that. Do not build it yet.

## Commands

```bash
npm install        # Node 22.12 or newer
npm run dev        # http://localhost:4321
npm run validate   # check every data file and route
npm run build      # validate, then build to dist/
```

## Repository map

```
AGENTS.md          This file.
HANDOFF.md         The baton between sessions. Read first.
BACKLOG.md         Now, Next, Later. Only Now items may be worked on.
specs/             Numbered specs. No feature code without an approved spec.
docs/decisions/    Numbered decision records.
docs/research/     Research notes (UI, assets).
data/              Game data, one YAML file per entity. builds.yaml lists builds.
schemas/           Zod schemas. index.ts maps collection to schema.
scripts/           validate.ts, run by CI and by npm run build.
src/content/docs/  Guides in Markdown and MDX.
src/components/    Tables and badges that read from data/.
src/pages/         Generated pages: monsters, changes, JSON export, robots.txt.
src/styles/        Theme overrides.
public/sprites/    Identification sprites, one PNG per entry.
site.config.mjs    Site address and repository address. Change them here only.
.github/           Issue forms, pull request template, CI.
```

## Data rules

- Every fact needs a source and a build. Valid build ids live in `data/builds.yaml`.
- Never invent game data. Unknown values are left out. The site shows them as Unknown.
- Anything an AI drafts enters as `unverified`. AI never raises a verification status.
- Old MapleStory, private servers, and other wikis are not sources.
- Do not delete history. Changed values get a line in `changes`.
- Pictures follow `docs/policies/images.md`. In short: small identification sprites only, one at a time, only from a source in `data/sprite-sources.yaml` marked allowed, or drawn by us. No map art, logos, music, or client extraction. Never bulk download. Never copy data or text from other fan sites.
- Never change a sprite source's status. The owner does.
- Numbers live in `data/`. Words live in guides.

## Code conventions

- Full descriptive names. No acronyms or abbreviations in identifiers.
- Prefix intentionally unused variables with an underscore.
- One `/* */` block comment above each function, struct, or file describing the design logic. No per-line comments. No leading `*` inside the block.
- Writing in docs and UI: short sentences, plain words, no em dashes.
- Keep it simple. Prefer the smallest thing that works. Fewer files, fewer dependencies.
- Do not rebuild what exists. Read before changing.

## Work loop

1. Read `HANDOFF.md`.
2. Pick the top item in the Now section of `BACKLOG.md`.
3. Read its spec. If there is none, write one from `specs/_template.md` and stop for owner approval.
4. Implement only what the spec says.
5. Run `npm run validate` and `npm run build`.
6. Update the item in `BACKLOG.md`.
7. Rewrite `HANDOFF.md`. Replace it, do not append. 300 words at most.
8. Commit with the right prefix.

One phase at a time. At the end of each phase, update `HANDOFF.md` and `BACKLOG.md`, then stop for owner review.

Spec first. No feature code without an approved spec. Typo and one-line fixes are exempt. The owner approves a spec by saying so in chat or by setting its Status to approved. The agent then sets the Status line to match.

## Commit prefixes

`data:` `guide:` `patch:` `site:` `spec:` `docs:`

## Definition of done

- The spec's acceptance criteria are met and checked off in its Tasks list.
- `npm run validate` and `npm run build` pass. Say plainly what you did not verify.
- No invented game data. No secrets in files or logs.
- `BACKLOG.md` and `HANDOFF.md` are current.
- A fresh agent can continue after reading only `AGENTS.md`, `HANDOFF.md`, and one spec. If starting needs more, fix the files.

## Needs owner approval

Ask before any of these. Stop and wait.

- Anything that costs money
- DNS changes
- Deleting files
- Changing schemas
- Adding a dependency
- Publishing anything under the owner's name
- Approving a spec
- Moving an item into Now

## Secrets

Never print, log, or commit tokens. If a login is needed, stop and ask the owner to do it.
