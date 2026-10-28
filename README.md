# ATW Website (`atw.net`)

Marketing site for Animal Transportation Worldwide / ATW One.

**Deploy unit:** Website (Step 1 peel from Amplify)  
**Stack:** Astro → Cloudflare Pages  
**Charter:** `../ATW/docs/STEP1_WEBSITE_PEEL.md`, `../ATW/docs/STEP0_BEST_SOLUTION.md`

Product apps (One, WorkSuite, Auth, …) stay on Amplify until their own peels. This repo is **not** a monorepo child of `ATWNetworkWebpage`; it is its own GitHub unit (same pattern as `atw-hub`).

**GitHub:** https://github.com/Gray-Kyle/atw-website  
**Pages project:** `atw-website`  
**Preview URL (after first deploy):** https://atw-website.pages.dev — _not live until Cloudflare deploy completes; see [docs/CLOUDFLARE_PAGES.md](./docs/CLOUDFLARE_PAGES.md)._

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

Deploy options (dashboard Git connect, wrangler, or GitHub Actions): [docs/CLOUDFLARE_PAGES.md](./docs/CLOUDFLARE_PAGES.md). Preview on `*.pages.dev` before moving `atw.net` / `www` DNS.
