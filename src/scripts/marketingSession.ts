/**
 * Apply the shared ATW session to the marketing header and free-trial CTAs.
 * Logged-out HTML stays the default so the static page is correct without JS.
 */
import {
  appEntryForPath,
  isTrialHref,
  profileInitials,
  safeAvatarUrl,
  sessionUserFromPayload,
  type MarketingSessionUser,
} from '../lib/signedInEntry';

const SESSION_URL = '/api/auth/session';

function trialCtas(root: ParentNode): HTMLAnchorElement[] {
  const found = new Set<HTMLAnchorElement>();
  root.querySelectorAll('a[href], a[data-atw-trial-href]').forEach((node) => {
    if (!(node instanceof HTMLAnchorElement)) return;
    if (node.closest('[data-atw-account]')) return;
    if (node.dataset.atwTrialHref || isTrialHref(node.getAttribute('href') || '', window.location.origin)) {
      found.add(node);
    }
  });
  return [...found];
}

function rememberTrial(anchor: HTMLAnchorElement) {
  if (anchor.dataset.atwTrialHref) return;
  anchor.dataset.atwTrialHref = anchor.getAttribute('href') || '/trial/';
  anchor.dataset.atwTrialLabel = (anchor.textContent || '').replace(/\s+/g, ' ').trim();
}

function applySignedOut(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('[data-atw-sign-in]').forEach((el) => {
    el.hidden = false;
  });
  root.querySelectorAll<HTMLElement>('[data-atw-account-app]').forEach((el) => {
    el.hidden = true;
  });
  for (const anchor of trialCtas(root)) {
    rememberTrial(anchor);
    const href = anchor.dataset.atwTrialHref;
    const label = anchor.dataset.atwTrialLabel;
    if (href) anchor.setAttribute('href', href);
    if (label) anchor.textContent = label;
  }
}

function applySignedIn(root: ParentNode, user: MarketingSessionUser, pathname: string) {
  const entry = appEntryForPath(pathname);
  const initials = profileInitials(user.name, user.email);
  const avatarUrl = safeAvatarUrl(user.image);

  root.querySelectorAll<HTMLElement>('[data-atw-sign-in]').forEach((el) => {
    el.hidden = true;
  });

  root.querySelectorAll<HTMLAnchorElement>('[data-atw-account-app]').forEach((link) => {
    link.hidden = false;
    link.href = entry.href;
    link.setAttribute('aria-label', entry.label);
    const img = link.querySelector<HTMLImageElement>('[data-atw-avatar]');
    const badge = link.querySelector<HTMLElement>('[data-atw-initials]');
    const showInitials = () => {
      if (img) {
        img.hidden = true;
        img.removeAttribute('src');
      }
      if (badge) {
        badge.textContent = initials;
        badge.hidden = false;
      }
    };
    if (avatarUrl && img) {
      img.hidden = false;
      if (badge) badge.hidden = true;
      img.alt = '';
      img.onerror = () => showInitials();
      img.src = avatarUrl;
    } else {
      showInitials();
    }
  });

  for (const anchor of trialCtas(root)) {
    rememberTrial(anchor);
    anchor.href = entry.href;
    anchor.textContent = entry.label;
  }
}

function devPreviewUser(): MarketingSessionUser | null | undefined {
  if (!import.meta.env.DEV) return undefined;
  const flag = new URLSearchParams(window.location.search).get('previewSession');
  if (flag === '0') {
    window.sessionStorage.removeItem('atw-session-preview');
    return null;
  }
  if (flag === '1') {
    const fixture = {
      user: {
        email: 'ada@atw.net',
        name: 'Ada Lovelace',
        image: null,
      },
    };
    window.sessionStorage.setItem('atw-session-preview', JSON.stringify(fixture));
  }
  const preview = window.sessionStorage.getItem('atw-session-preview');
  if (!preview) return undefined;
  return sessionUserFromPayload(JSON.parse(preview) as unknown);
}

async function loadSessionUser(): Promise<MarketingSessionUser | null> {
  if (import.meta.env.DEV) {
    const previewUser = devPreviewUser();
    if (previewUser !== undefined) return previewUser;
  }

  const response = await fetch(SESSION_URL, {
    credentials: 'include',
    cache: 'no-store',
  });
  if (!response.ok) return null;
  const text = await response.text();
  if (!text) return null;
  return sessionUserFromPayload(JSON.parse(text) as unknown);
}

let inFlight = false;

export async function refreshMarketingSession(): Promise<void> {
  if (inFlight) return;
  inFlight = true;
  try {
    const user = await loadSessionUser();
    if (user) applySignedIn(document, user, window.location.pathname);
    else applySignedOut(document);
  } catch {
    applySignedOut(document);
  } finally {
    inFlight = false;
  }
}

let booted = false;

export function bootMarketingSession(): void {
  if (booted) return;
  booted = true;
  const run = () => {
    void refreshMarketingSession();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
  document.addEventListener('astro:page-load', run);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') run();
  });
}
