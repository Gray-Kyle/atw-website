# ATW Website (`atw.net`)

Marketing site for Animal Transportation Worldwide / ATW One.

**Deploy unit:** Website (Step 1 peel from Amplify)  
**Stack:** Astro → Cloudflare Pages  
**Charter:** `../ATW/docs/STEP1_WEBSITE_PEEL.md`, `../ATW/docs/STEP0_BEST_SOLUTION.md`

Product apps (One, WorkSuite, Auth, …) stay on Amplify until their own peels. This repo is **not** a monorepo child of `ATWNetworkWebpage`; it is its own GitHub unit (same pattern as `atw-hub`).

## Develop

```bash
npm install
npm run dev
```

## Build / deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name=atw-website
# or: npm run deploy
```

Create the Cloudflare Pages project `atw-website` once (dashboard or first `wrangler pages deploy`). Preview on `*.pages.dev` before moving `atw.net` / `www` DNS.
