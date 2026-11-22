/**
 * Signed-in marketing chrome.
 *
 * Session detection matches the other ATW apps (One, Orbit, Hub): the browser
 * already holds the shared NextAuth cookie `__Secure-next-auth.session-token`
 * on Domain=.atw.net (httpOnly, SameSite=Lax). This site does not read that
 * cookie. It asks the existing session endpoint, same-origin
 * `/api/auth/session`, which the Pages worker proxies to auth.atw.net.
 * Logged-out responses are `{}`. A session is signed in when `user.email` is set.
 *
 * Avatar rendering matches ATW One: photo from `user.image`, otherwise a
 * rounded indigo badge with up to two initials.
 */

export type MarketingSessionUser = {
  email: string;
  name: string | null;
  image: string | null;
};

export type AppEntry = {
  label: string;
  href: string;
};

/**
 * Product hosts. Kept in sync with `PRODUCT` in site.ts. This module stays
 * dependency-free so the session script and node tests can both import it.
 */
const APP_HOST = {
  one: 'https://one.atw.net',
  orbit: 'https://orbit.atw.net',
  hub: 'https://hub.atw.net',
  workforce: 'https://workforce.atw.net',
  ai: 'https://ai.atw.net',
  directory: 'https://directory.atw.net',
  mailInbox: 'https://mail.atw.net/inbox',
} as const;

/** Default application after sign-in (auth hub sends people to ATW One). */
export const DEFAULT_APP_ENTRY: AppEntry = {
  label: 'Open One',
  href: `${APP_HOST.one}/`,
};

const APP_ENTRIES = {
  one: DEFAULT_APP_ENTRY,
  orbit: { label: 'Open Orbit', href: `${APP_HOST.orbit}/` },
  hub: { label: 'Open Hub', href: `${APP_HOST.hub}/` },
  workforce: { label: 'Open Workforce', href: `${APP_HOST.workforce}/` },
  ai: { label: 'Open AI', href: `${APP_HOST.ai}/` },
  directory: { label: 'Open Directory', href: `${APP_HOST.directory}/` },
  mail: { label: 'Open Mail', href: APP_HOST.mailInbox },
} as const satisfies Record<string, AppEntry>;

export function normalizeMarketingPath(pathname: string): string {
  const pathOnly = (pathname || '/').split(/[?#]/, 1)[0] || '/';
  if (pathOnly.length > 1 && pathOnly.endsWith('/')) return pathOnly.slice(0, -1);
  return pathOnly || '/';
}

/**
 * Product the current marketing page is about.
 * Home, pricing, and other general pages open ATW One.
 */
export function appEntryForPath(pathname: string): AppEntry {
  const path = normalizeMarketingPath(pathname);
  if (path === '/orbit' || path.startsWith('/orbit/')) return APP_ENTRIES.orbit;
  if (path === '/mail' || path.startsWith('/mail/')) return APP_ENTRIES.mail;
  if (path === '/hub' || path.startsWith('/hub/')) return APP_ENTRIES.hub;
  if (
    path === '/workforce' ||
    path.startsWith('/workforce/') ||
    path === '/agents' ||
    path.startsWith('/agents/')
  ) {
    return APP_ENTRIES.workforce;
  }
  if (path === '/ai' || path.startsWith('/ai/')) return APP_ENTRIES.ai;
  if (
    path === '/directory' ||
    path.startsWith('/directory/') ||
    path === '/systems/directory' ||
    path.startsWith('/systems/directory/')
  ) {
    return APP_ENTRIES.directory;
  }
  return APP_ENTRIES.one;
}

export function isTrialHref(href: string, origin = 'https://atw.net'): boolean {
  try {
    const url = new URL(href, origin);
    if (url.origin !== new URL(origin).origin) return false;
    return normalizeMarketingPath(url.pathname) === '/trial';
  } catch {
    return false;
  }
}

/** Same initials rule as the ATW One account button. */
export function profileInitials(name?: string | null, email?: string | null): string {
  const source = (name || email?.split('@')[0] || 'User').trim();
  const letters = source
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0] || '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return letters || 'U';
}

/** Only absolute http(s) photo URLs. Session images are remote; reject other schemes. */
export function safeAvatarUrl(image: string | null | undefined): string | null {
  if (!image) return null;
  const trimmed = image.trim();
  if (!/^https?:\/\//i.test(trimmed)) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return url.href;
  } catch {
    return null;
  }
}

export function sessionUserFromPayload(payload: unknown): MarketingSessionUser | null {
  if (!payload || typeof payload !== 'object') return null;
  const user = (payload as { user?: unknown }).user;
  if (!user || typeof user !== 'object') return null;
  const email = (user as { email?: unknown }).email;
  if (typeof email !== 'string' || !email.includes('@')) return null;
  const name = (user as { name?: unknown }).name;
  const image = (user as { image?: unknown }).image;
  return {
    email,
    name: typeof name === 'string' && name.trim() ? name.trim() : null,
    image: typeof image === 'string' && image.trim() ? image.trim() : null,
  };
}
