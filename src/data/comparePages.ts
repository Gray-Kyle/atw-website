/**
 * Growth comparison pages for answer engines and search.
 *
 * Competitor facts: general, well-known capabilities only (no competitor prices
 * or unverifiable claims). Zoho / Odoo / Google Workspace rows that cite vendor
 * public pages were checked 2026-11-05.
 * ATW facts: site copy plus base hosting + Credits (not per-seat); Mail included
 * (hosted inboxes use Credits); Hub included; AI draws from Credits; Directory
 * for access. Link ATW pricing to /pricing/ only; do not invent Credit rates.
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
 * - HubSpot: https://www.hubspot.com/products (CRM / marketing / sales hubs)
 * - Salesforce: https://www.salesforce.com/ (CRM platform; Sales Cloud / Service Cloud)
 * - QuickBooks: https://quickbooks.intuit.com/ (accounting / bookkeeping)
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
  title: 'Compare ATW with Zoho One, Odoo, Google Workspace, HubSpot, Salesforce, and QuickBooks',
  description:
    'Side-by-side pages for buyers comparing ATW One and ATW Mail with Zoho One, Odoo, Google Workspace business email, HubSpot, Salesforce, and QuickBooks.',
  intro:
    'These pages answer common buyer questions with a short direct answer, a feature and approach table, fair "when to choose" notes, and FAQ. ATW uses a base hosting tier plus a shared Credits pool (not per-seat for the core suite). Mail and Hub are included; hosted inboxes and AI work draw Credits. Directory covers who can sign in and which systems they can open. Published hosting tiers are on /pricing/.',
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
  {
    slug: 'hubspot',
    targetQuery: 'ATW vs HubSpot',
    competitorName: 'HubSpot',
    title: 'ATW vs HubSpot | unified workspace vs CRM and marketing',
    description:
      'Compare ATW One with HubSpot: unified CRM, finance, operations, AI, and Directory versus a CRM and marketing-led customer platform, plus when each fit is stronger.',
    h1: 'ATW vs HubSpot',
    directAnswer:
      'ATW One is a unified workspace for CRM, finance, operations, AI, and Directory on one organization, with Hub productivity included with every paid ATW plan and usage billed from a shared Credits pool. HubSpot is widely known as a customer platform centered on CRM plus marketing, sales, and related hubs for attracting and converting demand. Choose ATW when you want ERP-style finance and operations beside CRM in one ATW-hosted suite. Choose HubSpot when your priority is inbound marketing, sales engagement, and a CRM-first growth stack rather than a full finance and operations workspace.',
    tableCaption: 'ATW One and HubSpot: approach comparison',
    rows: [
      {
        dimension: 'What it is',
        atw: 'ATW One ERP/CRM workspace: customers, sales, finance, and operations together, with AI that draws organization Credits and Directory for people and access. Hub (Mail, Chat, Calendar, Meetings, Tasks) sits on the same organization with every paid ATW plan.',
        other:
          'HubSpot is a customer platform best known for CRM plus Marketing Hub and Sales Hub tools for campaigns, lead capture, pipeline, and revenue workflows (HubSpot products overview).',
      },
      {
        dimension: 'Primary focus',
        atw: 'One shared business suite across CRM, finance, operations, HR, marketing, knowledge, and custom apps, with Directory and Agents on the same org.',
        other:
          'Strongest reputation in CRM, inbound marketing, content and landing experiences, sales pipeline, and customer service hubs that share contact data.',
      },
      {
        dimension: 'Finance and operations',
        atw: 'Finance and operations modules share records with CRM inside ATW One so pipeline and back-office work live in one system.',
        other:
          'HubSpot centers customer, marketing, and sales execution. Full general ledger accounting and deep operations ERP are not what HubSpot is primarily known for; many teams keep books in a separate accounting product.',
      },
      {
        dimension: 'Billing model',
        atw: 'Base hosting tier plus a shared Credits pool for usage. Not billed per named seat for the core suite. Published tiers are on /pricing/. AI work draws from the same Credits pool.',
        other:
          'HubSpot commonly sells by product hub and tier with per-seat or contact-based packaging depending on the hub. Confirm current packaging on HubSpot\'s pricing pages; this comparison does not quote HubSpot prices.',
      },
      {
        dimension: 'Mail, Hub, and Directory',
        atw: 'Mail is included with every paid ATW plan; hosted inboxes use Credits. Hub bundles Mail, Chat, Calendar, Meetings, and Tasks. Directory is the shared identity layer for who can sign in and which systems they open.',
        other:
          'HubSpot connects email and sales sequences to CRM contacts and offers marketing email inside its marketing tools. Identity and productivity usually sit beside your existing Google or Microsoft stack rather than replacing it as ATW Hub and Directory do.',
      },
      {
        dimension: 'AI',
        atw: 'ATW AI and Agents draw from the organization Credits pool inside the same workspace.',
        other:
          'HubSpot markets AI assistance across CRM, marketing, and sales workflows for eligible plans. Confirm current AI packaging on HubSpot\'s product pages.',
      },
    ],
    chooseAtw: [
      'You want CRM next to finance and operations in one ATW-hosted workspace, not a CRM/marketing stack plus a separate ERP or books tool.',
      'You prefer base hosting plus a shared Credits pool (see /pricing/) instead of stacking hub seats as headcount grows.',
      'You want Mail, Hub, Directory, and AI on the same organization boundary as ERP/CRM.',
      'You may need custom apps or ATW Services implementation on ATW One rather than assembling many point products.',
    ],
    chooseOther: [
      'Your main job is inbound marketing, content, landing pages, and sales engagement on a CRM-first customer platform.',
      'Your team already runs HubSpot as the system of record for contacts, deals, and campaigns and is happy with that focus.',
      'You specifically need HubSpot\'s marketing automation and hub ecosystem depth that ATW does not mirror feature-for-feature.',
      'You are standardizing on HubSpot\'s published hub matrix as a procurement and enablement standard.',
    ],
    faqs: [
      {
        q: 'Is ATW a HubSpot alternative?',
        a: 'Yes for teams comparing a unified business workspace with a CRM and marketing platform. ATW One centers CRM, finance, operations, AI, and Directory together. HubSpot centers CRM plus marketing and sales hubs. Many buyers evaluate both when consolidating tools.',
      },
      {
        q: 'Does HubSpot replace finance and operations software?',
        a: 'HubSpot is best known for CRM, marketing, and sales. Teams that need full accounting and operations often keep a separate finance system. ATW One puts finance and operations beside CRM in one workspace.',
      },
      {
        q: 'How does ATW billing differ from HubSpot at a high level?',
        a: 'ATW uses a base hosting tier plus a shared Credits pool, with published hosting tiers on /pricing/. HubSpot typically packages by hub and tier. Confirm HubSpot\'s current terms on its pricing pages; we do not quote competitor prices here.',
      },
      {
        q: 'Does ATW include email and Directory like a full workspace?',
        a: 'On every paid ATW plan, Mail is included and hosted inboxes use Credits. Hub adds Chat, Calendar, Meetings, and Tasks. Directory covers who can sign in and which systems they can open across One, Hub, Mail, and related apps.',
      },
      {
        q: 'Where should I start if I am undecided?',
        a: 'Read this page, then open ATW One and HubSpot product tours, or contact ATW for a process review. If marketing automation is the core need and finance will stay elsewhere, HubSpot may fit better. If you want one workspace for CRM through operations, start with ATW One.',
      },
    ],
    ctaTitle: 'Compare ATW One with your HubSpot stack',
    ctaDescription:
      'Tell us what you run today. We will map ATW One, Hub, and Directory to your workflows, or be direct if staying on HubSpot is the smarter fit.',
  },
  {
    slug: 'salesforce',
    targetQuery: 'ATW vs Salesforce',
    competitorName: 'Salesforce',
    title: 'ATW vs Salesforce | unified workspace vs CRM platform',
    description:
      'Compare ATW One with Salesforce: unified CRM, finance, operations, AI, and Directory versus a CRM-centered enterprise platform, plus when each fit is stronger.',
    h1: 'ATW vs Salesforce',
    directAnswer:
      'ATW One is a unified workspace for CRM, finance, operations, AI, and Directory on one organization, with Hub productivity included with every paid ATW plan and usage billed from a shared Credits pool. Salesforce is widely known as an enterprise CRM platform (Sales Cloud, Service Cloud, and a large AppExchange ecosystem). Choose ATW when you want hosted ERP/CRM with finance and operations in the same suite. Choose Salesforce when you need deep CRM customization, enterprise CRM programs, or an existing Salesforce org you plan to keep.',
    tableCaption: 'ATW One and Salesforce: approach comparison',
    rows: [
      {
        dimension: 'What it is',
        atw: 'Hosted ATW One ERP/CRM with finance and operations beside CRM, AI on organization Credits, Directory for access, and Hub productivity with every paid ATW plan.',
        other:
          'Salesforce is a leading CRM platform known for sales and service clouds, platform customization, and a large partner and AppExchange ecosystem.',
      },
      {
        dimension: 'Primary focus',
        atw: 'One shared suite: CRM, finance, operations, HR, marketing, knowledge, custom apps, plus Directory and Agents.',
        other:
          'CRM depth first: pipeline, accounts, cases, automation, and industry clouds, with many adjacent products added around the CRM core.',
      },
      {
        dimension: 'Finance and operations',
        atw: 'Finance and operations share records with CRM inside ATW One.',
        other:
          'Salesforce is primarily known for CRM. Finance and ERP-style operations usually come from separate products or partners rather than as the default Salesforce footprint.',
      },
      {
        dimension: 'Billing model',
        atw: 'Base hosting tier plus a shared Credits pool. Not per-seat for the core suite. See published tiers on /pricing/.',
        other:
          'Salesforce commonly licenses by edition and named users across clouds. Confirm current packaging on Salesforce\'s pricing pages; this comparison does not quote Salesforce prices.',
      },
      {
        dimension: 'Customization and delivery',
        atw: 'Extend with custom apps on ATW One; ATW Services can implement or build around One. ATW Services also implements Salesforce when you choose to stay on that stack (see /partners/salesforce).',
        other:
          'Deep declarative and programmatic customization, plus a large consulting and AppExchange ecosystem for industry and add-on needs.',
      },
      {
        dimension: 'Mail, Hub, Directory, and AI',
        atw: 'Mail included with every paid ATW plan (hosted inboxes use Credits). Hub for Chat, Calendar, Meetings, and Tasks. Directory for sign-in and system access. AI draws from Credits.',
        other:
          'Email and calendar usually integrate with corporate Google or Microsoft accounts. Salesforce markets Einstein and related AI features inside CRM workflows for eligible products.',
      },
    ],
    chooseAtw: [
      'You want CRM, finance, and operations in one ATW-hosted workspace with Directory and Credits-based usage.',
      'You prefer published hosting plus Credits on /pricing/ over scaling mainly by CRM user licenses.',
      'You want Mail and Hub on the same organization as ERP/CRM without a separate productivity identity plane.',
      'You want direct access to the team that builds ATW One for implementation and custom apps.',
    ],
    chooseOther: [
      'You already run Salesforce as the CRM system of record and have processes, integrations, or AppExchange apps built around it.',
      'You need enterprise CRM program depth, multi-cloud Salesforce roadmaps, or industry clouds your team already standardized on.',
      'Your buying process expects classic per-user CRM licensing and a large SI ecosystem.',
      'You specifically need Salesforce platform capabilities ATW does not mirror feature-for-feature.',
    ],
    faqs: [
      {
        q: 'Is ATW a Salesforce alternative?',
        a: 'Yes for teams comparing a unified ERP/CRM workspace with a CRM platform. ATW One centers CRM with finance, operations, AI, and Directory. Salesforce centers deep CRM. Many buyers evaluate both when consolidating tools.',
      },
      {
        q: 'Can ATW Services still help if we stay on Salesforce?',
        a: 'Yes. ATW Services implements partner stacks, including Salesforce, when you choose to remain on that platform. See the Salesforce partner page and Services.',
      },
      {
        q: 'How does ATW billing differ from Salesforce at a high level?',
        a: 'ATW uses a base hosting tier plus a shared Credits pool, with published hosting tiers on /pricing/. Salesforce typically licenses by edition and users. Confirm Salesforce\'s current terms on its pricing pages; we do not quote competitor prices here.',
      },
      {
        q: 'Does Salesforce include company-wide finance and operations?',
        a: 'Salesforce is primarily known as CRM. Finance and full operations ERP usually sit in other systems unless you add separate products. ATW One includes finance and operations beside CRM in one workspace.',
      },
      {
        q: 'Where should I start if I am undecided?',
        a: 'Read this page, then open ATW One, or contact ATW for a process review. If your team is already deep in Salesforce, start from the Salesforce partner path instead of a rip-and-replace.',
      },
    ],
    ctaTitle: 'Compare ATW One with your Salesforce org',
    ctaDescription:
      'Tell us what you run today. We will map ATW One to your workflows, or help you stay on Salesforce if that is the better fit.',
  },
  {
    slug: 'quickbooks',
    targetQuery: 'ATW vs QuickBooks',
    competitorName: 'QuickBooks',
    title: 'ATW vs QuickBooks | unified workspace vs accounting',
    description:
      'Compare ATW One with QuickBooks: unified CRM, finance, operations, AI, and Directory versus accounting-first bookkeeping, plus when each fit is stronger.',
    h1: 'ATW vs QuickBooks',
    directAnswer:
      'ATW One is a unified workspace for CRM, finance, operations, AI, and Directory on one organization, with Hub productivity included with every paid ATW plan and usage billed from a shared Credits pool. QuickBooks is widely known as accounting and bookkeeping software for small and midsize businesses (invoicing, expenses, bank feeds, and financial reports). Choose ATW when you want CRM and operations beside finance in one suite. Choose QuickBooks when your primary need is dedicated accounting and you are happy keeping CRM and operations in other tools.',
    tableCaption: 'ATW One and QuickBooks: approach comparison',
    rows: [
      {
        dimension: 'What it is',
        atw: 'ATW One ERP/CRM workspace where finance shares records with CRM and operations, plus AI on Credits and Directory for access. Hub productivity is included with every paid ATW plan.',
        other:
          'QuickBooks is Intuit\'s accounting product family, best known for bookkeeping, invoicing, expense tracking, payroll add-ons, and financial reporting for small and midsize businesses.',
      },
      {
        dimension: 'Primary focus',
        atw: 'Unified CRM, finance, and operations with marketing, HR, knowledge, custom apps, Directory, and Agents on the same organization.',
        other:
          'Accounting and bookkeeping first. CRM, marketing automation, and full operations ERP are not what QuickBooks is primarily known for.',
      },
      {
        dimension: 'CRM and pipeline',
        atw: 'CRM and customer records are native in ATW One and shared with finance and operations.',
        other:
          'QuickBooks centers customers and invoices for accounting. Full sales pipeline CRM is usually handled in a separate CRM product.',
      },
      {
        dimension: 'Billing model',
        atw: 'Base hosting tier plus a shared Credits pool for the whole workspace. Not per-seat for the core suite. See /pricing/ for published hosting tiers.',
        other:
          'QuickBooks commonly sells by product edition and feature tier for accounting. Confirm current packaging on Intuit\'s QuickBooks pricing pages; this comparison does not quote QuickBooks prices.',
      },
      {
        dimension: 'Who it fits',
        atw: 'Teams consolidating sales, finance, and operations who want one ATW-hosted system of record with Mail, Hub, Directory, and AI available on the same org.',
        other:
          'Teams whose main job is keeping the books accurate, filing, and reporting, and who already have (or do not yet need) a separate CRM and operations stack.',
      },
      {
        dimension: 'AI and collaboration',
        atw: 'AI draws from organization Credits. Hub covers Mail, Chat, Calendar, Meetings, and Tasks with every paid ATW plan.',
        other:
          'QuickBooks focuses on accounting workflows. Collaboration and AI features, where offered, sit inside the accounting product rather than a full ERP/CRM plus Hub workspace.',
      },
    ],
    chooseAtw: [
      'You want finance beside CRM and operations in one workspace, not accounting alone.',
      'You prefer hosting plus Credits for the whole suite (see /pricing/) instead of separate CRM, mail, and books products.',
      'You want Directory, Hub, and AI on the same organization as finance.',
      'You may need custom apps or ATW Services implementation on ATW One as processes grow beyond bookkeeping.',
    ],
    chooseOther: [
      'Your primary need is dedicated accounting and bookkeeping, and CRM or operations can stay elsewhere (or wait).',
      'Your accountant or bookkeeper already standardizes on QuickBooks workflows and file handoffs.',
      'You specifically need QuickBooks-native banking, tax, or payroll paths your firm already uses.',
      'You want the simplest accounting-only footprint rather than a full ERP/CRM workspace.',
    ],
    faqs: [
      {
        q: 'Is ATW a QuickBooks alternative?',
        a: 'Yes for teams that want finance inside a unified ERP/CRM workspace. ATW One includes finance beside CRM and operations. QuickBooks is accounting-first. If you only need books, QuickBooks may remain the better fit.',
      },
      {
        q: 'Does ATW One replace QuickBooks for bookkeeping?',
        a: 'ATW One includes finance modules in the same workspace as CRM and operations. Whether it replaces your current books depends on your chart of accounts, accountant preferences, and reporting needs. Contact ATW for a process review before you switch.',
      },
      {
        q: 'How does ATW billing differ from QuickBooks at a high level?',
        a: 'ATW uses a base hosting tier plus a shared Credits pool across the workspace, with published tiers on /pricing/. QuickBooks packages accounting editions separately. Confirm QuickBooks pricing on Intuit\'s site; we do not quote competitor prices here.',
      },
      {
        q: 'Can I keep QuickBooks and still use ATW?',
        a: 'Some teams evaluate ATW One for CRM and operations while finance stays on an accounting product temporarily. Talk to ATW about your current stack. Do not assume an automatic QuickBooks sync unless it is scoped as a Services engagement.',
      },
      {
        q: 'Where should I start if I am undecided?',
        a: 'If accounting-only is the job, stay with or start on QuickBooks. If you want one system for pipeline, cash, and operations, start with ATW One and /pricing/, or contact ATW for a process review.',
      },
    ],
    ctaTitle: 'See if ATW One or QuickBooks fits your books',
    ctaDescription:
      'Share how you run CRM and accounting today. We will be direct about ATW One versus keeping QuickBooks for the books.',
  },
];

export function getComparePage(slug: string): ComparePage | undefined {
  return COMPARE_PAGES.find((page) => page.slug === slug);
}
