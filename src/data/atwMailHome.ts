import { ERP_TRIAL_LABEL, ERP_TRIAL_PROMO_LABEL } from './erpOfferHome';
import { MAIL_SIGNIN, MAIL_SIGNUP } from '../lib/site';

export const ATW_MAIL_PRODUCT_NAME = 'ATW Mail';

export const ATW_MAIL_HERO = {
  badge: ATW_MAIL_PRODUCT_NAME,
  headline: 'Secure business email for your organization',
  subhead:
    'Professional @yourdomain.com mailboxes with webmail, admin controls, and standard IMAP/SMTP. Mail is an ATW Orbit app; hosted inboxes draw from the organization Credits pool.',
  primaryCta: 'See Mail pricing',
  primaryHref: '/pricing',
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
    title: 'Included in ATW Orbit',
    body: 'Mail is an ATW Orbit app, not a separate product or SKU. Add mailboxes for any user; hosted inboxes draw Credits. Mail and Orbit mailboxes are not part of the trial.',
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
    a: 'Yes. Any client that supports IMAP and SMTP can connect, including Outlook, Gmail (via Add account), Apple Mail, Thunderbird, and most mobile mail apps. ATW Hub is an Outlook-like client that can also connect to ATW Orbit.',
  },
  {
    q: 'Is there a free plan forever?',
    a: 'No. There is no permanent free tier. Mail ships with the ATW ERP plan as an Orbit app; hosted inboxes draw Credits. Users without a hosted inbox are free named seats. Mail is not available during the ATW trial.',
  },
  {
    q: 'What is the difference between ATW Mail and ATW Orbit?',
    a: 'ATW Mail is the business email app inside ATW Orbit. Orbit also includes Calendar and Meetings today, with Messaging, Docs, Spreadsheets, and Presentations Coming Soon. There is no separate Mail or Orbit per-seat SKU.',
  },
  {
    q: 'What DNS records do I need?',
    a: 'Typically MX pointing to mx.mail.atw.net, SPF and DKIM TXT records, and DMARC. The admin wizard shows exact values for your domain and polls until verification succeeds.',
  },
  {
    q: 'How does ATW Mail relate to ATW One?',
    a: 'ATW One is your CRM, finance, and operations workspace. Mail is an Orbit app on the same organization Credits pool. Sign-in and org boundaries stay shared across One, Orbit, and Hub.',
  },
] as const;

export { ERP_TRIAL_LABEL, ERP_TRIAL_PROMO_LABEL };
