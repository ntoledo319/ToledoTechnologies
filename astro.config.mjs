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
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});
