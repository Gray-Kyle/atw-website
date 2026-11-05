# Design preview sandboxes (Option A / Option B)

Isolated redesign concepts for Kyle to compare before any production redesign is approved.

**Do not merge to `main` for production look changes.** Production `npm run build` (no `ATW_DESIGN_VARIANT`) keeps the current site presentation.

## Variants

| Variant | Intent | Env | Output dir | Intended host (pending hosting) |
|---------|--------|-----|------------|----------------------------------|
| Option A | Bright premium business | `ATW_DESIGN_VARIANT=a` | `dist-preview-a/` | `web.atw.net` |
| Option B | Dark navy / electric editorial | `ATW_DESIGN_VARIANT=b` | `dist-preview-b/` | `web2.atw.net` |

## Exact build commands

```bash
npm ci

# Production / default (unchanged presentation) → dist/
npm run build

# Option A sandbox → dist-preview-a/
npm run build:preview-a
# equivalent: ATW_DESIGN_VARIANT=a node scripts/build-preview.mjs a

# Option B sandbox → dist-preview-b/
npm run build:preview-b
# equivalent: ATW_DESIGN_VARIANT=b node scripts/build-preview.mjs b

# Both
npm run build:previews
```

### Deploy-ready ZIPs (dashboard Direct Upload)

After building previews:

```bash
rm -f /opt/cursor/artifacts/atw-design-preview-a.pages-upload.zip
rm -f /opt/cursor/artifacts/atw-design-preview-b.pages-upload.zip
(cd dist-preview-a && zip -r /opt/cursor/artifacts/atw-design-preview-a.pages-upload.zip .)
(cd dist-preview-b && zip -r /opt/cursor/artifacts/atw-design-preview-b.pages-upload.zip .)
```

Upload each ZIP to a **separate** Cloudflare Pages project via the dashboard (Direct Upload). Do not change the production `atw-website` Git integration, build command, or settings.

Production Pages project remains Git-integrated:

- Build command: `npm ci && npm run build`
- Output directory: `dist`
- Production branch: `main`
- Project alias: `https://atw-website-9br.pages.dev`

## Preview safety (automatic)

### Design variants (`ATW_DESIGN_VARIANT=a|b`)

- HTML `noindex,nofollow` (+ googlebot)
- `_headers` `X-Robots-Tag: noindex, nofollow`
- `robots.txt` Disallow all
- Sitemap integration skipped; sitemap files removed
- IndexNow key file removed from output; IndexNow is never run by preview scripts
- Worker: `pages-worker/_worker.design-preview.js` (no proxy to auth.atw.net / one.atw.net)
- Non-GET/HEAD requests rejected locally (403)
- Contact / booking / hosted lead form UI short-circuits without POSTing

### Cloudflare Git preview branches (`CF_PAGES=1` and `CF_PAGES_BRANCH !== main`)

PR / preview branch auto-builds use the **default** visual design but still:

- Copy the preview worker (writes/API proxies disabled)
- Force noindex robots + headers
- Strip sitemap / IndexNow key
- Set `data-design-preview="true"` so form JS refuses submissions

Production `main` builds keep `pages-worker/_worker.js` and sitemap publish behavior.

## Local preview

```bash
npm run build:preview-a
npx astro preview --outDir dist-preview-a --host 127.0.0.1 --port 4321
# Note: `astro preview` serves static assets only; worker write-blocking is verified
# with wrangler pages dev or after Direct Upload. UI form guards still apply.
```

## Content rules

- Source of truth: existing why-us / product / pricing / compare copy
- Preserve WorkSuite spelling, pricing numbers, legal facts, existing logo
- Do not invent customer quotes, logos, metrics, integrations, or guarantees
- No em dashes in new marketing copy
