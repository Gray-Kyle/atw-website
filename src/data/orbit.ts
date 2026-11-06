/**
 * ATW Orbit marketing facts for Option B (/orbit/).
 * Product console remains worksuite.atw.net until the new host is confirmed.
 * No per-seat SKU. Paid hosting only. Not in the 14-day trial.
 *
 * Live today: Mail, Calendar, Meetings, Messaging.
 * Coming soon: Docs, Spreadsheets, Presentations.
 */

import { PRODUCT } from '../lib/site';

/** Shared one-liner for nav, What's included, and page hero */
export const ORBIT_ONE_LINER =
  'Mail, calendar, meetings, and messaging in one orbit, with Docs, Spreadsheets, and Presentations coming soon.';

export const ORBIT = {
  eyebrow: 'ATW Orbit',
  title: 'Each app is a planet in your Orbit',
  lead: `${ORBIT_ONE_LINER} Runs on paid hosting with unlimited named seats. There is no separate per-seat SKU.`,
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

export type OrbitApp = {
  id: string;
  title: string;
  summary: string;
  status: 'live' | 'coming-soon';
};

/** Live Orbit apps today */
export const ORBIT_APPS_LIVE: OrbitApp[] = [
  {
    id: 'mail',
    title: 'Mail',
    summary: 'Mail can be added for any user and draws from the organization Credits pool.',
    status: 'live',
  },
  {
    id: 'calendar',
    title: 'Calendar',
    summary: 'Shared calendars next to Mail.',
    status: 'live',
  },
  {
    id: 'meetings',
    title: 'Meetings',
    summary: 'Video meetings for the team.',
    status: 'live',
  },
  {
    id: 'messaging',
    title: 'Messaging',
    summary: 'Business SMS and voice messaging.',
    status: 'live',
  },
];

/** Named apps not live yet (exact product names Kyle wants kept) */
export const ORBIT_APPS_COMING_SOON: OrbitApp[] = [
  {
    id: 'docs',
    title: 'Docs',
    summary: 'Documents for team writing and collaboration.',
    status: 'coming-soon',
  },
  {
    id: 'spreadsheets',
    title: 'Spreadsheets',
    summary: 'Sheets for numbers, lists, and shared workbooks.',
    status: 'coming-soon',
  },
  {
    id: 'presentations',
    title: 'Presentations',
    summary: 'Decks for meetings and customer conversations.',
    status: 'coming-soon',
  },
];

export const ORBIT_APPS: OrbitApp[] = [...ORBIT_APPS_LIVE, ...ORBIT_APPS_COMING_SOON];
