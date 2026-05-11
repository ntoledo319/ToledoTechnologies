# Design Strategy: Website Content Overhaul (5-Microsite Pivot)

## Design Principles

### 1. Physicality (The Gatefold)

**The principle:** The site feels like a physical object—a vinyl record sleeve or a printed liner.
**In practice:** Use "Side A" and "Side B" terminology. Use "Pressed remotely" and "Liner notes" copy. Visuals should evoke paper, ink, and texture.
**NOT doing:** No standard "webby" UI patterns (e.g., standard navbars with dropdowns, floating "chat with us" bubbles).

### 2. Narrative-First (The Novel)

**The principle:** Content is a long-form narrative, not a scan-and-scroll list of features.
**In practice:** Use `novel` and `spread` CSS classes. Focus on typography and reading rhythm. Group information into logical "sides" or "chapters."
**NOT doing:** No 3-column icon + heading + body grids. No generic benefit lists.

### 3. Directness (Senior-Only)

**The principle:** Communication is blunt, senior-led, and devoid of agency theater.
**In practice:** "We step into systems that are already on fire." "No junior tier." Clear pricing bands. Paid discovery as the front door.
**NOT doing:** No "Unlock / Revolutionize / Supercharge" copy. No "schedule a 15-minute call" CTA (use "Write us a letter").

### 4. Distinctive Taste

**The principle:** If it looks like a default template, it is wrong.
**In practice:** Adhere to the Taste Standards in `CLAUDE.md`. Every component must answer why it exists for _this_ project.
**NOT doing:** No Inter font, no gray-50 backgrounds, no Tailwind default aesthetic.

## Competitive Position

We differentiate by being the **Anti-Agency**. While competitors offer "solutions" and "transformation," we offer "fixing code" and "shipping software." The "Liner Notes" conceit signals that we care about the work enough to document it with craft.

## Experience Map

1. **Entry Point**: Home page (`/`). User is introduced to the "Liner Notes" of the studio.
2. **First Impression**: A high-fidelity, high-contrast hero. "A studio for the slow, careful kind of software."
3. **Core Journey**:
   - Side A (Home): Understand the philosophy and the "Five sides of the studio."
   - Side B (Services): Explore the 5-microsite catalog or the cross-cutting services (/care, /discovery).
   - Pivot: Transition to an external microsite (e.g., `web.toledotechnologies.com`) or a dedicated hub (/discovery).
4. **Exit Point**: Contact form ("Letter to the Reader") or specific service inquiry.

## Success Metrics

| Metric            | What It Measures            | Target                                           |
| ----------------- | --------------------------- | ------------------------------------------------ |
| Specificity Test  | Could this exist elsewhere? | 0% Yes                                           |
| Routing Clarity   | Ease of finding a microsite | User knows within 30s which side fits            |
| Accessibility     | WCAG 2.1 compliance         | AA                                               |
| Voice Consistency | Narrative rhythm            | Passes "Swap Test" (cannot swap in a competitor) |

## Constraints and Trade-offs

We are choosing **Depth over Speed**. We are NOT optimizing for users who want to quickly skim and find a "Pricing" button. We are optimizing for users who will read the whole liner before deciding to buy.
