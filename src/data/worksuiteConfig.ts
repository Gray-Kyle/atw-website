/**
 * WorkSuite — ATW One add-on: email, calendar, office, meetings, messaging.
 * Plans and module metadata drive dashboard UI; full build specs live under `docs/worksuite/`.
 */

export type WorkSuitePlanId = "starter" | "business" | "scale";

export type WorkSuitePlan = {
  id: WorkSuitePlanId;
  name: string;
  /** USD per user per month (list). */
  priceUsdPerUserMonth: number;
  /** Included capabilities (customer-facing wording; avoid vendor names in product copy). */
  includes: string[];
};

/** Annual prepay = 10× monthly (two months included). */
export const WORKSUITE_ANNUAL_MONTHS_BILLED = 10;

export const WORKSUITE_PLANS: WorkSuitePlan[] = [
  {
    id: "starter",
    name: "WorkSuite Starter",
    priceUsdPerUserMonth: 12,
    includes: [
      "Business email & shared calendars (your UI + optional desktop clients)",
      "Docs, spreadsheets, presentations, and PDFs inside ATW One",
    ],
  },
  {
    id: "business",
    name: "WorkSuite Business",
    priceUsdPerUserMonth: 28,
    includes: [
      "Everything in Starter",
      "HD video meetings (pooled minutes & fair-use caps)",
      "Business SMS, MMS, and voice (pooled credits; regulatory setup required)",
    ],
  },
  {
    id: "scale",
    name: "WorkSuite Scale",
    priceUsdPerUserMonth: 55,
    includes: [
      "Everything in Business with higher included pools",
      "Larger meeting capacity and recording allowances",
      "Higher messaging & voice pools with published overage paths",
    ],
  },
];

export type WorkSuiteModuleId =
  | "mail-calendar"
  | "office-documents"
  | "transactional-email"
  | "video-meetings"
  | "messaging-voice"
  | "outlook-desktop"
  | "ai-voice";

export type WorkSuiteModuleSpec = {
  id: WorkSuiteModuleId;
  /** Sidebar + card title */
  title: string;
  /** Short dashboard blurb */
  summary: string;
  /** Repository path to the long-form spec (for humans + AI agents in the IDE). */
  docRelativePath: string;
  /** Primary upstream systems (internal engineering vocabulary). */
  upstreamNotes: string;
  /** Which WorkSuite tier first ships this module (planning default). */
  minPlan: WorkSuitePlanId;
  implementationPhase: "discovery" | "mvp" | "beta" | "ga";
};

export const WORKSUITE_MODULES: WorkSuiteModuleSpec[] = [
  {
    id: "mail-calendar",
    title: "Mail & calendar",
    summary:
      "Hosted mailboxes, domain onboarding (MX/SPF/DKIM), shared calendars, and server-side mail APIs for your UI.",
    docRelativePath: "docs/worksuite/MODULE_MAIL_CALENDAR.md",
    upstreamNotes: "Zoho Mail + Zoho Calendar APIs; OAuth; partner / child org provisioning patterns.",
    minPlan: "starter",
    implementationPhase: "discovery",
  },
  {
    id: "office-documents",
    title: "Office documents",
    summary:
      "In-app Word/Excel/PowerPoint/PDF experiences with storage under your org model (embed + save-back).",
    docRelativePath: "docs/worksuite/MODULE_OFFICE_DOCUMENTS.md",
    upstreamNotes: "Zoho Office Integrator (or Zoho Writer/Sheet/Show within Workplace); webhook save path.",
    minPlan: "starter",
    implementationPhase: "discovery",
  },
  {
    id: "transactional-email",
    title: "Transactional email",
    summary:
      "System-generated email from ATW One (password resets, billing notices, automation)—isolated from user mail reputation.",
    docRelativePath: "docs/worksuite/MODULE_TRANSACTIONAL_EMAIL.md",
    upstreamNotes: "Zoho ZeptoMail (or SES); separate domains/agents from user mail.",
    minPlan: "starter",
    implementationPhase: "mvp",
  },
  {
    id: "video-meetings",
    title: "Video meetings",
    summary:
      "Scheduled and ad-hoc meetings, recordings policy, participant limits aligned to Business/Scale caps.",
    docRelativePath: "docs/worksuite/MODULE_VIDEO_MEETINGS.md",
    upstreamNotes: "Zoom Meeting API or Zoho Meeting; store recording metadata in tenant tables.",
    minPlan: "business",
    implementationPhase: "discovery",
  },
  {
    id: "messaging-voice",
    title: "Messaging & voice",
    summary:
      "SMS/MMS, programmable voice, optional WhatsApp Business—pooled usage, consent, and audit trails.",
    docRelativePath: "docs/worksuite/MODULE_MESSAGING_VOICE.md",
    upstreamNotes: "Twilio (10DLC, Messaging Service, Voice, WhatsApp templates).",
    minPlan: "business",
    implementationPhase: "discovery",
  },
  {
    id: "outlook-desktop",
    title: "Outlook & mobile sync",
    summary:
      "Document how customers attach Exchange ActiveSync clients to the hosted mailbox backend.",
    docRelativePath: "docs/worksuite/MODULE_OUTLOOK_DESKTOP.md",
    upstreamNotes: "Zoho ActiveSync (e.g. msync.zoho.com); app passwords / MFA flows.",
    minPlan: "starter",
    implementationPhase: "mvp",
  },
  {
    id: "ai-voice",
    title: "AI-assisted calling",
    summary:
      "Optional: conversational IVR, call summarization, or agent assist—tightly capped and billed as add-on usage.",
    docRelativePath: "docs/worksuite/MODULE_AI_VOICE.md",
    upstreamNotes: "Twilio conversational / speech products + your policy layer; HIPAA review if applicable.",
    minPlan: "scale",
    implementationPhase: "discovery",
  },
];

export function workSuiteModuleHref(id: WorkSuiteModuleId): string {
  return `/dashboard/worksuite/modules/${id}`;
}
