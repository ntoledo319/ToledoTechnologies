import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Regression guards for the defects fixed in the 2026-09-23 product audit
// (docs/PRODUCT-AUDIT-2026-09-23.md). Source-level, like truth-contract.test.ts.

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

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
});
