#!/usr/bin/env node
/**
 * Notify IndexNow (Bing and other engines) of URLs changed on atw.net.
 *
 * Usage (after production deploy is live):
 *   node scripts/indexnow.mjs
 *   node scripts/indexnow.mjs --dry-run
 *   node scripts/indexnow.mjs --urls https://atw.net/pricing/
 *
 * Env (optional):
 *   INDEXNOW_HOST          default atw.net
 *   INDEXNOW_KEY           32-char hex key (default: read from public/<key>.txt)
 *   INDEXNOW_SITEMAP       path to sitemap XML (default: dist/sitemap-0.xml)
 *   INDEXNOW_BASE_URL      default https://atw.net
 *   INDEXNOW_WAIT_MS       max wait for key URL (default 120000)
 *   INDEXNOW_GIT_BEFORE    git SHA / ref for changed-file diff start
 *   INDEXNOW_GIT_AFTER     git SHA / ref for changed-file diff end (default HEAD)
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const HOST = process.env.INDEXNOW_HOST || 'atw.net';
const BASE_URL = (process.env.INDEXNOW_BASE_URL || `https://${HOST}`).replace(/\/$/, '');
const KEY_LOCATION_PATH = process.env.INDEXNOW_KEY_LOCATION;
const MAX_URLS = 10_000;
const WAIT_MS = Number(process.env.INDEXNOW_WAIT_MS || 120_000);
const POLL_MS = 5_000;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const urlsFlag = args.find((a) => a.startsWith('--urls='));
const manualUrls = urlsFlag
  ? urlsFlag
      .slice('--urls='.length)
      .split(',')
      .map((u) => u.trim())
      .filter(Boolean)
  : [];

/** Paths that affect many routes; mapping individual URLs is unreliable. */
const BROAD_CHANGE_PREFIXES = [
  'src/components/',
  'src/layouts/',
  'src/data/',
  'src/lib/',
  'astro.config.',
  'package.json',
  'package-lock.json',
  'pages-worker/',
  'src/styles/',
  'public/js/',
  'public/images/',
];

function findKeyFromPublic() {
  const publicDir = join(ROOT, 'public');
  if (!existsSync(publicDir)) return null;
  const match = readdirSync(publicDir).find((name) => /^[a-f0-9]{32}\.txt$/i.test(name));
  if (!match) return null;
  const key = readFileSync(join(publicDir, match), 'utf8').trim();
  return { key, filename: match };
}

function resolveKey() {
  if (process.env.INDEXNOW_KEY) {
    const key = process.env.INDEXNOW_KEY.trim();
    return { key, filename: `${key}.txt` };
  }
  const fromPublic = findKeyFromPublic();
  if (fromPublic) return fromPublic;
  throw new Error('IndexNow key not found (set INDEXNOW_KEY or add public/<32-hex>.txt)');
}

function sitemapPath() {
  if (process.env.INDEXNOW_SITEMAP) return process.env.INDEXNOW_SITEMAP;
  const dist = join(ROOT, 'dist');
  if (!existsSync(dist)) return join(dist, 'sitemap-0.xml');
  const numbered = readdirSync(dist)
    .filter((name) => /^sitemap-\d+\.xml$/.test(name))
    .sort();
  return join(dist, numbered[0] ?? 'sitemap-0.xml');
}

function parseSitemapUrls(xmlPath) {
  if (!existsSync(xmlPath)) {
    console.warn(`[indexnow] sitemap missing: ${xmlPath}`);
    return [];
  }
  const xml = readFileSync(xmlPath, 'utf8');
  const urls = [];
  for (const match of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
    urls.push(match[1].trim());
  }
  return urls;
}

function toCanonicalUrl(pathname) {
  let path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) {
    path = `${path}/`;
  }
  return `${BASE_URL}${path}`;
}

/**
 * Map a repo-relative source path to zero or more site pathnames.
 * Returns { paths, dynamicPrefix } where dynamicPrefix means "take matching sitemap URLs".
 */
function mapSourceToRoutes(filePath) {
  const rel = filePath.replace(/\\/g, '/');

  if (rel.startsWith('content/docs/')) {
    const base = rel.replace(/^content\/docs\//, '').replace(/\.mdx?$/, '');
    if (!base || base.includes('/')) return { paths: [] };
    return { paths: [`/docs/${base}/`] };
  }

  if (!rel.startsWith('src/pages/')) return { paths: [] };

  let page = rel.slice('src/pages/'.length);
  if (!/\.(astro|md|mdx|html|ts|js)$/.test(page)) return { paths: [] };
  page = page.replace(/\.(astro|md|mdx|html|ts|js)$/, '');

  if (page.includes('[')) {
    const dir = page.includes('/') ? page.slice(0, page.lastIndexOf('/') + 1) : '';
    return { paths: [], dynamicPrefix: `/${dir}` };
  }

  if (page === 'index' || page.endsWith('/index')) {
    const dir = page === 'index' ? '/' : `/${page.slice(0, -'index'.length)}`;
    return { paths: [dir === '//' ? '/' : dir] };
  }

  if (page === '404') return { paths: [] };
  return { paths: [`/${page}/`] };
}

function isBroadChange(filePath) {
  const rel = filePath.replace(/\\/g, '/');
  return BROAD_CHANGE_PREFIXES.some((prefix) => rel.startsWith(prefix) || rel === prefix.replace(/\/$/, ''));
}

function gitChangedFiles(before, after) {
  if (!before || before === '0000000000000000000000000000000000000000') {
    return null;
  }
  try {
    const out = execSync(`git diff --name-only ${before}...${after}`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return out
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
  } catch (err) {
    console.warn(`[indexnow] git diff failed (${err.message}); falling back to sitemap`);
    return null;
  }
}

function urlsFromChangedFiles(changedFiles, sitemapUrls) {
  if (!changedFiles || changedFiles.length === 0) {
    return { urls: [], reason: 'no-changed-files' };
  }

  if (changedFiles.some(isBroadChange)) {
    return { urls: [], reason: 'broad-change' };
  }

  const pathSet = new Set();
  const prefixes = new Set();

  for (const file of changedFiles) {
    const mapped = mapSourceToRoutes(file);
    for (const p of mapped.paths) pathSet.add(p);
    if (mapped.dynamicPrefix) prefixes.add(mapped.dynamicPrefix);
  }

  // Only non-route assets changed (e.g. key file, docs) with no mappable pages.
  const routeLike = changedFiles.some(
    (f) => f.startsWith('src/pages/') || f.startsWith('content/'),
  );
  if (!routeLike && pathSet.size === 0 && prefixes.size === 0) {
    return { urls: [], reason: 'no-route-changes' };
  }

  const urls = [];
  for (const p of pathSet) {
    urls.push(toCanonicalUrl(p));
  }
  for (const prefix of prefixes) {
    const normalized = prefix.endsWith('/') ? prefix : `${prefix}/`;
    for (const loc of sitemapUrls) {
      try {
        const { pathname } = new URL(loc);
        if (pathname === normalized || pathname.startsWith(normalized)) {
          urls.push(loc);
        }
      } catch {
        // skip bad loc
      }
    }
  }

  const unique = [...new Set(urls)];
  if (unique.length === 0) {
    return { urls: [], reason: 'mapping-empty' };
  }
  return { urls: unique, reason: 'mapped' };
}

async function waitForKeyLive(keyUrl) {
  const deadline = Date.now() + WAIT_MS;
  let attempt = 0;
  while (Date.now() < deadline) {
    attempt += 1;
    try {
      const res = await fetch(keyUrl, { redirect: 'follow' });
      console.log(`[indexnow] key poll #${attempt}: ${keyUrl} -> ${res.status}`);
      if (res.status === 200) {
        const body = (await res.text()).trim();
        return { ok: true, body };
      }
    } catch (err) {
      console.log(`[indexnow] key poll #${attempt}: ${err.message}`);
    }
    const remaining = deadline - Date.now();
    if (remaining <= 0) break;
    await new Promise((r) => setTimeout(r, Math.min(POLL_MS, remaining)));
  }
  return { ok: false };
}

async function submit(urlList, key, keyLocation) {
  const body = {
    host: HOST,
    key,
    keyLocation,
    urlList: urlList.slice(0, MAX_URLS),
  };

  if (dryRun) {
    console.log('[indexnow] dry-run payload:');
    console.log(JSON.stringify({ ...body, urlList: `[${body.urlList.length} urls]` }, null, 2));
    console.log(body.urlList.slice(0, 20).join('\n'));
    if (body.urlList.length > 20) console.log(`... +${body.urlList.length - 20} more`);
    return { status: 0, ok: true };
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text().catch(() => '');
  console.log(`[indexnow] POST ${ENDPOINT} -> HTTP ${res.status}`);
  if (text) console.log(`[indexnow] response body: ${text.slice(0, 500)}`);
  return { status: res.status, ok: res.status === 200 || res.status === 202 };
}

async function main() {
  try {
    const { key, filename } = resolveKey();
    const keyLocation = KEY_LOCATION_PATH || `${BASE_URL}/${filename}`;
    const xmlPath = sitemapPath();
    const sitemapUrls = parseSitemapUrls(xmlPath);

    let urlList = manualUrls;
    let selection = manualUrls.length ? 'manual' : null;

    if (!urlList.length) {
      const before = process.env.INDEXNOW_GIT_BEFORE || process.env.GITHUB_EVENT_BEFORE || '';
      const after = process.env.INDEXNOW_GIT_AFTER || process.env.GITHUB_SHA || 'HEAD';
      const changed = gitChangedFiles(before, after);
      if (changed) {
        console.log(`[indexnow] ${changed.length} changed file(s) in ${before || '?'}...${after}`);
        const mapped = urlsFromChangedFiles(changed, sitemapUrls);
        if (mapped.reason === 'mapped') {
          urlList = mapped.urls;
          selection = 'changed-mapped';
        } else {
          console.log(`[indexnow] changed-file mapping skipped (${mapped.reason}); using sitemap`);
        }
      } else {
        console.log('[indexnow] no reliable git range; using sitemap');
      }
    }

    if (!urlList.length) {
      urlList = sitemapUrls;
      selection = selection || 'sitemap';
    }

    urlList = [...new Set(urlList)].slice(0, MAX_URLS);
    console.log(`[indexnow] selection=${selection}; submitting ${urlList.length} URL(s)`);

    if (!urlList.length) {
      console.warn('[indexnow] empty urlList; nothing to submit');
      process.exit(0);
      return;
    }

    const live = await waitForKeyLive(keyLocation);
    if (!live.ok) {
      console.warn(`[indexnow] key URL not live within ${WAIT_MS}ms; submitting anyway`);
    } else if (live.body && live.body !== key) {
      console.warn('[indexnow] key file body does not match expected key');
    }

    const result = await submit(urlList, key, keyLocation);
    if (!result.ok && !dryRun) {
      console.warn(`[indexnow] non-success status ${result.status} (200/202 expected)`);
    } else if (result.ok) {
      console.log('[indexnow] success');
    }
  } catch (err) {
    console.error(`[indexnow] error: ${err.message}`);
  }
  // Never fail the deploy pipeline.
  process.exit(0);
}

main();
