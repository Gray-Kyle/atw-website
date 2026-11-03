/**
 * First-party consent (LEGAL-001 / SPEC-01 starter).
 * Marketing tags load only after opt-in. GPC counts as opt-out.
 */

export const ATW_CONSENT_COOKIE = 'atw_consent';
export const ATW_CONSENT_VERSION = '2026-11-03';

export type AtwConsentChoice = 'essential' | 'all' | 'custom';

export type AtwConsentState = {
  version: string;
  choice: AtwConsentChoice;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export function parseConsentCookie(raw: string | undefined | null): AtwConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<AtwConsentState>;
    if (!parsed || (parsed.choice !== 'essential' && parsed.choice !== 'all' && parsed.choice !== 'custom')) {
      return null;
    }
    return {
      version: typeof parsed.version === 'string' ? parsed.version : ATW_CONSENT_VERSION,
      choice: parsed.choice,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date(0).toISOString(),
    };
  } catch {
    return null;
  }
}

export function buildConsentState(
  choice: AtwConsentChoice,
  overrides?: { analytics?: boolean; marketing?: boolean },
): AtwConsentState {
  if (choice === 'all') {
    return {
      version: ATW_CONSENT_VERSION,
      choice,
      analytics: true,
      marketing: true,
      updatedAt: new Date().toISOString(),
    };
  }
  if (choice === 'essential') {
    return {
      version: ATW_CONSENT_VERSION,
      choice,
      analytics: false,
      marketing: false,
      updatedAt: new Date().toISOString(),
    };
  }
  return {
    version: ATW_CONSENT_VERSION,
    choice: 'custom',
    analytics: Boolean(overrides?.analytics),
    marketing: Boolean(overrides?.marketing),
    updatedAt: new Date().toISOString(),
  };
}

export function serializeConsentCookie(state: AtwConsentState): string {
  return encodeURIComponent(JSON.stringify(state));
}

export function readConsentFromDocument(): AtwConsentState | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${ATW_CONSENT_COOKIE}=([^;]*)`));
  return parseConsentCookie(match?.[1] ? decodeURIComponent(match[1]) : null);
}

export function writeConsentCookie(state: AtwConsentState): void {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 400;
  document.cookie = `${ATW_CONSENT_COOKIE}=${serializeConsentCookie(state)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

/** Sec-GPC / navigator.globalPrivacyControl: treat as reject-all for marketing tags. */
export function detectGpcOptOut(): boolean {
  if (typeof navigator === 'undefined') return false;
  return Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
}

export function marketingTagsAllowed(state: AtwConsentState | null, gpc: boolean): boolean {
  if (gpc) return false;
  if (!state) return false;
  return state.analytics || state.marketing;
}
