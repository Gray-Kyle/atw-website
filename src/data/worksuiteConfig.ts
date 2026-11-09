/**
 * ATW Orbit (legacy code id: WorkSuite): product label for Mail, Calendar,
 * Meetings, and Coming Soon apps (Messaging, Docs, Spreadsheets, Presentations).
 * Ships with the ATW ERP plan (base hosting + Credits). Plan tiers below are
 * capability grouping for product docs only (not sold as seat SKUs).
 * App host: https://orbit.atw.net
 */

export type WorkSuitePlanId = "starter" | "business" | "scale";

export type WorkSuitePlan = {
  id: WorkSuitePlanId;
  name: string;
  /** Included capabilities (customer-facing wording; avoid vendor names in product copy). */
  includes: string[];
};

export const WORKSUITE_PLANS: WorkSuitePlan[] = [
  {
    id: "starter",
    name: "ATW Orbit Starter",
    includes: [
      "Business email and shared calendars (your UI + optional desktop clients)",
      "Meetings for the team",
      "Docs, Spreadsheets, Presentations, and Messaging: Coming Soon",
    ],
  },
  {
    id: "business",
    name: "ATW Orbit Business",
    includes: [
      "Everything in Starter",
      "HD video meetings (pooled minutes and fair-use caps)",
      "Internal team messaging Coming Soon",
    ],
  },
  {
    id: "scale",
    name: "ATW Orbit Scale",
    includes: [
      "Everything in Business with higher included pools",
      "Larger meeting capacity and recording allowances",
      "Higher internal messaging capacity when Messaging ships",
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
  /** Which Orbit capability tier first ships this module (planning default). */
  minPlan: WorkSuitePlanId;
  implementationPhase: "discovery" | "mvp" | "beta" | "ga";
};

export const WORKSUITE_MODULES: WorkSuiteModuleSpec[] = [
  {
    id: "mail-calendar",
    title: "Mail and calendar",
    summary:
      "Hosted mailboxes, domain onboarding (MX/SPF/DKIM), shared calendars, and server-side mail APIs for your UI.",
    docRelativePath: "docs/worksuite/MODULE_MAIL_CALENDAR.md",
    upstreamNotes: "Zoho Mail + Zoho Calendar APIs; OAuth; partner / child org provisioning patterns.",
    minPlan: "starter",
    implementationPhase: "discovery",
  },
  {
    id: "office-documents",
    title: "Office documents (Coming Soon)",
    summary:
      "Coming Soon. In-app Docs, Spreadsheets, Presentations, and PDF experiences with storage under your org model.",
    docRelativePath: "docs/worksuite/MODULE_OFFICE_DOCUMENTS.md",
    upstreamNotes: "Zoho Office Integrator (or Zoho Writer/Sheet/Show within Workplace); webhook save path.",
    minPlan: "starter",
    implementationPhase: "discovery",
  },
  {
    id: "transactional-email",
    title: "Transactional email",
    summary:
      "System-generated email from ATW One (password resets, billing notices, automation), isolated from user mail reputation.",
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
    title: "Messaging (Coming Soon)",
    summary:
      "Coming Soon. Internal team messaging for people in the organization.",
    docRelativePath: "docs/worksuite/MODULE_MESSAGING_VOICE.md",
    upstreamNotes: "Internal chat product planning; not SMS or external voice.",
    minPlan: "business",
    implementationPhase: "discovery",
  },
  {
    id: "outlook-desktop",
    title: "Outlook and mobile sync",
    summary:
      "Document how customers attach Exchange ActiveSync clients to the hosted mailbox backend.",
    docRelativePath: "docs/worksuite/MODULE_OUTLOOK_DESKTOP.md",
    upstreamNotes: "Zoho ActiveSync (e.g. msync.zoho.com); app passwords / MFA flows.",
    minPlan: "starter",
    implementationPhase: "mvp",
  },
  {
    id: "ai-voice",
    title: "AI-assisted calling (Coming Soon)",
    summary:
      "Optional Coming Soon: conversational IVR, call summarization, or agent assist; tightly capped and billed as add-on usage.",
    docRelativePath: "docs/worksuite/MODULE_AI_VOICE.md",
    upstreamNotes: "Twilio conversational / speech products + your policy layer; HIPAA review if applicable.",
    minPlan: "scale",
    implementationPhase: "discovery",
  },
];

export function workSuiteModuleHref(id: WorkSuiteModuleId): string {
  return `/dashboard/worksuite/modules/${id}`;
}
