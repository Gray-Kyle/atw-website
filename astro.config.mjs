// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { shouldIncludeInSitemap } from './src/lib/sitemap.ts';

const SITE = 'https://atw.net';

/** @type {'' | 'a' | 'b'} */
const rawVariant = (process.env.ATW_DESIGN_VARIANT || '').trim().toLowerCase();
const designVariant = rawVariant === 'a' || rawVariant === 'b' ? rawVariant : '';
const isDesignVariant = designVariant === 'a' || designVariant === 'b';

const cfBranch = (process.env.CF_PAGES_BRANCH || '').trim();
const isCfPreview =
  process.env.CF_PAGES === '1' && Boolean(cfBranch) && cfBranch !== 'main';

/** Any build that must not be indexed / must not write to live APIs. */
const isPreviewSafeBuild = isDesignVariant || isCfPreview;

const outDir =
  designVariant === 'a' ? 'dist-preview-a' : designVariant === 'b' ? 'dist-preview-b' : 'dist';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  outDir,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Worker also handles both slash forms at the edge; keep one Astro entry each.
  redirects: {
    '/privacy': '/privacy-policy/',
    '/directory': '/systems/directory/',
    '/hosting': '/pricing/',
    '/credits': '/pricing/',
  },
  integrations: isPreviewSafeBuild
    ? []
    : [
        sitemap({
          filter: (page) => shouldIncludeInSitemap(page),
        }),
      ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.ATW_DESIGN_VARIANT': JSON.stringify(designVariant),
      'import.meta.env.ATW_CF_PAGES_PREVIEW': JSON.stringify(isCfPreview ? '1' : ''),
    },
  },
});
