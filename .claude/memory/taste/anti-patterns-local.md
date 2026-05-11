# Project-Specific Anti-Patterns

Patterns discovered during taste audits that are specific to THIS project.
These supplement the global anti-patterns registry.

## Discovered 2026-04-04

### Visual

- The "T in gradient box" logo pattern — letter-in-colored-square is every SaaS template's default
- Repeating the same CTA banner (brand-600 or surface-900 rectangle) across 5+ pages without contextual variation
- Using decorative gradients as hero backgrounds on a site whose identity claims to be "no-nonsense"

### Copy

- "No fluff" / "no filler" as a repeated differentiator — once is a statement, three times is a tic
- "We build, fix, and ship code—fast" appearing verbatim in hero, footer, and about page
- Using "clean" as a universal positive adjective (clean code, clean shipping, clean handoff) — find more precise words

### Architecture

- @ai_prompt / @context_boundary JSDoc annotations in source files — AI instructions should live in .claude/ conventions, not pollute source
- Hardcoding site URL in multiple files instead of using framework's built-in env variable
- version: "0.0.1" in package.json — signals "scaffold, never revisited"

<!-- Agents append patterns below -->
