# Classic Maple Wiki

The open, version-aware knowledge base for MapleStory Classic World. Live at [classicmaple.wiki](https://classicmaple.wiki).

> Fan project. Not affiliated with or endorsed by Nexon.

Every number is tagged with the build it was seen in and how sure we are of it. When a value changes, the old one is kept.

## Quick start

Requires Node 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
npm run validate   # check all data files
npm run build      # validate, then build to dist/
```

## Layout

```
data/              Game data. One YAML file per entity.
  builds.yaml      The list of game builds every entry points at.
  classes/  monsters/  maps/  items/
  professions/  systems/  patches/
schemas/           What fields each data type has (Zod).
scripts/           validate.ts, run by CI on every pull request.
src/
  content/docs/    Guides (Markdown and MDX).
  components/      Tables and badges that read from data/.
  pages/           Generated pages: monsters, what changed, JSON export.
site.config.mjs    Site address and repository address. Change them here only.
```

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). The output is plain static files.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Short version: every fact needs a source and a build, and you can contribute through an issue form without touching Git.

## Open data

Each data collection is published as JSON at `/data/<collection>.json`, for example [`/data/monsters.json`](https://classicmaple.wiki/data/monsters.json).

## First-time setup (maintainers)

1. **Repository address.** If the repository is not `classicmaple-wiki/classicmaple-wiki`, update `repositoryUrl` in `site.config.mjs` and the clone command in `CONTRIBUTING.md`.
2. **Labels.** Create the labels `data`, `guide`, and `patch` so the issue forms can apply them.
3. **Cloudflare Pages.** Create a Pages project named `classicmaple` using Direct Upload, then attach the `classicmaple.wiki` domain to it.
4. **Secrets.** Add `CLOUDFLARE_API_TOKEN` (with the Cloudflare Pages Edit permission) and `CLOUDFLARE_ACCOUNT_ID` as repository secrets. Every push to `main` then builds and deploys.
5. **Branch protection.** Require the CI check and one review on `main`.

## License

Code is under the [MIT License](LICENSE). Data and guides are under [CC BY-SA 4.0](LICENSE-CONTENT.md).

## Working on the site

Agents and maintainers start with [AGENTS.md](AGENTS.md), then [HANDOFF.md](HANDOFF.md). Work is tracked in [BACKLOG.md](BACKLOG.md) and specified in [specs/](specs/).
