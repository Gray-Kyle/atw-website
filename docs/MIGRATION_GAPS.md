# Marketing site migration gaps (intentional)

Cloudflare Pages (`atw-website`) hosts public marketing at `atw.net`. Product apps stay on dedicated hosts until peeled.

## Nav (restored)

The Astro header now mirrors the Next `(site)` marketing nav: **Systems** three-column mega-menu (system → application → module), **Services** and **Partners** link grids, **Pricing**, **Why Us**, **Book a Call**, and **Sign In**.

## Shipped on Pages (2026-10-29)

| Area | Notes |
|------|--------|
| Contact CRM form | `/contact` + `POST /api/contact` (same-origin worker → `auth.atw.net`) |
| Zoho Bookings | `/book` + `/api/zoho-bookings/*` proxy |
| Hosted lead forms | `/forms/{orgId}/{slug}` Astro shell + `GET/POST /api/public/lead-forms/...` proxy |

Pages Advanced Mode worker: `pages-worker/_worker.js` (copied to `dist/_worker.js` on build). Only whitelisted marketing APIs are forwarded; other `/api/*` returns 404.

Set `PUBLIC_TURNSTILE_SITE_KEY` on the Pages project (same value as Amplify `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) for Turnstile on `/contact`.

**Monolith follow-up:** deploy `Gray-Kyle/ATW` with `GET /api/public/lead-forms/[orgId]/hosted/[slug]` so hosted forms can load field definitions (submit already existed).

## Still on Amplify / auth (not apex HTML)

| Area | Notes |
|------|--------|
| Auth flows | `/auth/*`, session, dashboard |
| Mail signup API | `/mail/signup` form + `/api/mail/signup` (CTAs redirect to `auth.atw.net` with `product=mail`) |
| Pay / invoice | `/pay/invoice/[token]` |
| Connected / webhook lead forms | Non-hosted form types and CRM admin UI |
| Expo, status-bot, subscriptions | Lower-traffic or app-specific routes |

Backend for contact, bookings, and hosted form submit still runs on the **auth/monolith** stack (`auth.atw.net`); Pages removes the need for apex HTML on Amplify, not the API implementation yet.

## Product hosts (unchanged DNS)

`one.atw.net`, `worksuite.atw.net`, `hub.atw.net`, `directory.atw.net`, `ai.atw.net`, `agents.atw.net`, `mail.atw.net`, `auth.atw.net` remain product entry points; marketing nav links to on-site tours first where Next did.

**Peels on Cloudflare Pages (2026-10-29):** `directory.atw.net`, `ai.atw.net`. Their `/api/*` (except `/api/auth/*`) still proxies to Amplify monolith `main.d35uouyq924see.amplifyapp.com` until those APIs move off the monolith.
