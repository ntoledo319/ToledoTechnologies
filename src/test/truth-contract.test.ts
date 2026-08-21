import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

function visibleLeadControls(path: string): string[] {
  const source = read(path);
  const form = source.match(/<form\b[\s\S]*?<\/form>/)?.[0];
  if (!form) throw new Error(`No form found in ${path}`);

  return [...form.matchAll(/<(input|select|textarea)\b[\s\S]*?>/gi)]
    .map(([tag]) => tag)
    .filter(
      (tag) =>
        !/type=["']hidden["']/i.test(tag) && !/name=["']_honey["']/i.test(tag)
    );
}

describe('public truth contracts', () => {
  it('keeps the unsupported client stories out of the content collection', () => {
    expect(existsSync('src/content/case-studies/legacy-system-rescue.md')).toBe(
      false
    );
    expect(existsSync('src/content/case-studies/startup-mvp-launch.md')).toBe(
      false
    );

    for (const slug of ['legacy-system-rescue', 'startup-mvp-launch']) {
      const notice = read(`src/pages/case-studies/${slug}.astro`);
      expect(notice).toContain('noindex={true}');
      expect(notice).toMatch(/not a case study|not a .*claim/i);
      expect(notice).toContain('/case-studies');
    }
  });

  it('requires provenance and limitations on every proof note', () => {
    const directory = join(root, 'src/content/case-studies');
    const notes = readdirSync(directory).filter((name) => name.endsWith('.md'));
    expect(notes.length).toBeGreaterThan(0);

    for (const note of notes) {
      const source = readFileSync(join(directory, note), 'utf8');
      expect(source, note).toMatch(/^evidenceType:/m);
      expect(source, note).toMatch(/^evidenceNote:/m);
      expect(source, note).toMatch(/^limitations:/m);
      expect(source, note).not.toMatch(/^client:/m);
      expect(source, note).not.toMatch(/^testimonial:/m);
    }
  });

  it('routes AI and mobile discovery to their exact service anchors', () => {
    const source = `${read('src/pages/services.astro')}\n${read('src/pages/discovery.astro')}`;
    expect(source).toContain('https://ai.toledotechnologies.com/#start');
    expect(source).toContain(
      'https://mobile.toledotechnologies.com/#discovery'
    );
  });

  it('lists Tessera as a bounded product with exact live prices', () => {
    const source = [
      read('src/pages/services.astro'),
      read('src/components/Footer.astro'),
      read('src/components/home/SideAFooter.astro'),
      read('public/llms.txt')
    ].join('\n');

    expect(source).toContain(
      'https://qi.toledotechnologies.com/pci-4-compliance-scanner'
    );
    expect(source).toContain('PCI DSS 6.4.3 remediation pack ($299 once)');
    expect(source).toContain('PCI DSS 5.4.1 email-authentication');
    expect(source).toMatch(
      /one-target PCI DSS 11\.6\.1\s+evidence ledger \(\$99\/month\)/
    );
    expect(source).toMatch(/does not determine (?:PCI DSS )?compliance/i);
    expect(source).toContain(
      'https://github.com/ntoledo319/pci-payment-page-check'
    );
    expect(source).toContain(
      'https://github.com/marketplace/actions/pci-payment-page-script-check'
    );
    expect(source).toContain('Free MIT served-HTML inventory Action');
    expect(source).toMatch(/does not execute JavaScript/i);
    expect(source).toMatch(/does not (?:certify|determine).*compliance/i);
  });

  it('uses the live lead bus and keeps contact routing context', () => {
    const contact = read('src/pages/contact.astro');
    expect(contact).toContain('https://eolkits.com/api/v1/lead');
    expect(contact).toContain('name="service"');
    expect(contact).toContain('name="context"');
    expect(contact).toContain("urlParams.get('subject')");
    expect(contact).toContain("urlParams.get('service')");
  });

  it.each([
    ['src/pages/contact.astro', 5],
    ['src/pages/discovery.astro', 5],
    ['src/pages/care.astro', 5],
    ['src/pages/partner.astro', 5]
  ])('%s exposes only %i meaningful first-step fields', (path, expected) => {
    expect(visibleLeadControls(path)).toHaveLength(expected);
  });

  it.each([
    'src/pages/contact.astro',
    'src/pages/discovery.astro',
    'src/pages/care.astro',
    'src/pages/partner.astro'
  ])('%s requires email and no other visible control', (path) => {
    const required = visibleLeadControls(path).filter((control) =>
      /\srequired(?:\s|\/>|>)/i.test(control)
    );
    expect(required).toHaveLength(1);
    expect(required[0]).toMatch(/<input\b/i);
    expect(required[0]).toMatch(/type=["']email["']/i);
  });

  it.each([
    'src/pages/contact.astro',
    'src/pages/discovery.astro',
    'src/pages/care.astro',
    'src/pages/partner.astro'
  ])('%s exposes an accessible success-query state', (path) => {
    const source = read(path);
    expect(source).toContain('submitted');
    expect(source).toContain('id="submission-success"');
    expect(source).toContain('role="status"');
  });

  it('uses the canonical care and bucket names everywhere they are summarized', () => {
    const source = [
      read('src/pages/care.astro'),
      read('src/pages/services.astro'),
      read('src/components/home/LinerNotes.astro')
    ].join('\n');
    expect(source).toMatch(/Hearth Care/);
    expect(source).toMatch(/Aegis Care/);
    expect(source).toMatch(/Laurel Care/);
    expect(source).toMatch(/Olympian Care/);
    expect(source).not.toMatch(
      /Basic Care|Standard Support|Product Support|Strategic Growth|Starter Bucket|Growth Bucket|Scale Bucket/
    );
  });

  it('keeps retired performance packages out of the active service page', () => {
    const source = read('src/pages/services/performance-audit.astro');
    expect(source).not.toMatch(/Rapid Pulse|Deep Dive|Continuous Edge/);
    expect(source).toContain('$225/hour');
    expect(source).toMatch(/retired performance-package/i);
  });

  it('uses the white-label-specific rate card on the partner page', () => {
    const source = read('src/pages/partner.astro');
    expect(source).toContain('$125/hr');
    expect(source).toContain('$150–$175/hr');
    expect(source).toContain('$2,500/project');
    expect(source).toContain('$300/hr');
    expect(source).toContain('four-hour minimum');
    expect(source).not.toContain('$225–$275/hr');
  });

  it('states every discovery-credit limit', () => {
    for (const source of [
      read('src/pages/about.astro'),
      read('src/pages/discovery.astro'),
      read('src/pages/policies.astro'),
      read('src/pages/services.astro'),
      read('public/llms.txt')
    ]) {
      expect(source).toMatch(/does\s+not\s+roll\s+forward/i);
    }
  });

  it('keeps ownership copy scoped to signed deliverables and retained tools', () => {
    const source = [
      read('src/components/Footer.astro'),
      read('src/components/home/SideAFooter.astro'),
      read('src/components/home/LinerNotes.astro'),
      read('src/layouts/GatefoldLayout.astro')
    ].join('\n');
    expect(source).not.toMatch(
      /owned outright|keep, modify, and resell|No service mark/i
    );
    expect(source).toMatch(/Completed proposal-defined deliverables/);
    expect(source).toMatch(/reusable methods/);
  });

  it('keeps site-wide structured data free of universal delivery promises', () => {
    const source = read('src/utils/jsonld.ts');
    expect(source).not.toMatch(/shipped in about a week/i);
    expect(source).not.toMatch(/E-commerce \/ Stripe Setup/i);
    expect(source).toMatch(
      /Scope, timing, and ownership terms are confirmed in writing/i
    );
  });

  it('does not promise a general inquiry response deadline', () => {
    const source = [
      read('src/pages/contact.astro'),
      read('src/pages/services.astro'),
      read('src/pages/care.astro'),
      read('src/pages/partner.astro')
    ].join('\n');
    expect(source).not.toMatch(/repl(?:y|ies) within (?:one|1) business day/i);
    expect(source).not.toMatch(/real reply within a business day/i);
  });

  it('makes horizontally scrolling tool output keyboard discoverable', () => {
    for (const path of [
      'src/pages/tools/bootcamp-roi.astro',
      'src/pages/tools/speed-test.astro'
    ]) {
      const source = read(path);
      expect(source).toContain('role="region"');
      expect(source).toContain('tabindex="0"');
      expect(source).toContain('table-scroll-hint');
    }
  });

  it('keeps the shared mobile navigation keyboard dismissible and breadcrumb targets usable', () => {
    const header = read('src/components/Header.astro');
    const breadcrumbs = read('src/components/Breadcrumbs.astro');

    expect(header).toContain("event.key === 'Escape'");
    expect(header).toContain('setMenuOpen(false)');
    expect(header).toContain('menuButton.focus()');
    expect(breadcrumbs).toContain('min-h-6');
  });

  it('does not render research notes as client results', () => {
    const templates = `${read('src/pages/case-studies/index.astro')}\n${read('src/pages/case-studies/[slug].astro')}`;
    expect(templates).not.toMatch(/client results?|customer results?/i);
    expect(templates).toMatch(/not client work/i);
  });
});
