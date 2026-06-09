---
title: 'Rupture'
tagline: 'Migration kits for AWS platform deprecations — one CLI per deadline'
description: 'CLIs for the AWS deprecation deadlines that break production. Each kit scans your accounts, rewrites the broken code, patches the IaC, generates a safe canary plan, and produces a rollback script. Open-core (MIT); paid tiers add audit reports, real PRs, org licenses, and drift monitoring.'
status: 'available'
category: 'Cloud Infrastructure'
tags:
  [
    'aws',
    'migration',
    'lambda',
    'amazon-linux',
    'devops',
    'cli'
  ]
features:
  - 'al2023-gate — Amazon Linux 2 EOL (Jun 30, 2026)'
  - 'python-pivot — Lambda Python 3.9/3.10/3.11 EOL waves'
  - 'lambda-lifeline — Lambda Node.js 20 post-deadline cleanup'
  - 'Scan, codemod, audit, IaC patch, canary deploy, rollback'
  - 'Works offline via fixtures — evaluate before running against AWS'
  - 'GitHub Action for free PR checks'
  - '126 tests passing across all kits'
included:
  - 'All three CLI kits, MIT-licensed (free)'
  - 'Audit PDF — hash-anchored, deterministic severity report ($299)'
  - 'Migration Pack — a real PR opened on your repo with codemods + IaC patches + canary + rollback ($1,499)'
  - 'Org License — live rule-pack feed, private extensions, unlimited runs ($14,999/yr)'
  - 'Drift Watch — weekly re-scan + delta PDF on change ($19/mo)'
targetAudience:
  - 'Teams running production workloads on deprecated AWS runtimes'
  - 'DevOps and platform engineers facing AWS EOL deadlines'
  - 'MSPs and AWS consulting partners managing many client accounts'
  - 'Engineering leads who need a safe, tested migration path'
order: 0
price: 299
pricingNote: 'CLI free · paid tiers from $299'
externalLink: 'https://ntoledo319.github.io/Rupture'
externalLabel: 'View Rupture Kits →'
---

## What Rupture Does

AWS kills runtimes on a hard schedule. When a deadline passes, deploys fail, functions get frozen, and AMIs stop receiving patches. Most shops find out in production.

**Rupture ships one CLI per deadline.** Each kit scans your accounts, rewrites the broken code, patches the IaC, generates a safe canary plan, and produces a rollback script. All kits work offline via fixtures, so you can evaluate before you run them against AWS.

## The Deadlines

| Kit | Deadline | What breaks |
|---|---|---|
| **al2023-gate** | Jun 30, 2026 — Amazon Linux 2 EOL | `yum`, `amazon-linux-extras`, `ntpd`, `iptables`, Python 2 |
| **python-pivot** | Lambda Python 3.9/3.10/3.11 EOL waves | `distutils`, `imp`, `collections.Mapping`, native wheels |
| **lambda-lifeline** | Lambda Node.js 20 EOL (post-deadline cleanup) | `require()`, `aws-sdk` v2, OpenSSL 3 hashes |

## The Six Pillars

Every kit ships the same flow: **scan → codemod → audit → iac → deploy → rollback.** Everything is dry-run by default. Everything has a rollback path.

## How to Get It

The CLIs are free and MIT-licensed — clone and run them today. Paid tiers handle the parts a busy team wants done for them: a hash-anchored audit PDF, a real PR opened on your repo, an org-wide license, and continuous drift monitoring.

**[→ View Rupture Kits, docs, and pricing](https://ntoledo319.github.io/Rupture)**
