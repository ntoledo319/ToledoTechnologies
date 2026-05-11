# `/care` — Care Plans (NEW PAGE)

**Path:** `toledotechnologies.com/care`
**Type:** Single maintenance ladder for the entire business
**Status:** Net-new page — does not currently exist
**Voice:** Vinyl-record liner-notes voice continues
**Source of truth:** [`/Users/nicholastoledo/Development/pricing-docs/PRICING.md`](../../../pricing-docs/PRICING.md) §"Maintenance & Retainers"

---

## Hero

### Eyebrow

**B6 — Care Plans**

### Headline

**One maintenance ladder. Whatever we shipped, we maintain.**

### Deck

Sites, web apps, mobile apps, SaaS systems, AI workflows — they all attach to the same plans. The thing you bought matters less than how alive it needs to be. Pick the level that matches the rhythm of your work.

---

## Section 1: The two ladders

There are **two ways** to keep a system on retainer:

- **Care Plans** — managed maintenance with monitoring, support, and care. Hours are part of the plan; the rest of the plan is the relationship.
- **Buckets** — pure development hours, no monitoring, no support overhead. For clients who already know what they need built each month.

You can move between them. Most clients start on a Care Plan after launch and graduate to a Bucket once they know their cadence.

---

## Section 2: Care Plans

| Plan                 | Monthly     | Hours included | Best for                                                                   |
| -------------------- | ----------- | -------------- | -------------------------------------------------------------------------- |
| **Basic Care**       | $750/mo     | 2 hrs          | Static or simple sites — Signal, Editorial Lander, smaller Studio sites    |
| **Standard Support** | $1,500/mo   | 6 hrs          | Active businesses, CMS-driven sites (Studio, Exodus), light internal tools |
| **Product Support**  | $4,500/mo   | 15 hrs         | Apps, SaaS, AI systems with monitoring requirements                        |
| **Strategic Growth** | $10,000+/mo | 40 hrs         | Scaling startups, fractional engineering, multi-system care                |

### What's included at every tier

- **Hours.** Listed above. They cover bug fixes, content edits, small adjustments, security patches, and routine maintenance.
- **Monitoring.** Uptime, performance, error tracking. We know before you do.
- **Response window.** 1 business day on Basic Care; 4 hours on Standard; same-day on Product Support; 1 hour on Strategic Growth.
- **Front-of-queue priority.** Retainer clients move ahead of project work for support requests.
- **Quarterly check-in.** A short call covering performance, content, security, and what's next.

### What's NOT included (without scope or upgrade)

- Net-new feature work beyond what fits in the included hours
- Net-new integrations (we'll quote)
- Major redesigns or rebuilds (those become projects)
- Production AI cost overrides (those have their own cost-cap rules)

---

## Section 3: Bucket Retainers (pure dev hours, no monitoring)

| Plan               | Monthly   | Hours  | Effective rate |
| ------------------ | --------- | ------ | -------------- |
| **Starter Bucket** | $1,800/mo | 10 hrs | $180/hr        |
| **Growth Bucket**  | $4,000/mo | 25 hrs | $160/hr        |
| **Scale Bucket**   | $7,500/mo | 50 hrs | $150/hr        |

Buckets are for clients who:

- Already know what they need built each month and don't need monitoring on top
- Have an internal team that handles support but wants senior capacity for specific work
- Have graduated past the Care relationship and are operating mostly self-sufficiently

---

## Section 4: The shared rules

The same rules apply to every plan, Care or Bucket:

- **Hours expire monthly.** No rollover unless explicitly agreed.
- **Billed on the 1st.** Upfront, every month.
- **Overage rate** for hours beyond the included pool: $175/hr standard, $225–$275/hr for AI / architecture / security work.
- **30-day written notice** to cancel or change tiers.
- **Late or missed payment pauses work.** No exceptions.
- **Pure-dev Buckets are for existing clients.** New production systems should start on a Care Plan; once we know the cadence, you can move to a Bucket.

---

## Section 5: How to pick

> Three short paragraphs to make the decision easier. No table.

> If you have a website that mostly sits there — a Signal lander, an editorial site that updates a few times a quarter — **Basic Care at $750/mo** is enough. We patch security, fix bugs, swap content when you ask. Two hours covers it.

> If your site or app is part of how the business operates — content goes out weekly, the contact form is a real lead source, the team makes edits, integrations sometimes wobble — **Standard Support at $1,500/mo** is the right level. Six hours is enough for the work; the monitoring is what catches the problems before customers do.

> If we shipped you a SaaS, an internal tool, a mobile app, or a production AI system, you almost certainly need **Product Support at $4,500/mo or higher**. Fifteen hours is the floor for systems that need active monitoring; the response window is what keeps incidents short. **Strategic Growth at $10,000+/mo** is the level when we're effectively your fractional engineering team.

---

## Section 6: Friendly pricing

Nonprofits, friends, and approved trade clients get hard-floor Care pricing — $500/mo on Basic, $1,000/mo on Standard. Friendly tiers are lower commitment, lower scope, and lower priority by design. The trade is a written case study and a short testimonial. See [`/nonprofit`](/nonprofit) for the full set of friendly-pricing requirements.

Discovery is the only paid-engagement type with a special friendly exception, because it protects downstream scope.

---

## Section 7: Inquire

> A short inquiry form. Not a checkout — these are evaluated and quoted.

```html
<form
  action="/api/intake/care-plan-inquiry"
  method="POST"
  class="intake-form"
  data-product="care-plan"
>
  <input type="hidden" name="product" value="care-plan" />
  <input type="hidden" name="discovery_type" value="quote-based" />

  <fieldset>
    <legend>About the system</legend>

    <label>
      What kind of system needs care? *
      <select name="system_type" required>
        <option value="">Select…</option>
        <option value="website">
          Website (Signal / Editorial / Studio / Exodus / Atelier)
        </option>
        <option value="sitelift">SiteLift migrated site</option>
        <option value="web-app">Web app or internal tool</option>
        <option value="saas">SaaS product</option>
        <option value="mobile">Mobile app</option>
        <option value="ai">AI workflow / agent / production AI</option>
        <option value="multi">Multiple systems</option>
        <option value="other">Other</option>
      </select>
    </label>

    <label>
      Did Toledo Technologies build it? *
      <select name="we_built_it" required>
        <option value="">Select…</option>
        <option value="yes-recent">Yes — within the last year</option>
        <option value="yes-older">Yes — over a year ago</option>
        <option value="no-take-over">
          No — looking for someone to take it over
        </option>
      </select>
    </label>

    <label>
      Which plan are you considering? *
      <select name="plan_interest" required>
        <option value="">Select…</option>
        <option value="basic-care">Basic Care ($750/mo)</option>
        <option value="standard-support">Standard Support ($1,500/mo)</option>
        <option value="product-support">Product Support ($4,500/mo)</option>
        <option value="strategic-growth">Strategic Growth ($10,000+/mo)</option>
        <option value="starter-bucket">Starter Bucket ($1,800/mo)</option>
        <option value="growth-bucket">Growth Bucket ($4,000/mo)</option>
        <option value="scale-bucket">Scale Bucket ($7,500/mo)</option>
        <option value="not-sure">Not sure — recommend</option>
      </select>
    </label>

    <label>
      What's the work look like, in your own words?
      <textarea
        name="work_description"
        rows="5"
        placeholder="A few sentences. Frequency, system age, current pain, how alive it needs to be."
      ></textarea>
    </label>
  </fieldset>

  <fieldset>
    <legend>Contact</legend>
    <label>Name * <input type="text" name="name" required /></label>
    <label>Email * <input type="email" name="email" required /></label>
    <label>Company <input type="text" name="company" /></label>
    <label>Phone <input type="tel" name="phone" /></label>
  </fieldset>

  <input
    type="text"
    name="hp_company_url"
    tabindex="-1"
    autocomplete="off"
    style="position:absolute;left:-9999px"
    aria-hidden="true"
  />

  <button type="submit">Submit inquiry — reply within 1 business day</button>

  <p class="form-note">
    Care plans are quoted, not self-serve. We confirm fit, scope, and start date
    before invoicing. Full <a href="/terms">terms</a>.
  </p>
</form>
```

---

## CTA Banner

```
[Eyebrow] B6 / Outro

[H2] Software that gets ignored
     fails quietly.
     Software that gets cared for
     compounds quietly.

[Deck] Pick the level that matches the rhythm of the work.
       We'll tell you if you've over-bought; we never under-quote.

[Buttons]
  → Inquire about care          (above form)
  → Talk it through             (/contact)
```

---

## Engineering Notes

- Pricing is canonical from `pricing-docs/PRICING.md` §"Maintenance & Retainers" lines 175–205. If anything drifts, that file wins.
- The two-ladder structure (Care / Bucket) matters — don't merge them into one table. Care is a relationship; Buckets are hours. Different buyers.
- Friendly pricing column lives on `/nonprofit`; here we just reference it. Keeps `/care` clean.
- `Strategic Growth` plan is intentionally `$10,000+` (open-ended) — most engagements at that level are negotiated. The page should not pretend there's a fixed number.
- Inquiry form is quote-based, no Stripe. Care is a relationship, not a SKU.

---

_ToledoTechnologies (main brand) — `/care` content draft (2026-05-11)_
