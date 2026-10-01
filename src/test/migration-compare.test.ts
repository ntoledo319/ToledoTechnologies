import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { KIT_OFFERS } from '../config/kit';

const page = readFileSync('src/pages/kit/compare.astro', 'utf8').replace(
  /\s+/g,
  ' '
);
const landing = readFileSync('src/pages/kit/index.astro', 'utf8');

describe('migration comparison commercial contract', () => {
  it('uses canonical offers instead of a competing price or checkout ledger', () => {
    expect(KIT_OFFERS.map(({ price }) => price)).toEqual([240, 600]);
    expect(page).toContain('KIT_OFFERS.map');
    expect(page).toContain('KIT_ON_SALE &&');
    expect(page).toContain('trackedPurchase(offer.paymentLink)');
    expect(page).not.toContain('buy.stripe.com/');
  });
  it('keeps limits ahead of buying and identifies synthetic evidence', () => {
    for (const limit of [
      'both read into memory',
      'No database, Excel, JSON, XML or Parquet input',
      'not an audit or attestation'
    ]) {
      expect(page.indexOf(limit)).toBeGreaterThan(0);
      expect(page.indexOf(limit)).toBeLessThan(page.indexOf('Buy the'));
    }
    expect(page).toContain(
      'Synthetic illustration, not customer data or generated tool output'
    );
    expect(page).toContain('two-user subscription minimum');
    expect(page).toContain('not a hands-on benchmark');
  });
  it('connects discovery to an inspectable product and names current official sources', () => {
    expect(landing.match(/href="\/kit\/compare\/"/g)).toHaveLength(1);
    for (const path of ['/kit/sample/', '/kit/license/', '/kit/delivered/'])
      expect(page).toContain(`href="${path}"`);
    for (const path of [
      'product-tour/licensing-pricing-options',
      'solutions/data-migration-testing',
      'compare-trial-options'
    ]) {
      expect(page).toContain(`https://www.querysurge.com/${path}`);
    }
    expect(page).toContain('2026-10-01');
  });
});
