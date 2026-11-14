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

## Blog (where posts live)

Posts are **not** Markdown in this repo. They are published in **ATW One** (Marketing / blog app on `one.atw.net`) and loaded at build time by `src/lib/blog.ts`:

```
GET https://one.atw.net/api/posts/public?limit=…
```

Routes:

- `/blog/` index (filters, search, pagination)
- `/blog/[slug]/` post template
- `/blog/rss.xml` RSS feed (indexable posts only)

Test/smoke posts are detected heuristically (`isLikelyTestBlogPost`), hidden from the index and RSS, noindexed on the post page, and excluded from the sitemap.

### Add a new post (daily routine)

1. In One, create or edit the post (title, slug, excerpt, body HTML or Markdown, category, featured image optional, SEO title/description optional).
2. Set it **public / published**.
3. Redeploy or rebuild `atw-website` so the static blog pages refresh (Cloudflare Pages build on `main`, or local `npm run build`).
4. Confirm `/blog/`, `/blog/your-slug/`, sitemap, and `/blog/rss.xml`.

Optional drafts for paste-into-One can live under `docs/blog-drafts/` (not shipped by Astro). See `docs/blog-drafts/README.md`.

Do **not** migrate to `src/content/blog` unless product strategy moves authorship off One. Keeping One as the CMS keeps the daily publish path commit-free.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
