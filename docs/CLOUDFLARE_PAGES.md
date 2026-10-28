# Deploy ATW Website to Cloudflare Pages

Project name: **`atw-website`**. Pages hostname: **`https://atw-website-9br.pages.dev`** (Cloudflare-assigned project subdomain; production deployment from Git on `main`).

First successful production deploy: **2026-10-28** (commit `6a86e3f`, deployment id `0720ee8a`).

GitHub: [Gray-Kyle/atw-website](https://github.com/Gray-Kyle/atw-website).

## Option A — Cloudflare dashboard (Git-connected) — **active**

Project exists and is connected to **`Gray-Kyle/atw-website`** (`main`).

- Build command: `npm ci && npm run build`
- Build output directory: `dist`
- Preview URL: https://atw-website-9br.pages.dev

**Live custom domains:** `https://www.atw.net` and `https://atw.net` → Pages production (added 2026-10-28). Product subdomains stay on Amplify (see `../../ATW/docs/STEP1_WEBSITE_PEEL.md`).

Product subdomains stay on Amplify.

## Option B — wrangler (machine with Cloudflare login)

```bash
npm ci
npm run build
npx wrangler pages deploy dist --project-name=atw-website
```

First deploy creates the Pages project if it does not exist. List projects:

```bash
npx wrangler pages project list
```

### Kyle: one-time auth on this machine

Wrangler is not logged in on the ATW dev host yet. From an interactive shell:

```bash
cd ~/Projects/atw-website
npx wrangler login
npm run deploy
```

Or use an API token with **Account → Cloudflare Pages → Edit** (and **Account Settings → Read** for account id):

```bash
export CLOUDFLARE_API_TOKEN="<token>"
export CLOUDFLARE_ACCOUNT_ID="<account_id>"
npm run deploy
```

Create the token at [Cloudflare API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

## Option C — GitHub Actions

Workflow: `.github/workflows/pages-deploy.yml`. Add repository secrets:

| Secret | Purpose |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | Pages deploy (same permissions as Option B) |
| `CLOUDFLARE_ACCOUNT_ID` | Account id from Cloudflare dashboard URL or `wrangler whoami` |

Push to `main` runs build + `wrangler pages deploy`.

## DNS cutover

### Done: `www.atw.net` (2026-10-28)

1. Added Pages custom domain `www.atw.net` on project `atw-website`.
2. Cloudflare DNS: `www` CNAME → `atw-website-9br.pages.dev`, **proxied**.
3. Detached Worker `atw` custom domain for `www.atw.net` only (Worker blocked Pages on that host).

Verification (2026-10-28): `https://www.atw.net/` and `/pricing` return Astro (HTTP 200, TLS OK). Product hosts unchanged.

Pages dashboard may show SSL `pending` briefly after cutover; edge TLS still works via Cloudflare.

### Done: apex `atw.net` (2026-10-28, Kyle approved Phase 1e)

1. Added Pages custom domain `atw.net` on project `atw-website`.
2. Detached Worker `atw` custom domain for `atw.net` only (same blocker as `www`; no Worker custom domains remain on `atw.net`).
3. Cloudflare DNS: apex CNAME → `atw-website-9br.pages.dev`, **proxied** (CNAME flattening at zone apex).

Verification (2026-10-28): `https://atw.net/` and `/pricing` return Astro (HTTP 200, TLS OK). `one`, `auth`, and `worksuite` still serve Next/Amplify via CloudFront CNAMEs (DNS-only).

Pages dashboard may show apex domain status `pending` for a few minutes while certificate validation completes; edge serving worked immediately after DNS repoint.

### Product hosts (unchanged)

**Stay on Amplify (DNS-only CNAME to Amplify app `d35uouyq924see`):**  
`one`, `auth`, `worksuite`, `workspaces`, `mail`, `meet`, `ai`, `directory`, `platform`, `admin.mail`, and other product hosts.

**Optional Amplify cleanup:** App `d35uouyq924see` may still list apex/`www` in domain association. Remove apex and stale `www` in the Amplify console when convenient (not required for routing). Leave product subdomain associations unchanged.
