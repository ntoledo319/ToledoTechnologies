---
title: 'When Lab and Field Performance Tell Different Stories'
description: 'A May 2026 research note comparing point-in-time Lighthouse results with the 28-day Chrome UX Report window for two public sites.'
industry: 'Retail · Tech Marketplace'
services: ['Site Audit', 'Performance Diagnostics', 'Field-Data Analysis']
publishedDate: 2026-05-22
measurementDate: 2026-05-22
featured: false
evidenceType: 'independent-research'
evidenceNote: 'Independent public-site research. Neither subject hired Toledo Technologies, and no post-engagement outcome is claimed.'
limitations: 'Lab runs are point-in-time tests; CrUX is an aggregated 28-day field window. The data shows a measurement gap, not its cause or a conversion-rate effect.'
results:
  - 'Observed lab mobile LCP: 12.6s and 13.6s in the captured runs'
  - 'Observed CrUX mobile LCP: 1.5s and 1.2s for the available 28-day windows'
  - 'The two datasets describe different test conditions and populations'
  - 'Root cause requires repeated traces and, ideally, first-party analytics'
---

## Evidence Label

This is an **independent research note**, not a client case study. The two
subjects did not commission the work. Toledo Technologies used public pages,
Lighthouse, and the public Chrome UX Report dataset; it had no access to either
company's analytics, deployment history, or customer data.

## Two Public Sites, Same Pattern

Both audited in the same week. Both small CT brands. Both have a press story
working in their favor — one was featured in a national magazine, the other
is a marketplace running ticketed events. Both have repeat-customer bases.

**Subject A:** Boutique apparel, Shopify, on Cloudflare. Mobile Lighthouse
Performance 28/100. Lab LCP 12.6 seconds. Field LCP, from real Chrome users
in the last 28 days: 1.5 seconds.

**Subject B:** Event-ticketing marketplace, Next.js, on Cloudflare. Mobile
Performance 30/100. Lab LCP 13.6 seconds. Field LCP, from real users:
1.2 seconds.

The lab and field numbers disagree sharply. That is the observation. It does
not establish which visitors saw which experience, why the gap existed, or
whether it changed conversion.

## What The Gap Could Mean

A warm cache, CDN path, device mix, geography, page mix, and changes made during
the 28-day CrUX window can all widen the gap between a single clean-room test
and aggregate field data. More than one may be operating at once.

Cold-cache cost is one plausible hypothesis worth testing because Lighthouse
starts clean while some field visitors return with cached assets. It is not a
finding about these subjects' customer mix. Only segmented first-party data or
controlled repeat tests could establish that.

## What This Audit Looked At

Three things:

1. **Lab data via Lighthouse.** What does Google's testing tool see when it
   loads the page from a clean Chrome instance, throttled to mobile-network
   speeds. This is what most agencies report.
2. **Field data via Chrome User Experience Report (CrUX).** What actual
   Chrome users have experienced visiting this page over the last 28 days.
   This is what Google's search ranking uses.
3. **The gap between them.** A large gap is a reason to investigate test
   conditions before prescribing work. It is not, by itself, a diagnosis.

## Working Hypotheses, Not Diagnoses

For Subject A, public-page inspection showed third-party application scripts.
An engagement would first trace their contribution, then remove or defer only
the scripts proven to block the critical path. No improvement number can be
promised from the public snapshot alone.

For Subject B, the captured lab run reported 4.07 seconds of Total Blocking
Time. Bundle analysis and a production trace would be needed before assigning
that time to a specific route or dependency. Code splitting and a performance
budget are candidate interventions, not conclusions from this snapshot.

## What This Means For You

If a clean lab run and field data disagree, resist the urge to optimize a
single score. Re-run the test, record the network and device profile, inspect
the trace, and segment first-party data if it exists.

The Lighthouse score in isolation is misleading.
The CrUX field score in isolation is misleading.
The gap between them is the question to investigate.

A commissioned audit turns that question into a reproducible baseline, trace
notes, prioritized fixes, and explicit limitations. The sample output on the
[Field Notes index](/case-studies/) shows the structure before you inquire.
