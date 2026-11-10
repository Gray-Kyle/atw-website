/**
 * Official ATW system marks for Option B heroes, cards, and Products nav.
 * Paths point at optimized public assets (webp + png).
 */

export type ProductMark = {
  id: string;
  /** Small UI mark for nav / cards (SVG) */
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

/** Hero logo display height target: ~56-72px desktop */
export const HERO_LOGO_CLASS =
  'h-14 w-auto max-w-[min(100%,22rem)] object-contain object-left sm:h-16 md:h-[4.5rem]';

export const PRODUCT_MARKS = {
  one: {
    id: 'one',
    icon: '/images/atw-marks/system-one.svg',
    wordmark: {
      webp: '/images/logo/atw-one-wordmark.webp',
      png: '/images/logo/atw-one-wordmark.png',
      alt: 'ATW One logo',
      width: 1155,
      height: 523,
    },
  },
  directory: {
    id: 'directory',
    icon: '/images/atw-marks/system-directory.svg',
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
    icon: '/images/atw-marks/system-worksuite.svg',
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
    icon: '/images/atw-marks/system-hub.svg',
    wordmark: {
      webp: '/images/logo/atw-hub-wordmark.webp',
      png: '/images/logo/atw-hub-wordmark.png',
      alt: 'ATW Hub logo',
      width: 939,
      height: 419,
    },
  },
  mail: {
    id: 'mail',
    icon: '/images/atw-marks/system-mail.svg',
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
    icon: '/images/atw-marks/system-agents.svg',
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
    icon: '/images/atw-marks/system-agents.svg',
    wordmark: {
      webp: '/images/logo/atw-workforce-wordmark.webp',
      png: '/images/logo/atw-workforce-wordmark.png',
      alt: 'ATW Workforce logo',
      width: 1862,
      height: 419,
    },
  },
  ai: {
    id: 'ai',
    icon: '/images/atw-marks/system-ai.svg',
    wordmark: {
      webp: '/images/logo/atw-ai-wordmark.webp',
      png: '/images/logo/atw-ai-wordmark.png',
      alt: 'ATW AI logo',
      width: 701,
      height: 419,
    },
  },
} as const satisfies Record<string, ProductMark>;
