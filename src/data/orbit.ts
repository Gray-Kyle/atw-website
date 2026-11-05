/**
 * ATW Orbit marketing facts for Option B (/orbit/).
 * Product console remains worksuite.atw.net until the new host is confirmed.
 * No per-seat SKU. Paid hosting only. Not in the 14-day trial.
 */

import { PRODUCT } from '../lib/site';

export const ORBIT = {
  eyebrow: 'ATW Orbit',
  title: 'Each app is a planet in your Orbit',
  lead:
    'Mail, meetings, calendar, docs, and messaging in one orbit next to ATW One. Runs on paid hosting with unlimited named seats. There is no separate per-seat SKU.',
  trialNote:
    'Not available during the 14-day Trial. Trial includes ATW One, Workforce, Directory, and ATW AI only.',
  paidNote:
    'ATW Orbit ships with paid hosting where offered and draws from your organization Credits pool.',
  consoleHref: PRODUCT.worksuite,
  consoleLabel: 'Open ATW Orbit',
  moreComing: 'More apps coming into Orbit',
  moreComingDetail:
    'Additional productivity apps will join the same orbit over time. We will list them here when they are ready.',
} as const;

/** Current Orbit apps, named honestly from existing WorkSuite / marketing facts */
export const ORBIT_APPS = [
  {
    id: 'mail-calendar',
    title: 'Mail & calendar',
    summary: 'Business mail and shared calendars for your organization.',
  },
  {
    id: 'docs',
    title: 'Docs',
    summary: 'Documents for team writing and collaboration.',
  },
  {
    id: 'spreadsheets',
    title: 'Spreadsheets',
    summary: 'Sheets for numbers, lists, and shared workbooks.',
  },
  {
    id: 'presentations',
    title: 'Presentations',
    summary: 'Decks for meetings and customer conversations.',
  },
  {
    id: 'meetings',
    title: 'Meetings',
    summary: 'Video meetings for the team.',
  },
  {
    id: 'messaging',
    title: 'Messaging',
    summary: 'Business SMS and voice messaging.',
  },
] as const;
