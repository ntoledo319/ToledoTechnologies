# `/` — Home (Side A — Liner Notes) — REWRITE

**Path:** `toledotechnologies.com/`
**Type:** Umbrella router for the 5-microsite ecosystem
**Voice:** Existing vinyl-record / liner-notes voice retained. Side A / Side B / "pressed remotely" stays. New content fits inside the conceit, doesn't replace it.
**Strategy doc:** [`../../../ToledoTechnologiesLLC/MICROSITE_CONSOLIDATED_DOCS.md`](../../../ToledoTechnologiesLLC/MICROSITE_CONSOLIDATED_DOCS.md)
**Replaces:** `src/pages/index.astro` (current copy speaks of "four kinds of jobs we take" — refactors into "five sides of the studio," each linking out to its microsite).

---

## What changes vs. current

The vinyl conceit, the meta liner index, the Side A / Side B framing, the studio principles — all stay. What changes is the section titled **"Four sides to the studio"**: it becomes **"Five sides of the studio,"** and each side now points outward to a dedicated microsite instead of describing a category in the abstract.

Cross-side liner footer adds links to `/care` (the maintenance ladder), `/discovery` (the cross-cutting discovery hub), and `/partner` (white-label) — the three pages that don't have microsites of their own.

---

## Hero (unchanged structure, refined deck)

```
[Eyebrow] A1 — Liner Notes

[H1] A studio for the slow,
     careful kind of software.

[Deck] We build, fix, and ship the code that runs underneath the rest of your business.
       No agency theatre. No quarterly roadmaps written in passive voice.
```

(Identical to current.)

---

## Body — Section 1: "What you'll find on this record"

**Edit:** Update the meta-orientation paragraphs. Side B framing extends — the "catalog" now refers to the five microsites _plus_ the deploy-ready repositories.

> Side A — the side you're reading — is the studio itself: who we are, how we work, and the five sides of the work we take. Side B is the catalog. Five microsites, each with its own identity, its own pricing, its own discovery product. Plus a small shelf of [deploy-ready codebases](/codebases) you can buy outright, and the [case studies](/case-studies) for the systems we've pulled out of the fire.
>
> The whole thing is meant to be read like a printed liner. There are no sidebars trying to capture your email. No popups. No "schedule a 15-minute discovery call" floating buttons. If you want to talk, the [letter to the reader](/contact) on the inner sleeve has every way to reach us.

---

## Body — Section 2: "Five sides of the studio" (REWRITE — replaces the four-paragraph "Four sides")

This is the section that does the routing work. Each side is one short paragraph followed by a deep link. Order matters — most-active offers first.

> **Custom websites.** Editorial design and bespoke builds for companies whose website needs to look the part of what they charge. Six packages, $5,500 to $250,000+, all custom, all owned outright. The work that gets screenshotted and shared.
> [→ web.toledotechnologies.com](https://web.toledotechnologies.com)

> **WordPress exits.** Productized migrations off WordPress, Squarespace, and Wix into modern, owned, $20-a-month infrastructure. Four packages, $3,500 to $65,000+. Scope-locked. Fast. The math works out the day you sign.
> [→ sitelift.toledotechnologies.com](https://sitelift.toledotechnologies.com)

> **Web apps and SaaS.** Custom software that replaces the spreadsheet, the no-code stack, the brittle old admin tool. Internal tools to enterprise SaaS, $15,000 to $750,000+. Every engagement starts with paid discovery — we don't quote what we haven't scoped.
> [→ apps.toledotechnologies.com](https://apps.toledotechnologies.com)

> **Native mobile.** iOS, Android, and cross-platform apps that pass the App Store test the first time. MVP through production, $50,000 to $700,000+. We do the permissions and the review-board correspondence so you don't have to.
> [→ mobile.toledotechnologies.com](https://mobile.toledotechnologies.com)

> **AI agents and automation.** Workflow automation through production AI systems with the governance, the deterministic replay, the cost caps, and the human-in-the-loop. $10,000 to $300,000+. We don't ship chatbot toys.
> [→ ai.toledotechnologies.com](https://ai.toledotechnologies.com)

---

## Body — Section 3: "What lives on this side" (NEW — bridges to /care, /discovery, /partner)

> Three things sit on Side A because they cut across all five microsites:
>
> [**Care plans →**](/care) — One maintenance ladder for everything we ship. Basic Care at $750/mo through Strategic Growth at $10,000+/mo, plus pure-dev Starter / Growth / Scale buckets. Same plan whether the thing being maintained is a Signal lander or an enterprise SaaS.
>
> [**Discovery products →**](/discovery) — Six paid discoveries across the catalog. SiteLift Fit Check at $750, Website Migration Audit at $1,500, then four quote-based discoveries from $3,500 to $15,000 covering web apps, AI, mobile, and SaaS strategy. If you don't know which microsite you belong on, start here.
>
> [**Toledo Partner →**](/partner) — White-label engineering for agencies. $125/hr floor, non-compete, full IP assignment. We can sit in your Slack as senior capacity or stay completely behind the scenes. Either way, your client never hears our name unless you say so.

---

## Body — Section 4: Studio principle (unchanged)

> The studio is small on purpose. Senior people only. The same person who scopes your work writes the code, opens the pull request, and stays on the phone when the deploy goes sideways at 11:47 PM. There is no junior tier here, because the junior tier is where most projects go to die.

(Identical to current.)

---

## Body — pull quote (unchanged)

> "High-fidelity is a feeling, not just a resolution."
> — _Studio principle_

---

## Body — outro (refined)

> You'll know whether we're a fit by the end of the first call.
> If we're not, we'll tell you so, and recommend someone who is.
>
> That's everything that needs to be on the front of the sleeve. The rest of the record is below.
> [Read on →](/about)

---

## CTA Banner (refined to acknowledge the catalog)

```
[Eyebrow] A1 / Outro

[H2] Got something broken?
     Got something to build?

[Deck] Tell us what you need. We'll tell you what it takes,
       in plain English, with a number on the bottom.

[Buttons]
  → Write us a letter           (/contact)
  → Read the catalog            (/services)
```

(Same as current — the catalog button now points to a /services page that itself routes to the five microsites.)

---

## Liner Index (sidebar) — updated rows

Replace current sidebar `<dl class="liner">` with:

| Term      | Definition                          |
| --------- | ----------------------------------- |
| Pressed   | 2026, remote                        |
| Engineers | Senior only, no agencies            |
| Side A    | The studio + five sides of the work |
| Side B    | The catalog (five microsites)       |
| Catalog   | Web · SiteLift · Apps · Mobile · AI |
| Runtime   | ~14 minutes, read in full           |
| Format    | Long Play, 33⅓                      |

---

## Endsleeve Footer — updated link blocks

The current footer has Side A / Side B / Liner columns. Update them:

**Side A — The Studio**

- Liner Notes (`/`)
- The Studio (`/about`)
- Catalog of Work (`/services`)
- The Rescue (`/case-studies`)
- Letter to the Reader (`/contact`)

**Side B — The Catalog**

- ToledoWeb (`web.toledotechnologies.com`)
- SiteLift (`sitelift.toledotechnologies.com`)
- Toledo Apps (`apps.toledotechnologies.com`)
- Toledo Mobile (`mobile.toledotechnologies.com`)
- Toledo AI (`ai.toledotechnologies.com`)

**The Inner Sleeve — Cross-cutting**

- Care plans (`/care`)
- Discovery products (`/discovery`)
- Toledo Partner (`/partner`)
- Codebases for sale (`/codebases`)
- Portfolio (`/portfolio`)

**The Liner**

- Privacy (`/privacy`)
- Terms (`/terms`)
- Policies (`/policies`)
- Nonprofit (`/nonprofit`)
- Blog (`/blog`)

---

## Engineering Notes

- All cross-microsite links are external (`https://`). Set `rel="noopener"` for safety; do not set `target="_blank"` — let the visitor decide.
- Five-microsite ordering on the home page is a strategic choice: ToledoWeb first because it's the active design push, SiteLift second because it's the active marketing push, then Apps / Mobile / AI in that order. Re-order this list when the strategy doc reprioritizes.
- The "Three things on Side A" section is the only place that surfaces `/care`, `/discovery`, `/partner`. They are also reachable from the footer and the `/services` router, but the home page anchor is what makes them discoverable.
- The "Now Playing" sidebar element ("A1 — Liner Notes (Intro), 00:00 / 03:14") stays. Keep the conceit intact.

---

_ToledoTechnologies (main brand) — `/index` rewrite draft (2026-05-11)_
