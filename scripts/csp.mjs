// Build-time Content Security Policy helpers.
//
// Astro emits the policy as a <meta http-equiv="content-security-policy"> tag
// (security.csp in astro.config.mjs), but places it at the end of <head>, after
// the Google Fonts stylesheet and the JSON-LD blocks. A <meta> policy only
// governs what the parser meets after it, so `moveCspMetaFirst` hoists it to
// directly after <meta charset>. `checkPage` then re-derives, from the HTML
// that actually ships, everything the policy has to allow and fails the build
// when the two drift apart (an inline script or style without its hash, a new
// third-party script, a second policy, a weakened directive).

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const META_RE =
  /<meta\s+http-equiv=["']?content-security-policy["']?\s+content=(?:"([^"]*)"|'([^']*)')\s*\/?>/gi;

// Files served as-is from public/ that carry their own, stricter policy.
// proofs/purchasing/archive.html is the byte-for-byte output of archive.py in
// the downloadable proof ZIP; its SHA-256 is published in manifest.json, so it
// is never rewritten here. Its policy is `default-src 'none'` with inline
// script and style (it is a single self-contained offline file).
export const STATIC_POLICY_FILES = new Set(['proofs/purchasing/archive.html']);

// Directives a <meta> policy ignores (and Chrome logs a warning for).
const META_IGNORED = ['frame-ancestors', 'report-uri', 'report-to', 'sandbox'];

// Script types the browser executes, so CSP applies to them.
const JS_TYPES = new Set([
  '',
  'module',
  'text/javascript',
  'application/javascript'
]);

export const sha256 = (text) =>
  `sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}`;

export function parsePolicy(content) {
  const policy = new Map();
  for (const part of content.split(';')) {
    const [name, ...values] = part.trim().split(/\s+/).filter(Boolean);
    if (name && !policy.has(name.toLowerCase()))
      policy.set(name.toLowerCase(), values);
  }
  return policy;
}

const decode = (value) =>
  value
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&amp;/gi, '&');

export function findPolicies(html) {
  return [...html.matchAll(META_RE)].map((m) => ({
    index: m.index,
    tag: m[0],
    content: decode(m[1] ?? m[2] ?? '')
  }));
}

/** Move the (single) CSP meta tag to directly after <meta charset>. */
export function moveCspMetaFirst(html) {
  const [policy, ...rest] = findPolicies(html);
  if (!policy || rest.length) return html;
  const without =
    html.slice(0, policy.index) + html.slice(policy.index + policy.tag.length);
  const charset = /<meta\s+charset=["']?[\w-]+["']?\s*\/?>/i.exec(without);
  const head = /<head(\s[^>]*)?>/i.exec(without);
  const anchor = charset ?? head;
  if (!anchor) return html;
  const at = anchor.index + anchor[0].length;
  return without.slice(0, at) + policy.tag + without.slice(at);
}

// Effective source list for an element or attribute, following CSP fallback.
const sourcesFor = (policy, ...names) => {
  for (const name of names) if (policy.has(name)) return policy.get(name);
  return undefined;
};

function allowsUrl(sources, url, pageOrigin) {
  if (!sources) return true;
  const target = new URL(url, pageOrigin);
  return sources.some((s) => {
    if (s === "'self'") return target.origin === pageOrigin;
    if (s === '*') return true;
    if (/^[a-z][a-z0-9+.-]*:$/i.test(s))
      return target.protocol === s.toLowerCase();
    if (/^https?:\/\//i.test(s)) {
      const source = new URL(s);
      if (source.hostname.startsWith('*.')) {
        return (
          target.protocol === source.protocol &&
          target.hostname.endsWith(source.hostname.slice(1))
        );
      }
      return target.origin === source.origin;
    }
    return false;
  });
}

// 'unsafe-inline' only counts when the same list has no hash or nonce.
const unsafeInlineApplies = (sources) =>
  sources.includes("'unsafe-inline'") &&
  !sources.some((s) => /^'(sha(256|384|512)-|nonce-)/.test(s));

const allowsInline = (sources, body) =>
  !sources ||
  unsafeInlineApplies(sources) ||
  sources.includes(`'${sha256(body)}'`);

const attr = (attrs, name) =>
  new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(
    attrs
  );
const attrValue = (attrs, name) => {
  const m = attr(attrs, name);
  return m ? decode(m[1] ?? m[2] ?? m[3] ?? '') : undefined;
};

/**
 * Everything wrong with one page's policy, judged against the page's own
 * markup. `origin` stands in for 'self'.
 */
export function checkPage(
  html,
  { origin = 'https://toledotechnologies.com' } = {}
) {
  const problems = [];
  const policies = findPolicies(html);
  if (policies.length !== 1) {
    problems.push(`expected exactly one CSP <meta>, found ${policies.length}`);
    if (!policies.length) return problems;
  }
  const [{ index, content }] = policies;
  const headEnd = html.search(/<\/head>/i);
  if (headEnd !== -1 && index > headEnd)
    problems.push('CSP <meta> is outside <head>');
  const firstResource =
    /<(script|style)\b|<link\b[^>]*\brel=["']?stylesheet/i.exec(html);
  if (firstResource && firstResource.index < index) {
    problems.push(`CSP <meta> comes after ${firstResource[0]}…`);
  }

  const policy = parsePolicy(content);
  const scriptSrc = sourcesFor(policy, 'script-src', 'default-src') ?? [];
  const scriptElem = sourcesFor(
    policy,
    'script-src-elem',
    'script-src',
    'default-src'
  );
  const styleElem = sourcesFor(
    policy,
    'style-src-elem',
    'style-src',
    'default-src'
  );
  const styleAttr = sourcesFor(
    policy,
    'style-src-attr',
    'style-src',
    'default-src'
  );

  if (scriptSrc.includes("'unsafe-eval'"))
    problems.push("script-src allows 'unsafe-eval'");
  if (scriptSrc.includes("'unsafe-inline'"))
    problems.push("script-src allows 'unsafe-inline'");
  if (
    scriptSrc.some(
      (s) => /^(data|blob):$/i.test(s) || s === '*' || /^https?:$/i.test(s)
    )
  ) {
    problems.push(`script-src is open-ended (${scriptSrc.join(' ')})`);
  }
  if (!(policy.get('object-src') ?? []).includes("'none'"))
    problems.push("object-src 'none' missing");
  if (!policy.has('base-uri')) problems.push('base-uri missing');
  for (const name of META_IGNORED) {
    if (policy.has(name))
      problems.push(`${name} is ignored in <meta> (use a header)`);
  }

  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const [, attrs, body] = m;
    const type = (attrValue(attrs, 'type') ?? '').trim().toLowerCase();
    if (!JS_TYPES.has(type)) continue; // JSON-LD and other data blocks never run
    const src = attrValue(attrs, 'src');
    if (src !== undefined) {
      if (!allowsUrl(scriptElem, src, origin))
        problems.push(`script ${src} is not allowed by script-src`);
    } else if (!allowsInline(scriptElem, body)) {
      problems.push(
        `inline script ${sha256(body)} is not in script-src (${body.trim().slice(0, 60)}…)`
      );
    }
  }
  for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    if (!allowsInline(styleElem, m[1])) {
      problems.push(
        `inline <style> ${sha256(m[1])} is not in style-src (${m[1].trim().slice(0, 60)}…)`
      );
    }
  }
  for (const m of html.matchAll(/<link\b([^>]*)>/gi)) {
    if (!/\brel=["']?stylesheet/i.test(m[1])) continue;
    const href = attrValue(m[1], 'href');
    if (href && !allowsUrl(styleElem, href, origin))
      problems.push(`stylesheet ${href} is not allowed by style-src`);
  }
  if (
    /<[a-z][^>]*\sstyle\s*=/i.test(html) &&
    styleAttr &&
    !unsafeInlineApplies(styleAttr)
  ) {
    problems.push(
      'style attributes are used but the policy does not allow inline style attributes'
    );
  }
  for (const m of html.matchAll(/<form\b([^>]*)>/gi)) {
    const action = attrValue(m[1], 'action');
    if (action && !allowsUrl(policy.get('form-action'), action, origin)) {
      problems.push(`form action ${action} is not allowed by form-action`);
    }
  }
  return problems;
}

export function htmlFiles(dir) {
  const out = [];
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const path = join(d, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name.endsWith('.html')) out.push(path);
    }
  };
  walk(dir);
  return out.sort();
}

/**
 * Astro integration: hoist each page's CSP meta to the top of <head>, then
 * check every shipped HTML file and fail the build on any problem.
 */
export function cspMetaFirst() {
  return {
    name: 'toledo:csp-meta-first',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const root = dir instanceof URL ? fileURLToPath(dir) : String(dir);
        const problems = [];
        let moved = 0;
        for (const file of htmlFiles(root)) {
          const rel = relative(root, file).split('\\').join('/');
          if (STATIC_POLICY_FILES.has(rel)) continue;
          const html = readFileSync(file, 'utf8');
          const next = moveCspMetaFirst(html);
          if (next !== html) {
            writeFileSync(file, next);
            moved++;
          }
          for (const p of checkPage(next)) problems.push(`${rel}: ${p}`);
        }
        if (problems.length) {
          throw new Error(
            `Content Security Policy check failed:\n${problems.join('\n')}`
          );
        }
        logger.info(
          `CSP <meta> first in <head> on ${moved} page(s); every page checked`
        );
      }
    }
  };
}
