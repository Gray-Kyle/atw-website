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

export function softwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_ORIGIN}/one#software`,
    name: 'ATW One',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'ERP/CRM',
    operatingSystem: 'Web',
    url: `${SITE_ORIGIN}/one`,
    description:
      'ATW One is an ERP/CRM workspace that connects customers, sales, finance, and operations in one system with Credits-based billing and unlimited named users.',
    provider: {
      '@id': `${SITE_ORIGIN}/#organization`,
    },
    isAccessibleForFree: false,
  };
}

export function faqPageJsonLd(pagePath: string, faqs: readonly FaqItem[]) {
  const safeFaqs = faqsWithoutPricing(faqs);
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
