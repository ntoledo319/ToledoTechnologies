---
title: 'A 29-Second Application Page Is Killing the Mission'
description: 'A New Haven nonprofit accelerator had an accessibility score of 100 and a mobile LCP of 29 seconds. The applicants who needed them most could not load the page.'
industry: 'Nonprofit · Accelerator'
services: ['Site Audit', 'Performance Diagnostics', 'Accessibility Review']
publishedDate: 2026-05-21
featured: false
results:
  - 'Mobile Largest Contentful Paint: 29.1 seconds'
  - 'First Contentful Paint: 6.98 seconds (catastrophic)'
  - 'Mobile Accessibility score: 100/100 (top 1% of audited sites)'
  - 'Desktop Performance: 35/100 (the problem is not just mobile networks)'
---

## The Subject

A New Haven nonprofit running an accelerator program for founders from
underrepresented backgrounds. Application-driven, mission-driven, well-staffed,
respected. The website hosts the program-application form, the case for support
for funders, and the board page.

## The Premise of the Audit

This was not a complaint-driven audit. The subject did not ask for one. We ran
it because their mission and their measured technical investment lined up — a
perfect 100 mobile Accessibility score is the kind of thing that only happens
when the team genuinely cares about access — and we wanted to know whether
the performance side of the build matched the accessibility side.

It did not.

## What We Found

| Metric | Mobile | Desktop |
|---|---|---|
| Performance | 40/100 | 35/100 |
| Largest Contentful Paint | 29.1s | 3.3s |
| First Contentful Paint | 6.98s | 1.95s |
| Total Blocking Time | 574ms | 1.82s |
| Accessibility | **100** | 96 |
| SEO | 92 | 92 |
| Best Practices | 96 | 96 |

The accessibility score is in the top 1% of sites we audit. The mobile
performance score is in the bottom 5%.

These are not separable concerns. An accelerator whose entire reason for
existing is to support founders who do not have access to the same resources
as everyone else is hosting their application page in a way that requires a
fast laptop and a fast connection to even load.

The applicants who most need this program are the ones being filtered out
before the form renders.

## What Is Causing It

Without engaging — the subject did not hire us — three signals point to the
same cause:

1. **Desktop main-thread blocking is 1.82 seconds.** That is too much
   JavaScript executing on page load. Not a network problem; a payload problem.
2. **First Contentful Paint at 6.98 seconds on mobile** means the initial HTML
   does not arrive quickly. That is either a slow TTFB from the host, or
   render-blocking resources upstream.
3. **The site fetched from this network timed out at 60 seconds repeatedly.**
   Google's PSI crawl from a different region eventually got through. That
   pattern usually points to a hosting region mismatch — a host serving from
   a region far from most visitors.

The audit recommendation: a hosting migration is the largest single LCP
improvement available. That work alone usually halves mobile LCP for sites
on this configuration. After that, addressing the JS payload — likely a
heavy CMS template with too many widgets loaded on the public pages — is
the next 8-10 seconds of LCP improvement.

## What We Did Not Do

We did not pitch a rebuild. The site is good. The accessibility work is real.
The technical investment is uneven, not absent.

We did not contact the subject with a sales call. The audit was for our
research dataset; this writeup is the version of the audit that any subject
can request from us before deciding whether to engage.

## What This Looks Like For A Subject Who Wants Help

For a nonprofit at this performance level, the engagement looks like a
single-phase migration project: new host, new template structure on three
pages (home, apply, donate), no rebuild of the rest. Two to three weeks of
work. The application page LCP should drop from 29 seconds to under 5.

That is the conversation. No retainer required. Most nonprofits self-fund the
work after one application cycle measurably increases completion rates.

## What This Means For Other Nonprofits

If your accessibility score is high and your performance score is low, your
site is technically compliant with WCAG and practically inaccessible to your
audience. Both matter. Both are measurable. Neither requires a six-figure
agency to fix.
