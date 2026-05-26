---
title: 'Why Your Site Looks Fast To You And Slow To Everyone Else'
description: 'Two CT brands. Identical-looking Shopify and Next.js builds. Lab Lighthouse scores in the 20s and 30s. Field scores from real users at 1.2-1.5 seconds. The gap that decides your conversion rate.'
industry: 'Retail · Tech Marketplace'
services: ['Site Audit', 'Performance Diagnostics', 'Field-Data Analysis']
publishedDate: 2026-05-22
featured: false
results:
  - 'Lab mobile LCP: 12-13 seconds (catastrophic)'
  - 'Field mobile LCP (Chrome CrUX, real users): 1.2-1.5 seconds (excellent)'
  - 'Same site. Different visitors. 10x measured difference.'
  - 'The fix is not "speed up the site." The fix is "warm up first-time visitors."'
---

## Two Subjects, Same Pattern

Both audited in the same week. Both small CT brands. Both have a press story
working in their favor — one was featured in a national magazine, the other
is a marketplace running ticketed events. Both have repeat-customer bases.

**Subject A:** Boutique apparel, Shopify, on Cloudflare. Mobile Lighthouse
Performance 28/100. Lab LCP 12.6 seconds. Field LCP, from real Chrome users
in the last 28 days: 1.5 seconds.

**Subject B:** Event-ticketing marketplace, Next.js, on Cloudflare. Mobile
Performance 30/100. Lab LCP 13.6 seconds. Field LCP, from real users:
1.2 seconds.

If you only looked at the Lighthouse scores, both sites are broken.
If you only looked at the field data, both sites are great. Neither read is
the full picture.

## What Is Actually Happening

There is one site. There are two kinds of visitor.

**The repeat visitor**, the regular, the existing customer: they have warmed
caches, Cloudflare has their assets fingerprinted, the service worker is doing
its job, the browser already has the fonts and the framework runtime. They
experience the field-data version. Site loads in 1.2-1.5 seconds. They
convert.

**The first-time visitor**, the one who clicked a link from a press article,
a friend's text, an Instagram ad: cold cache, no CDN warm-up, has to fetch
the entire payload from scratch. They experience the lab-data version. Site
loads in 12-14 seconds on mobile. They bounce.

For Subject A, that is the visitor most affected by the recent press feature.
The exact group of new customers the press was supposed to win is the group
most punished by the slow first paint.

For Subject B, ticketing is by definition mostly first-time visitors for any
given event drop. Cold-cache performance is the entire game. A 4-second TBT
means the buy button is interactive seconds after the page renders, and on a
sold-out drop, those seconds are the entire conversion difference.

## What This Audit Looked At

Three things:

1. **Lab data via Lighthouse.** What does Google's testing tool see when it
   loads the page from a clean Chrome instance, throttled to mobile-network
   speeds. This is what most agencies report.
2. **Field data via Chrome User Experience Report (CrUX).** What actual
   Chrome users have experienced visiting this page over the last 28 days.
   This is what Google's search ranking uses.
3. **The gap between them.** Because the gap is the diagnostic. A small gap
   means the site is consistent. A large gap means the site behaves very
   differently for repeat vs. first-time visitors, and you need to fix the
   first-time experience specifically — not "the site."

## The Diagnosis For Both Subjects

For Subject A (Shopify boutique), the cause is third-party app overhead.
Most boutique Shopify stores accumulate 4-8 apps over the years: reviews,
popups, analytics, upsell, abandoned-cart. Each app injects JavaScript that
runs on first paint. The fix is an app audit — identify which apps are
earning their cost, defer or remove the rest. Estimated mobile-LCP
improvement: 12.6s → 4-5s on a cold cache. Two-week engagement.

For Subject B (Next.js marketplace), the cause is bundle weight. Total
Blocking Time on mobile is 4.07 seconds — the highest we measured in the
audited cohort. Next.js gives you the tools to fix this; the dev team
likely shipped features faster than they shipped perf. Recommendation:
route-level code splitting + a real performance budget. Likely 6-8 weeks
of engineering augmentation, not an agency rebuild.

## What This Means For You

If your owner-eyes-only experience of your site is fine and your conversion
rate from new traffic is bad, this is probably the diagnosis.

The Lighthouse score in isolation is misleading.
The CrUX field score in isolation is misleading.
The gap between them is the actual signal.

A real audit looks at both. A Fit Check from us takes about 90 minutes of
analysis and produces a written report at the same level of detail as the
above. No engagement required. No sales call attached.
