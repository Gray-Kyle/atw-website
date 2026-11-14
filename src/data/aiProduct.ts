/**
 * ATW AI marketing facts. Keep claims grounded: AI is built into the ATW
 * platform and draws from the organization Credits pool. Do not invent
 * live features or per-Credit rates.
 */

export const AI_PRODUCT = {
  eyebrow: 'ATW AI',
  oneLiner:
    'ATW AI is the platform AI layer: assistive intelligence across ATW systems, drawn from your organization Credits pool.',
  lead:
    'Use AI where you already work in ATW. Assistive workflows sit next to One, Workforce, Directory, Hub, and Orbit, billed from the same Credits pool.',
  trialNote: 'The 14-day Trial includes ATW One, Workforce, Directory, and ATW AI.',
  capabilities: [
    {
      title: 'Assistive work in context',
      detail:
        'Ask questions and draft work against the systems you already use, instead of a separate AI silo.',
    },
    {
      title: 'Shared Credits pool',
      detail:
        'AI usage draws from the organization Credits pool alongside apps, storage, and Workforce agent runs.',
    },
    {
      title: 'Human oversight',
      detail:
        'Keep people in the loop for anything that needs judgment. Pair with Workforce seats when you want named agent roles with limits.',
    },
    {
      title: 'Built into ATW',
      detail:
        'ATW AI is part of the platform, not a bolt-on SKU. Access follows Directory identity and your plan capacity.',
    },
  ],
  connections: [
    {
      title: 'ATW One',
      href: '/one/',
      detail: 'Use AI next to CRM, finance, and operations in the same organization.',
    },
    {
      title: 'ATW Workforce',
      href: '/workforce/',
      detail: 'Named agent seats for routine work sit beside One and share the Credits pool with ATW AI.',
    },
    {
      title: 'Directory',
      href: '/systems/directory/',
      detail: 'Who can sign in and which systems they can open, including AI access.',
    },
    {
      title: 'Hub and Orbit',
      href: '/hub/',
      detail:
        'Hub is included with every plan and connects Orbit, Google Workspace, Microsoft Teams, and Outlook. Orbit Mail, Calendar, and Meetings are live.',
    },
  ],
  consoleHref: 'https://ai.atw.net/',
  consoleLabel: 'Open ATW AI',
} as const;
