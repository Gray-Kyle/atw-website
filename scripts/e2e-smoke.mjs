#!/usr/bin/env node
/**
 * Smoke E2E for production marketing hosts.
 * Usage: node scripts/e2e-smoke.mjs [--base https://atw.net]
 */

const DEFAULT_BASES = ['https://atw.net', 'https://www.atw.net'];

const ROUTES = [
  { path: '/', mustInclude: ['ATW One', 'Unified Experience', 'systems-mega-systems', 'Applications', 'Modules'] },
  { path: '/', mustInclude: ['Custom ERP on One', 'All partners', 'WorkSuite', 'ATW AI'] },
  { path: '/pricing', mustInclude: ['Pricing', 'Credits'] },
  { path: '/contact', mustInclude: ['Get in touch'] },
  { path: '/solutions', mustInclude: ['Solutions'] },
  { path: '/services', mustInclude: ['ATW Services'] },
  { path: '/why-us', mustInclude: ['Why ATW'] },
  { path: '/partners', mustInclude: ['Technology partners'] },
  { path: '/book', mustInclude: ['Book a call'] },
  { path: '/one', mustInclude: ['ATW One'] },
  { path: '/terms', mustInclude: ['Terms'] },
  { path: '/for-agents', mustInclude: ['For AI agents'] },
  { path: '/blog', mustInclude: ['Blog'] },
  { path: '/definitely-not-a-real-marketing-route-xyz', mustInclude: ['404', 'could not find'], status: 404 },
];

const PRODUCT_LINKS = [
  { path: '/', href: 'https://one.atw.net' },
  { path: '/', href: 'https://auth.atw.net/auth/signin' },
];

const args = process.argv.slice(2);
const baseFlag = args.find((a) => a.startsWith('--base='));
const bases = baseFlag ? [baseFlag.split('=')[1]] : DEFAULT_BASES;

function mustNotInclude(html) {
  const bad = ['__NEXT_DATA__', 'next/dist/client'];
  return bad.filter((needle) => html.includes(needle));
}

async function checkRoute(base, route) {
  const url = `${base.replace(/\/$/, '')}${route.path}`;
  const expectedStatus = route.status ?? 200;
  const res = await fetch(url, { redirect: 'follow' });
  const html = await res.text();
  const failures = [];

  if (res.status !== expectedStatus) {
    failures.push(`status ${res.status} expected ${expectedStatus}`);
  }

  for (const needle of route.mustInclude ?? []) {
    if (!html.includes(needle)) failures.push(`missing content: ${needle}`);
  }

  const bleed = mustNotInclude(html);
  if (bleed.length) failures.push(`Next.js bleed: ${bleed.join(', ')}`);

  return { url, ok: failures.length === 0, failures };
}

async function checkProductLinks(base) {
  const res = await fetch(`${base}/`);
  const html = await res.text();
  const failures = [];
  for (const link of PRODUCT_LINKS) {
    if (!html.includes(link.href)) failures.push(`missing product link ${link.href}`);
  }
  return failures;
}

async function main() {
  let failed = 0;
  for (const base of bases) {
    console.log(`\n=== ${base} ===`);
    if (base.includes('www.')) {
      const apex = await fetch('https://atw.net/', { redirect: 'manual' });
      const www = await fetch(base, { redirect: 'manual' });
      console.log(`www vs apex note: apex=${apex.status} www=${www.status}`);
    }

    for (const route of ROUTES) {
      const result = await checkRoute(base, route);
      if (result.ok) {
        console.log(`OK  ${route.path}`);
      } else {
        failed += 1;
        console.log(`FAIL ${route.path}: ${result.failures.join('; ')}`);
      }
    }

    const linkFails = await checkProductLinks(base);
    if (linkFails.length) {
      failed += linkFails.length;
      linkFails.forEach((f) => console.log(`FAIL links: ${f}`));
    } else {
      console.log('OK  product CTA links');
    }
  }

  if (failed) {
    console.error(`\n${failed} failure(s)`);
    process.exit(1);
  }
  console.log('\nAll smoke checks passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
