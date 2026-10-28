export type SolutionCard = {
  id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  href: string;
  featured: boolean;
  complexity: string;
  estimatedTime: string;
};

export const SOLUTIONS: SolutionCard[] = [
  {
    id: 'erp',
    title: 'ATW One (ERP/CRM platform)',
    description:
      'Our subscription ERP/CRM workspace: customers, sales, finance, and operations in one system with Credits billing.',
    category: 'Product',
    features: ['One workspace', 'Credits billing', 'Unlimited named users', 'Trial available'],
    href: '/one',
    featured: true,
    complexity: 'Product',
    estimatedTime: 'Start in days',
  },
  {
    id: 'crm',
    title: 'ATW One CRM',
    description:
      'CRM inside ATW One: accounts, leads, deals, and contacts in the same workspace as finance and ops.',
    category: 'ATW One',
    features: ['Lead Management', 'Sales Automation', 'Customer Analytics', 'Part of ATW One'],
    href: '/erp/apps/crm',
    featured: true,
    complexity: 'Product module',
    estimatedTime: 'Included in One',
  },
  {
    id: 'project-management',
    title: 'Project Management Software',
    description: 'Efficiently manage projects and team collaboration with powerful project management tools.',
    category: 'Project Management',
    features: ['Task Management', 'Team Collaboration', 'Resource Planning', 'Progress Tracking'],
    href: '/solutions/project-management',
    featured: false,
    complexity: 'Intermediate',
    estimatedTime: '3-5 weeks',
  },
  {
    id: 'logistics',
    title: 'Logistics and Fleet Management Systems',
    description: 'Optimize your logistics operations and fleet management with intelligent tracking and routing.',
    category: 'Operations',
    features: ['Route Optimization', 'Fleet Tracking', 'Inventory Management', 'Real-time Updates'],
    href: '/solutions/logistics',
    featured: false,
    complexity: 'Advanced',
    estimatedTime: '6-10 weeks',
  },
  {
    id: 'compliance',
    title: 'Compliance and Safety Management Platforms',
    description: 'Ensure regulatory compliance and workplace safety with comprehensive management platforms.',
    category: 'Compliance',
    features: ['Regulatory Compliance', 'Safety Protocols', 'Audit Trails', 'Risk Assessment'],
    href: '/solutions/compliance',
    featured: false,
    complexity: 'Advanced',
    estimatedTime: '8-12 weeks',
  },
  {
    id: 'wms',
    title: 'Warehouse Management Systems (WMS)',
    description: 'Streamline warehouse operations and inventory management with intelligent WMS solutions.',
    category: 'Operations',
    features: ['Inventory Control', 'Order Fulfillment', 'Space Optimization', 'Automation'],
    href: '/solutions/wms',
    featured: false,
    complexity: 'Intermediate',
    estimatedTime: '5-8 weeks',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Platforms',
    description: 'Build powerful e-commerce solutions with modern platforms and seamless integrations.',
    category: 'Digital Commerce',
    features: ['Online Storefront', 'Payment Processing', 'Inventory Management', 'Customer Analytics'],
    href: '/solutions/ecommerce',
    featured: false,
    complexity: 'Intermediate',
    estimatedTime: '4-7 weeks',
  },
  {
    id: 'analytics',
    title: 'Business Intelligence and Analytics Tools',
    description: 'Transform your data into actionable insights with powerful BI and analytics solutions.',
    category: 'Data & Analytics',
    features: ['Data Visualization', 'Real-time Dashboards', 'Predictive Analytics', 'Custom Reports'],
    href: '/solutions/analytics',
    featured: false,
    complexity: 'Advanced',
    estimatedTime: '6-9 weeks',
  },
  {
    id: 'e-commerce-migration',
    title: 'E-commerce Migration',
    description: 'Seamlessly migrate your e-commerce platform to modern, scalable solutions.',
    category: 'Digital Commerce',
    features: ['Platform Migration', 'Data Transfer', 'Performance Optimization', 'SEO Preservation'],
    href: '/solutions/e-commerce-migration',
    featured: false,
    complexity: 'Advanced',
    estimatedTime: '8-12 weeks',
  },
  {
    id: 'custom-development',
    title: 'Custom ERP on ATW One',
    description: 'Design and build your ERP around ATW One: modules, apps, workflows, and integrations.',
    category: 'ATW Services',
    features: ['Built on ATW One', 'Custom apps', 'Integrations', 'Scoped delivery'],
    href: '/solutions/custom-erp-software-development',
    featured: true,
    complexity: 'Services',
    estimatedTime: 'Scoped engagement',
  },
  {
    id: 'automation',
    title: 'Business Process Automation',
    description: 'Automate repetitive tasks and streamline workflows to improve efficiency and productivity.',
    category: 'Automation',
    features: ['Workflow Automation', 'Process Optimization', 'Integration', 'Monitoring'],
    href: '/solutions/automation',
    featured: false,
    complexity: 'Intermediate',
    estimatedTime: '3-6 weeks',
  },
];
