---
title: 'ComplyCrawl'
tagline: 'Compliance-first web automation toolkit'
description: 'A Python web-automation reference built around robots.txt checks, tamper-evident audit trails, and explicit crawl controls.'
status: 'reference'
category: 'Compliance Automation'
tags:
  [
    'compliance',
    'web-automation',
    'crawling',
    'seo',
    'audit-trail',
    'robots-txt'
  ]
features:
  - 'Automatic robots.txt enforcement before any request'
  - 'Consent-first architecture with explicit consent gates'
  - 'Encrypted audit trails with SHA-256 hash chains'
  - 'Three ready-to-use playbooks: SEO, Catalog, Link Health'
  - 'Intelligent throttling with crawl-delay observation'
  - 'CSV and PDF report exports for stakeholders'
  - 'Domain whitelisting and custom user-agent support'
  - 'SOC 2 / ISO 27001 control-mapping documentation'
included:
  - 'Full source code (Python with CLI)'
  - 'Three complete playbooks (SEO regression, Catalog monitoring, Link health)'
  - 'YAML configuration profiles'
  - 'Encrypted vault system with Fernet encryption'
  - 'Docker configuration'
  - 'Railway deployment template'
  - 'Demo output and documentation'
  - 'Test suite with pytest'
targetAudience:
  - 'Regulated industries needing compliant web automation'
  - 'Marketing agencies monitoring client SEO'
  - 'E-commerce businesses tracking catalog changes'
  - 'Compliance teams requiring audit trails'
order: 2
---

## What ComplyCrawl Does

ComplyCrawl is a **compliance-oriented web-automation reference** built to
make crawl policy, consent configuration, and audit history visible. It does
not make a deployment legally compliant by itself, and this page is not a sale
or license offer.

## The Problem It Solves

Traditional web scraping tools ignore compliance:

- No robots.txt respect—risking legal action
- No audit trails—impossible to prove compliant behavior
- No rate limiting—overloading target servers
- No consent gates—automation runs without explicit approval

ComplyCrawl solves this with compliance baked into every layer.

## Key Capabilities

### Guardrails System

- **robots.txt Parser**: Automatically fetches and evaluates robots.txt before any request
- **Consent Gates**: Config requires explicit `consent: true` flag
- **Domain Whitelisting**: Restrict automation to approved domains only
- **Custom User-Agent**: Identify your bot with purpose and contact info

### Encrypted Audit Vault

- **Append-Only Logging**: SHA-256 hash chains create tamper-evident audit trails
- **Encrypted Storage**: Artifacts encrypted with Fernet (AES-128)
- **Full Reproducibility**: Config snapshots with each run
- **Retention Controls**: Configurable data retention policies

### Three Reference Playbooks

**1. SEO Regression Monitoring**
Monitor page titles, meta descriptions, H1 tags, canonical URLs, and robots meta tags. Detect content changes with fingerprinting.

**2. Catalog/Product Monitoring**
Track product pages for price and availability changes. Configurable thresholds and historical trend analysis.

**3. Link Health Checking**
Monitor URLs for availability, track redirect chains, measure response times, and generate broken link reports.

### Intelligent Throttling

- Per-domain delays
- Crawl-delay directive observation
- Concurrency limits
- Random jitter to avoid detection

## Technical Details

- **Language**: Python 3.10+
- **CLI**: Click-based command interface
- **Database**: SQLite vault with Fernet encryption
- **Export**: CSV and PDF report generation
- **Config**: YAML-based with profile system
- **Testing**: pytest suite included
- **Deployment**: Docker + Railway template

## Reference Artifact Inventory

```
ComplyCrawl/
├── core/               # CLI and orchestration
├── playbooks/          # SEO, catalog, link health modules
├── audit/              # Encrypted vault and logging
├── compliance/         # Guardrails and consent enforcement
├── export/             # CSV and PDF report generators
├── config/             # YAML configuration examples
├── profiles/           # Pre-built profile templates
├── docs/               # Compliance pack, quick start guides
├── tests/              # pytest test suite
└── vault/              # Encrypted audit database (runtime)
```

## Sample Outputs — See the Actual Reports

These are sample artifacts produced by the reference playbooks. They show
format and behavior; they are not third-party audit evidence or certification:

- 📄 [Branded compliance report (PDF)](/downloads/complycrawl-sample-report.pdf) — sample output from the reference workflow
- 📊 [SEO regression findings (CSV)](/downloads/complycrawl-sample-seo-findings.csv)
- 📊 [Catalog monitor findings (CSV)](/downloads/complycrawl-sample-catalog-findings.csv)
- 📊 [Link health findings (CSV)](/downloads/complycrawl-sample-link-findings.csv)
- 📊 [Run summary (CSV)](/downloads/complycrawl-sample-run-summary.csv)
- 📄 [GDPR & SOC 2 control mapping (PDF)](/downloads/complycrawl-gdpr-mapping.pdf) — an engineering crosswalk, not legal advice or certification
- 📄 [Comparison vs Scrapy / Playwright / Crawlee (PDF)](/downloads/complycrawl-comparison.pdf)

## Free Tool

[**robots.txt Auditor →**](/tools/robots-audit) — paste any URL, get an instant compliance read of its crawl directives. Powered by ComplyCrawl's core engine.

## Control Mapping, Not Certification

The published [GDPR Article + SOC 2 TSC + ISO 27001 control crosswalk](/downloads/complycrawl-gdpr-mapping.pdf)
maps features to control language. A qualified reviewer still has to evaluate
the organization, deployment, policies, and evidence.

## FAQ

**Does this respect robots.txt automatically?**
Yes. The guardrails system fetches and evaluates robots.txt before any request. Disallowed paths are never crawled. There is no `--ignore-robots-txt` flag — that's intentional.

**What makes the audit trail tamper-evident?**
Each log entry includes a SHA-256 hash of the previous entry, creating a cryptographic chain. Any modification breaks the chain and is detectable on the next run.

**Can I add custom playbooks?**
Yes. The playbook framework is extensible. Documentation includes examples for creating new automation types.

**Does the mapping prove compliance?**
No. It is implementation documentation. It can support a vendor review, but it
does not satisfy controls on its own and should not be presented as an auditor's
opinion.

**Can Toledo Technologies build a scoped automation system from this work?**
Yes. A custom engagement starts by defining allowed domains, data handling,
retention, review ownership, and acceptance tests.
