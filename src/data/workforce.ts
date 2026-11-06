/**
 * ATW Workforce marketing facts for design-preview Option B.
 * Product-truth from @ATW (authoritative). Workforce is a sibling system
 * beside One, Directory, and ATW AI (not a One CRM/Finance submodule).
 * Console: workforce.atw.net (same app as agents.atw.net, renamed from Agents).
 *
 * Do NOT claim live today: no agent runtime in production; seats/org still
 * demo/seed; checkout/billing/connections stubs; no verified autonomous
 * email/SMS/send or record-write from Workforce; runtime enforcement of
 * approval/caps/budget not verified.
 */

export const WORKFORCE = {
  eyebrow: 'ATW Workforce',
  /** Approved one-liner */
  oneLiner:
    "ATW Workforce is where your team's AI agents live next to One: named seats with goals, limits, and human oversight, billed in the same Credits pool.",
  /** Punchier aspiration for hero-adjacent framing; pair with coming-online language */
  aspiration:
    'Put a role on autopilot inside ATW: agents work next to One, under your limits.',
  autopilotHonest:
    "Set a role's goal and limits, then choose how much it can do without you: draft only, approve once, or auto within caps. Overseer (planned) catches anything that needs a person.",
  comingOnlineLabel: 'Coming online',
  inBuildLabel: 'In build',
  comingOnlineNote:
    'Named agent seats and approval modes are in build. Live agent runtime and production Workforce runs are not claimed yet.',
  siblingNote:
    'Workforce sits beside One, Directory, and ATW AI as a first-class ATW system on the same organization Credits and base-tier model.',
  trialNote: 'The 14-day Trial includes ATW One, Workforce, Directory, and ATW AI.',
  approvalModes: [
    {
      title: 'Draft and review',
      detail: 'Agents prepare work; a person approves before anything goes out.',
    },
    {
      title: 'Approve once, then run within limits',
      detail: 'Clear the plan once, then the seat continues inside daily and monthly caps.',
    },
    {
      title: 'Fully automatic within limits',
      detail: 'Run inside goal, tone, CTA, action, and budget caps you set.',
    },
  ],
  safeBullets: [
    'Named AI agent seats with goal, tone, CTA, daily action limit, monthly budget, and approval mode',
    'Approval modes: draft and review, approve once then run within limits, or fully automatic within limits',
    'Escalation paths when work needs a person',
    'Planned Overseer for catching anything outside limits',
    'Runs are intended to meter as Workforce agent runs in Credits (plus AI tokens)',
  ],
  consoleHref: 'https://workforce.atw.net/',
  consoleLabel: 'Open Workforce console',
  learnHref: '/agents/',
  learnLabel: 'Workforce overview',
} as const;
