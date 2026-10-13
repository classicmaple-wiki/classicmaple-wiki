# 0004: Keep Starlight with a custom theme

Date: 2026-10-13. Status: proposed. Waiting for owner approval.

## Context

Spec 0002 gives every page a scene band, a mood, window framed stat blocks, and a shelf of places on index pages. That is more than a documentation theme does by default. The options are to keep Starlight and override its parts, or to drop it and build custom Astro layouts. Launch is eight days away and one person maintains the site.

Starlight gives search with Pagefind, the sidebar, the table of contents, edit links, last updated dates, dark mode with a toggle, the mobile drawer, skip links, and accessible defaults. Most of its frame can be replaced one component at a time through the `components` config. The site already renders its monster pages through `StarlightPage`.

## Decision

Keep Starlight. Theme it with our own tokens mapped onto its color variables. Override two components: `PageTitle` for the scene band and title panel on every page, and `Hero` for the home page. Keep index and entity pages as Astro pages rendered through `StarlightPage`. Add our own `Window` component for stat blocks and tables.

Revisit only if a later spec needs something the override points cannot reach, such as a page with no sidebar frame at all outside the home page.

## Consequences

- Search, navigation, dark mode, and accessibility stay as they are. Nothing to rebuild before launch.
- The library of places lives in two overrides and one component, so it is easy to change or remove.
- Starlight upgrades can change override props. Pin the minor version and read the changelog before upgrading.
- Some Starlight structure stays visible, such as the right table of contents on wide screens. The design works with it rather than against it.
- Moving to custom layouts later is still possible, since content and data do not depend on the theme.
