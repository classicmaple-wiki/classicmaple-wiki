# 0001: Astro and Starlight with YAML data

Date: 2026-10-13. Status: accepted.

## Context

The wiki must look good, load instantly, and accept contributions from players who do not code. Every fact carries a source and a build. The site is a portfolio piece for Sirux. One person maintains it. Launch is 2026-10-21.

## Decision

- Astro with the Starlight documentation theme. Static output, no server.
- Game data as one YAML file per entity in `data/`, checked by strict Zod schemas in `schemas/`.
- Guides as Markdown and MDX in `src/content/docs/`. Numbers live in data. Words live in guides.
- Contributions through GitHub issue forms and pull requests. CI validates every pull request.
- Each collection is also published as JSON for others to build on.

## Consequences

- Fast pages and free hosting on any static host.
- Starlight gives search, sidebar, dark mode, and edit links for free. Custom looks are done with a theme, not a rewrite.
- Git is the database. Fine for hundreds of entries and tens of contributors. A move to a real database is decided later by the community-platform spec.
- Contributors need a GitHub account. The issue forms keep the bar low.
- Three runtime dependencies. Adding more needs owner approval.
