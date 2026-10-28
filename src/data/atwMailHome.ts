import { ERP_TRIAL_LABEL, ERP_TRIAL_PROMO_LABEL } from './erpOfferHome';
import { MAIL_SIGNIN, MAIL_SIGNUP } from '../lib/site';

export const ATW_MAIL_PRODUCT_NAME = 'ATW Mail';

export const ATW_MAIL_HERO = {
  badge: ATW_MAIL_PRODUCT_NAME,
  headline: 'Secure business email for your organization',
  subhead:
    'Professional @yourdomain.com mailboxes with webmail, admin controls, and standard IMAP/SMTP. Start with a free trial, then keep mail only or add the full WorkSuite inside ATW One.',
  primaryCta: `Start ${ERP_TRIAL_LABEL}`,
  primaryHref: MAIL_SIGNUP,
  secondaryCta: 'Sign in to webmail',
  secondaryHref: MAIL_SIGNIN,
} as const;

export const ATW_MAIL_FEATURE_PILLARS = [
  {
    title: 'Your domain, your brand',
    body: 'Send and receive as you@company.com. Onboard custom domains with guided MX, SPF, DKIM, and DMARC setup.',
  },
  {
    title: 'Ad-free and professional',
    body: 'No ads in your inbox. Clean webmail built for business, not consumer mail with upsells.',
  },
  {
    title: 'Part of WorkSuite, or mail on its own',
    body: 'Use ATW Mail standalone, or upgrade to WorkSuite for calendar, office files, meetings, and messaging in the same ATW One workspace.',
  },
  {
    title: 'Works with your favorite email app',
    body: 'Outlook, Gmail, Apple Mail, Thunderbird, and other IMAP/SMTP clients connect with standard settings on desktop and mobile.',
  },
  {
    title: 'Security built in',
    body: 'TLS in transit, spam filtering, and tenant isolation aligned with ATW One org boundaries.',
  },
  {
    title: 'Migration ready',
    body: 'Move from Gmail, Microsoft 365, or Zoho with IMAP import. We meet you where you are today.',
  },
] as const;

export const ATW_MAIL_FAQ = [
  {
    q: 'How is ATW Mail different from personal Gmail or iCloud?',
    a: 'ATW Mail is hosted business email on your domain with an admin console, multiple mailboxes per organization, and deliverability controls (SPF, DKIM, DMARC). It is designed for teams, not individual consumer accounts.',
  },
  {
    q: 'Can I use Outlook, Gmail, Apple Mail, or another app?',
    a: 'Yes. Any client that supports IMAP and SMTP can connect, including Outlook, Gmail (via Add account), Apple Mail, Thunderbird, and most mobile mail apps.',
  },
  {
    q: 'Is there a free plan forever?',
    a: `No. There is no permanent free tier. ATW Mail starts with a ${ERP_TRIAL_PROMO_LABEL.toLowerCase()}. After the trial, choose mail-only billing or add WorkSuite for calendar, documents, and more.`,
  },
  {
    q: 'What is the difference between ATW Mail and WorkSuite?',
    a: 'ATW Mail is business email only: webmail, custom domain, and admin. WorkSuite adds shared calendars, in-app office files, and optional meetings and messaging, all integrated into your ATW One dashboard.',
  },
  {
    q: 'What DNS records do I need?',
    a: 'Typically MX pointing to mx.mail.atw.net, SPF and DKIM TXT records, and DMARC. The admin wizard shows exact values for your domain and polls until verification succeeds.',
  },
  {
    q: 'How does ATW Mail relate to ATW One?',
    a: 'ATW One is your CRM, finance, and operations workspace. ATW Mail can run standalone at mail.atw.net, or as the email module inside WorkSuite when you use ATW One, with the same org and sign-in.',
  },
] as const;

export { ERP_TRIAL_LABEL, ERP_TRIAL_PROMO_LABEL };
