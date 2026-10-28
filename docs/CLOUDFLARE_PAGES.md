# Deploy ATW Website to Cloudflare Pages

Project name: **`atw-website`**. Production preview hostname (after first deploy): **`https://atw-website.pages.dev`**.

GitHub: [Gray-Kyle/atw-website](https://github.com/Gray-Kyle/atw-website).

## Option A — Cloudflare dashboard (Git-connected)

1. Cloudflare → Workers & Pages → Create → Connect to Git → `Gray-Kyle/atw-website`
2. Production branch: `main`
3. Build command: `npm ci && npm run build`
4. Build output directory: `dist`
5. (Optional) Add custom domains `www.atw.net` and `atw.net` only after content parity and Kyle sign-off (see `../ATW/docs/STEP1_WEBSITE_PEEL.md`).

Do not point apex/`www` at Pages until Phase 1e. Product subdomains stay on Amplify.

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

## DNS cutover (document only; do not run early)

**Stay on Amplify (DNS-only CNAME to Amplify app `d35uouyq924see`):**  
`one`, `auth`, `worksuite`, `workspaces`, `mail`, `meet`, `ai`, `directory`, `platform`, `admin.mail`, and other product hosts tied to the monolith.

**Move when ready (Phase 1e):**

| Host | Target | Notes |
|------|--------|--------|
| `www.atw.net` | `atw-website.pages.dev` | CNAME, proxied through Cloudflare |
| `atw.net` (apex) | Pages custom domain | Use Cloudflare apex setup on the Pages project (CNAME flattening / recommended apex pattern) |

After cutover: remove apex and `www` from the Amplify domain association; leave product subdomain associations unchanged.
