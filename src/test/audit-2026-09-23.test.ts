import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

// Regression guards for the defects fixed in the 2026-09-23 product audit
// (docs/PRODUCT-AUDIT-2026-09-23.md). Source-level, like truth-contract.test.ts.

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');
const sha256 = (path: string) =>
  createHash('sha256').update(readFileSync(join(root, path))).digest('hex');

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(join(root, dir))) {
    const rel = `${dir}/${name}`;
    if (statSync(join(root, rel)).isDirectory()) walk(rel, out);
    else if (/\.(astro|css|ts)$/.test(name)) out.push(rel);
  }
  return out;
}

describe('2026-09-23 audit regressions', () => {
  it('defines every --gf-* custom property the site uses', () => {
    const files = walk('src');
    const defined = new Set<string>();
    const used = new Map<string, string>();
    for (const file of files) {
      const source = read(file);
      for (const [, name] of source.matchAll(/(--gf-[a-z0-9-]+)\s*:/g)) {
        defined.add(name);
      }
      for (const [, name] of source.matchAll(/var\((--gf-[a-z0-9-]+)/g)) {
        if (!used.has(name)) used.set(name, file);
      }
    }
    const missing = [...used].filter(([name]) => !defined.has(name));
    // An undefined token made the discovery form's submit label render
    // charcoal on charcoal (1.1:1).
    expect(missing).toEqual([]);
  });

  it('keeps the mobile menu working after ClientRouter navigation', () => {
    const header = read('src/components/Header.astro');
    // Delegated from document so it survives the body swap.
    expect(header).toMatch(/document\.addEventListener\('click'/);
    expect(header).toContain("closest('#mobile-menu-button')");
    expect(header).not.toMatch(/menuButton\?\.addEventListener\('click'/);
  });

  it('re-binds the free tools on astro:page-load', () => {
    for (const path of [
      'src/pages/tools/speed-test.astro',
      'src/pages/tools/bootcamp-roi.astro',
      'src/pages/tools/robots-audit.astro'
    ]) {
      expect(read(path), path).toContain("'astro:page-load'");
    }
  });

  it('escapes third-party robots.txt content before it reaches innerHTML', () => {
    const source = read('src/pages/tools/robots-audit.astro');
    expect(source).toContain('function esc(');
    for (const expr of [
      'esc(u)',
      'esc(s)',
      'esc(f.msg)',
      'esc(text)',
      'esc(robotsUrl)'
    ]) {
      expect(source, expr).toContain(expr);
    }
    expect(source).not.toMatch(/<code>\$\{u\}<\/code>/);
    expect(source).not.toMatch(/<code>\$\{s\}<\/code>/);
    // The note must name the third party the address is sent to.
    expect(source).toContain('r.jina.ai');
    expect(source).not.toMatch(/from your browser\. We don't log it/);
  });

  it('keeps buttons legible inside prose containers', () => {
    const css = read('src/styles/gatefold.css');
    expect(css).toMatch(/\.novel-container a\.btn-primary[\s\S]*?color: #fff/);
  });

  it('tells a buyer who lands on the withdrawn product return page not to send files', () => {
    const page = read('src/pages/order/reconciliation.astro');
    expect(page).toMatch(/withdrawn\s+on\s+14\s+September\s+2026/);
    expect(page).toMatch(/do\s+not send files/);
    const product = read('src/pages/file-reconciliation.astro');
    expect(product).not.toContain('faqSchema(');
    expect(product).toContain('https://schema.org/Discontinued');
  });

  it('shows currency, tax treatment and the terms at the buy button', () => {
    for (const path of [
      'src/pages/buy/file-conversion.astro',
      'src/pages/buy/gtfs-feed-check.astro'
    ]) {
      const source = read(path);
      expect(source, path).toContain('kit-buy-terms');
      expect(source, path).toMatch(/excluding\s+any\s+tax\s+applicable/);
      expect(source, path).toContain('href="/terms/"');
      expect(source, path).toContain('href="/policies/"');
    }
  });

  it('distinguishes legacy and workflow-brief retention on the hub privacy page', () => {
    // The legacy eolkits forms retain their approved 24-month automatic rule.
    // The new same-origin workflow brief has a separate, operator-run 90-day
    // minimization policy with explicit retained-record and backup boundaries.
    const page = read('src/pages/privacy.astro').replace(/\s+/g, ' ');
    expect(page).toContain("const lastUpdated = 'October 5, 2026';");
    for (const phrase of [
      'Legacy inquiries submitted to the eolkits lead service are deleted automatically 24 months after submission.',
      'Submissions flagged as spam are deleted on the same schedule.',
      'For the separate workflow brief service, an operator-run retention process minimizes the content of an unconverted inquiry and its queued notification recipient after 90 days.',
      'Briefs linked to active projects are protected while the engagement needs them.',
      'Stable receipt references, client reference hashes, audit metadata, and applicable accounting records may remain',
      "Backup copies expire under the deployment's documented backup policy rather than being removed immediately."
    ]) {
      expect(page, phrase).toContain(phrase);
    }
    expect(page).toContain(
      'The workflow brief uses browser session storage only to retain the random submission ID needed for a safe retry.'
    );
    expect(page).toContain(
      'It queues a confirmation to the email address on the brief and an alert to Toledo Technologies through our existing email provider.'
    );
    expect(page).toContain(
      'The saved reference remains valid if either email is delayed or a delivery attempt fails'
    );
    expect(page).toContain(
      'we do not promise that every message will arrive or arrive at a particular time.'
    );
  });

  it('preserves the reviewed public kit comparison and sample from production', () => {
    const restoredPages = {
      'src/pages/kit/compare.astro':
        '58742621f8ab18d0ce71bc49f5068066d7bf74d5dbe361b6cd62ab6bafe84f5a',
      'src/pages/kit/sample.astro':
        'c7d9cfdb773755087e55392ef77902b98c1b1b9091e315d46528bc32931373a8',
      'public/kit/sample/output/report.html':
        '477e46422d9a715ae98dce675fdcc51759520dd10d9117514d7066c9c9abb00e',
      'public/kit/sample/evaluation-packet.zip':
        '5fb0b0597da9ea837bcdb61bdbac79d06dce3ad0a5abef6b65cfc8f4c4f7559c'
    };
    for (const [path, expected] of Object.entries(restoredPages)) {
      expect(sha256(path), path).toBe(expected);
    }

    const manifest = JSON.parse(read('public/kit/sample/manifest.json')) as Record<
      string,
      { sha256: string; bytes: number }
    >;
    for (const [path, evidence] of Object.entries(manifest)) {
      const publicPath = `public/kit/sample/${path}`;
      expect(statSync(join(root, publicPath)).size, publicPath).toBe(evidence.bytes);
      expect(sha256(publicPath), publicPath).toBe(evidence.sha256);
    }
  });
});
