---
title: 'A Public WordPress Stack, Costed Carefully'
description: 'A May 2026 independent research snapshot showing observed plugins, synthetic performance measurements, and the assumptions behind a cost model.'
industry: 'Wellness · Multi-Location Retail'
services: ['Site Audit', 'Performance Diagnostics', 'Cost Analysis']
publishedDate: 2026-05-21
measurementDate: 2026-05-21
featured: true
evidenceType: 'independent-research'
evidenceNote: 'Independent public-site research. The business did not hire Toledo Technologies; pricing and stack details are estimates unless explicitly marked observed.'
limitations: 'Public inspection cannot establish paid license tiers, hosting invoices, maintenance fees, conversion impact, or the effect of a proposed fix.'
results:
  - 'Captured mobile LCP: 18.5 seconds in the dated synthetic run'
  - '9 public plugin/theme signatures observed; paid tiers were not verified'
  - 'Captured mobile Best Practices score: 58/100'
  - 'No invoice, conversion, or post-fix outcome data was available'
---

## Evidence Label

This is an **independent research note**, not a client case study. The business
did not commission the work. Public technology signatures and dated synthetic
tests are observations; costs and remedies below are explicitly estimates or
investigation paths.

## The Subject

A two-location wellness brand in lower Fairfield County. Strong design, real loyalty
program, owner-operated. They sell juice cleanses and a small in-store experience.
The site is the entire top-of-funnel for the higher-margin cleanse subscription.

Stack on inspection: WordPress 6.8.5, Astra parent theme + child theme,
Elementor Pro 3.33, Essential Addons for Elementor, header-footer-elementor,
Astra Sites, popup-maker, user-registration, contact-form-7, pdf-embedder.

Public inspection cannot establish who installed the stack, when, or why. It
only shows what the site exposed on the measurement date.

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

- Elementor Pro public list price at the time: $99/yr if a paid tier was active
- Essential Addons: paid tier not verified
- Astra: paid tier not verified
- Hosting provider and invoice: unknown
- Maintenance agreement: unknown

Without invoices, an annual total would be speculation. A commissioned audit
would request renewals and hosting bills before calculating savings.

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

The desktop/mobile gap is a reason to inspect device-specific payload and
rendering. The public run did not include traffic-source or conversion data.

## What We Recommended

The snapshot does not justify a rebuild. It justifies tracing which public
scripts and styles contribute to the tested critical path.

The actual fix list, prioritized by mobile-LCP impact:

1. **Remove or defer 4 of the 9 plugins.** Popup-maker, pdf-embedder,
   user-registration, and astra-sites do not need to be on the public-facing
   page load. Either remove (preferred) or defer to interaction.
2. **Replace Elementor on the home and cleanse pages** with raw Gutenberg
   blocks. Elementor is doing too much for templated layouts. Keep it on the
   pages where the team actually edits content.
3. **Fix the mixed-content warnings** (the 58 Best Practices score).
   Half-credit-fix; full credit needs the third-party scripts upgraded.
4. **Verify hosting before recommending a migration.** The provider and invoice
   are unknown. Repeat regional tests and isolate server response time before
   deciding whether a hosting move belongs in the scope.

Timeline, savings, and performance targets should be set only after access to
the plugin licenses, hosting account, and repeatable traces.

## What This Audit Cost the Subject

Nothing—because this was not commissioned or delivered to the subject. A paid
Delphi Fit Check is a separate engagement with agreed access, a written
deliverable, and explicit limitations.

This research note shows the reasoning format. It is not proof of a client
relationship or a completed improvement.

## What This Means For You

If your stack resembles the one above, measure the highest-value flows directly
before assuming plugin count is the bottleneck.

The diagnostic should end in evidence: a dated trace, a list of verified costs,
an ordered change set, and a re-test plan. The [sample deliverable](/case-studies/)
shows that structure.
