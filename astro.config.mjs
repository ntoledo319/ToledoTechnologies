// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});
