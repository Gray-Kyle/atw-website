/**
 * Option B design-preview navigation and "What's included" facts.
 * Sourced only from existing ATW site / pricing copy. No invented claims.
 */

import { PRODUCT, livePath } from '../lib/site';
import {
  ERP_CREDITS_MODEL_NOTE,
  ERP_TRIAL_INCLUDED,
  ERP_TRIAL_NOT_INCLUDED,
} from './erpOfferHome';
import { ORBIT_ONE_LINER } from './orbit';

export type DesignPreviewNavProduct = {
  id: string;
  title: string;
  href: string;
  summary: string;
  /** Soft status chip; Workforce only today */
  status?: 'coming-online';
  /** True when the item is not part of the 14-day trial package */
  notInTrial?: boolean;
};

export type DesignPreviewNavLink = {
  title: string;
  href: string;
  summary?: string;
};

/** Products mega-menu: systems that truly exist on ATW.Net */
export const B_NAV_PRODUCTS: DesignPreviewNavProduct[] = [
  {
    id: 'one',
    title: 'ATW One',
    href: '/one/',
    summary: 'CRM, Finance, Marketing, HR, and Custom Apps in one workspace.',
  },
  {
    id: 'workforce',
    title: 'Workforce',
    href: '/agents/',
    summary: "Named AI agent seats next to One on the same Credits pool.",
    status: 'coming-online',
  },
  {
    id: 'directory',
    title: 'Directory',
    href: '/systems/directory/',
    summary: 'Who can sign in and which systems they can open.',
  },
  {
    id: 'ai',
    title: 'ATW AI',
    href: '/solutions/ai-use-cases/',
    summary: 'AI across the systems you already use, drawn from organization Credits.',
  },
  {
    id: 'hub',
    title: 'Hub',
    href: '/hub/',
    summary:
      'One inbox and workspace that connects to ATW Orbit, Google Workspace, Microsoft Teams, and Outlook.',
    notInTrial: true,
  },
  {
    id: 'orbit',
    title: 'ATW Orbit',
    href: '/orbit/',
    summary: ORBIT_ONE_LINER,
    notInTrial: true,
  },
];

export const B_NAV_WHY: DesignPreviewNavLink[] = [
  {
    title: 'Why ATW',
    href: '/why-us/',
    summary: 'Work with the team that builds the system.',
  },
  {
    title: 'Compare',
    href: '/compare/',
    summary: 'See how ATW stacks up against other platforms.',
  },
];

export const B_NAV_RESOURCES: DesignPreviewNavLink[] = [
  { title: 'Docs', href: '/docs/', summary: 'Guides and product documentation.' },
  { title: 'Blog', href: '/blog/', summary: 'Product and company updates.' },
  { title: 'Systems', href: '/systems/', summary: 'Catalog of ATW systems and apps.' },
  { title: 'Support', href: '/support/', summary: 'Get help from ATW.Net staff.' },
  { title: 'Contact', href: '/contact/', summary: 'Reach the ATW team.' },
];

export type WhatsIncludedItem = {
  id: string;
  title: string;
  group: 'one' | 'platform' | 'billing';
  summary: string;
  href: string;
  status?: 'coming-online';
  notInTrial?: boolean;
};

/** GHL-style "what's included" grid using approved ATW facts only */
export const B_WHATS_INCLUDED: WhatsIncludedItem[] = [
  {
    id: 'crm',
    title: 'CRM',
    group: 'one',
    summary: 'Leads, accounts, contacts, deals, and follow-up in ATW One.',
    href: '/erp/apps/crm/',
  },
  {
    id: 'finance',
    title: 'Finance',
    group: 'one',
    summary: 'Invoices, AR, customers, vendors, and purchasing aligned with CRM.',
    href: '/erp/apps/finance/',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    group: 'one',
    summary: 'Campaigns and site content you publish from ATW One.',
    href: '/one/',
  },
  {
    id: 'hr',
    title: 'HR',
    group: 'one',
    summary: 'People records inside One.',
    href: '/one/',
  },
  {
    id: 'custom-apps',
    title: 'Custom Apps',
    group: 'one',
    summary: 'Purpose-built screens and modules that extend ATW One.',
    href: '/one/',
  },
  {
    id: 'workforce',
    title: 'Workforce',
    group: 'platform',
    summary: 'Named AI agent seats beside One, Directory, and ATW AI on shared Credits.',
    href: '/agents/',
    status: 'coming-online',
  },
  {
    id: 'directory',
    title: 'Directory',
    group: 'platform',
    summary: 'Shared identity: who can sign in and which systems they can open.',
    href: '/systems/directory/',
  },
  {
    id: 'ai',
    title: 'ATW AI',
    group: 'platform',
    summary: 'AI work drawn from the organization Credits pool.',
    href: '/solutions/ai-use-cases/',
  },
  {
    id: 'hub',
    title: 'Hub',
    group: 'platform',
    summary:
      'One inbox and workspace that connects to ATW Orbit, Google Workspace, Microsoft Teams, and Outlook.',
    href: '/hub/',
    notInTrial: true,
  },
  {
    id: 'orbit',
    title: 'ATW Orbit',
    group: 'platform',
    summary: ORBIT_ONE_LINER,
    href: '/orbit/',
    notInTrial: true,
  },
  {
    id: 'credits',
    title: 'Credits billing',
    group: 'billing',
    summary: ERP_CREDITS_MODEL_NOTE,
    href: '/pricing/',
  },
];

export const B_WHATS_INCLUDED_INTRO = {
  eyebrow: "What's included",
  title: "What's included with ATW",
  paragraph:
    'ATW One modules, sibling systems, and a shared Credits pool under one organization. Unlimited named seats. Hosting plans determine capacity.',
  trialNote: `The 14-day Trial includes ${ERP_TRIAL_INCLUDED.join(', ')}. Not available during the trial: ${ERP_TRIAL_NOT_INCLUDED.join('; ')}.`,
} as const;

export const B_PRIMARY_CTA = {
  label: 'Book a Call',
  href: livePath('/book'),
} as const;

export const B_SECONDARY_AUTH = {
  label: 'Sign In',
  href: `${PRODUCT.auth}/auth/signin`,
} as const;
