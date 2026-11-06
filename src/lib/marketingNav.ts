/**
 * Public site navigation (ported from ATW Next marketing).
 * System → Application → Module.
 */

import { AUTH_SIGNIN, PRODUCT } from './site';

export type MarketingModule = {
  title: string;
  href: string;
};

export type MarketingApp = {
  id: string;
  title: string;
  href: string;
  summary: string;
  modules: MarketingModule[];
};

export type MarketingSystem = {
  id: string;
  title: string;
  href: string;
  summary: string;
  apps: MarketingApp[];
};

export type MarketingLink = {
  title: string;
  href: string;
  description: string;
};

export const marketingSystems: MarketingSystem[] = [
  {
    id: 'one',
    title: 'One',
    href: '/one',
    summary:
      'The business suite. Applications live here, and each application has its own modules.',
    apps: [
      {
        id: 'crm',
        title: 'CRM',
        href: '/erp/apps/crm',
        summary: 'Customers, pipeline, and follow-up inside ATW One.',
        modules: [
          { title: 'Accounts', href: '/erp/apps/crm' },
          { title: 'Leads', href: '/erp/apps/crm' },
          { title: 'Deals', href: '/erp/apps/crm' },
          { title: 'Contacts', href: '/erp/apps/crm' },
        ],
      },
      {
        id: 'finance',
        title: 'Finance',
        href: '/erp/apps/finance',
        summary: 'Sales, purchases, and the books inside ATW One.',
        modules: [
          { title: 'Customers', href: '/erp/apps/finance' },
          { title: 'Invoices', href: '/erp/apps/finance' },
          { title: 'Quotes', href: '/erp/apps/finance' },
          { title: 'Bills', href: '/erp/apps/finance' },
        ],
      },
      {
        id: 'hr',
        title: 'HR',
        href: '/one#hr',
        summary: 'People records inside One.',
        modules: [
          { title: 'Directory', href: '/systems/directory' },
          { title: 'Overview', href: '/one#hr' },
        ],
      },
      {
        id: 'marketing',
        title: 'Marketing',
        href: '/one#marketing',
        summary: 'Campaigns and the site content you publish.',
        modules: [
          { title: 'Campaigns', href: '/one#marketing' },
          { title: 'Blogs', href: '/blog' },
          { title: 'Overview', href: '/one#marketing' },
        ],
      },
      {
        id: 'knowledge',
        title: 'Knowledge',
        href: '/one#knowledge',
        summary: 'Articles your team and customers can search.',
        modules: [
          { title: 'Library', href: '/one#knowledge' },
          { title: 'Collections', href: '/one#knowledge' },
          { title: 'Overview', href: '/one#knowledge' },
        ],
      },
      {
        id: 'support',
        title: 'Support',
        href: '/support',
        summary: 'Customer requests in one queue.',
        modules: [{ title: 'Tickets', href: '/support' }],
      },
    ],
  },
  {
    id: 'hub',
    title: 'Hub',
    href: '/hub',
    summary:
      'An Outlook-like inbox and workspace client that connects to ATW Orbit, Google Workspace, Microsoft Teams, and Outlook. Included with every plan.',
    apps: [
      {
        id: 'hub-client',
        title: 'Hub client',
        href: PRODUCT.hub,
        summary:
          'Open your inbox and workspace in Hub. Connect ATW Orbit, Google Workspace, Microsoft Teams, or Outlook.',
        modules: [
          { title: 'ATW Orbit', href: PRODUCT.hub },
          { title: 'Google Workspace', href: PRODUCT.hub },
          { title: 'Microsoft Teams', href: PRODUCT.hub },
          { title: 'Outlook', href: PRODUCT.hub },
        ],
      },
    ],
  },
  {
    id: 'mail',
    title: 'Mail',
    href: '/mail',
    summary:
      'An ATW Orbit app. Add mailboxes for any user; hosted inboxes draw from the organization Credits pool. No separate Mail SKU.',
    apps: [
      {
        id: 'webmail',
        title: 'Webmail',
        href: '/mail',
        summary: 'Read and send as your organization.',
        modules: [
          { title: 'Inbox', href: '/mail' },
          { title: 'Drafts', href: '/mail' },
          { title: 'Sent', href: '/mail' },
          { title: 'Spam', href: '/mail' },
        ],
      },
      {
        id: 'mail-admin',
        title: 'Mail admin',
        href: '/mail',
        summary: 'Domains, mailboxes, and aliases.',
        modules: [
          { title: 'Domains', href: '/mail' },
          { title: 'Mailboxes', href: '/mail' },
          { title: 'Aliases', href: '/mail' },
        ],
      },
    ],
  },
  {
    id: 'workspace',
    title: 'Orbit',
    href: '/orbit/',
    summary:
      'ATW Orbit productivity apps next to One: Mail, Calendar, and Meetings are available today. Messaging (SMS, Voice), Docs, Spreadsheets, and Presentations are Coming Soon. Ships with the ATW ERP plan; Mail draws from the organization Credits pool.',
    apps: [
      {
        id: 'mail',
        title: 'Mail',
        href: '/mail',
        summary:
          'Business email on your domain. Add for any user; hosted inboxes draw Credits. No separate Mail plan.',
        modules: [
          { title: 'Inbox', href: '/mail' },
          { title: 'Domains', href: '/mail' },
          { title: 'Mailboxes', href: 'https://mail.atw.net' },
        ],
      },
      {
        id: 'calendar',
        title: 'Calendar',
        href: PRODUCT.worksuite,
        summary: 'Shared calendars for the organization.',
        modules: [{ title: 'Calendar', href: PRODUCT.worksuite }],
      },
      {
        id: 'meetings',
        title: 'Meetings',
        href: PRODUCT.worksuite,
        summary: 'Video meetings for the team.',
        modules: [{ title: 'Meetings', href: PRODUCT.worksuite }],
      },
      {
        id: 'messaging',
        title: 'Messaging (Coming Soon)',
        href: PRODUCT.worksuite,
        summary: 'Coming Soon. Business SMS and voice are not available yet.',
        modules: [
          { title: 'SMS (Coming Soon)', href: PRODUCT.worksuite },
          { title: 'Voice (Coming Soon)', href: PRODUCT.worksuite },
        ],
      },
      {
        id: 'documents',
        title: 'Docs, Spreadsheets, Presentations',
        href: PRODUCT.worksuite,
        summary: 'Coming Soon. Not available yet.',
        modules: [
          { title: 'Docs (Coming Soon)', href: PRODUCT.worksuite },
          { title: 'Spreadsheets (Coming Soon)', href: PRODUCT.worksuite },
          { title: 'Presentations (Coming Soon)', href: PRODUCT.worksuite },
        ],
      },
    ],
  },
  {
    id: 'directory',
    title: 'Directory',
    href: '/systems/directory',
    summary: 'Who can sign in, and which systems they can open.',
    apps: [
      {
        id: 'people',
        title: 'People',
        href: '/systems/directory',
        summary: 'The organization roster.',
        modules: [
          { title: 'People', href: '/systems/directory' },
          { title: 'Invites', href: '/systems/directory' },
        ],
      },
      {
        id: 'access',
        title: 'Access',
        href: '/systems/directory',
        summary: 'Systems and applications each person may use.',
        modules: [
          { title: 'Systems', href: '/systems/directory' },
          { title: 'Applications', href: '/systems/directory' },
        ],
      },
    ],
  },
  {
    id: 'agents',
    title: 'Agents',
    href: '/agents',
    summary: 'AI work that draws from your organization Credits pool, with configuration and Overseer.',
    apps: [
      {
        id: 'workforce',
        title: 'Workforce',
        href: '/agents',
        summary: 'AI teammates that draw Credits when they work.',
        modules: [
          { title: 'Overview', href: '/agents' },
          {
            title: 'Sign in',
            href:
              'https://auth.atw.net/auth/signin?callbackUrl=' +
              encodeURIComponent('https://agents.atw.net/'),
          },
        ],
      },
      {
        id: 'overseer',
        title: 'Overseer',
        href: '/agents',
        summary: 'Watch agent activity across the organization.',
        modules: [{ title: 'Overseer', href: '/agents' }],
      },
    ],
  },
  {
    id: 'ai',
    title: 'ATW AI',
    href: '/solutions/ai-use-cases',
    summary: 'ATW AI across the systems you already use.',
    apps: [
      {
        id: 'assistant',
        title: 'Assistant',
        href: '/solutions/ai-use-cases',
        summary: 'Ask questions about your work.',
        modules: [
          { title: 'Chat', href: '/solutions/ai-use-cases' },
          {
            title: 'Sign in',
            href:
              `${AUTH_SIGNIN}?callbackUrl=` +
              encodeURIComponent(`${PRODUCT.ai}/`),
          },
          { title: 'Search', href: '/solutions/ai-use-cases' },
        ],
      },
      {
        id: 'embedded-agents',
        title: 'In-app agents',
        href: '/agents',
        summary: 'In-app agents that draw from the same Credits pool.',
        modules: [
          { title: 'Agents', href: '/agents' },
          { title: 'CRM', href: '/erp/apps/crm' },
        ],
      },
    ],
  },
];

export const marketingServiceLinks: MarketingLink[] = [
  {
    title: 'All services',
    href: '/services',
    description: 'Implementation, custom ERP on One, and partner delivery.',
  },
  {
    title: 'Custom ERP on One',
    href: '/solutions/custom-erp-software-development',
    description: 'Build your ERP around ATW One.',
  },
  {
    title: 'Custom vs One vs partners',
    href: '/solutions/custom-vs-prebuilt',
    description: 'Choose the right delivery path.',
  },
  {
    title: 'Consulting & IT',
    href: '/it-services',
    description: 'Planning, integration, and hands-on delivery.',
  },
  {
    title: 'Industries',
    href: '/industries',
    description: 'Manufacturing, retail, construction, and more.',
  },
];

export const marketingPartnerLinks: MarketingLink[] = [
  { title: 'All partners', href: '/partners', description: 'Platforms we implement and support.' },
  { title: 'Zoho', href: '/partners/zoho', description: 'CRM, finance, and workplace apps.' },
  { title: 'AWS', href: '/partners/aws', description: 'Cloud infrastructure.' },
  { title: 'Odoo', href: '/partners/odoo', description: 'Open-source business apps.' },
  { title: 'Salesforce', href: '/partners/salesforce', description: 'CRM implementation.' },
  { title: 'Shopify', href: '/partners/shopify', description: 'Commerce stores.' },
];

export function findMarketingSystem(systemId: string): MarketingSystem | undefined {
  return marketingSystems.find((item) => item.id === systemId);
}
