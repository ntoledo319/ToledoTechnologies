import release from '../data/kit-release.json';

/**
 * Migration Acceptance Kit — the single place the product's facts live.
 *
 * `src/data/kit-release.json` is written by `package_kit.py` when a release is
 * built. Do not hand-edit it: the archive hash on the product page has to be
 * the hash of the archive a buyer actually decrypts, or the page is lying.
 *
 * Two independent gates keep this page from promising something that is not
 * there yet. Both default to closed, and both are flipped by the act that makes
 * them true rather than by anyone remembering to update a page:
 *
 *   KIT_ARCHIVE_PUBLISHED — `release.published` is written `true` by
 *     package_kit.py in the same run that copies the ciphertext into
 *     `public/kit/`. Until then the pages show no download link, because a
 *     download link to a file that is not there is a 404 dressed as an offer.
 *
 *   KIT_CHECKOUT_OPEN — both Stripe Payment Link URLs are non-empty. Until
 *     then the page says plainly that it cannot be bought, and promises
 *     nothing in the meantime.
 *
 * See code/migration-acceptance-kit/RELEASE-RUNBOOK.md (in the private
 * toledo-revenue-continuation working repo, not here) for the release steps.
 */

export interface KitOffer {
  id: string;
  name: string;
  price: number;
  currency: 'USD';
  who: string;
  grants: string[];
  paymentLink: string;
}

export const KIT_TEST_COUNT = 74;
export const KIT_VERSION = release.version;
export const KIT_RELEASE = release;

/** Where the ciphertext lives once published. Public, and safe to be: AES-256. */
export const KIT_DOWNLOAD_PATH = `/kit/${release.encrypted_archive}`;

/**
 * True only once the ciphertext has actually been built and copied into
 * `public/kit/`. Read through `Record<string, unknown>` on purpose: the JSON
 * import narrows to a literal type, and a literal comparison would stop
 * type-checking the moment the packager flips the value.
 */
export const KIT_ARCHIVE_PUBLISHED: boolean = Boolean(
  (release as Record<string, unknown>).published
);

export const KIT_OFFERS: KitOffer[] = [
  {
    id: 'single',
    name: 'Single-organisation licence',
    price: 240,
    currency: 'USD',
    who: 'One company, migrating its own data.',
    grants: [
      'unlimited migrations for that organisation, forever',
      'any number of machines, laptops, servers and CI runners',
      'full source, modifiable, no licence key and no expiry',
      'the reports it produces are yours outright'
    ],
    paymentLink: 'https://buy.stripe.com/14A6oH3jU9tm5xh9Va87K0o'
  },
  {
    id: 'consultancy',
    name: 'Consultancy licence',
    price: 600,
    currency: 'USD',
    who: 'An agency or consultancy migrating data for clients.',
    grants: [
      'everything in the single-organisation licence',
      'use on paid client engagements, on client data',
      'hand the reports, findings and sign-off memos to your clients',
      'clients receive the outputs; the kit itself stays with you'
    ],
    paymentLink: 'https://buy.stripe.com/3cIbJ1cUuaxq7Fp2sI87K0p'
  }
];

export const KIT_CHECKOUT_OPEN = KIT_OFFERS.every(
  (o) => o.paymentLink.length > 0
);

/** Nothing can be bought and nothing can be downloaded. */
export const KIT_ON_SALE = KIT_CHECKOUT_OPEN && KIT_ARCHIVE_PUBLISHED;
