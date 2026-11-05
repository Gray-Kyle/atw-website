/**
 * @astrojs/sitemap emits sitemap-index.xml + sitemap-0.xml.
 * Search tooling and our robots.txt expect https://atw.net/sitemap.xml,
 * so copy the URL set to that well-known path after each build.
 */
import { copyFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const distPath = dist.pathname;

const numbered = readdirSync(distPath)
  .filter((name) => /^sitemap-\d+\.xml$/.test(name))
  .sort();

const sourceName = numbered[0] ?? 'sitemap-0.xml';
const source = join(distPath, sourceName);
const target = join(distPath, 'sitemap.xml');

if (!existsSync(source)) {
  console.warn(`[publish-sitemap] missing ${sourceName}; skipped sitemap.xml copy`);
  process.exit(0);
}

copyFileSync(source, target);
console.log(`[publish-sitemap] wrote sitemap.xml from ${sourceName}`);
