/** Product hosts (stay on Amplify / dedicated subs during peel). */
export const PRODUCT = {
  auth: 'https://auth.atw.net',
  one: 'https://one.atw.net',
  worksuite: 'https://worksuite.atw.net',
  hub: 'https://hub.atw.net',
  directory: 'https://directory.atw.net',
  agents: 'https://agents.atw.net',
} as const;

/** Monolith API routes still served from auth until Workers proxy apex /api. */
export const API_ORIGIN = PRODUCT.auth;

/** Same-site marketing paths (apex is Cloudflare Pages). */
export function livePath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized;
}

export const AUTH_SIGNIN = `${PRODUCT.auth}/auth/signin`;
export const AUTH_SIGNUP = `${PRODUCT.auth}/signup`;
