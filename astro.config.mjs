// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { cspMetaFirst } from './scripts/csp.mjs';

// https://astro.build/config
// Pure static build for Grace hosting (served by Caddy). The former
// /api/speed-test server route now lives as a loopback service
// (scripts/speed-api) that Caddy proxies; see grace cutover runbook.
export default defineConfig({
  site: 'https://toledotechnologies.com',
  output: 'static',
  trailingSlash: 'always',
  // Astro 7 switched the default to JSX-style whitespace ('jsx'), which drops
  // the space between adjacent inline elements (`<a>..</a> <em>..</em>`).
  // Keep the HTML-aware compression every page was written against.
  compressHTML: true,
  // Content Security Policy, delivered as a <meta> tag on every page (Caddy
  // sends no CSP header). Everything the pages load is listed here; anything
  // else is refused. Per-page additions go through Astro.csp in the page
  // (only /tools/robots-audit/ has one). frame-ancestors, report-uri and
  // sandbox are ignored in <meta> and are deliberately absent; framing is
  // already refused by Caddy's X-Frame-Options.
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        // Lead forms post to the intake service, which 303s back here.
        "form-action 'self' https://eolkits.com",
        // data: is the paper-grain SVG in gatefold.css.
        "img-src 'self' data:",
        "font-src 'self' https://fonts.gstatic.com",
        // Cloudflare Web Analytics beacon reports to cloudflareinsights.com.
        "connect-src 'self' https://cloudflareinsights.com"
      ],
      scriptDirective: {
        resources: ["'self'", 'https://static.cloudflareinsights.com']
      },
      styleDirective: {
        resources: [
          "'self'",
          'https://fonts.googleapis.com',
          // style="" attributes only; <style> elements still need 'self' or a hash.
          { resource: "'unsafe-inline'", kind: 'attribute' }
        ]
      }
    }
  },
  build: {
    // Every stylesheet ships as a file under 'self'. An inline <style> would
    // need its hash in the policy of whichever page the ClientRouter
    // navigation started on, not just its own.
    inlineStylesheets: 'never'
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Same for scripts: keep every processed <script> an external module.
      // Inline module scripts also make the ClientRouter inject a
      // data:-URL <script>, which script-src must never allow.
      assetsInlineLimit: (file) => (file.endsWith('.js') ? false : undefined)
    }
  },
  // cspMetaFirst hoists the policy to the top of <head> and fails the build
  // if any shipped page's inline code or third-party loads drift from it.
  integrations: [sitemap(), cspMetaFirst()]
});
