import {
  ERP_CREDITS_OVERAGE_NOTE,
  ERP_INCLUDED_CREDITS_BY_PLAN,
  ERP_TRIAL_DAYS,
  ERP_TRIAL_LABEL,
} from './erpOfferHome';

export const PRICING_FAQS = [
  {
    q: 'What is included in the ATW One trial?',
    a: `A ${ERP_TRIAL_LABEL} with full product access, ${ERP_INCLUDED_CREDITS_BY_PLAN.trial.toLocaleString('en-US')} included trial Credits, and no credit card required. One trial per organization domain.`,
  },
  {
    q: 'What happens when the trial ends?',
    a: `At day ${ERP_TRIAL_DAYS}, the trial pauses until you choose a paid plan. There is no second free trial on the same domain.`,
  },
  {
    q: 'Are named users charged on ATW One?',
    a: 'No. ATW One core has unlimited named users with no per-seat software fee. WorkSuite (mail, calendar, office, meetings, messaging) is priced separately per user per month.',
  },
  {
    q: 'How is WorkSuite priced?',
    a: 'Per user per month: Starter $12, Business $28, Scale $55. Annual is 10× monthly (2 months free). See the WorkSuite section above.',
  },
  {
    q: 'What are Credits and overage?',
    a: `Credits are the shared monthly usage pool for ATW One (records, automation, AI assists, messaging draw, storage footprint, and related activity). ${ERP_CREDITS_OVERAGE_NOTE}`,
  },
  {
    q: 'Can I buy Mail without WorkSuite?',
    a: 'Yes for mail-focused needs: start from the ATW Mail trial or mail pricing page, choose a mail-only plan, or contact us. WorkSuite bundles mail with calendar, office docs, and optional meetings/messaging when you want the full stack inside ATW One.',
  },
] as const;
