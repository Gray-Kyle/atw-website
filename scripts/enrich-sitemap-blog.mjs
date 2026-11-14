#!/usr/bin/env node
/**
 * Patch blog post <lastmod> values into dist/sitemap-0.xml (and sitemap.xml)
 * using published/updated dates from the One public posts API.
 */
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distPath = join(root, process.env.ATW_OUT_DIR || 'dist');
const api = 'https://one.atw.net/api/posts/public?limit=100';

const TEST_SLUG = /^(new-post|test-post|post-with-image)$|^test-|^schudled-|^scheduled-|smoke|codex-scheduler/i;

async function main() {
  const numbered = readdirSync(distPath)
    .filter((name) => /^sitemap-\d+\.xml$/.test(name))
    .sort();
  if (!numbered.length) {
    console.warn('[enrich-sitemap-blog] no sitemap-*.xml; skipped');
    return;
  }

  let posts = [];
  try {
    const res = await fetch(api);
    if (res.ok) {
      const data = await res.json();
      posts = data.posts ?? [];
    }
  } catch (err) {
    console.warn('[enrich-sitemap-blog] fetch failed:', err?.message || err);
  }

  const lastmodByLoc = new Map();
  for (const post of posts) {
    if (!post?.slug || TEST_SLUG.test(post.slug)) continue;
    const iso = post.updatedAt || post.publishedAt;
    if (!iso) continue;
    const day = new Date(iso);
    if (Number.isNaN(day.getTime())) continue;
    const lastmod = day.toISOString().slice(0, 10);
    lastmodByLoc.set(`https://atw.net/blog/${post.slug}/`, lastmod);
  }
  // Blog index: freshest post date
  const newest = [...lastmodByLoc.values()].sort().at(-1);
  if (newest) lastmodByLoc.set('https://atw.net/blog/', newest);

  for (const name of [...numbered, 'sitemap.xml']) {
    const path = join(distPath, name);
    if (!existsSync(path)) continue;
    let xml = readFileSync(path, 'utf8');
    let patched = 0;
    xml = xml.replace(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>[^<]*<\/lastmod>)?/g, (full, loc) => {
      const lastmod = lastmodByLoc.get(loc);
      if (!lastmod) return full;
      patched += 1;
      return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod>`;
    });
    writeFileSync(path, xml);
    console.log(`[enrich-sitemap-blog] ${name}: patched ${patched} lastmod values`);
  }
}

main().catch((err) => {
  console.warn('[enrich-sitemap-blog] failed:', err?.message || err);
});
