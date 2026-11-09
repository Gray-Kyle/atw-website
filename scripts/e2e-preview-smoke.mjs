#!/usr/bin/env node
/**
 * Smoke checks for design-preview builds served locally.
 *
 *   node scripts/e2e-preview-smoke.mjs --base=http://127.0.0.1:4321
 *   node scripts/e2e-preview-smoke.mjs --base=http://127.0.0.1:4321 --variant=a
 */
const baseArg = process.argv.find((a) => a.startsWith('--base='));
const variantArg = process.argv.find((a) => a.startsWith('--variant='));
const base = (baseArg?.split('=')[1] || 'http://127.0.0.1:4321').replace(/\/$/, '');
const variant = variantArg?.split('=')[1] || '';

const routes = ['/', '/why-us/', '/one/', '/pricing/', '/compare/'];
let failed = 0;

function pass(msg) {
  console.log(`PASS  ${msg}`);
}
function fail(msg) {
  failed += 1;
  console.error(`FAIL  ${msg}`);
}

async function checkHtml(path) {
  const url = `${base}${path}`;
  const res = await fetch(url, { redirect: 'follow' });
  const html = await res.text();
  if (!res.ok) {
    fail(`${path} status ${res.status}`);
    return;
  }
  if (!/noindex,\s*nofollow/i.test(html)) fail(`${path} missing noindex,nofollow`);
  else pass(`${path} noindex`);
  if (!/design preview/i.test(html) && !/data-design-preview="true"/i.test(html)) {
    fail(`${path} missing design preview marker`);
  } else pass(`${path} preview marker`);
  if (variant === 'a' && !/data-design-variant="a"/i.test(html)) fail(`${path} missing variant a`);
  if (variant === 'b' && !/data-design-variant="b"/i.test(html)) fail(`${path} missing variant b`);
  if (path === '/why-us/' && !/You Work With The Team That Builds The System/i.test(html)) {
    fail(`${path} missing why-us title`);
  } else if (path === '/why-us/') pass(`${path} why-us copy`);
  if (path === '/' && !/ATW/i.test(html)) fail(`${path} missing ATW brand`);
  else if (path === '/') pass(`${path} brand`);
}

async function checkWritesBlocked() {
  for (const path of ['/api/contact', '/api/zoho-bookings/services', '/api/public/lead-forms/x']) {
    const res = await fetch(`${base}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    // Astro preview may 404 without worker; wrangler/pages worker should 403/404.
    if (res.status === 200) fail(`POST ${path} unexpectedly 200`);
    else pass(`POST ${path} blocked (${res.status})`);
  }
}

for (const route of routes) {
  await checkHtml(route);
}
await checkWritesBlocked();

if (failed) {
  console.error(`\n${failed} failure(s)`);
  process.exit(1);
}
console.log('\nAll preview smoke checks passed');
