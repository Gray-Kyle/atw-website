export type PartnerDef = {
  slug: string;
  title: string;
  category: string;
  description: string;
  services: string[];
};

export const PARTNERS: PartnerDef[] = [
  {
    slug: 'zoho',
    title: 'Zoho',
    category: 'Business suite',
    description: 'CRM, finance, projects, and marketing on Zoho with ATW implementation and support.',
    services: ['Implementation', 'Customization', 'Training', 'Support'],
  },
  {
    slug: 'aws',
    title: 'Amazon Web Services',
    category: 'Cloud',
    description: 'Architecture, migration, and optimization on AWS.',
    services: ['Architecture design', 'Migration', 'Security review', '24/7 support'],
  },
  {
    slug: 'salesforce',
    title: 'Salesforce',
    category: 'CRM',
    description: 'Sales Cloud, Service Cloud, and custom Salesforce delivery.',
    services: ['Implementation', 'Integration', 'Custom development', 'Support'],
  },
  {
    slug: 'odoo',
    title: 'Odoo',
    category: 'ERP',
    description: 'Odoo ERP and apps tailored to your processes.',
    services: ['Module setup', 'Customization', 'Integrations', 'Support'],
  },
  {
    slug: 'shopify',
    title: 'Shopify',
    category: 'E-commerce',
    description: 'Store setup, theme work, and integrations for Shopify merchants.',
    services: ['Store launch', 'Theme development', 'App integration', 'Migration'],
  },
  {
    slug: 'wordpress',
    title: 'WordPress',
    category: 'CMS',
    description: 'Content sites, custom themes, and performance tuning on WordPress.',
    services: ['Site build', 'Plugin development', 'SEO', 'Security'],
  },
  {
    slug: 'wix',
    title: 'Wix',
    category: 'Website builder',
    description: 'Design and launch on Wix with integrations to your back office.',
    services: ['Design', 'Store setup', 'Integrations', 'Training'],
  },
  {
    slug: 'square',
    title: 'Square',
    category: 'Payments & POS',
    description: 'Retail and hospitality flows with Square POS and payments.',
    services: ['POS setup', 'Inventory sync', 'Reporting', 'Support'],
  },
];

export function getPartner(slug: string): PartnerDef | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}
