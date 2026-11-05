// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://atw.net';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      customPages: [
        `${SITE}/for-agents/erp.md`,
        `${SITE}/for-agents/custom-erp.md`,
        `${SITE}/llms.txt`,
        `${SITE}/llms-full.txt`,
        `${SITE}/.well-known/gpc.json`,
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
