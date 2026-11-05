/** Shared SEO / AEO helpers for the marketing site. */

export const SITE_ORIGIN = 'https://atw.net';
export const SITE_NAME = 'ATW Network';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/logo/logo.png`;
export const DEFAULT_OG_IMAGE_ALT = 'ATW Network';
export const TWITTER_HANDLE = '@atwnet';

export const SOCIAL_PROFILES = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/atwnet',
  },
  {
    label: 'X',
    href: 'https://x.com/atwnet',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/No-Name-Development',
  },
] as const;

export type FaqItem = {
  q: string;
  a: string;
};

const PRICING_SIGNAL =
  /\$\d|\bpricing\b|\bprice\b|\bprices\b|\/month|\bper month\b|\bper year\b|\bcost\b|\bdollar/i;

/** Drop FAQ rows that mention dollar amounts or pricing language. */
export function faqsWithoutPricing(faqs: readonly FaqItem[]): FaqItem[] {
  return faqs.filter((faq) => !PRICING_SIGNAL.test(`${faq.q} ${faq.a}`));
}

export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_ORIGIN}${path}`;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'ATW Network',
    alternateName: ['ATW.Net', 'ATW'],
    url: `${SITE_ORIGIN}/`,
    logo: DEFAULT_OG_IMAGE,
    email: 'support@atw.net',
    telephone: '+1-330-333-2256',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '13940 Cedar Rd 438',
      addressLocality: 'University Heights',
      addressRegion: 'OH',
      postalCode: '44118-3204',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+1-330-333-2256',
        email: 'support@atw.net',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'No Name Marketing, LLC',
    },
    sameAs: SOCIAL_PROFILES.map((profile) => profile.href),
  };
}

export type SoftwareApplicationJsonLdOptions = {
  /** Include Offer / AggregateOffer for published hosting + Credits plans. */
  includeOffers?: boolean;
};

/** Published ATW One hosting + Credits offers (Nov 5, 2026). Keep in sync with erpOfferHome. */
const ATW_ONE_OFFERS = [
  {
    '@type': 'Offer',
    name: 'Trial',
    price: '0',
    priceCurrency: 'USD',
    description:
      '14-day trial with 150,000 Credits. Includes ATW One, Workforce, Directory, and ATW AI. Unlimited named seats.',
    url: `${SITE_ORIGIN}/pricing`,
    availability: 'https://schema.org/InStock',
  },
  {
    '@type': 'Offer',
    name: 'Starter',
    price: '299',
    priceCurrency: 'USD',
    description: 'Starter hosting with 1,200,000 Credits per month. Includes Mail, Hub, and sandbox.',
    url: `${SITE_ORIGIN}/pricing`,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '299',
      priceCurrency: 'USD',
      billingDuration: 'P1M',
    },
  },
  {
    '@type': 'Offer',
    name: 'Growth',
    price: '1999',
    priceCurrency: 'USD',
    description: 'Growth hosting with 12,000,000 Credits per month. Includes Mail, Hub, and sandbox.',
    url: `${SITE_ORIGIN}/pricing`,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '1999',
      priceCurrency: 'USD',
      billingDuration: 'P1M',
    },
  },
  {
    '@type': 'Offer',
    name: 'Business',
    price: '9999',
    priceCurrency: 'USD',
    description: 'Business hosting with 120,000,000 Credits per month. Includes Mail, Hub, and sandbox.',
    url: `${SITE_ORIGIN}/pricing`,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '9999',
      priceCurrency: 'USD',
      billingDuration: 'P1M',
    },
  },
  {
    '@type': 'Offer',
    name: 'Enterprise',
    description: 'Custom hosting and Credits. Contact us.',
    url: `${SITE_ORIGIN}/contact`,
    availability: 'https://schema.org/InStock',
  },
] as const;

export function softwareApplicationJsonLd(options: SoftwareApplicationJsonLdOptions = {}) {
  const { includeOffers = false } = options;
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_ORIGIN}/one#software`,
    name: 'ATW One',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'ERP/CRM',
    operatingSystem: 'Web',
    url: `${SITE_ORIGIN}/one`,
    description:
      'ATW One is an ERP/CRM workspace that connects customers, sales, finance, and operations in one system with hosting plus Credits billing and unlimited named seats.',
    provider: {
      '@id': `${SITE_ORIGIN}/#organization`,
    },
    isAccessibleForFree: false,
  };

  if (includeOffers) {
    base.offers = {
      '@type': 'AggregateOffer',
      url: `${SITE_ORIGIN}/pricing`,
      priceCurrency: 'USD',
      lowPrice: '0',
      highPrice: '9999',
      offerCount: String(ATW_ONE_OFFERS.length),
      offers: [...ATW_ONE_OFFERS],
    };
  }

  return base;
}

export type FaqPageJsonLdOptions = {
  /** When true, keep FAQ rows that mention prices (for /pricing). */
  includePricing?: boolean;
};

export function faqPageJsonLd(
  pagePath: string,
  faqs: readonly FaqItem[],
  options: FaqPageJsonLdOptions = {},
) {
  const { includePricing = false } = options;
  const safeFaqs = includePricing ? [...faqs] : faqsWithoutPricing(faqs);
  if (safeFaqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(pagePath)}#faq`,
    mainEntity: safeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
