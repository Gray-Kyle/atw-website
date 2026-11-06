// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { shouldIncludeInSitemap } from './src/lib/sitemap.ts';

const SITE = 'https://atw.net';

// https://astro.build/config
export default defineConfig({
  site: SITE,
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
    // Slashless /orbit is handled in public/_redirects + pages-worker.
    // Do not add '/orbit' here: it would overwrite src/pages/orbit.astro.
    '/workspace': '/orbit/',
    '/worksuite': '/orbit/',
  },
  integrations: [
    sitemap({
      filter: (page) => shouldIncludeInSitemap(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
