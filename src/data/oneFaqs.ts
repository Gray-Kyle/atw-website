import {
  ERP_CREDITS_MODEL_NOTE,
  ERP_INCLUDED_CREDITS_BY_PLAN,
  ERP_TRIAL_INCLUDED,
  ERP_TRIAL_LABEL,
  ERP_TRIAL_NOT_INCLUDED,
} from './erpOfferHome';

/** Visible FAQ + FAQPage JSON-LD for /one (no dollar amounts so schema stays safe sitewide). */
export const ONE_FAQS = [
  {
    q: 'What is ATW One?',
    a: 'ATW One is an ERP/CRM workspace that connects customers, sales, finance, operations, HR, and marketing in one system. Hosting plus a unified Credits pool covers usage, with unlimited named seats.',
  },
  {
    q: 'What are Credits?',
    a: `Credits are the shared usage pool for your organization. ${ERP_CREDITS_MODEL_NOTE}`,
  },
  {
    q: 'What is included in the free trial?',
    a: `A ${ERP_TRIAL_LABEL} with ${ERP_INCLUDED_CREDITS_BY_PLAN.trial.toLocaleString('en-US')} Credits and no credit card required. The trial includes ${ERP_TRIAL_INCLUDED.join(', ')}. Unlimited named seats. One trial per organization domain.`,
  },
  {
    q: 'Is email included with ATW One?',
    a: `Hosted mail inboxes are included on paid hosting tiers (Starter and above) and draw from your organization Credits pool. Not available during the trial: ${ERP_TRIAL_NOT_INCLUDED.join('; ')}.`,
  },
  {
    q: 'How does ATW Workforce relate to One?',
    a: "ATW Workforce is a first-class ATW system beside One, Directory, and ATW AI—not a CRM or Finance submodule inside One. Named AI agent seats share the same organization Credits and base-tier model. Seats and approval modes are in build; live agent runtime is not claimed yet.",
  },
  {
    q: 'Who builds and supports ATW One?',
    a: 'ATW.Net staff build and operate ATW One. Implementation and support stay with the same team instead of third-party resellers.',
  },
] as const;
