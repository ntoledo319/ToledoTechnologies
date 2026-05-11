# `/partner` — Toledo Partner (NEW PAGE)

**Path:** `toledotechnologies.com/partner`
**Type:** White-label / agency-partner page. Replaces the dropped Toledo Partner microsite.
**Status:** Net-new page — does not currently exist
**Voice:** Vinyl-record liner-notes voice continues, but tightened — agencies want clean terms, not poetry.
**Source:** [`/Users/nicholastoledo/Development/pricing-docs/PRICING.md`](../../../pricing-docs/PRICING.md) (hourly rates, complex rates, partner terms)

---

## Hero

### Eyebrow

**B8 — Toledo Partner**

### Headline

**Senior capacity. Your name on the PR.**

### Deck

Toledo Partner is the white-label engagement model for agencies, studios, and consultancies that need senior reliability without the agency overhead. We build the work; your client never hears our name unless you say so. Non-compete is in the contract. IP is fully assigned to you. The terms are short, the work is clean, and you stay in charge of the relationship.

---

## Section 1: How this works

> Three short paragraphs. Don't bury the model.

> You win the work. You lead the design or the strategy. We sit behind your team — sometimes in your Slack as a senior engineer named "Nicholas," sometimes invisible in a private channel — and ship the engineering you'd otherwise hire for. Every PR has your name on it; every commit attributes to whoever you choose. We use your repos, your infrastructure, your accounts. Nothing comes back to us by default.

> The contract has three things in it: standard NDA, full IP assignment to you on payment, and a non-solicitation clause that prohibits us from contacting your client during the engagement and for two years after. We've never broken a non-solicitation; we don't intend to start.

> Pricing is hourly or retainer, your choice. Hourly is simpler for one-off projects; retainers make sense once we know your team's cadence and your pipeline.

---

## Section 2: Rate card

| Tier                  |         Rate | Best for                                                                                                                 |
| --------------------- | -----------: | :----------------------------------------------------------------------------------------------------------------------- |
| **Standard hourly**   |      $150/hr | Frontend, backend, DevOps, refactoring, feature work in our standard stack (TS, Python, Go, React, Next, Node, Postgres) |
| **Friendly partner**  |      $125/hr | Approved long-term partners with consistent monthly volume; case-study trade required                                    |
| **Complex hourly**    |      $175/hr | Architecture, database design, AI / LLM work, performance investigations, security work                                  |
| **Architecture / AI** | $225–$275/hr | Production AI systems, distributed-system architecture, deep security or compliance work                                 |

**Retainer options for partners:**

| Plan               | Monthly   | Hours  | Effective rate |
| ------------------ | --------- | ------ | -------------- |
| **Starter Bucket** | $1,800/mo | 10 hrs | $180/hr        |
| **Growth Bucket**  | $4,000/mo | 25 hrs | $160/hr        |
| **Scale Bucket**   | $7,500/mo | 50 hrs | $150/hr        |

Retainer hours apply to your active client work; you decide each month where they go.

---

## Section 3: What we do well as a partner

- **Next.js / React frontend** — including art-directed work, scroll choreography, complex state, accessibility
- **Backend / APIs** — Node, Python, Go, REST and GraphQL, Postgres, queueing, background jobs
- **AI integration** — RAG systems, agent infrastructure, governance, deterministic replay, cost controls
- **DevOps / CI/CD** — Vercel, Cloudflare, AWS, GitHub Actions, observability stacks
- **Code rescues** — taking over abandoned codebases, modernizing legacy work, paying down tech debt for your existing clients
- **Discovery + scoping support** — joining your sales calls as the "technical director" if you need engineering credibility in the room

## Section 4: What we don't do as a partner

- **Direct sales to your clients.** Non-solicitation is the floor, not a guideline.
- **Brand or visual design under your name.** We can build what your designer scopes; we don't replace your designer.
- **PM or account management.** You own the relationship. We deliver the engineering.
- **Subcontracting to other shops.** The work is done by us, not handed further down a chain.
- **Work you can't pay for.** Net-30 or shorter terms; we don't carry receivables for partner work.

---

## Section 5: How a partnership starts

| Step                     | What happens                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| 1. **Inquiry**           | The form below. Tell us about the agency, the work, and the cadence you expect.                      |
| 2. **Intro call**        | 30 minutes. We confirm fit, walk through the partner terms, and answer questions.                    |
| 3. **Partner agreement** | Signed before any work starts. Standard NDA + IP assignment + non-solicitation.                      |
| 4. **First project**     | Hourly or retainer. Most partners start hourly on a single project to test the working relationship. |
| 5. **Steady state**      | If we're a good fit, most partners move to a Growth or Scale Bucket within 60 days.                  |

---

## Section 6: The non-solicitation, in plain English

> Worth surfacing the actual terms — agencies are usually more nervous about this than the rate.

> For the duration of every project we do for you, and for **two years after the last invoice**, we will not:
>
> - Contact your client through any channel (email, LinkedIn, phone, in person)
> - Accept work from your client, even if they reach out to us first, without your written approval
> - Reference your client by name in our portfolio without your written approval
> - Solicit your employees or contractors
>
> The two-year clock resets if we do additional work for you. Permanent partnership keeps the clock continuously fresh. We've never violated this; the contract makes it formal.

---

## Section 7: Inquire as a partner

```html
<form
  action="/api/intake/toledo-partner-inquiry"
  method="POST"
  class="intake-form"
  data-product="toledo-partner"
>
  <input type="hidden" name="product" value="toledo-partner" />
  <input type="hidden" name="discovery_type" value="partner-intake" />

  <fieldset>
    <legend>About your agency</legend>

    <label>
      Agency / studio name *
      <input type="text" name="agency_name" required />
    </label>

    <label>
      Website *
      <input type="url" name="agency_website" required />
    </label>

    <label>
      What do you do? *
      <select name="agency_type" required>
        <option value="">Select…</option>
        <option value="design-studio">Design studio</option>
        <option value="full-service">Full-service agency</option>
        <option value="brand-strategy">Brand / strategy consultancy</option>
        <option value="dev-shop">Dev shop with capacity gap</option>
        <option value="solo-consultant">
          Solo consultant / fractional CTO
        </option>
        <option value="other">Other</option>
      </select>
    </label>

    <label>
      Approximate team size *
      <select name="team_size" required>
        <option value="">Select…</option>
        <option value="1">Solo</option>
        <option value="2-5">2–5</option>
        <option value="6-15">6–15</option>
        <option value="16-50">16–50</option>
        <option value="50+">50+</option>
      </select>
    </label>
  </fieldset>

  <fieldset>
    <legend>About the work</legend>

    <label>
      What kind of work do you need a partner for? *
      <em>(select all that apply)</em>
      <select name="work_types" multiple required>
        <option value="frontend">Frontend (React / Next / TS)</option>
        <option value="backend">Backend / APIs</option>
        <option value="fullstack">Full-stack feature work</option>
        <option value="ai">AI integration</option>
        <option value="devops">DevOps / CI/CD</option>
        <option value="rescue">Codebase rescue</option>
        <option value="architecture">Architecture / system design</option>
        <option value="discovery-support">
          Discovery / scoping support on sales calls
        </option>
        <option value="other">Other</option>
      </select>
    </label>

    <label>
      Expected monthly volume *
      <select name="volume" required>
        <option value="">Select…</option>
        <option value="one-off">One-off project, no recurring need</option>
        <option value="<10hrs">Under 10 hrs/mo</option>
        <option value="10-25hrs">10–25 hrs/mo</option>
        <option value="25-50hrs">25–50 hrs/mo</option>
        <option value="50+hrs">50+ hrs/mo (multiple active projects)</option>
        <option value="not-sure">Not sure yet</option>
      </select>
    </label>

    <label>
      Pricing preference *
      <select name="pricing_pref" required>
        <option value="">Select…</option>
        <option value="hourly">Hourly</option>
        <option value="retainer">Retainer (Bucket)</option>
        <option value="discuss">Discuss</option>
      </select>
    </label>

    <label>
      How do you want us to show up to your client? *
      <select name="visibility" required>
        <option value="">Select…</option>
        <option value="invisible">Invisible — fully behind the scenes</option>
        <option value="named-engineer">
          Named engineer in your team Slack (no agency reference)
        </option>
        <option value="technical-director">
          Joining sales / discovery calls as your "technical director"
        </option>
        <option value="case-by-case">Case by case</option>
      </select>
    </label>

    <label>
      Anything else we should know?
      <textarea name="notes" rows="4"></textarea>
    </label>
  </fieldset>

  <fieldset>
    <legend>Contact</legend>
    <label>Name * <input type="text" name="name" required /></label>
    <label>Email * <input type="email" name="email" required /></label>
    <label>Phone <input type="tel" name="phone" /></label>
    <label>Your role at the agency <input type="text" name="role" /></label>
  </fieldset>

  <input
    type="text"
    name="hp_company_url"
    tabindex="-1"
    autocomplete="off"
    style="position:absolute;left:-9999px"
    aria-hidden="true"
  />

  <button type="submit">
    Submit partner inquiry — reply within 1 business day
  </button>

  <p class="form-note">
    Partner inquiries are reviewed individually. Intro call is free; signed
    agreement is required before work starts. Full <a href="/terms">terms</a>.
  </p>
</form>
```

---

## CTA Banner

```
[Eyebrow] B8 / Outro

[H2] You bring the relationship.
     We bring the engineering.
     Nobody finds out
     unless you tell them.

[Buttons]
  → Inquire as a partner        (above form)
  → See the rate card           (#section-2)
```

---

## Engineering Notes

- Replaces what would have been the Toledo Partner microsite (dropped per the 2026-05-11 strategy revision). All cross-link references on microsites point here, not to a `partner.toledotechnologies.com` subdomain.
- Rate card mirrors `pricing-docs/PRICING.md` lines 25–35 (hourly tiers) and §"Maintenance & Retainers" (Buckets). Confirm any drift quarterly.
- The non-solicitation section is intentionally explicit — it's the section agencies actually read. Don't soften.
- This page intentionally does NOT include portfolio or case studies. Partner work is by definition not advertised; agencies don't want to see their competitors' work named here. Cross-link to general portfolio at `/portfolio` for our non-partner work.

---

_ToledoTechnologies (main brand) — `/partner` content draft (2026-05-11)_
