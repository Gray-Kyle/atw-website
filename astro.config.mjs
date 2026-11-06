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
    '/workspace': '/orbit/',
    '/worksuite': '/orbit/',
    '/orbit': '/orbit/',
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
