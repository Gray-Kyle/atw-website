#!/usr/bin/env node
/**
 * Build an isolated design-preview variant (Direct Upload ready).
 *
 *   node scripts/build-preview.mjs a   → dist-preview-a/
 *   node scripts/build-preview.mjs b   → dist-preview-b/
 *
 * Does not run IndexNow. Uses the preview-only worker (no live API proxies).
 * Production `npm run build` is unchanged and still copies pages-worker/_worker.js.
 */
import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const variant = (process.argv[2] || '').trim().toLowerCase();

if (variant !== 'a' && variant !== 'b') {
  console.error('Usage: node scripts/build-preview.mjs <a|b>');
  process.exit(1);
}

const outDir = variant === 'a' ? 'dist-preview-a' : 'dist-preview-b';
const outPath = join(root, outDir);
const label = variant === 'a' ? 'Option A · Bright Premium' : 'Option B · Dark Editorial';
const intendedHost = variant === 'a' ? 'web.atw.net' : 'web2.atw.net';

console.log(`[build-preview] Building ${label} → ${outDir}/`);

const build = spawnSync('npx', ['astro', 'build'], {
  cwd: root,
  env: {
    ...process.env,
    ATW_DESIGN_VARIANT: variant,
  },
  stdio: 'inherit',
});

if (build.status !== 0) {
  process.exit(build.status || 1);
}

if (!existsSync(outPath)) {
  console.error(`[build-preview] Missing output directory ${outDir}`);
  process.exit(1);
}

const previewWorker = join(root, 'pages-worker', '_worker.design-preview.js');
if (!existsSync(previewWorker)) {
  console.error('[build-preview] Missing pages-worker/_worker.design-preview.js');
  process.exit(1);
}
copyFileSync(previewWorker, join(outPath, '_worker.js'));

writeFileSync(
  join(outPath, 'robots.txt'),
  `# Design preview (${label}) — not for indexing
User-agent: *
Disallow: /

# No sitemap on design previews. IndexNow is not run for these builds.
`,
);

const headersPath = join(outPath, '_headers');
const existingHeaders = existsSync(headersPath) ? readFileSync(headersPath, 'utf8') : '';
const robotsHeaderBlock = `/*
  X-Robots-Tag: noindex, nofollow
  X-ATW-Design-Preview: ${variant}

`;
if (!existingHeaders.includes('X-Robots-Tag: noindex, nofollow')) {
  writeFileSync(headersPath, robotsHeaderBlock + existingHeaders);
}

for (const name of ['sitemap-index.xml', 'sitemap-0.xml', 'sitemap.xml']) {
  const path = join(outPath, name);
  if (existsSync(path)) rmSync(path);
}

// Remove IndexNow ownership key from preview outputs (avoid implying indexability).
for (const name of ['eb9dd8c140361eb5f99016f1dc5d3c4d.txt']) {
  const path = join(outPath, name);
  if (existsSync(path)) rmSync(path);
}

writeFileSync(
  join(outPath, 'design-preview.json'),
  JSON.stringify(
    {
      variant,
      label,
      outDir,
      noindex: true,
      formsDisabled: true,
      apiProxyDisabled: true,
      indexNow: false,
      sitemap: false,
      worker: 'pages-worker/_worker.design-preview.js',
      intendedHost,
      notes:
        'Direct Upload this folder (or its ZIP) via Cloudflare dashboard. Do not use production npm run deploy.',
    },
    null,
    2,
  ) + '\n',
);

console.log(`[build-preview] Ready: ${outDir}/ (preview worker, noindex, APIs blocked, IndexNow skipped)`);
