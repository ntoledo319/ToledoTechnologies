# Supporting-pages alignment notes

**Path:** `toledotechnologies.com/{about,contact,portfolio,case-studies,codebases,nonprofit,policies,privacy,terms}`
**Type:** Lightweight alignment edits — these pages don't need full rewrites; existing copy is mostly right. The notes below specify what to keep, what to change, where to add cross-links to the new microsite ecosystem.
**Voice:** Vinyl-record liner-notes voice continues throughout.

---

## `/about` — light edit

**Current:** 108 lines. Existing copy positions the studio (Nicholas, the studio principles, the "no junior tier" mandate). Likely already in vinyl voice.

**Keep:** Everything about the studio's principles, philosophy, and "high-fidelity is a feeling" framing.

**Add (one short section near the bottom):**

> ### What's on Side B
>
> The catalog is split across five microsites — [custom websites](https://web.toledotechnologies.com), [productized WordPress exits](https://sitelift.toledotechnologies.com), [web apps and SaaS](https://apps.toledotechnologies.com), [native mobile](https://mobile.toledotechnologies.com), and [AI agents](https://ai.toledotechnologies.com). Each one has its own identity, its own pricing, its own discovery product. Same studio behind all of them; different front doors so the right buyer can find the right door.

**Cross-link footer:** Add `/care`, `/discovery`, `/partner` to the footer link block.

---

## `/contact` — light edit

**Current:** 262 lines. Probably the contact form + ways to reach.

**Keep:** Everything. The "letter to the reader" framing is too good to lose.

**Add (above the contact form, brief routing table):**

> ### Before you write
>
> If you already know which front door fits, you can skip this letter and go directly:
>
> - Custom website inquiry → [web.toledotechnologies.com](https://web.toledotechnologies.com)
> - WordPress exit / SiteLift → [sitelift.toledotechnologies.com](https://sitelift.toledotechnologies.com)
> - Web app / SaaS / internal tool → [apps.toledotechnologies.com](https://apps.toledotechnologies.com)
> - Mobile app → [mobile.toledotechnologies.com](https://mobile.toledotechnologies.com)
> - AI / automation → [ai.toledotechnologies.com](https://ai.toledotechnologies.com)
> - Care plans / maintenance → [/care](/care)
> - White-label as an agency → [/partner](/partner)
> - Genuinely don't know which one → keep writing.

**Form intent label:** Add a "What's this about?" select field at the top of the existing contact form so we can route inbound inquiries faster:

```html
<label>
  What's this about? *
  <select name="contact_intent" required>
    <option value="">Select…</option>
    <option value="custom-website">Custom website (ToledoWeb)</option>
    <option value="wordpress-exit">WordPress exit (SiteLift)</option>
    <option value="web-app">Web app / internal tool / SaaS</option>
    <option value="mobile">Mobile app</option>
    <option value="ai">AI / automation</option>
    <option value="care">Care / maintenance</option>
    <option value="partner">Agency partner</option>
    <option value="codebase">Codebase for sale</option>
    <option value="nonprofit">Nonprofit pricing</option>
    <option value="press">Press / interview / speaking</option>
    <option value="other">Other</option>
  </select>
</label>
```

**Cross-link footer:** Add `/discovery`.

---

## `/portfolio` — light edit

**Current:** 186 lines. Existing aggregated portfolio.

**Keep:** Everything. This is the canonical home for the portfolio across all microsites.

**Add (filter chips at the top):**

```
[ All ]  [ Websites ]  [ SiteLift / Migrations ]  [ Web apps ]  [ Mobile ]  [ AI ]  [ Codebases ]
```

Filter is HTML/CSS-only via radio inputs + `:checked` + sibling selectors. No JS framework.

**Add (small note at the top):**

> Each microsite shows a curated subset relevant to its offer. The full library lives here.

**Cross-link footer:** Add per-microsite portfolio deep-links — each goes to that microsite's `/portfolio` (where it exists).

---

## `/case-studies` — light edit

**Current:** Index + dynamic `[slug]` route.

**Keep:** Everything, including the dynamic case study collection.

**Add (per case-study tagging in `src/content/case-studies/config.ts`):**

Add a `microsite` field to the case-study schema (`web | sitelift | apps | mobile | ai | partner | codebase`). Each case study tagged accordingly. Microsite portfolio pages then deep-link individual studies back here using the slug.

**Add (top-of-page filter chips, same as /portfolio):**

```
[ All ]  [ Websites ]  [ Migrations ]  [ Web apps ]  [ Mobile ]  [ AI ]
```

**Cross-link footer:** Add `/discovery`.

---

## `/codebases` — light edit

**Current:** Index + dynamic `[slug]` route. Existing copy positions codebases as a Side B catalog item.

**Keep:** Everything. The framing as "deploy-ready repositories you own outright" stays.

**Add (one short anchor at the top):**

> Side B has two shelves. The five microsites — those are the custom-build front doors. This shelf — codebases — is the second one. Pre-built. Tested. Documented. Yours to deploy, modify, and resell. No service mark, no licensing trickery.

**Cross-link footer:** Add `/services` (as the catalog index) and `/care` (because most codebase buyers will want a Care plan to support what they deploy).

---

## `/nonprofit` — light edit

**Current:** 325 lines. Likely covers nonprofit pricing in detail.

**Keep:** Most existing copy.

**Edits:**

- **Add the friendly-pricing trade explicitly** (per `pricing-docs/PRICING.md` §"Discount & Friendly Pricing"): public case study rights, 2-minute video testimonial within 30 days of launch, strict scope (no "one more thing"), flexible timeline.
- **Add the friendly-tier price floors** for the most-relevant-to-nonprofit offers:
  - Signal: hard floor **$5,500**
  - Editorial Lander: hard floor **$8,500**
  - Studio: hard floor **$12,500**
  - SiteLift Launch: hard floor **$3,500**
  - SiteLift Lift: hard floor **$7,500**
  - Basic Care: hard floor **$500/mo**
  - Standard Support: hard floor **$1,000/mo**
- **Add the canonical hard rule:** _"Friendly clients are quoted at the published hard floor. The hard floor is the friendly price. We do not go below it."_
- **Add the "lower priority by design" note:** Friendly maintenance is lower commitment, lower scope, and lower priority than paid maintenance. Paying clients always take priority for support requests.

**Cross-link footer:** Add `/care`, `/services`.

---

## `/policies` — light edit

**Current:** 90 lines.

**Keep:** Everything. Likely covers the rules of engagement, working hours, response windows, etc.

**Edits:**

- Confirm response-window numbers match the new Care ladder (Basic: 1 business day, Standard: 4 hours, Product: same day, Strategic: 1 hour).
- Confirm any references to package names align with current taxonomy (Signal / Editorial Lander / Studio / Exodus / Atelier / You Dream It on the website side; Launch / Lift / Transform / White-Glove on SiteLift).
- Add reference to `/partner` for partner-specific policies (non-solicitation duration, IP assignment timing).

**Cross-link footer:** Add `/terms`, `/privacy`.

---

## `/privacy` — light edit

**Current:** 123 lines.

**Keep:** Almost everything.

**Edits:**

- Update third-party data processors list to include any new microsite analytics destinations (Plausible, PostHog, etc. as applicable).
- Add reference to the inquiry-form data flow per `DISCOVERY_INTAKE_SCHEMAS.md` engineering notes (no PII storage in form vendor; encrypted webhook → 24-hour expiry; per-product webhook endpoint).
- Confirm GDPR + CCPA opt-out language is current.

**No content rewrite needed.**

---

## `/terms` — light edit

**Current:** 140 lines.

**Keep:** Everything. Already canonical.

**Edits:**

- Confirm payment-structure tiers match `pricing-docs/PRICING.md` (currently: <$5K = 50/50, $5K–$15K = 40/40/20, $15K–$50K = 30/30/25/15, $50K+ = custom; Discovery / Audit = 100% upfront; Retainers = 1st of month upfront). The previous version may say "$5K–$10K" — should be **$5K–$15K** per current canonical.
- Add Care plan termination terms (30-day written notice).
- Add partner-specific terms reference (`/partner` non-solicitation, IP assignment).
- Add discovery credit rule explicitly (50% credits to project deposit if proceeding within 30 days; document is yours either way).

**Cross-link footer:** Add `/care`, `/partner`.

---

## Global edits (every page)

### Header navigation

Refactor the existing `Header.astro` component to surface the catalog. Two options:

**Option A — link list:**

```
[ Studio ]  [ Catalog ▾ ]  [ Care ]  [ Discovery ]  [ Partner ]  [ Codebases ]  [ Contact ]
                ├ Custom websites  → web.
                ├ WordPress exits  → sitelift.
                ├ Web apps + SaaS  → apps.
                ├ Mobile           → mobile.
                └ AI               → ai.
```

**Option B — single "Catalog" link to `/services`** which itself routes:

```
[ Studio ]  [ Catalog ]  [ Care ]  [ Discovery ]  [ Partner ]  [ Contact ]
```

Recommend Option B for simplicity and consistency with the vinyl-record framing (Catalog is one printed page; the microsites are entries on it).

### Footer

Per `/index` rewrite — four blocks: Side A · Side B (the five microsites) · The Inner Sleeve (`/care`, `/discovery`, `/partner`, `/codebases`, `/portfolio`) · The Liner (`/privacy`, `/terms`, `/policies`, `/nonprofit`, `/blog`).

### SEO

- Each microsite link from main brand should NOT use `rel="noopener noreferrer"` together with `target="_blank"` by default — let the visitor decide. Use `rel="noopener"` for safety only.
- Add hreflang or canonical hints if and when microsites end up in search differently than expected; for now, each microsite is its own root canonical.
- Sitemap.xml should include all main-brand pages but NOT the microsite roots — those have their own sitemaps.

---

_ToledoTechnologies (main brand) — supporting-pages alignment notes (2026-05-11)_
