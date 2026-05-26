---
title: 'The $500/Year Plugin Tax Nobody Audits'
description: 'A two-location CT wellness brand was paying for 9 WordPress plugins they barely used. The site was loading in 18.5 seconds on mobile. Here is what the audit found.'
industry: 'Wellness · Multi-Location Retail'
services: ['Site Audit', 'Performance Diagnostics', 'Cost Analysis']
publishedDate: 2026-05-21
featured: true
results:
  - 'Mobile LCP: 18.5 seconds (industry-acceptable is under 2.5s)'
  - '9+ active plugins identified, ~$400-600/yr in license renewals'
  - 'Best Practices score: 58/100 mobile (mixed-content + deprecated APIs)'
  - 'Cleanse-program signup flow leaking on mobile due to render-blocking JS'
---

## The Subject

A two-location wellness brand in lower Fairfield County. Strong design, real loyalty
program, owner-operated. They sell juice cleanses and a small in-store experience.
The site is the entire top-of-funnel for the higher-margin cleanse subscription.

Stack on inspection: WordPress 6.8.5, Astra parent theme + child theme,
Elementor Pro 3.33, Essential Addons for Elementor, header-footer-elementor,
Astra Sites, popup-maker, user-registration, contact-form-7, pdf-embedder.

That is the kind of stack you inherit when a freelancer set it up two years ago
and you have not touched it since. Not malicious. Just accumulated.

## What the Audit Looked At

Three things, in order:

1. **What is it costing them per year?** Plugin licenses, hosting, the
   maintenance retainer if any. Most owners cannot answer this with confidence.
2. **What is each plugin actually doing?** Half the plugins on most aging WP
   stacks are no longer wired to anything user-facing.
3. **What is the mobile experience actually like?** Not desktop. Mobile. From a
   cold cache. With no service-worker warm-up.

## What We Found

**Cost stack, annualized:**

- Elementor Pro license: $99/yr
- Essential Addons Pro: $99/yr (likely; Lite tier present, behavior suggests Pro)
- Astra Pro (suspected): $59/yr
- Hosting (likely SiteGround or similar at this plugin combination): $300-500/yr
- Maintenance: unknown, but typically $50-150/mo retainer for a stack this complex

That is $850-2,300/yr to keep the lights on, before any improvement work happens.

**Performance, mobile:**

- Lighthouse mobile Performance: 41/100
- Largest Contentful Paint: 18.5 seconds
- First Contentful Paint: 4.25 seconds
- Total Blocking Time: 804 ms
- Best Practices: 58/100 (mixed content + deprecated APIs)

**Performance, desktop:**

- Performance: 62/100
- LCP: 2.4 seconds (acceptable)
- TBT: 428 ms

The gap between desktop and mobile is the entire story. Owners check their site on
desktop. New customers — the ones reached via the wellness brand's Instagram
spend — arrive on mobile, cold cache, 4G. That experience is what is converting
or not.

## What We Recommended

We did not recommend a rebuild. The design is fine. The brand is fine. The
problem is overhead — too many plugins doing too little, all loading on first
paint.

The actual fix list, prioritized by mobile-LCP impact:

1. **Remove or defer 4 of the 9 plugins.** Popup-maker, pdf-embedder,
   user-registration, and astra-sites do not need to be on the public-facing
   page load. Either remove (preferred) or defer to interaction.
2. **Replace Elementor on the home and cleanse pages** with raw Gutenberg
   blocks. Elementor is doing too much for templated layouts. Keep it on the
   pages where the team actually edits content.
3. **Fix the mixed-content warnings** (the 58 Best Practices score).
   Half-credit-fix; full credit needs the third-party scripts upgraded.
4. **Migrate hosting to a real WP host** (Kinsta, WP Engine, or Rocket.net).
   The current host is the long-tail of LCP — a single TTFB improvement
   from a slow shared host to a real WP-tuned host is usually 800ms-1.5s
   straight off LCP.

Estimated total work: 2-3 weeks. Estimated cost reduction: $200-400/yr in
plugin licenses dropped. Estimated mobile-LCP improvement: 18.5s → 4-6s
realistic, 2.5s aspirational.

## What This Audit Cost the Subject

Nothing. We do not bill for the diagnostic, and we do not require an
engagement to receive the writeup. The audit lives at the Delphi Fit Check
price point if the subject wants the written brief, or free if they just
want to know.

This case study is the kind of writeup we produce. Names anonymized, methodology
visible, no spin.

## What This Means For You

If your stack looks like the above — WordPress + Elementor + Astra + a stack
of plugins added over the years by different freelancers — your mobile
LCP is almost certainly the bottleneck on your highest-value flows.

The diagnostic is a real number, not a vibe. The fix is usually 70% removal,
20% replacement, 10% rewrite. Most engagements close at the Fit Check level
and walk out with a scoped plan, not a sales pitch.
