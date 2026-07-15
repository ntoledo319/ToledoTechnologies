---
title: 'TallySec'
tagline: 'Teach security in the language of finance'
description: 'A security-education reference that combines deterministic scoring, synthetic data, structured labs, assessments, and a FastAPI service.'
status: 'reference'
category: 'Security Education'
tags:
  [
    'security',
    'training',
    'ai-powered',
    'risk-scoring',
    'education',
    'lab-pack'
  ]
features:
  - 'Deterministic URL risk scoring engine with AI-powered insights'
  - 'Synthetic labeled dataset for training and demos'
  - '5 complete labs with student guides and instructor keys'
  - 'FastAPI microservice with Docker/Compose deployment'
  - 'Static dashboard for visualization'
  - 'Quiz bank with autograder for assessments'
  - 'ROC curve evaluation and metrics.json output'
  - 'Postman collection for API testing'
included:
  - 'Full source code (Python backend with FastAPI)'
  - 'Synthetic dataset (urls_synthetic_labeled.csv)'
  - '5 labs (student + instructor answer keys)'
  - 'Docker and Docker Compose configuration'
  - 'Static web dashboard'
  - 'Documentation: Quickstart, Instructor Guide, Syllabus, Rubric, FAQ'
  - 'Brand assets: Wordmark, icons, palette, brand guide'
targetAudience:
  - 'Training organizations teaching security'
  - 'Enterprises building internal security education programs'
  - 'Consultants delivering security workshops'
  - 'Universities and bootcamps with security curricula'
order: 1
---

## What TallySec Does

TallySec is a **Risk-to-Return reference build** that explores how a security
curriculum can connect technical findings to business language. It uses
synthetic data and is not a production scanner. This page documents capability;
it does not offer the repository for sale or license.

## The Problem It Solves

Security teams struggle to:

- Communicate technical findings to business stakeholders
- Quantify the business impact of vulnerabilities
- Justify security investments with ROI data
- Train staff on risk prioritization

TallySec provides a complete educational framework that teaches security in the language finance understands.

## Key Capabilities

### AI-Powered Risk Scoring

A deterministic, feature-based scoring engine prioritizes threats and translates technical severity into business impact metrics that executives can act on.

### Complete Lab Environment

Five structured labs take students from basics to advanced concepts. Each includes student materials and instructor answer keys for classroom or self-paced learning.

### Containerized API Reference

FastAPI microservice runs locally or containerized. Includes OpenAPI documentation, Postman collection, and example integrations.

### Assessment Suite

Quiz bank covers all modules with an autograder for automated evaluation. Generate certificates for course completion.

### Executive-Ready Outputs

Reports and dashboards present findings in ROI terms—perfect for board presentations and budget justification.

## Technical Details

- **Backend**: Python 3.9+ with FastAPI and Pydantic
- **API**: RESTful with automatic OpenAPI docs at /docs
- **Deployment**: Docker and Docker Compose included
- **Dashboard**: Static HTML at web/dashboard.html
- **Data**: Synthetic labeled CSV dataset
- **Dependencies**: fastapi, pydantic, uvicorn, requests

## Reference Artifact Inventory

```
TallySec/
├── tallysec/           # Core Python package (scanner, CLI, reports)
├── fastapi_service/    # API microservice
├── labs/               # 5 labs with student + instructor versions
├── training_kit_v1/    # Quizzes, exam, certificates, rubric
├── data/               # Synthetic datasets
├── web/                # Static dashboard
├── docs/               # Quickstart, Syllabus, FAQ
└── docs/               # Quickstart, syllabus, and operating notes
```

## Inspect the Reference

### 🚀 [Live Demo →](https://tallysec-demo.vercel.app/)

Paste a URL into the demonstration scanner and inspect its deterministic score.
The demo is educational, uses a simplified model, and is not a security
assessment of the submitted site.

### Downloadable materials

These samples show the curriculum structure and writing level:

- 📄 [Course Syllabus (PDF)](/downloads/tallysec-syllabus.pdf) — 8 modules, 15.5 contact hours, full topic breakdown
- 📄 [Sample Lab 1 — Student Version (PDF)](/downloads/tallysec-sample-lab.pdf) — inspect the depth and tone
- 📄 [Grading Rubric (PDF)](/downloads/tallysec-rubric.pdf) — 100-point final exam scoring
- 📄 [Competitive comparison vs Cybrary / Pluralsight / TryHackMe](/downloads/tallysec-comparison.pdf)

## What This Reference Demonstrates

- A deterministic teaching boundary separate from production scanning
- Synthetic datasets and instructor keys that make exercises reproducible
- An API, dashboard, and assessment flow packaged around the same concepts
- Clear disclaimers about what the score can and cannot establish

## FAQ

**Is this for production security scanning?**
No. TallySec is a training/demo bundle with synthetic data. It teaches concepts, not production threat detection.

**What's the technical skill level required?**
Labs progress from beginner to intermediate. Basic Python and API knowledge is helpful but not required.

**Can Toledo Technologies build a custom training system from these patterns?**
Yes. A scoped engagement would define the audience, curriculum ownership,
assessment rules, deployment, and accessibility requirements before quoting.
