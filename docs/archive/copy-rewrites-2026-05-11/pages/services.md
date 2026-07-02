# `/services` — The Catalog (REWRITE)

**Path:** `toledotechnologies.com/services`
**Type:** Service router — every service line links to its microsite
**Replaces:** `src/pages/services.astro` (current copy lists Fix & Improve / Build Features / Automation / Codebase Sales / Nonprofit Support — replaced by 5-microsite catalog + cross-cutting plans)
**Voice:** Vinyl-record liner-notes voice continues. This is the printed catalog tucked inside the sleeve.

---

## Hero

### Eyebrow

**A2 — The Catalog**

### Headline

**Five sides of the catalog. One studio behind all of them.**

### Deck

The work splits five ways. Each side has its own microsite — its own identity, its own pricing, its own discovery product, its own front door. Pick the one that fits. If you're not sure, the [Discovery hub](/discovery) sorts that out.

---

## Section 1: The Catalog

> Format the five entries as a printed catalog page. Each is a card-sized block: title + short pitch + price band + discovery product + deep link. Six lines per card. Don't pad.

### A. ToledoWeb — Custom websites

_The work that gets screenshotted and shared._

- **Range:** $5,500 – $250,000+ across six packages
- **Discovery:** [Website Migration Audit ($1,500)](/discovery#website-audit) for migrations; package inquiry direct for the rest
- **Best for:** Founders, design-led brands, agencies routing premium work
- **Front door:** [→ web.toledotechnologies.com](https://web.toledotechnologies.com)

### B. SiteLift — WordPress exits

_Productized migrations off WordPress, Squarespace, and Wix._

- **Range:** $3,500 – $65,000+ across four packages (default: Lift @ $9,500)
- **Discovery:** [SiteLift Fit Check ($750)](/discovery#sitelift-fit-check)
- **Best for:** Small businesses bleeding money on WordPress maintenance
- **Front door:** [→ sitelift.toledotechnologies.com](https://sitelift.toledotechnologies.com)

### C. Toledo Apps — Web apps + SaaS

_Custom software that replaces the spreadsheets._

- **Range:** $15,000 – $750,000+ across seven tiers (Internal Tool through Enterprise SaaS)
- **Discovery:** [Web App Discovery ($3,500–$5,000)](/discovery#web-app-discovery) or [SaaS / Product Strategy ($7,500–$15,000)](/discovery#saas-strategy)
- **Best for:** Operations leaders, ops-heavy businesses, founders building SaaS
- **Front door:** [→ apps.toledotechnologies.com](https://apps.toledotechnologies.com)

### D. Toledo Mobile — Native + cross-platform

_iOS and Android apps that pass App Store review the first time._

- **Range:** $50,000 – $700,000+ across MVP / Standard / Production tiers
- **Discovery:** [Mobile App Discovery ($5,000–$7,500)](/discovery#mobile-discovery)
- **Best for:** Product owners, consumer brands, hardware-feature apps
- **Front door:** [→ mobile.toledotechnologies.com](https://mobile.toledotechnologies.com)

### E. Toledo AI — Agents + automation

_Production AI systems with governance, replay, cost caps, and human-in-loop._

- **Range:** $10,000 – $300,000+ from Workflow Automation to Production AI
- **Discovery:** [AI Automation Blueprint ($3,500–$10,000)](/discovery#ai-blueprint)
- **Best for:** Anyone who needs an autonomous system that respects data, security, and bills
- **Front door:** [→ ai.toledotechnologies.com](https://ai.toledotechnologies.com)

---

## Section 2: What sits across the catalog

Three things don't belong to a single microsite because they cut across all five.

### Care plans — _one maintenance ladder_

Whatever we ship, we maintain. Basic Care at $750/mo for static sites through Strategic Growth at $10,000+/mo for fractional engineering on production systems. Plus pure-dev Starter / Growth / Scale buckets if you'd rather buy hours than service.

[→ See the full ladder](/care)

### Discovery products — _six paid front doors_

Two are productized fixed-price — SiteLift Fit Check ($750) and Website Migration Audit ($1,500). Four are quote-based within published bands — Web App Discovery, AI Automation Blueprint, Mobile App Discovery, and SaaS / Product Strategy. The hub sorts you onto the right one.

[→ See all six discoveries](/discovery)

### Toledo Partner — _white-label for agencies_

$125/hr floor, $150–$175/hr for complex work, retainer buckets from $1,500/mo. Non-compete, full IP assignment, your-name-on-the-PR-not-ours. We can join your Slack or stay invisible.

[→ Inquire as a partner](/partner)

---

## Section 3: Other shelves on Side B

### Codebases for sale

Pre-built, documented, tested repositories you own outright. Buy and deploy. Browse the shelf.
[→ /codebases](/codebases)

### The Rescue — case studies

Systems we pulled out of the fire. Numbers, timelines, and what changed.
[→ /case-studies](/case-studies)

### Nonprofit pricing

501(c)(3) and mission-driven organizations get hard-floor pricing on Signal through Studio, plus reduced-rate Care plans. The trade is a written case study and a 2-minute testimonial.
[→ /nonprofit](/nonprofit)

---

## Section 4: How a project starts

> Single section near the bottom. Sets expectations.

> The first call is fifteen to thirty minutes. We talk about what you need, what you've tried, and what good looks like. By the end you'll know which microsite or discovery you belong in, what the band is, and when we could start.
>
> Most projects then move into a paid discovery — that's where we map the actual scope and produce a fixed-price quote. Discovery isn't a sales pitch dressed up; it's real work that produces a document you can use whether or not you hire us. Half the discovery fee credits toward the project deposit if you proceed within thirty days.
>
> If you want to skip the call, every microsite has its own inquiry form. They take five minutes and you get a real reply within a business day.
>
> [Write us a letter →](/contact) · [Skip to a microsite →](#section-1-the-catalog)

---

## CTA Banner

```
[Eyebrow] A2 / Outro

[H2] Two questions decide everything:
     What are you trying to ship,
     and when do you want it shipped?

[Deck] Either is enough to start a conversation.

[Buttons]
  → Write us a letter           (/contact)
  → Browse the discoveries      (/discovery)
```

---

## Engineering Notes

- The five catalog cards are the structural backbone — keep them visually parallel. Same six lines per card. Same ordering across the site (ToledoWeb, SiteLift, Apps, Mobile, AI).
- The "Discovery products" anchor links (`#sitelift-fit-check`, `#website-audit`, etc.) point to the corresponding section on `/discovery`. Defined there.
- This page replaces the existing `services.astro` entirely. The current `services/performance-audit.astro` sub-page can stay as-is or be folded into ToledoApps' discovery — that's a separate decision.
- FAQ from the current page (How do you price? / Timelines? / Who owns the code? / Maintenance? / NDAs? / Technologies?) is mostly already absorbed by individual microsite FAQs. Keep a short version here under "Frequently asked" if useful, or delete and rely on per-microsite FAQs.

---

_ToledoTechnologies (main brand) — `/services` rewrite draft (2026-05-11)_
