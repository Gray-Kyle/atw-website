export type SolutionPageDef = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel?: string;
};

export const SOLUTION_PAGES: SolutionPageDef[] = [
  {
    slug: 'crm',
    eyebrow: 'ATW One CRM',
    title: 'CRM inside your ERP workspace',
    description:
      'Accounts, leads, deals, and contacts in the same system as finance and operations. Built for manufacturing and retail teams that want one source of truth.',
    bullets: ['Pipeline and activity tracking', 'Shared customer records with finance', 'Role-based views for sales and ops'],
  },
  {
    slug: 'erp',
    eyebrow: 'ERP',
    title: 'Unified ERP on ATW One',
    description: 'Run sales, inventory, finance, and operations with one Credits pool and unlimited named users on core modules.',
    bullets: ['Modular apps on one platform', 'Credits-based usage transparency', 'Custom apps when you outgrow stock modules'],
  },
  {
    slug: 'compliance',
    eyebrow: 'Compliance',
    title: 'Compliance and safety management',
    description: 'Document control, audit trails, and alerts so your team stays ahead of regulatory deadlines.',
    bullets: ['Central document management', 'Deadline reminders', 'Reporting for audits'],
  },
  {
    slug: 'logistics',
    eyebrow: 'Logistics',
    title: 'Logistics and fulfillment',
    description: 'Coordinate shipments, carriers, and warehouse handoffs with operational data in ATW One.',
    bullets: ['Shipment visibility', 'Carrier and route planning', 'Inventory tie-ins'],
  },
  {
    slug: 'project-management',
    eyebrow: 'Projects',
    title: 'Project management',
    description: 'Tasks, timelines, and budgets connected to the same customer and financial records.',
    bullets: ['Milestone tracking', 'Resource allocation', 'Budget vs actual'],
  },
  {
    slug: 'wms',
    eyebrow: 'WMS',
    title: 'Warehouse management',
    description: 'Receiving, picking, and cycle counts integrated with inventory and order flows.',
    bullets: ['Bin and location tracking', 'Pick/pack workflows', 'Real-time stock levels'],
  },
  {
    slug: 'ecommerce',
    eyebrow: 'E-commerce',
    title: 'E-commerce operations',
    description: 'Connect storefronts, orders, and fulfillment without a separate ops silo.',
    bullets: ['Order sync', 'Inventory alignment', 'Customer history in CRM'],
  },
  {
    slug: 'e-commerce-migration',
    eyebrow: 'Migration',
    title: 'E-commerce migration',
    description: 'Move catalogs, orders, and customer data to a unified stack with ATW Services delivery.',
    bullets: ['Discovery and cutover planning', 'Data migration', 'Post-launch support'],
  },
  {
    slug: 'ims',
    eyebrow: 'Inventory',
    title: 'Inventory management',
    description: 'Stock levels, reorder rules, and multi-location inventory inside ATW One.',
    bullets: ['Multi-warehouse views', 'Reorder alerts', 'Cost tracking'],
  },
  {
    slug: 'analytics',
    eyebrow: 'Analytics',
    title: 'Business analytics',
    description: 'Dashboards and reports across sales, finance, and operations from one data model.',
    bullets: ['Role-based dashboards', 'Export and scheduling', 'Credits-aware usage'],
  },
  {
    slug: 'automation',
    eyebrow: 'Automation',
    title: 'Workflow automation',
    description: 'Automate approvals, notifications, and handoffs across departments.',
    bullets: ['Trigger-based workflows', 'Integration hooks', 'Audit logs'],
  },
  {
    slug: 'ai-use-cases',
    eyebrow: 'AI',
    title: 'AI use cases on ATW',
    description: 'Practical AI across CRM, support, and operations with guardrails and shared Credits.',
    bullets: ['Assistants tied to your data', 'Overseer and agent seats', 'Human-in-the-loop workflows'],
  },
  {
    slug: 'custom-development',
    eyebrow: 'Custom development',
    title: 'Custom development on ATW One',
    description: 'Extend the platform with modules, integrations, and apps built by ATW Services.',
    bullets: ['Solution architecture', 'Iterative delivery', 'Same team for support'],
  },
  {
    slug: 'custom-erp-software-development',
    eyebrow: 'Custom ERP',
    title: 'Custom ERP software development',
    description: 'Design and build around how you operate, defaulting to ATW One as the core platform.',
    bullets: ['Process discovery', 'Data migration', 'Training and handoff'],
  },
  {
    slug: 'custom-vs-prebuilt',
    eyebrow: 'Compare',
    title: 'Custom ERP vs prebuilt ATW One',
    description: 'Decision guide for teams choosing stock modules, extensions, or a full custom build.',
    bullets: ['When stock modules fit', 'When to extend One', 'When to engage ATW Services'],
  },
];

export function getSolutionBySlug(slug: string): SolutionPageDef | undefined {
  return SOLUTION_PAGES.find((s) => s.slug === slug);
}
