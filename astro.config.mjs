// @ts-check
import { defineConfig } from 'astro/config';
import { request as httpRequest } from 'node:http';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { cspMetaFirst } from './scripts/csp.mjs';

function createServicesPreviewHandler() {
  /**
   * @param {import('node:http').IncomingMessage} request
   * @param {import('node:http').ServerResponse} response
   * @param {() => void} next
   */
  return function servicesPreviewHandler(request, response, next) {
    const incoming = new URL(request.url || '/', 'http://localhost');
    if (incoming.pathname !== '/api/services/brief') return next();

    const target = new URL(
      process.env.SERVICES_API_ORIGIN || 'http://127.0.0.1:8765'
    );
    const upstream = httpRequest(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port,
        method: request.method,
        path: `/api/services/brief${incoming.search}`,
        headers: { ...request.headers, host: target.host }
      },
      (upstreamResponse) => {
        response.writeHead(
          upstreamResponse.statusCode || 502,
          upstreamResponse.headers
        );
        upstreamResponse.pipe(response);
      }
    );

    upstream.setTimeout(10_000, () =>
      upstream.destroy(new Error('services preview timeout'))
    );
    upstream.on('error', () => {
      if (response.headersSent) {
        response.destroy();
        return;
      }
      response.writeHead(502, {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store'
      });
      response.end(JSON.stringify({ ok: false, error: 'unavailable' }));
    });
    request.pipe(upstream);
  };
}

/** @returns {import('astro').AstroIntegration} */
function servicesPreviewIntegration() {
  return {
    name: 'toledo:services-preview-proxy',
    hooks: {
      'astro:server:setup': ({ server }) => {
        const install = () => {
          server.middlewares.stack.unshift({
            route: '',
            handle: createServicesPreviewHandler()
          });
        };
        if (server.httpServer?.listening) install();
        else server.httpServer?.once('listening', install);
      }
    }
  };
}

// https://astro.build/config
// Pure static build for Grace hosting (served by Caddy). The former
// /api/speed-test server route now lives as a loopback service
// (scripts/speed-api) that Caddy proxies; see grace cutover runbook.
export default defineConfig({
  site: 'https://toledotechnologies.com',
  output: 'static',
  // The production static site keeps directory URLs. Development must leave
  // the fixed slashless API contract untouched so the preview proxy can
  // intercept it before Astro tries to resolve a page route.
  trailingSlash: process.env.NODE_ENV === 'development' ? 'ignore' : 'always',
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
    // This pre-routing middleware is required because Astro's static
    // trailing-slash handler otherwise turns the contract's slashless POST
    // endpoint into a site 404 before Vite's ordinary proxy can see it.
    // Production Caddy must proxy the same exact path before release.
    plugins: [tailwindcss()],
    build: {
      // Same for scripts: keep every processed <script> an external module.
      // Inline module scripts also make the ClientRouter inject a
      // data:-URL <script>, which script-src must never allow.
      assetsInlineLimit: (file) => (file.endsWith('.js') ? false : undefined),
      // Vite 8 minifies CSS with Lightning CSS by default, which dropped
      // `backdrop-filter` from the sleeve's Unfold button (declared before its
      // -webkit- twin) and `-webkit-backdrop-filter` from Tailwind's
      // backdrop-blur (the sticky header, Safari < 18). esbuild keeps every
      // declaration as written, which is what the site shipped under Vite 6.
      cssMinify: 'esbuild'
    }
  },
  // cspMetaFirst hoists the policy to the top of <head> and fails the build
  // if any shipped page's inline code or third-party loads drift from it.
  integrations: [servicesPreviewIntegration(), sitemap(), cspMetaFirst()]
});
