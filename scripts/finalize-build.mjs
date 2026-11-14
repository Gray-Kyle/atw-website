#!/usr/bin/env node
/**
 * Post-astro finalize for `npm run build` (Cloudflare Pages + local).
 *
 * Production (main / non-CF local):
 *   - Copy pages-worker/_worker.js
 *   - Publish sitemap.xml
 *
 * Cloudflare preview branches (CF_PAGES_BRANCH set and !== main):
 *   - Copy preview worker (no live API proxies / writes)
 *   - Force robots noindex, X-Robots-Tag headers
 *   - Strip sitemap + IndexNow key
 *
 * Design variants (ATW_DESIGN_VARIANT=a|b) are finalized by build-preview.mjs
 * instead; this script still noops safely if pointed at those outDirs.
 */
import {
  copyFileSync,
  existsSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const variant = (process.env.ATW_DESIGN_VARIANT || '').trim().toLowerCase();
const isDesignVariant = variant === 'a' || variant === 'b';
const cfBranch = (process.env.CF_PAGES_BRANCH || '').trim();
const isCfPreview =
  process.env.CF_PAGES === '1' && Boolean(cfBranch) && cfBranch !== 'main';

const outDir = isDesignVariant
  ? variant === 'a'
    ? 'dist-preview-a'
    : 'dist-preview-b'
  : 'dist';
const outPath = join(root, outDir);

if (!existsSync(outPath)) {
  console.error(`[finalize-build] Missing ${outDir}/`);
  process.exit(1);
}

function stripSearchArtifacts() {
  for (const name of [
    'sitemap-index.xml',
    'sitemap-0.xml',
    'sitemap.xml',
    'eb9dd8c140361eb5f99016f1dc5d3c4d.txt',
  ]) {
    const path = join(outPath, name);
    if (existsSync(path)) rmSync(path);
  }
}

function writeNoindexRobots(label) {
  writeFileSync(
    join(outPath, 'robots.txt'),
    `# ${label} - not for indexing
User-agent: *
Disallow: /

# Sitemap and IndexNow are disabled for this build.
`,
  );
}

function ensureNoindexHeaders(tag) {
  const headersPath = join(outPath, '_headers');
  const existing = existsSync(headersPath) ? readFileSync(headersPath, 'utf8') : '';
  if (existing.includes('X-Robots-Tag: noindex, nofollow')) return;
  writeFileSync(
    headersPath,
    `/*
  X-Robots-Tag: noindex, nofollow
  X-ATW-Design-Preview: ${tag}

` + existing,
  );
}

if (isDesignVariant) {
  // build-preview.mjs owns variant finalization; keep this path idempotent.
  console.log(`[finalize-build] Design variant ${variant}: deferring to build-preview finalize`);
  process.exit(0);
}

if (isCfPreview) {
  const previewWorker = join(root, 'pages-worker', '_worker.design-preview.js');
  copyFileSync(previewWorker, join(outPath, '_worker.js'));
  writeNoindexRobots(`Cloudflare Pages preview (${cfBranch})`);
  ensureNoindexHeaders(`cf:${cfBranch}`);
  stripSearchArtifacts();
  writeFileSync(
    join(outPath, 'design-preview.json'),
    JSON.stringify(
      {
        variant: 'default',
        label: `Cloudflare branch preview (${cfBranch})`,
        outDir,
        noindex: true,
        formsDisabled: true,
        apiProxyDisabled: true,
        indexNow: false,
        sitemap: false,
        worker: 'pages-worker/_worker.design-preview.js',
        cfPagesBranch: cfBranch,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(
    `[finalize-build] CF preview branch "${cfBranch}": preview worker + noindex (writes disabled)`,
  );
  process.exit(0);
}

// Production / default local build
const prodWorker = join(root, 'pages-worker', '_worker.js');
copyFileSync(prodWorker, join(outPath, '_worker.js'));
const sitemap = spawnSync('node', [join(root, 'scripts', 'publish-sitemap.mjs')], {
  cwd: root,
  stdio: 'inherit',
});
if (sitemap.status !== 0) {
  process.exit(sitemap.status || 1);
}
const enrich = spawnSync('node', [join(root, 'scripts', 'enrich-sitemap-blog.mjs')], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, ATW_OUT_DIR: outDir },
});
if (enrich.status !== 0) {
  process.exit(enrich.status || 1);
}
console.log('[finalize-build] Production worker + sitemap published');
