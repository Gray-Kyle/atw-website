/**
 * Public site navigation (ported from ATW Next marketing).
 * System → Application → Module.
 */

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
    summary: 'Team chat for the people in your organization.',
    apps: [
      {
        id: 'chat',
        title: 'Chat',
        href: '/hub',
        summary: 'Channels and direct messages.',
        modules: [
          { title: 'Channels', href: '/hub' },
          { title: 'Direct messages', href: '/hub' },
        ],
      },
    ],
  },
  {
    id: 'mail',
    title: 'Mail',
    href: '/mail',
    summary: 'Mailboxes on your domain.',
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
    title: 'WorkSuite',
    href: '/workspace',
    summary: 'Calendar, documents, meetings, and messaging next to One.',
    apps: [
      {
        id: 'mail-calendar',
        title: 'Mail & calendar',
        href: '/workspace',
        summary: 'Shared calendars with your mailboxes.',
        modules: [
          { title: 'Calendar', href: '/workspace' },
          { title: 'Mailboxes', href: '/mail' },
        ],
      },
      {
        id: 'documents',
        title: 'Documents',
        href: '/workspace',
        summary: 'Docs, sheets, and decks in the org.',
        modules: [
          { title: 'Documents', href: '/workspace' },
          { title: 'Spreadsheets', href: '/workspace' },
          { title: 'Presentations', href: '/workspace' },
        ],
      },
      {
        id: 'meetings',
        title: 'Meetings',
        href: '/workspace',
        summary: 'Video meetings for the team.',
        modules: [{ title: 'Meetings', href: '/workspace' }],
      },
      {
        id: 'messaging',
        title: 'Messaging',
        href: '/workspace',
        summary: 'Business text and voice.',
        modules: [
          { title: 'SMS', href: '/workspace' },
          { title: 'Voice', href: '/workspace' },
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
    summary: 'Named AI seats, Agent Configuration, Overseer, and shared credits.',
    apps: [
      {
        id: 'seats',
        title: 'Seats',
        href: '/agents',
        summary: 'Hire named AI teammates for your organization.',
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
        summary: 'Watch seat activity across the Agent Organization.',
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
          { title: 'Search', href: '/solutions/ai-use-cases' },
        ],
      },
      {
        id: 'embedded-agents',
        title: 'In-app agents',
        href: '/agents',
        summary: 'Named seats and help that stays inside your systems.',
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
