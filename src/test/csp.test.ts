import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import {
  STATIC_POLICY_FILES,
  checkPage,
  findPolicies,
  htmlFiles,
  moveCspMetaFirst,
  parsePolicy,
  sha256
} from '../../scripts/csp.mjs';

// Content Security Policy regression guards. The policy itself lives in
// astro.config.mjs (security.csp); scripts/csp.mjs hoists it to the top of
// <head> and checks every page at build time. These tests pin that checker's
// behaviour and, when a build exists, re-derive every inline hash from the
// HTML that would ship.

const root = process.cwd();
const dist = join(root, 'dist');
const read = (path: string) => readFileSync(join(root, path), 'utf8');

const page = (head: string, body = '') =>
  `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">${head}</head><body>${body}</body></html>`;
const meta = (content: string) =>
  `<meta http-equiv="content-security-policy" content="${content}">`;
const BASE =
  "default-src 'self';base-uri 'self';object-src 'none';form-action 'self' https://eolkits.com; script-src 'self'; style-src 'self'; style-src-attr 'unsafe-inline';";

describe('CSP checker (scripts/csp.mjs)', () => {
  it('accepts a page whose inline script is hashed', () => {
    const js = 'console.log(1)';
    const html = page(
      meta(
        BASE.replace("script-src 'self'", `script-src 'self' '${sha256(js)}'`)
      ),
      `<script>${js}</script>`
    );
    expect(checkPage(html)).toEqual([]);
  });

  it('rejects an inline script whose hash is missing', () => {
    const html = page(meta(BASE), '<script type="module">alert(1)</script>');
    expect(checkPage(html).join('\n')).toMatch(
      /inline script sha256-.* is not in script-src/
    );
  });

  it('ignores JSON-LD data blocks', () => {
    const html = page(
      meta(BASE),
      '<script type="application/ld+json">{"@type":"Thing"}</script>'
    );
    expect(checkPage(html)).toEqual([]);
  });

  it("rejects 'unsafe-inline' or 'unsafe-eval' in script-src", () => {
    for (const bad of ["'unsafe-inline'", "'unsafe-eval'", 'data:', 'https:']) {
      const html = page(
        meta(BASE.replace("script-src 'self'", `script-src 'self' ${bad}`))
      );
      expect(checkPage(html).length, bad).toBeGreaterThan(0);
    }
  });

  it('rejects a policy that arrives after a stylesheet or script', () => {
    const html = page(
      `<link href="https://fonts.googleapis.com/css2" rel="stylesheet">${meta(BASE)}`
    );
    expect(checkPage(html).join('\n')).toMatch(/comes after/);
    expect(checkPage(moveCspMetaFirst(html)).join('\n')).not.toMatch(
      /comes after/
    );
  });

  it('hoists the policy to directly after <meta charset>', () => {
    const html = page(`<title>x</title><style>a{}</style>${meta(BASE)}`);
    const moved = moveCspMetaFirst(html);
    expect(moved.indexOf('content-security-policy')).toBeLessThan(
      moved.indexOf('<title>')
    );
    expect(findPolicies(moved)).toHaveLength(1);
  });

  it('rejects two policies, a missing object-src, meta-ignored directives', () => {
    expect(checkPage(page(meta(BASE) + meta(BASE))).join('\n')).toMatch(
      /exactly one/
    );
    expect(
      checkPage(page(meta(BASE.replace("object-src 'none';", '')))).join('\n')
    ).toMatch(/object-src/);
    expect(
      checkPage(page(meta(`${BASE} frame-ancestors 'none'`))).join('\n')
    ).toMatch(/frame-ancestors/);
  });

  it('checks third-party scripts, inline styles, style attributes and form targets', () => {
    const problems = checkPage(
      page(
        meta(BASE.replace(" style-src-attr 'unsafe-inline';", '')),
        '<script src="https://evil.example/x.js"></script><style>p{}</style><p style="color:red"></p><form action="https://elsewhere.example/post"></form>'
      )
    ).join('\n');
    expect(problems).toMatch(/evil\.example.*script-src/);
    expect(problems).toMatch(/inline <style>/);
    expect(problems).toMatch(/style attributes/);
    expect(problems).toMatch(/elsewhere\.example.*form-action/);
  });
});

describe('source rules that keep the policy hash-free across ClientRouter swaps', () => {
  const astroFiles = (dir: string, out: string[] = []): string[] => {
    for (const name of readdirSync(join(root, dir))) {
      const rel = `${dir}/${name}`;
      if (statSync(join(root, rel)).isDirectory()) astroFiles(rel, out);
      else if (name.endsWith('.astro')) out.push(rel);
    }
    return out;
  };

  it('has no executable is:inline scripts (they would need a hash on every page)', () => {
    const offenders: string[] = [];
    for (const file of astroFiles('src')) {
      for (const [tag] of read(file).matchAll(
        /<script\b[^>]*\bis:inline\b[^>]*>/g
      )) {
        if (
          /type=["']application\/ld\+json["']/.test(tag) ||
          /\ssrc=/.test(tag)
        )
          continue;
        offenders.push(`${file}: ${tag}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('keeps scripts and stylesheets out of the HTML (no inline hashes to drift)', () => {
    const config = read('astro.config.mjs');
    expect(config).toMatch(/inlineStylesheets:\s*'never'/);
    expect(config).toMatch(/assetsInlineLimit:/);
    expect(config).toMatch(/cspMetaFirst\(\)/);
  });

  it('leaves the published purchasing-archive proof byte-for-byte as generated', () => {
    const manifest = JSON.parse(read('public/proofs/purchasing/manifest.json'));
    const served = readFileSync(
      join(root, 'public/proofs/purchasing/archive.html')
    );
    expect(createHash('sha256').update(served).digest('hex')).toBe(
      manifest.files['preview/index.html'].sha256
    );
  });
});

describe.skipIf(!existsSync(join(dist, 'index.html')))(
  'built output (dist/)',
  () => {
    const pages = existsSync(dist) ? htmlFiles(dist) : [];
    const rel = (file: string) => relative(dist, file).split('\\').join('/');
    const astroPages = pages.filter((f) => !STATIC_POLICY_FILES.has(rel(f)));

    it('every shipped page passes the checker (hashes recomputed from the HTML)', () => {
      const problems = astroPages.flatMap((file) =>
        checkPage(readFileSync(file, 'utf8')).map(
          (p: string) => `${rel(file)}: ${p}`
        )
      );
      expect(astroPages.length).toBeGreaterThan(60);
      expect(problems).toEqual([]);
    });

    it('shares one policy site-wide; only the robots.txt tool widens connect-src', () => {
      const byPolicy = new Map<string, string[]>();
      for (const file of astroPages) {
        const [policy] = findPolicies(readFileSync(file, 'utf8'));
        byPolicy.set(policy.content, [
          ...(byPolicy.get(policy.content) ?? []),
          rel(file)
        ]);
      }
      const [site, ...others] = [...byPolicy.entries()].sort(
        (a, b) => b[1].length - a[1].length
      );
      expect(others.map(([, files]) => files)).toEqual([
        ['tools/robots-audit/index.html']
      ]);
      const wide = parsePolicy(others[0][0]);
      const narrow = parsePolicy(site[0]);
      for (const [name, values] of narrow) {
        if (name !== 'connect-src')
          expect(wide.get(name), name).toEqual(values);
      }
      expect(wide.get('connect-src')).toEqual(
        expect.arrayContaining(['https://r.jina.ai', 'https:'])
      );
      expect(narrow.get('connect-src')).not.toContain('https:');
    });

    it('ships the static proof archive with its own policy untouched', () => {
      for (const file of STATIC_POLICY_FILES) {
        const shipped = readFileSync(join(dist, file));
        const source = readFileSync(join(root, 'public', file));
        expect(shipped.equals(source), file).toBe(true);
        expect(findPolicies(shipped.toString('utf8'))).toHaveLength(1);
      }
    });
  }
);
