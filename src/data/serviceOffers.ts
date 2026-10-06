export const workflowOffers = [
  {
    slug: 'repair',
    name: 'Workflow Repair',
    price: '$1,500',
    summary: 'Correct one reproducible failure in one supported workflow.',
    fit: 'You can show what should happen, what happens instead, and where the handoff fails.',
    delivered:
      'The agreed correction, acceptance checks, and evidence for the repaired path.',
    boundary:
      'Unknown causes or an unbounded system go to the separate $1,200 Integration Triage.'
  },
  {
    slug: 'setup',
    name: 'Workflow Setup',
    price: '$3,000',
    summary: 'Build one named event-to-result path using supported systems.',
    fit: 'The trigger, destination, required fields, owner, and successful result can be named.',
    delivered:
      'A configured workflow with success, rejection, and duplicate-handling evidence.',
    boundary:
      'Client-owned platform accounts, subscriptions, permissions, and third-party fees are separate.'
  },
  {
    slug: 'care',
    name: 'Workflow Care',
    price: '$500/month',
    summary: 'Check one registered workflow and keep its evidence current.',
    fit: 'The workflow has passed acceptance and supports safe scheduled checks.',
    delivered:
      'Daily read-only checks where supported, weekly synthetic checks, an evidence report, and bounded correction time.',
    boundary:
      'Per workflow. No 24/7 response, uptime SLA, or guarantee that every real submission is delivered.'
  }
] as const;

export const capacity = {
  projects: 1,
  careWorkflows: 3
} as const;

export const briefServices = [
  ['repair', 'Repair a failing workflow'],
  ['setup', 'Set up one workflow'],
  ['care', 'Check an accepted workflow'],
  ['custom', 'Scope a custom business tool'],
  ['web', 'Build or improve a website'],
  ['migration', 'Evaluate a site migration'],
  ['mobile', 'Discuss a native mobile need'],
  ['unsure', 'I am not sure yet']
] as const;

export type BriefService = (typeof briefServices)[number][0];

export function isBriefService(value: string | null): value is BriefService {
  return briefServices.some(([service]) => service === value);
}
