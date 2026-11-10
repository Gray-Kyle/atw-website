/**
 * Official ATW system marks for Option B heroes, cards, and Products nav.
 * Wordmarks use the ATW letterforms + 3-dot constellation (Directory / Orbit / One).
 */

export type ProductMark = {
  id: string;
  /** Small UI mark for nav / cards (SVG) — suite 3-dot constellation */
  icon?: string;
  /** Hero / card wordmark */
  wordmark?: {
    webp?: string;
    png: string;
    alt: string;
    width: number;
    height: number;
  };
  /**
   * When no italic product wordmark exists: show corporate/icon mark plus a text label.
   * Prefer wordmark when an ATW {Product} asset is available.
   */
  markWithLabel?: {
    webp?: string;
    png: string;
    alt: string;
    label: string;
    width: number;
    height: number;
  };
};

/** Shared ATW 3-dot constellation (matches Directory / Orbit / One). */
export const ATW_DOTS_ICON = '/images/atw-marks/system-atw-dots.svg';

/** Hero logo display height target: ~56-72px desktop */
export const HERO_LOGO_CLASS =
  'h-14 w-auto max-w-[min(100%,22rem)] object-contain object-left sm:h-16 md:h-[4.5rem]';

export const PRODUCT_MARKS = {
  one: {
    id: 'one',
    icon: ATW_DOTS_ICON,
    wordmark: {
      // Official One mark (same asset as hero / home cards)
      webp: '/images/branding/atw-one-logo-dark-photoroom-display.webp',
      png: '/images/branding/atw-one-logo-dark-photoroom-display.png',
      alt: 'ATW One logo',
      width: 1179,
      height: 547,
    },
  },
  directory: {
    id: 'directory',
    icon: ATW_DOTS_ICON,
    wordmark: {
      webp: '/images/logo/atw-directory-wordmark.webp',
      png: '/images/logo/atw-directory-wordmark.png',
      alt: 'ATW Directory logo',
      width: 1776,
      height: 399,
    },
  },
  orbit: {
    id: 'orbit',
    icon: ATW_DOTS_ICON,
    wordmark: {
      webp: '/images/logo/atw-orbit-wordmark.webp',
      png: '/images/logo/atw-orbit-wordmark.png',
      alt: 'ATW Orbit logo',
      width: 1163,
      height: 397,
    },
  },
  hub: {
    id: 'hub',
    icon: ATW_DOTS_ICON,
    wordmark: {
      webp: '/images/logo/atw-hub-wordmark.webp',
      png: '/images/logo/atw-hub-wordmark.png',
      alt: 'ATW Hub logo',
      width: 895,
      height: 402,
    },
  },
  mail: {
    id: 'mail',
    icon: ATW_DOTS_ICON,
    /** Mail is an Orbit app: Orbit wordmark + mail icon in the hero */
    wordmark: {
      webp: '/images/logo/atw-orbit-wordmark.webp',
      png: '/images/logo/atw-orbit-wordmark.png',
      alt: 'ATW Orbit logo',
      width: 1163,
      height: 397,
    },
  },
  agents: {
    id: 'agents',
    icon: ATW_DOTS_ICON,
    wordmark: {
      webp: '/images/logo/atw-agents-wordmark.webp',
      png: '/images/logo/atw-agents-wordmark.png',
      alt: 'ATW Agents logo',
      width: 1416,
      height: 411,
    },
  },
  workforce: {
    id: 'workforce',
    icon: ATW_DOTS_ICON,
    wordmark: {
      webp: '/images/logo/atw-workforce-wordmark.webp',
      png: '/images/logo/atw-workforce-wordmark.png',
      alt: 'ATW Workforce logo',
      width: 1838,
      height: 402,
    },
  },
  ai: {
    id: 'ai',
    icon: ATW_DOTS_ICON,
    wordmark: {
      webp: '/images/logo/atw-ai-wordmark.webp',
      png: '/images/logo/atw-ai-wordmark.png',
      alt: 'ATW AI logo',
      width: 656,
      height: 402,
    },
  },
} as const satisfies Record<string, ProductMark>;
