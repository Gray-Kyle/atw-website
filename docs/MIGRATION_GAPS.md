# Marketing site migration gaps (intentional)

Cloudflare Pages (`atw-website`) hosts public marketing at `atw.net`. Product apps stay on dedicated hosts until peeled.

## Nav (restored)

The Astro header now mirrors the Next `(site)` marketing nav: **Systems** three-column mega-menu (system → application → module), **Services** and **Partners** link grids, **Pricing**, **Why Us**, **Book a Call**, and **Sign In**.

## Still on Amplify / auth (not apex HTML)

| Area | Notes |
|------|--------|
| Auth flows | `/auth/*`, session, dashboard |
| Mail signup API | `/mail/signup` form + `/api/mail/signup` (CTAs redirect to `auth.atw.net` with `product=mail`) |
| Pay / invoice | `/pay/invoice/[token]` |
| Dynamic forms | `/forms/[orgId]/[slug]` |
| Contact CRM + Bookings | Needs apex → auth API proxy for live widget |
| Expo, status-bot, subscriptions | Lower-traffic or app-specific routes |

## Product hosts (unchanged DNS)

`one.atw.net`, `worksuite.atw.net`, `hub.atw.net`, `directory.atw.net`, `ai.atw.net`, `agents.atw.net`, `mail.atw.net`, `auth.atw.net` remain product entry points; marketing nav links to on-site tours first where Next did.

**Peels on Cloudflare Pages (2026-10-29):** `directory.atw.net`, `ai.atw.net`. Their `/api/*` (except `/api/auth/*`) still proxies to Amplify monolith `main.d35uouyq924see.amplifyapp.com` until those APIs move off the monolith.
