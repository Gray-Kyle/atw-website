## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Product pages

Primary product marketing routes:

- `/one/` ATW One
- `/orbit/` ATW Orbit
- `/hub/` ATW Hub
- `/workforce/` ATW Workforce (301 from `/agents/`)
- `/ai/` ATW AI (301 from `/solutions/ai-use-cases/`)
- `/systems/directory/` Directory
- `/systems/` full catalog

Wordmarks for Workforce, Hub, and AI use `-v2` filenames under `public/images/logo/`. Keep `/images/*` cache headers at `max-age=3600, must-revalidate` (not year-long immutable).

Sitewide announcement bar: `OrbitAnnouncementBar` in `BaseLayout` (Orbit live vs Coming Soon apps).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
