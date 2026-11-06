/**
 * Official ATW system marks for Option B heroes, cards, and Products nav.
 * Paths point at optimized public assets (webp + png). Do not invent wordmarks.
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
   * Used for Hub (constellation + "Hub") and Workforce cards (network + "Workforce").
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
    markWithLabel: {
      webp: '/images/logo/hub-logo-white.webp',
      png: '/images/logo/hub-logo-white.png',
      alt: 'ATW Hub logo',
      label: 'Hub',
      width: 800,
      height: 717,
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
    markWithLabel: {
      webp: '/images/logo/directory-network.webp',
      png: '/images/logo/directory-network.png',
      alt: 'ATW Workforce mark',
      label: 'Workforce',
      width: 462,
      height: 323,
    },
  },
  ai: {
    id: 'ai',
    /** No official ATW AI logo; text only */
  },
} as const satisfies Record<string, ProductMark>;
