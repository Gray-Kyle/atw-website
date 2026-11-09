#!/usr/bin/env node
/**
 * Zip design-preview build outputs for Cloudflare dashboard Direct Upload.
 * Writes to /opt/cursor/artifacts when available, else ./artifacts.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const artifactsDir = existsSync('/opt/cursor/artifacts')
  ? '/opt/cursor/artifacts'
  : join(root, 'artifacts');
mkdirSync(artifactsDir, { recursive: true });

const targets = [
  { dir: 'dist-preview-a', zip: 'atw-design-preview-a.pages-upload.zip' },
  { dir: 'dist-preview-b', zip: 'atw-design-preview-b.pages-upload.zip' },
];

for (const { dir, zip } of targets) {
  const src = join(root, dir);
  if (!existsSync(src)) {
    console.error(`[package-preview-zips] Missing ${dir}/; run npm run build:previews first`);
    process.exit(1);
  }
  if (!existsSync(join(src, '_worker.js'))) {
    console.error(`[package-preview-zips] ${dir}/ missing _worker.js`);
    process.exit(1);
  }
  if (!existsSync(join(src, 'design-preview.json'))) {
    console.error(`[package-preview-zips] ${dir}/ missing design-preview.json`);
    process.exit(1);
  }
  const out = join(artifactsDir, zip);
  if (existsSync(out)) rmSync(out);
  const result = spawnSync('zip', ['-r', out, '.'], { cwd: src, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
  console.log(`[package-preview-zips] Wrote ${out}`);
}
