import {
  ERP_CREDITS_MODEL_NOTE,
  ERP_INCLUDED_CREDITS_BY_PLAN,
  ERP_TRIAL_INCLUDED,
  ERP_TRIAL_LABEL,
  ERP_TRIAL_NOT_INCLUDED,
  ERP_TRIAL_PACKAGE,
} from './erpOfferHome';

export const PRICING_FAQS = [
  {
    q: 'What is included in the ATW trial?',
    a: `A ${ERP_TRIAL_LABEL} at $0 with ${ERP_INCLUDED_CREDITS_BY_PLAN.trial.toLocaleString('en-US')} Credits and no credit card required. The trial includes only ${ERP_TRIAL_INCLUDED.join(', ')}. Unlimited named seats. One trial per organization domain.`,
  },
  {
    q: 'What is not available during the trial?',
    a: `Not available during the trial: ${ERP_TRIAL_NOT_INCLUDED.join('; ')}.`,
  },
  {
    q: 'What happens when the trial ends?',
    a: `${ERP_TRIAL_PACKAGE.afterTrial} There is no second free trial on the same domain.`,
  },
  {
    q: 'Are named users charged per seat?',
    a: 'No. Pricing is hosting plus Credits, not per seat. You can invite as many named teammates as you want on Trial and paid plans.',
  },
  {
    q: 'What are Credits?',
    a: `Credits are the shared usage pool for your organization. ${ERP_CREDITS_MODEL_NOTE}`,
  },
  {
    q: 'Can I buy Mail without ATW Orbit?',
    a: 'Hosted mail inboxes are included on paid hosting tiers (Starter and above) and draw from your organization Credits pool. Mail is not available during the trial. There is no separate ATW Orbit per-seat SKU; Orbit is the product label for mail, calendar, documents, meetings, and messaging where offered on paid access.',
  },
  {
    q: 'What do paid plans include beyond Credits?',
    a: `Starter ($299/mo, ${ERP_INCLUDED_CREDITS_BY_PLAN.starter.toLocaleString('en-US')} Credits), Growth ($1,999/mo, ${ERP_INCLUDED_CREDITS_BY_PLAN.growth.toLocaleString('en-US')} Credits), and Business ($9,999/mo, ${ERP_INCLUDED_CREDITS_BY_PLAN.business.toLocaleString('en-US')} Credits) include Mail, Hub, and sandbox. Enterprise is custom; contact us.`,
  },
] as const;
