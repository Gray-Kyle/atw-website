export type IndustryDef = {
  slug: string;
  name: string;
  description: string;
  benefits: string[];
};

export const INDUSTRIES: IndustryDef[] = [
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    description: 'Production, quality, and inventory on one platform.',
    benefits: ['Production planning', 'Quality control', 'Inventory visibility', 'Supplier coordination'],
  },
  {
    slug: 'construction',
    name: 'Construction',
    description: 'Projects, budgets, and field teams aligned.',
    benefits: ['Job costing', 'Subcontractor management', 'Document control', 'Schedule tracking'],
  },
  {
    slug: 'retail',
    name: 'Retail',
    description: 'Stores, e-commerce, and customer data together.',
    benefits: ['Omnichannel inventory', 'POS integration', 'Loyalty and CRM', 'Merchandising insights'],
  },
  {
    slug: 'transportation',
    name: 'Transportation & warehousing',
    description: 'Fleet, routes, and warehouse operations.',
    benefits: ['Dispatch', 'Route optimization', 'Warehouse tasks', 'Proof of delivery'],
  },
  {
    slug: 'service-sector',
    name: 'Service sector',
    description: 'Client delivery, billing, and scheduling for service businesses.',
    benefits: ['Scheduling', 'Ticketing', 'Recurring billing', 'Client portals'],
  },
];

export function getIndustry(slug: string): IndustryDef | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
