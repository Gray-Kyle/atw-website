# Blog drafts (not built into the marketing site)

Markdown in this folder is for editorial paste into **ATW One**. It is intentionally outside `src/` and `public/`, so Astro does not ship these files.

## How posts reach atw.net/blog

1. The marketing site loads posts at build/request time from the One product API:
   - `GET https://one.atw.net/api/posts/public?limit=…`
   - Wired in `src/lib/blog.ts` (`BLOG_API_ORIGIN` = `https://one.atw.net`).
2. The Cloudflare Pages worker also allows same-origin `/api/posts/public` and proxies it to One (`pages-worker/_worker.js`). Auth (`auth.atw.net`) does **not** serve this route.
3. Publish by creating/updating a public post inside **One** (Marketing / blog app on `one.atw.net`), with slug, title, excerpt, body, and publish state. After publish, `/blog` and `/blog/[slug]` on atw.net will list the post on the next fetch (no commit to this repo required).

Paste each draft below into One, then set it public. Do not add these files under `src/pages` or a content collection unless product strategy changes.
