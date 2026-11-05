# IndexNow (Bing and other engines)

After each **production** deploy to `atw.net` (GitHub Actions on `main`), the site notifies [IndexNow](https://www.indexnow.org/) so Bing and other participating engines can crawl changed URLs sooner.

## How it works

1. **Public key file:** `public/<32-hex-key>.txt` is copied into `dist/` on build and served at `https://atw.net/<key>.txt`. The key is public by design (ownership proof for IndexNow). It is a `.txt` file, so it is excluded from the Astro sitemap filter and is not blocked by `robots.txt` (`Allow: /`).
2. **Deploy hook:** `.github/workflows/pages-deploy.yml` runs `node scripts/indexnow.mjs` only after a successful Cloudflare Pages deploy on `main`. The step:
   - Waits until the key URL returns HTTP 200 (poll up to ~2 minutes) so the new deploy is edge-live
   - Prefers URLs mapped from source files changed in the pushed commits
   - Falls back to all URLs in `dist/sitemap-0.xml` (capped at 10,000) when mapping is unreliable
   - POSTs JSON to `https://api.indexnow.org/indexnow`
   - Uses `continue-on-error: true` and always exits 0 so IndexNow never fails the deploy (logs HTTP status; 200/202 = success)

No secrets are required for IndexNow.

## Manual run

After a production deploy (or against any host that already serves the key file):

```bash
npm run build
node scripts/indexnow.mjs
```

Dry run (no POST):

```bash
node scripts/indexnow.mjs --dry-run
```

Specific URLs:

```bash
node scripts/indexnow.mjs --urls=https://atw.net/pricing/,https://atw.net/contact/
```

Useful env vars: `INDEXNOW_KEY`, `INDEXNOW_HOST`, `INDEXNOW_BASE_URL`, `INDEXNOW_SITEMAP`, `INDEXNOW_GIT_BEFORE`, `INDEXNOW_GIT_AFTER`, `INDEXNOW_WAIT_MS`.

Current key file URL: `https://atw.net/eb9dd8c140361eb5f99016f1dc5d3c4d.txt`
