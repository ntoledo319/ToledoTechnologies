# Toledo Technologies — Claude Code Guidelines

## Project Overview
Static website for toledotechnologies.com built with Astro v5, Tailwind CSS v4, and TypeScript. Deployed on Render.

## Development
```bash
npm ci          # Install dependencies
npm run dev     # Dev server at http://localhost:4321
npm run build   # Production build
```

## Content Collections
- Blog posts: `src/content/blog/` (Markdown with frontmatter)
- Codebases: `src/content/codebases/` (YAML frontmatter)
- Case studies: `src/content/case-studies/` (YAML frontmatter)

---

## Taste Standards

This project operates under active taste enforcement. Every code change,
UI element, copy block, and architectural decision must pass taste review.

### The Taste Hierarchy
- GENERIC: Could appear on any similar project unchanged. UNACCEPTABLE.
- SAFE-GOOD: Competent but predictable. UNACCEPTABLE.
- CONTEXTUAL: Specific to this project. MINIMUM VIABLE TASTE.
- DISTINCTIVE: Could only exist in this project. THE TARGET.

### Hard Rules
1. No statistical-average output. If it looks like a default template, rewrite.
2. Every UI component must answer: "Why does THIS project need THIS to
   look/work THIS way?"
3. Copy must have a point of view. Swap test: replace product name with
   competitor's. If it still works, the copy is dead.
4. No decoration-driven design. Every visual choice serves meaning.
5. Elimination before addition. Try removing elements first.

### Anti-Pattern Registry
These patterns are BANNED in this project:
- Purple-to-blue gradients on white backgrounds
- 3-column icon + heading + body card grids
- Hero sections with stock-photo-style AI imagery
- "Unlock / Revolutionize / Supercharge / Take to the next level" copy
- Glassmorphism or frosted glass used purely for aesthetics
- Geometric abstract illustrations as hero backgrounds
- The Tailwind default aesthetic (Inter font, gray-50 bg, rounded-xl cards)
- "Whether you're a [persona A] or [persona B]..." copy patterns
- Sans-serif heading + slightly lighter sans-serif body with zero personality
- Bento grid layouts copied from Vercel/Linear/Stripe marketing pages

### Project Identity (run /taste-brief to fill)
- This project believes: Directness is the product. Clean code, blunt communication, no wondering what's happening. The basics of being human shouldn't be paywalled.
- This project is for: People who've been burned by dev shops that delivered excuses instead of code. Skeptical of promises, evaluate by what ships.
- This project should feel like: A well-maintained CLI tool. A mechanic's shop that's clean but not pretty. The senior dev whose code never breaks.
- This project should NEVER feel like: A SaaS landing page fishing for signups. An agency that leads with "our process." A startup saying "empower" without knowing what it does.
- Must-word: DIRECT
- Never-word: POLISHED

### Taste Verification
Before any task is complete, run the Specificity Test:
"Could this element exist in any other project without modification?"
If yes -> rewrite.
