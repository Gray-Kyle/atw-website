/**
 * ATW Orbit marketing facts for Option B (/orbit/).
 * Product console remains worksuite.atw.net until the new host is confirmed.
 * No per-seat SKU. Included with every paid ATW plan. Not in the 14-day trial.
 *
 * Live today: Mail, Calendar, Meetings.
 * Coming soon: Messaging (internal team chat), Docs, Spreadsheets, Presentations.
 */

import { PRODUCT } from '../lib/site';

/** Shared one-liner for nav, What's included, and page hero */
export const ORBIT_ONE_LINER =
  'Mail, calendar, and meetings in one orbit, with Messaging, Docs, Spreadsheets, and Presentations coming soon.';

/** Inclusion / Credits framing for Orbit (no per-seat SKU) */
export const ORBIT_INCLUSION =
  'Included with every paid ATW plan, with unlimited named seats. Apps like Mail are added per user and draw from your organization Credits pool. There is no separate per-seat SKU.';

export const ORBIT_WORDMARK = {
  webp: '/images/logo/atw-orbit-wordmark.webp',
  png: '/images/logo/atw-orbit-wordmark.png',
  alt: 'ATW Orbit logo',
  width: 1163,
  height: 397,
} as const;

export const ORBIT = {
  eyebrow: 'ATW Orbit',
  title: 'Each app is a planet in your Orbit',
  lead: `${ORBIT_ONE_LINER} ${ORBIT_INCLUSION}`,
  trialNote:
    'Not available during the 14-day Trial. Trial includes ATW One, Workforce, Directory, and ATW AI only.',
  inclusionNote: ORBIT_INCLUSION,
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
    summary: 'Add mailboxes for any user. Hosted inboxes draw from the organization Credits pool.',
    status: 'live',
  },
  {
    id: 'calendar',
    title: 'Calendar',
    summary: 'Shared calendars next to Mail for the whole organization.',
    status: 'live',
  },
  {
    id: 'meetings',
    title: 'Meetings',
    summary: 'Video meetings for the team, next to Mail and Calendar.',
    status: 'live',
  },
];

/** Named apps not live yet */
export const ORBIT_APPS_COMING_SOON: OrbitApp[] = [
  {
    id: 'messaging',
    title: 'Messaging',
    summary: 'Internal team messaging for your organization. Coming Soon.',
    status: 'coming-soon',
  },
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
