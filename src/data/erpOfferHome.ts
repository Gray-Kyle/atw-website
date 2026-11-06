/**
 * Public marketing copy for **ATW One** (subscription product).
 * Positioning: one system for the business; custom apps when you need more.
 * Site map / IA: docs/ATW_ONE_AND_ATW_SERVICES_SITE_MAP.md
 *
 * Pricing model (Nov 5, 2026): hosting + unified Credits. Not per-seat.
 * Do not invent prices or per-Credit rates beyond the published plan table.
 */

export const ERP_PRIMARY_CTA_LABEL = "Book a free business process review";

/** Every public plan includes this trial (marketing copy; enforce in product/onboarding separately). */
export const ERP_TRIAL_DAYS = 14;
export const ERP_TRIAL_NO_CREDIT_CARD = "No credit card required";
export const ERP_TRIAL_LABEL = `${ERP_TRIAL_DAYS}-Day Free Trial`;
export const ERP_TRIAL_PROMO_LABEL = `${ERP_TRIAL_LABEL}, No Credit Card Required`;

/** Shown on every ATW tier: unlimited named seats (pricing is hosting + Credits, not per seat). */
export const ERP_UNLIMITED_USERS_BULLET =
  "Unlimited named seats (invite as many teammates as you want)";

/**
 * Credits model note for plan cards and FAQ.
 * Do not publish per-meter Credit rates or overage block prices (rate card not final).
 */
export const ERP_CREDITS_MODEL_NOTE =
  "One unified Credits pool is shared across apps, mail inboxes, storage, automations, AI, and Workforce. A detailed Credit rate sheet is coming.";

/** Included Credits by hosted tier (customer-facing unit). Trial is a one-time pool for the trial window. */
export const ERP_INCLUDED_CREDITS_BY_PLAN = {
  trial: 150_000,
  starter: 1_200_000,
  growth: 12_000_000,
  business: 120_000_000,
} as const;

/** Apps and systems included in the free trial package. */
export const ERP_TRIAL_INCLUDED = [
  "ATW One",
  "Workforce",
  "Directory",
  "ATW AI",
] as const;

/** Explicitly not available during the trial. */
export const ERP_TRIAL_NOT_INCLUDED = [
  "Hosted mail inboxes",
  "Sandbox",
  "Hub",
  "ATW Orbit",
] as const;

/**
 * Hero copy: what ATW One is and how it improves the business (clarity, speed, one truth).
 */
export const ERP_HERO = {
  badge: "ATW One",
  headlineLead: "The AI-powered ERP/CRM that keeps your Business",
  headlineAccent: "in ONE Place.",
  subhead:
    "CRM, Finance, Marketing, HR, and Custom Apps work together under ATW One, so your team is not chasing updates across disconnected tools. Need more than the standard apps? We build on ATW One, not beside it.",
};

/**
 * Home hero: app pills swap the preview image on the right.
 * Files live under `public/images/marketing/one-hero-{id}.jpg` (see `ERP_HERO_PREVIEW_APPS`).
 */
export type ErpHeroPreviewApp = {
  id: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
  /** Product tour link (or `/one` when no dedicated tour page yet). */
  tourHref: string;
  /**
   * Hero preview framing: `left` keeps the app rail on the left in frame (object-position left,
   * wider slice) and fades the right edge; `center` keeps the previous symmetric crop.
   */
  previewImageAlign?: "center" | "left";
};

export const ERP_HERO_PREVIEW_APPS: readonly ErpHeroPreviewApp[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    imageSrc: "/images/marketing/atw-one-dashboard-clean.png",
    imageAlt: "ATW One Home dashboard overview",
    tourHref: "/erp/apps/dashboard",
    previewImageAlign: "left",
  },
  {
    id: "crm",
    label: "CRM",
    imageSrc: "/images/marketing/one-hero-crm.jpg",
    imageAlt: "ATW One CRM dashboard",
    tourHref: "/erp/apps/crm",
  },
  {
    id: "finance",
    label: "Finance",
    imageSrc: "/images/marketing/one-hero-finance.jpg",
    imageAlt: "ATW One Finance books workspace",
    tourHref: "/erp/apps/finance",
  },
  {
    id: "marketing",
    label: "Marketing",
    imageSrc: "/images/marketing/one-hero-marketing.jpg",
    imageAlt: "ATW One Marketing blog analytics",
    tourHref: "/one",
  },
  {
    id: "hr",
    label: "HR",
    imageSrc: "/images/marketing/one-hero-hr.jpg",
    imageAlt: "ATW One Human resources people directory",
    tourHref: "/one",
  },
  {
    id: "custom-apps",
    label: "Custom Apps",
    imageSrc: "/images/marketing/one-hero-custom-apps.jpg",
    imageAlt: "ATW One Custom apps",
    tourHref: "/one",
  },
];

export const ERP_POSITIONING = {
  title: "Why teams move to one workspace",
  paragraph:
    "Too many tools means duplicate customers, slow closes, and surprises at month-end. ATW One replaces that sprawl with one place for pipeline, cash, and operations: simple hosting plans (Starter, Growth, Business, Enterprise), unlimited named seats, and a shared Credits pool. Add Premium Support or implementation when you want more help.",
};

/** Product screenshots + detail pages under `/erp/apps/{slug}` (PNG in `/public/images/marketing`). */
export const ERP_APP_SHOWCASE_ENTRIES = [
  {
    slug: "dashboard",
    cardTitle: "Dashboard",
    cardCaption:
      "Your home base: apps, shortcuts, and one consistent launch point for every role.",
    imageSrc: "/images/marketing/atw-one-dashboard-clean.png",
    metaDescription:
      "Tour the ATW One dashboard: one home screen for CRM, finance, HR, marketing, custom apps, and support with role-aware navigation.",
    pageLead:
      "The dashboard anchors the suite. People land on their apps, open only what their profile allows, and move into deep work without juggling separate products.",
    bullets: [
      "Global Apps launcher for CRM, finance, human resources, marketing, custom apps, and support",
      "Same top navigation, search, and org context everywhere in the product",
      "Role-based visibility so teams see the right modules without admin sprawl",
      "Marketing summaries (posts, comments, readers) when the blog app is enabled",
    ],
  },
  {
    slug: "crm",
    cardTitle: "CRM",
    cardCaption:
      "Leads, accounts, contacts, deals, and the AI Lead Agent: pipeline work connected to the rest of the suite.",
    imageSrc: "/images/marketing/erp-product-crm.png",
    metaDescription:
      "See ATW One CRM: lead lists with company and contact views, stages, owners, conversion, and sales modules in one workspace.",
    pageLead:
      "Sales teams run inbound and outbound pipeline in one CRM app. Records stay tied to accounts and deals as opportunities mature, so finance and delivery see the same customer story.",
    bullets: [
      "Leads with search, filters, CRM history, converted leads, and one-click conversion",
      "Sales sidebar: AI Lead Agent, leads, contacts, accounts, and deals",
      "Touchpoints and KPI views to keep follow-ups visible",
      "Same org and permissions as finance: no duplicate customer directories",
    ],
  },
  {
    slug: "finance",
    cardTitle: "Finance",
    cardCaption:
      "Invoices, AR, customers, vendors, and purchasing aligned with CRM.",
    imageSrc: "/images/marketing/erp-product-finance.png",
    metaDescription:
      "Explore ATW One finance: workspace metrics, sales and purchases, invoices, and directory data living alongside CRM customers.",
    pageLead:
      "Finance opens with a workspace dashboard: paid totals, open AR, overdue exposure, directory counts, and recent invoices, then expands into sales, purchases, items, banking, taxes, and reports as you grow.",
    bullets: [
      "Workspace overview: paid, open AR, overdue, and customer plus vendor counts",
      "Sales: customers, invoices, quotes, payments received, credit notes, retainers",
      "Purchases: vendors, bills, payments made, recurring bills, vendor credits",
      "Items, banking, time, accounting, taxes, reports, documents, compliance, and settings",
    ],
  },
] as const;

export type ErpAppShowcaseSlug = (typeof ERP_APP_SHOWCASE_ENTRIES)[number]["slug"];

export function isErpAppShowcaseSlug(value: string): value is ErpAppShowcaseSlug {
  return ERP_APP_SHOWCASE_ENTRIES.some((e) => e.slug === value);
}

export const ERP_PRODUCT_WELCOME = {
  mainTitle: "Inside ATW One",
  title: "From First Contact To Cash, Without The Copy-Paste",
  paragraph:
    "When sales and finance live in different tools, revenue leaks and month-end hurts. ATW One connects leads and deals to invoices and cash flow in one workspace: the same org, users, and permissions, while departments stay separated by role, not by disconnected tools, so everyone improves speed and accuracy without maintaining parallel spreadsheets.",
  aiBadge: "On The Roadmap",
  aiTitle: "Practical AI, Grounded In Your Data",
  aiParagraph:
    "We are rolling out assistive AI inside the product: faster summaries of customer and deal activity, nudges for follow-ups, and help drafting routine messages, always tied to records in ATW One, not generic chat. Features ship in phases; early adopters help prioritize what we build first.",
  shots: ERP_APP_SHOWCASE_ENTRIES.map((e) => ({
    key: e.slug,
    title: e.cardTitle,
    caption: e.cardCaption,
    src: e.imageSrc,
    href: `/erp/apps/${e.slug}`,
  })),
} as const;

export type ErpCapabilityBlock = {
  title: string;
  bullets: string[];
};

export const ERP_CAPABILITIES: ErpCapabilityBlock[] = [
  {
    title: "CRM",
    bullets: [
      "Leads, accounts, contacts, and deals",
      "Follow-ups and touchpoints",
      "Activity history",
    ],
  },
  {
    title: "Finance",
    bullets: [
      "Customers and vendors",
      "Invoices and payments",
      "Basic reports",
      "Sales and purchasing workflows",
    ],
  },
  {
    title: "Operations",
    bullets: [
      "Tasks and documents",
      "Approvals and basic workflows",
      "Internal process tracking",
    ],
  },
  {
    title: "Administration",
    bullets: [
      "Unlimited named seats (no per-seat software charge)",
      "Users, roles, and permissions",
      "Groups",
      "Audit history",
      "Organization settings",
    ],
  },
  {
    title: "Automation",
    bullets: [
      "Reminders and notifications",
      "Basic workflow automation",
      "Follow-up prompts",
      "Process visibility",
    ],
  },
  {
    title: "Running on ATW One",
    bullets: [
      "Secure, ATW-managed infrastructure",
      "Backups, monitoring, and updates",
      "Performance management",
      "Ongoing platform improvements",
    ],
  },
];

export type ErpHostingPlan = {
  id: string;
  name: string;
  /** Monthly USD list price, or null when quote/contact-only. */
  monthly: number | null;
  /** Short price label when monthly is null (e.g. Enterprise). */
  priceLabel?: string;
  blurb: string;
  includes: string[];
};

/** paid ATW plan tiers (Credits included monthly). Trial is rendered separately. */
export const ERP_HOSTING_PLANS: ErpHostingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 299,
    blurb: "Best for small teams getting their business onto one platform.",
    includes: [
      ERP_UNLIMITED_USERS_BULLET,
      `${ERP_INCLUDED_CREDITS_BY_PLAN.starter.toLocaleString("en-US")} Credits per month`,
      "Mail (hosted inboxes draw Credits), Hub, and sandbox",
      "Full ATW One core access",
      "Secure cloud environment, backups, and standard updates",
      "Core CRM, finance, operations, and admin tools",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 1999,
    blurb: "For teams running daily work in ATW One across sales, finance, and operations.",
    includes: [
      ERP_UNLIMITED_USERS_BULLET,
      "Everything in Starter",
      `${ERP_INCLUDED_CREDITS_BY_PLAN.growth.toLocaleString("en-US")} Credits per month`,
      "Mail, Hub, and sandbox included",
      "More throughput, automation, and reporting capacity",
    ],
  },
  {
    id: "business",
    name: "Business",
    monthly: 9999,
    blurb: "Heavier usage, more automation, and priority performance.",
    includes: [
      ERP_UNLIMITED_USERS_BULLET,
      "Everything in Growth",
      `${ERP_INCLUDED_CREDITS_BY_PLAN.business.toLocaleString("en-US")} Credits per month`,
      "Mail, Hub, and sandbox included",
      "Highest throughput and workflow volume",
      "Priority platform performance",
      "Strong fit for multi-department operations",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    priceLabel: "Contact us",
    blurb: "Custom hosting, Credits, and commercial terms for large or complex organizations.",
    includes: [
      ERP_UNLIMITED_USERS_BULLET,
      "Custom Credits pool",
      "Mail, Hub, sandbox, and broader system access as scoped",
      "Dedicated commercial and technical guidance",
    ],
  },
];

/** Trial package shown on pricing (not a paid ATW plans tier). */
export const ERP_TRIAL_PACKAGE = {
  id: "trial",
  name: "Trial",
  priceLabel: "$0",
  credits: ERP_INCLUDED_CREDITS_BY_PLAN.trial,
  days: ERP_TRIAL_DAYS,
  blurb: `${ERP_TRIAL_DAYS} days to try the core stack. Unlimited named seats. No credit card required.`,
  included: ERP_TRIAL_INCLUDED,
  notIncluded: ERP_TRIAL_NOT_INCLUDED,
  afterTrial:
    "After day 14 you keep access to the trial apps and can self-serve buy more Credits at a higher per-Credit price than Starter, with no sales call and no read-only lock.",
} as const;

export const ERP_OPTIONAL_ADDONS = [
  {
    name: "Premium Support",
    priceNote: "$99.99/month",
    description:
      "Priority support, a monthly improvement call, configuration help, and guidance on getting more value from ATW One. Also covers ongoing workflow updates, practical automation improvements, report tuning, and lighter integrations that fit a monthly support rhythm (not a separate automation retainer).",
  },
  {
    name: "Custom Application",
    priceNote: "One time $499.99",
    description:
      "Purpose-built screens, modules, or applications that extend ATW One: scoped development for a defined deliverable. Quoted higher for complexity, data model, and integration surface.",
  },
];

export const ERP_IMPLEMENTATION = {
  title: "Implementation And Setup",
  intro:
    "Implementation is separate because every business is different. When setup needs meaningful ATW time, we align on a paid implementation plan.",
  tiers: [
    {
      name: "Standard Setup",
      price: "Starting at $1,500 one-time",
      bullets: [
        "ATW One onboarding and company setup",
        "Users, roles, and permissions",
        "Basic configuration and initial workflows",
        "Launch support",
      ],
    },
    {
      name: "Advanced Implementation",
      price: "$3,000–$5,000+ one-time",
      bullets: [
        "Data migration",
        "Custom fields and workflows",
        "Integrations and reporting setup",
        "Department-specific setup and training",
      ],
    },
  ],
};

export const ERP_PRICING_FOOTNOTE =
  `Hosting plans include a monthly Credits pool shared across apps, mail inboxes, storage, automations, AI, and Workforce. Named seats are unlimited (not priced per user). Paid tiers include Mail, Hub, and sandbox. ${ERP_CREDITS_MODEL_NOTE} One free trial per organization domain. HIPAA support is on our roadmap. Contact us.`;

/** Intro paragraph under plan pricing (see ErpPricing). Trial also highlighted in the pricing banner. */
export const ERP_PRICING_SECTION_PARAGRAPH =
  `Org hosting with a shared Credits pool and unlimited named seats. Start on Trial or Starter and move to Growth, Business, or Enterprise when usage grows. Premium support, custom applications, and implementation are optional.`;

/** Short line under the trial banner on the pricing page. */
export const ERP_PRICING_TRIAL_SUBTEXT =
  `${ERP_INCLUDED_CREDITS_BY_PLAN.trial.toLocaleString("en-US")} trial Credits for ${ERP_TRIAL_DAYS} days. Includes ATW One, Workforce, Directory, and ATW AI only. Not available during the trial: ${ERP_TRIAL_NOT_INCLUDED.join("; ")}. ${ERP_TRIAL_PACKAGE.afterTrial}`;

export const ERP_CREDITS_SYSTEM_UPDATE = {
  eyebrow: "Credits",
  title: "One Credits Pool Across ATW",
  paragraph:
    "ATW uses a single Credits pool per organization. Usage across apps, mail inboxes, storage, automations, AI, and Workforce draws from that pool, with optional category detail for operators.",
  bullets: [
    `Trial includes ${ERP_INCLUDED_CREDITS_BY_PLAN.trial.toLocaleString("en-US")} Credits; Starter ${ERP_INCLUDED_CREDITS_BY_PLAN.starter.toLocaleString("en-US")}/mo; Growth ${ERP_INCLUDED_CREDITS_BY_PLAN.growth.toLocaleString("en-US")}/mo; Business ${ERP_INCLUDED_CREDITS_BY_PLAN.business.toLocaleString("en-US")}/mo. Enterprise is custom.`,
    "Paid tiers include Mail (hosted inboxes draw Credits), Hub, and sandbox.",
    "Credits make usage easier to explain while raw metrics remain available internally for operations and dispute resolution.",
    "A detailed Credit rate sheet is coming; we are not publishing per-meter rates yet.",
  ],
} as const;

export const ERP_CTA_BAND = {
  title: "See How ATW One Could Run Your Business",
  supporting:
    "We review how you manage customers, sales, finance, workflows, and reporting today, then show where one workspace can cut manual work, improve visibility, and give leadership a single place to steer from.",
};

/** Extra blocks for the long-form product page (`/one`). */
export const ERP_LONG_FORM = {
  pricingStrategyTitle: "How We Think About Pricing",
  pricingStrategy:
    "ATW pricing is hosting plus Credits, not a per-seat tax. You can invite unlimited named teammates. Every customer still creates real operating cost to run the platform. Your plan reflects Starter, Growth, Business, or Enterprise capacity, implementation when needed, and optional premium services, so ATW can invest in reliability and support while you see straightforward plans instead of a stack of invoices.",
  startingOfferTitle: "Suggested Starting Package",
  startingOfferBullets: [
    `${ERP_TRIAL_LABEL} with ${ERP_INCLUDED_CREDITS_BY_PLAN.trial.toLocaleString("en-US")} Credits (ATW One, Workforce, Directory, ATW AI)`,
    "Starter at $299/month with 1,200,000 Credits. Upgrade when you need more",
    "Unlimited named seats (no per-seat software fees)",
    "Premium Support optional at $99.99/month",
    "Implementation starting at $1,500 one-time",
  ],
  guardrailsTitle: "What We Promise To Be Clear About",
  guardrails: [
    "We do not market the product as completely free. Plans, Credits, setup, support, and advanced services are paid after any trial Credits you use.",
    "Public pricing stays simple; a detailed Credit rate sheet is coming before we publish per-meter rates.",
  ],
  outreachTitle: "Who This Is For",
  outreach:
    "Small and mid-sized businesses that need better systems, but not another massive license before value is proven. If that sounds like you, start with a free business process review and we will map sensible next steps.",
  usageAllowancesTitle: "What “Usage” Means On Each Plan",
  usageAllowancesIntro:
    "Plans bundle everyday capacity into a Credits pool. Instead of juggling separate billing dimensions, your usage is measured in one customer-facing unit with category transparency.",
  usageAllowancesBullets: [
    `Trial includes ${ERP_INCLUDED_CREDITS_BY_PLAN.trial.toLocaleString("en-US")} Credits; Starter includes ${ERP_INCLUDED_CREDITS_BY_PLAN.starter.toLocaleString("en-US")}; Growth includes ${ERP_INCLUDED_CREDITS_BY_PLAN.growth.toLocaleString("en-US")}; Business includes ${ERP_INCLUDED_CREDITS_BY_PLAN.business.toLocaleString("en-US")} each month. Enterprise is custom.`,
    "Apps, mail inboxes, storage, automations, AI, and Workforce all draw from the same Credits pool.",
    `Paid tiers include Mail, Hub, and sandbox. Not available during the trial: ${ERP_TRIAL_NOT_INCLUDED.join("; ")}.`,
    "A detailed Credit rate sheet is coming; we do not publish per-meter or overage block prices yet.",
  ],
};
