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
      'Single-tenant productivity for your organization: Mail, Chat, Calendar, Meetings, and Tasks. Included with ATW base hosting.',
    apps: [
      {
        id: 'hub-mail',
        title: 'Mail',
        href: '/mail',
        summary: 'Business email on your domain. On paid hosting, Mail is included and hosted inboxes use Credits.',
        modules: [
          { title: 'Inbox', href: '/mail' },
          { title: 'Domains', href: '/mail' },
        ],
      },
      {
        id: 'chat',
        title: 'Chat',
        href: PRODUCT.hub,
        summary: 'Channels and direct messages.',
        modules: [
          { title: 'Channels', href: PRODUCT.hub },
          { title: 'Direct messages', href: PRODUCT.hub },
        ],
      },
      {
        id: 'calendar',
        title: 'Calendar',
        href: PRODUCT.hub,
        summary: 'Shared calendars for the organization.',
        modules: [{ title: 'Calendar', href: PRODUCT.hub }],
      },
      {
        id: 'meetings',
        title: 'Meetings',
        href: PRODUCT.hub,
        summary: 'Meetings for the team.',
        modules: [{ title: 'Meetings', href: PRODUCT.hub }],
      },
      {
        id: 'tasks',
        title: 'Tasks',
        href: PRODUCT.hub,
        summary: 'Tasks for people in your organization.',
        modules: [{ title: 'Tasks', href: PRODUCT.hub }],
      },
    ],
  },
  {
    id: 'mail',
    title: 'Mail',
    href: '/mail',
    summary: 'On paid hosting, Mail is included and hosted inboxes use Credits.',
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
    title: 'ATW Orbit',
    href: '/orbit',
    summary:
      'Mail, calendar, meetings, and messaging in one orbit, with Docs, Spreadsheets, and Presentations coming soon.',
    apps: [
      {
        id: 'mail',
        title: 'Mail',
        href: PRODUCT.worksuite,
        summary: 'Business email for your organization.',
        modules: [{ title: 'Mailboxes', href: 'https://mail.atw.net' }],
      },
      {
        id: 'calendar',
        title: 'Calendar',
        href: PRODUCT.worksuite,
        summary: 'Shared calendars next to Mail.',
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
        title: 'Messaging',
        href: PRODUCT.worksuite,
        summary: 'Business text and voice.',
        modules: [
          { title: 'SMS', href: PRODUCT.worksuite },
          { title: 'Voice', href: PRODUCT.worksuite },
        ],
      },
      {
        id: 'documents',
        title: 'Docs',
        href: '/orbit',
        summary: 'Coming soon.',
        modules: [
          { title: 'Docs (coming soon)', href: '/orbit' },
          { title: 'Spreadsheets (coming soon)', href: '/orbit' },
          { title: 'Presentations (coming soon)', href: '/orbit' },
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
