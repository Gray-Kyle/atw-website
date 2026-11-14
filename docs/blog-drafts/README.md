# Blog drafts (not built into the marketing site)

Markdown in this folder is for editorial paste into **ATW One**. It is intentionally outside `src/` and `public/`, so Astro does not ship these files.

## How posts reach atw.net/blog

1. The marketing site loads posts at **build time** from the One product API:
   - `GET https://one.atw.net/api/posts/public?limit=…`
   - Wired in `src/lib/blog.ts` (`BLOG_API_ORIGIN` = `https://one.atw.net`).
2. The Cloudflare Pages worker also allows same-origin `/api/posts/public` and proxies it to One (`pages-worker/_worker.js`). Auth (`auth.atw.net`) does **not** serve this route.
3. Publish by creating/updating a public post inside **One** (Marketing / blog app on `one.atw.net`), with slug, title, excerpt, body, category, and publish state.
4. Redeploy `atw-website` (push/rebuild on `main`) so `/blog/`, `/blog/[slug]/`, `/blog/rss.xml`, and the sitemap pick up the new post.

## Daily add-a-post checklist

1. Draft in One (or paste from this folder).
2. Fill excerpt + SEO title/description when possible.
3. Publish / set public.
4. Trigger a marketing-site rebuild.
5. Spot-check `/blog/`, the post URL, and RSS.

Paste each draft below into One, then set it public. Do not add these files under `src/pages` or a content collection unless product strategy moves authorship off One.
