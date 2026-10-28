/** Live apex marketing site (Amplify until cutover). */
export const LIVE_SITE = 'https://atw.net';

/** Product hosts (stay on Amplify / dedicated subs during peel). */
export const PRODUCT = {
  auth: 'https://auth.atw.net',
  one: 'https://one.atw.net',
  worksuite: 'https://worksuite.atw.net',
  hub: 'https://hub.atw.net',
  directory: 'https://directory.atw.net',
  agents: 'https://agents.atw.net',
} as const;

/** Paths not yet on the Astro site: keep linking to live apex. */
export function livePath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${LIVE_SITE}${normalized}`;
}

export const AUTH_SIGNIN = `${PRODUCT.auth}/auth/signin`;
