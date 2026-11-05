/**
 * Growth comparison pages for answer engines and search.
 *
 * Competitor facts only from each vendor's public pages (checked 2026-11-05).
 * ATW facts: site copy plus base hosting + Credits (not per-seat); Mail included
 * (hosted inboxes use Credits); Hub included; AI draws from Credits. No ATW
 * dollar amounts or Credit rates.
 *
 * Sources (do not invent beyond these):
 * - Zoho One: https://www.zoho.com/one/ ; https://www.zoho.com/one/pricing/ ;
 *   https://www.zoho.com/one/applications/faq.html ; https://www.zoho.com/one/plan-details.html
 * - Odoo: https://www.odoo.com/ ; https://www.odoo.com/pricing ;
 *   https://www.odoo.com/page/editions ; https://www.odoo.com/page/hosting-types
 * - Google Workspace / Gmail: https://workspace.google.com/products/gmail/ ;
 *   https://workspace.google.com/pricing ;
 *   https://knowledge.workspace.google.com/admin/getting-started/editions/business-editions ;
 *   https://knowledge.workspace.google.com/admin/billing/compare-flexible-and-annual-fixed-term-payment-plans
 */

import type { FaqItem } from '../lib/seo';

export type CompareRow = {
  dimension: string;
  atw: string;
  other: string;
};

export type ComparePage = {
  slug: string;
  /** Primary search / answer-engine query this page targets. */
  targetQuery: string;
  competitorName: string;
  title: string;
  description: string;
  h1: string;
  /** 2 to 3 sentence direct answer at the top. */
  directAnswer: string;
  tableCaption: string;
  rows: CompareRow[];
  chooseAtw: string[];
  chooseOther: string[];
  faqs: FaqItem[];
  ctaTitle: string;
  ctaDescription: string;
};

export const COMPARE_INDEX = {
  title: 'Compare ATW with Zoho One, Odoo, and Google Workspace',
  description:
    'Side-by-side pages for buyers comparing ATW One and ATW Mail with Zoho One, Odoo, and Google Workspace business email.',
  intro:
    'These pages answer common buyer questions with a short direct answer, a feature and approach table, fair "when to choose" notes, and FAQ. ATW uses a base hosting tier plus a shared Credits pool (not per-seat for the core suite). Mail and Hub are included; hosted inboxes and AI work draw Credits.',
} as const;

export const COMPARE_PAGES: ComparePage[] = [
  {
    slug: 'zoho-one',
    targetQuery: 'ATW vs Zoho One',
    competitorName: 'Zoho One',
    title: 'ATW vs Zoho One | all-in-one business software compared',
    description:
      'Compare ATW One with Zoho One: suite scope, billing approach, mail and Hub, and when each fit is stronger for growing teams.',
    h1: 'ATW vs Zoho One',
    directAnswer:
      'ATW One is a Credits-based ERP/CRM workspace with Hub (Mail, Chat, Calendar, Meetings, Tasks) included on base hosting. Zoho One is Zoho\'s all-in-one suite of dozens of business apps under one organization license model. Choose ATW when you want one hosted workspace, included mail and Hub, and usage billed from a shared Credits pool instead of stacking per-seat licenses. Choose Zoho One when you want Zoho\'s broad app catalog and a mature per-user suite with deep Zoho-native integrations.',
    tableCaption: 'ATW One and Zoho One: approach comparison',
    rows: [
      {
        dimension: 'What it is',
        atw: 'ATW One ERP/CRM workspace plus Hub productivity (Mail, Chat, Calendar, Meetings, Tasks) on ATW hosting.',
        other:
          'Zoho One is marketed as an operating system for business: a unified suite with 45+ apps spanning sales, marketing, service, finance, HR, operations, and collaboration (Zoho One homepage).',
      },
      {
        dimension: 'App breadth',
        atw: 'One shared business suite (CRM, finance, operations, HR, marketing, custom apps) with Hub and Agents on the same organization.',
        other:
          'Essentials covers 15+ apps; Standard includes 50+ unified business apps with centralized admin, MDM, and platform customization (Zoho One pricing and plan details).',
      },
      {
        dimension: 'Billing model',
        atw: 'Base hosting tier plus a shared Credits pool for usage. Not billed per named seat for the core suite. AI work draws from the same Credits pool.',
        other:
          'Zoho One bills per user (or per employee under the all-employees model). Essentials and Standard use per-user licensing; the all-employees option requires licenses for all employees on payroll (Zoho One pricing FAQ).',
      },
      {
        dimension: 'Mail and collaboration',
        atw: 'Mail is included in ATW; hosted inboxes use Credits. Hub bundles Mail, Chat, Calendar, Meetings, and Tasks with base hosting.',
        other:
          'Zoho One includes Zoho Mail and Cliq among its collaboration apps, plus WorkDrive, Meeting, and related tools in the suite catalog (Zoho One applications and plan details).',
      },
      {
        dimension: 'Customization',
        atw: 'Extend with custom apps on ATW One; ATW Services can implement or build around One when you need more than stock modules.',
        other:
          'Standard includes platform capabilities to build, customize, and extend, plus Creator and related tools in the broader Zoho One catalog (Zoho One pricing and plan details).',
      },
      {
        dimension: 'Trial',
        atw: 'ATW One offers a free trial path from the marketing site (see /trial).',
        other: 'Zoho One offers a free trial period with no card details required on its public signup path (Zoho One homepage).',
      },
    ],
    chooseAtw: [
      'You want ERP/CRM plus included Hub mail and collaboration without a separate per-seat productivity SKU.',
      'You prefer one organization Credits pool for records, automation, hosted inboxes, and AI instead of scaling mainly by user licenses.',
      'You want to work with the same ATW team that builds and operates the product (see Why Us).',
      'You may need custom apps or implementation on ATW One rather than assembling many point products.',
    ],
    chooseOther: [
      'You already run several Zoho apps and want one Zoho invoice and directory across a very large Zoho catalog.',
      'You specifically need Zoho-native depth in apps ATW does not mirror feature-for-feature (for example Zoho Desk, Books payroll localizations, or Marketplace extensions purchased separately).',
      'Your buying process expects classic per-user suite licensing and Zoho partner/Jumpstart onboarding options.',
      'You want Zoho\'s published mobile device management and Zoho Directory controls as the primary identity plane.',
    ],
    faqs: [
      {
        q: 'Is ATW a Zoho One alternative?',
        a: 'Yes for teams comparing all-in-one business suites. ATW One centers ERP/CRM with included Hub and Credits-based usage. Zoho One centers a large catalog of Zoho apps under one organization license. Many buyers evaluate both when consolidating tools.',
      },
      {
        q: 'Does Zoho One include email?',
        a: 'Zoho lists Zoho Mail among the collaboration apps available in Zoho One. Confirm current app inclusion on Zoho\'s One applications and plan-details pages for your edition.',
      },
      {
        q: 'How does ATW billing differ from Zoho One?',
        a: 'ATW uses a base hosting tier plus a shared Credits pool. Hosted mailboxes and AI draw Credits. Zoho One uses per-user (or all-employees) licensing for suite access rather than an ATW-style Credits pool.',
      },
      {
        q: 'Can ATW Services still help if we stay on Zoho?',
        a: 'Yes. ATW Services implements partner stacks, including Zoho, when you choose to remain on that platform. See the Zoho partner page and Services.',
      },
      {
        q: 'Where should I start if I am undecided?',
        a: 'Read this page, then open ATW One and Zoho One product tours, or contact ATW for a process review. If your team is already deep in Zoho, start from the Zoho partner path instead of a rip-and-replace.',
      },
    ],
    ctaTitle: 'Compare ATW One with your Zoho plan',
    ctaDescription: 'Tell us what you run today. We will map ATW One and Hub to your workflows, or help you stay on Zoho if that is the better fit.',
  },
  {
    slug: 'odoo',
    targetQuery: 'ATW vs Odoo',
    competitorName: 'Odoo',
    title: 'ATW vs Odoo | ERP platforms compared',
    description:
      'Compare ATW One with Odoo Community and Enterprise: hosting, billing approach, apps, and when each platform fits better.',
    h1: 'ATW vs Odoo',
    directAnswer:
      'ATW One is a hosted ERP/CRM workspace billed as base hosting plus Credits, with Hub productivity included. Odoo is a modular ERP available as open-source Community or licensed Enterprise, with Online, Odoo.sh, and on-premise hosting options. Choose ATW when you want a managed ATW-operated suite and Credits-based usage without running your own ERP stack. Choose Odoo when you want Odoo\'s modular app ecosystem, Community self-hosting, or Enterprise\'s all-apps subscription model.',
    tableCaption: 'ATW One and Odoo: approach comparison',
    rows: [
      {
        dimension: 'What it is',
        atw: 'Hosted ATW One ERP/CRM with included Hub (Mail, Chat, Calendar, Meetings, Tasks) and Agents on organization Credits.',
        other:
          'Odoo is modular business management software offered as Community (open-source) and Enterprise (licensed), covering CRM, accounting, inventory, manufacturing, websites, HR, and more (Odoo editions page).',
      },
      {
        dimension: 'Editions and hosting',
        atw: 'ATW hosts the product for you on ATW infrastructure. Product entry points include one.atw.net and hub.atw.net.',
        other:
          'Community can be self-hosted. Enterprise can run on Odoo Online, Odoo.sh, or on-premise depending on plan. Online is SaaS; on-premise puts maintenance on your team (Odoo hosting types).',
      },
      {
        dimension: 'Billing model',
        atw: 'Base hosting tier plus shared Credits for usage (including hosted inboxes and AI). Not per-seat for the core suite.',
        other:
          'Odoo describes Enterprise plans (such as Standard and Custom) as access to apps for a single fee per paying user. Community has no Odoo license fee but you operate hosting yourself. Some features use separate in-app purchase credits (Odoo pricing FAQ).',
      },
      {
        dimension: 'Apps included',
        atw: 'CRM, finance, operations, HR, marketing, knowledge, custom apps, plus Hub mail and collaboration.',
        other:
          'Paid Enterprise plans are described as including all apps for that fee. Community includes a core open-source set; many advanced features are Enterprise-only on the editions comparison (Odoo pricing and editions).',
      },
      {
        dimension: 'Implementation',
        atw: 'Self-serve trial plus optional ATW Services implementation or custom apps on One.',
        other:
          'Odoo notes implementation and expert services are outside the subscription; small companies may use Success Packs, larger ones often use partners (Odoo pricing FAQ).',
      },
      {
        dimension: 'Email',
        atw: 'Mail is included in ATW; hosted inboxes use Credits.',
        other:
          'Odoo Online subscriptions include email integration as part of the hosted environment description on the pricing page. Self-hosted setups handle mail infrastructure separately.',
      },
    ],
    chooseAtw: [
      'You want a managed ATW-operated ERP/CRM with Hub included, without standing up Community hosting yourself.',
      'You prefer Credits-based usage for automation, AI, and hosted mailboxes over scaling mainly by paying users.',
      'You want direct access to the team that builds ATW One for implementation and custom apps.',
      'You are consolidating CRM, finance, and operations and do not need Odoo-specific manufacturing or POS depth.',
    ],
    chooseOther: [
      'You need Odoo Community with full control of self-hosted open-source code.',
      'Your processes are already designed around Odoo apps (MRP, barcode shop floor, POS, or localizations you rely on).',
      'You want Odoo.sh CI-style hosting for custom modules, or on-premise Enterprise under your ops team.',
      'You prefer Odoo\'s published all-apps-per-user Enterprise packaging and partner ecosystem for delivery.',
    ],
    faqs: [
      {
        q: 'Is ATW the same as Odoo?',
        a: 'No. ATW One is ATW\'s own hosted ERP/CRM. Odoo is a separate modular ERP with Community and Enterprise editions. ATW Services can also implement Odoo when you choose that stack.',
      },
      {
        q: 'Does Odoo have a free edition?',
        a: 'Odoo publishes Community as open-source and free to download and host yourself. Enterprise is the licensed edition with additional apps and hosting options. Confirm current terms on Odoo\'s editions and pricing pages.',
      },
      {
        q: 'How does ATW billing differ from Odoo Enterprise?',
        a: 'ATW bills a base hosting tier plus Credits for usage. Odoo Enterprise is described as apps for a single fee per paying user, with extras such as implementation and some in-app purchases outside that fee.',
      },
      {
        q: 'Can I migrate from Odoo to ATW?',
        a: 'Often yes for CRM, finance, and operations data, scoped as a Services engagement. Contact ATW with what you run today. If you prefer to stay on Odoo, use the Odoo partner path instead.',
      },
      {
        q: 'Which is better for manufacturing?',
        a: 'Odoo\'s public editions page highlights manufacturing, barcode, and shop-floor capabilities that many manufacturers already standardize on. ATW One focuses on unified CRM, finance, and operations; evaluate modules against your plant requirements before switching.',
      },
    ],
    ctaTitle: 'See if ATW One or Odoo fits your stack',
    ctaDescription: 'Share your current apps and hosting model. We will be direct about ATW One versus staying on Odoo.',
  },
  {
    slug: 'google-workspace-email',
    targetQuery: 'ATW Mail vs Google Workspace email',
    competitorName: 'Google Workspace',
    title: 'ATW Mail vs Google Workspace | business email compared',
    description:
      'Compare ATW Mail with Google Workspace business email: included mail and Hub, Credits vs per-user seats, and when each is the better fit.',
    h1: 'ATW Mail vs Google Workspace',
    directAnswer:
      'ATW Mail is business email included with ATW; hosted inboxes use Credits, and Hub adds Chat, Calendar, Meetings, and Tasks on base hosting. Google Workspace provides custom-domain Gmail plus Calendar, Meet, Chat, Drive, and related apps under per-user Workspace editions. Choose ATW Mail when email should sit inside your ATW organization Credits and Hub. Choose Google Workspace when you want Google\'s Gmail client, Drive collaboration, and the wider Workspace admin ecosystem.',
    tableCaption: 'ATW Mail and Google Workspace: approach comparison',
    rows: [
      {
        dimension: 'What it is',
        atw: 'Hosted business email on your domain with webmail, admin controls, and IMAP/SMTP. Part of ATW Hub.',
        other:
          'Google Workspace business email is custom-domain Gmail, with Meet, Calendar, Chat, and productivity apps in the same Workspace subscription (Google Workspace Gmail product page).',
      },
      {
        dimension: 'How you pay',
        atw: 'Mail is included in ATW. Hosted inboxes use Credits from the organization pool. Users without a hosted inbox are free named seats. Hub is included with base hosting.',
        other:
          'Google Workspace Business editions are sold per user, with Flexible (monthly, adjustable seats) and Annual/Fixed-Term commitment options (Google Workspace billing help and pricing pages).',
      },
      {
        dimension: 'Suite around email',
        atw: 'Hub: Mail, Chat, Calendar, Meetings, and Tasks. ATW One ERP/CRM sits alongside on the same organization.',
        other:
          'Workspace pairs Gmail with Calendar, Meet, Chat, Drive, Docs, Sheets, and related Google apps. Gemini features are described as available with Workspace plans on Google\'s Gmail product page.',
      },
      {
        dimension: 'Client access',
        atw: 'Webmail plus standard IMAP/SMTP for desktop and mobile clients.',
        other:
          'Gmail web and mobile apps are the primary clients, with Workspace admin controls for the organization. Google documents migration paths from other mail systems (Gmail product FAQ).',
      },
      {
        dimension: 'AI',
        atw: 'AI work on ATW draws from the organization Credits pool (Agents and related features).',
        other:
          'Google markets Gemini assistance inside Gmail and other Workspace apps for eligible plans (Google Workspace Gmail product page).',
      },
      {
        dimension: 'Best fit signal',
        atw: 'Teams consolidating ERP/CRM and mail on ATW, or replacing a separate mail seat bill with Credits-backed inboxes.',
        other:
          'Teams standardized on Google accounts, Drive file collaboration, and Workspace admin already, who mainly need Gmail as the inbox.',
      },
    ],
    chooseAtw: [
      'You want mail included with ATW hosting, with hosted inboxes drawing Credits instead of a separate per-user mail suite.',
      'You want Hub chat, calendar, meetings, and tasks next to ATW One without adopting Google as the identity plane.',
      'You need IMAP/SMTP flexibility for existing desktop clients while keeping org billing on Credits.',
      'You are already evaluating ATW One and want email on the same organization boundary.',
    ],
    chooseOther: [
      'Your company already lives in Google accounts, Drive, and Docs and only needs to add or keep business Gmail.',
      'You rely on Google-specific Gmail features, Workspace admin tooling, or Gemini-in-Gmail workflows your team will not leave.',
      'You prefer Google\'s global consumer-grade Gmail client familiarity for every employee.',
      'You need Google\'s published Workspace edition matrix (Starter, Standard, Plus, and Enterprise paths) as a procurement standard.',
    ],
    faqs: [
      {
        q: 'Is email included with ATW?',
        a: 'Yes. Mail is included in ATW. Hosted inboxes use Credits. Users without a hosted inbox are free named seats. Hub (Mail, Chat, Calendar, Meetings, Tasks) is included with base hosting.',
      },
      {
        q: 'Is Google Workspace only email?',
        a: 'No. Business email is one part of Google Workspace. Editions also include collaboration and productivity apps such as Calendar, Meet, Chat, and Drive. See Google\'s Workspace and Gmail product pages for the current edition matrix.',
      },
      {
        q: 'Can I migrate from Google Workspace to ATW Mail?',
        a: 'Many organizations can move domain mail with a planned cutover. Contact ATW for migration help. Keep Google Workspace if Drive and Docs remain your primary collaboration layer.',
      },
      {
        q: 'Does ATW Mail replace Google Meet and Drive?',
        a: 'Hub covers Mail, Chat, Calendar, Meetings, and Tasks. It is not positioned as a full Google Drive documents suite replacement. Compare Meeting and file needs explicitly before switching.',
      },
      {
        q: 'How does billing compare at a high level?',
        a: 'ATW Mail uses organization Credits for hosted inboxes on top of base hosting. Google Workspace Business editions use per-user licenses with flexible or annual commitment options.',
      },
    ],
    ctaTitle: 'Talk through ATW Mail versus Workspace',
    ctaDescription: 'Tell us how many hosted inboxes you need and whether ERP should live beside mail. We will recommend ATW Mail or staying on Google Workspace.',
  },
];

export function getComparePage(slug: string): ComparePage | undefined {
  return COMPARE_PAGES.find((page) => page.slug === slug);
}
