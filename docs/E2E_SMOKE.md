# E2E smoke tests (production)

Run after a Cloudflare Pages deploy to `atw.net` / `www.atw.net`.

## Quick run

```bash
cd ~/Projects/atw-website
node scripts/e2e-smoke.mjs
```

Single host:

```bash
node scripts/e2e-smoke.mjs --base=https://www.atw.net
```

Requires Node 18+ (`fetch` global).

## What it checks

For each base URL (`https://atw.net` and `https://www.atw.net` by default):

| Route | Expect |
|-------|--------|
| `/` | Home hero copy, no Next.js `__NEXT_DATA__` |
| `/pricing` | Pricing / Credits copy |
| `/contact` | Contact hero |
| `/solutions` | Solutions index |
| `/services`, `/why-us`, `/partners`, `/book`, `/one` | Key headings |
| `/terms`, `/for-agents`, `/blog` | Legal / agent / blog shells |
| `/definitely-not-a-real-marketing-route-xyz` | HTTP 404 and error copy |
| `/` (links) | `one.atw.net` and `auth.atw.net/auth/signin` in HTML |

Exit code `0` = pass, `1` = at least one failure.

## Grok bot checklist

Copy this block for an automated browser or HTTP pass:

1. Confirm `https://atw.net` and `https://www.atw.net` both return **200** for `/` (follow redirects).
2. Run `node scripts/e2e-smoke.mjs` from repo root; fix any FAIL lines before sign-off.
3. Spot-check nav: **Services**, **Partners**, **Pricing**, **Solutions**, **Book a Call**, **Sign In** (auth subdomain).
4. Open `/solutions/crm` and `/partners/zoho`; confirm Astro chrome (logo header, footer legal links).
5. Open `/trial`; confirm redirect to `auth.atw.net/signup` with `product=one`.
6. Confirm `/services` is **not** serving the home page (title/body must mention ATW Services).
7. Product CTAs: **ATW One** menu item → `https://one.atw.net`; **Sign In** → `https://auth.atw.net/auth/signin`.
8. Known gaps (do not fail migration on these alone): contact CRM form and Zoho Bookings widget need apex → auth API proxy; `/book` lists phone/email fallback.

## Manual curl spot checks

```bash
curl -sI https://atw.net/services | head -1
curl -s https://atw.net/services | rg -o 'ATW Services' | head -1
curl -sI https://atw.net/trial | rg -i location
```

## After deploy

Pages Git build on push to `main` (project `atw-website`). Wait for green deploy in Cloudflare dashboard, then run smoke script.
