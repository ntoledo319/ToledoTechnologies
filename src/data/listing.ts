/**
 * Canonical vendor record for Toledo Technologies LLC.
 *
 * One source of truth for every place the company is described by someone
 * other than us: directory forms, procurement questionnaires, partner
 * registries, machine-readable catalogues, and write-ups.
 *
 * Consumed by:
 *   - src/pages/listing.astro   (the public /listing/ page)
 *   - src/pages/catalog.json.ts (the machine-readable /catalog.json feed)
 *
 * Rules for editing this file:
 *   1. Every claim here must already be true and already be published
 *      somewhere on the site. This file restates facts; it does not create
 *      them.
 *   2. Prices, refund conditions, turnaround and payment timing must match
 *      /engagements/ and /buy/file-conversion/ exactly. If one changes, all of
 *      them change in the same commit.
 *   3. Do not add certifications, client names, review counts, headcount or
 *      years-in-business. We do not have those and a directory listing is a
 *      bad place to start inventing them.
 */

export const SITE_URL = 'https://toledotechnologies.com';

export interface Entity {
  legalName: string;
  tradingName: string;
  entityType: string;
  jurisdiction: string;
  serviceArea: string;
  workingLanguage: string;
  website: string;
  engagementsEmail: string;
  generalEmail: string;
  publicCode: string;
  founded: null;
}

export const entity: Entity = {
  legalName: 'Toledo Technologies LLC',
  tradingName: 'Toledo Technologies',
  entityType: 'Limited liability company',
  jurisdiction: 'Connecticut, United States',
  serviceArea: 'Remote, worldwide. No public storefront and no on-site work.',
  workingLanguage: 'English',
  website: SITE_URL,
  engagementsEmail: 'dev@toledotechnologies.com',
  generalEmail: 'hello@toledotechnologies.com',
  publicCode: 'https://github.com/ntoledo319',
  // Deliberately null. A formation date is a fact we have not published, and a
  // listing is not the place to publish one for the first time.
  founded: null
};

/**
 * How the work is actually produced. Restates the disclosure already published
 * at /buy/file-conversion/ ("Toledo Technologies LLC is a US company, and it is
 * AI-operated: correspondence, implementation, testing and handover are run by
 * AI, with the company accountable for delivery").
 */
export const deliveryModel = {
  summary: 'AI-operated. Toledo Technologies LLC is the contracting supplier.',
  detail:
    'Correspondence, implementation, testing and handover are run by AI under ' +
    'the written scope, with the company accountable for delivery. Human ' +
    'review is included only when the scope names the reviewer and that ' +
    'review is actually performed. This is disclosed before an engagement ' +
    'starts, not after.',
  channel: 'Written and asynchronous. No standups, no live debugging sessions.'
};

export interface Offer {
  id: string;
  name: string;
  priceUsd: number;
  /** Where a buyer goes to read the full terms. */
  url: string;
  /** Set only where a buyer can transact without emailing first. */
  buyUrl?: string;
  /** One sentence a buyer can decide on. */
  summary: string;
  /** The boundary that makes the fixed price honest. */
  bound: string;
  /** What has to be true for the work to be accepted. */
  acceptance: string;
  /** The published refund condition, or an explicit note that none is published. */
  refund: string;
  /** When money changes hands. These differ by offer; do not generalise them. */
  payment: string;
  /** Published turnaround, or an explicit note that it is quoted. */
  turnaround: string;
}

export const offers: Offer[] = [
  {
    id: 'file-conversion',
    name: 'File conversion',
    priceUsd: 850,
    url: `${SITE_URL}/buy/file-conversion/`,
    buyUrl: `${SITE_URL}/buy/file-conversion/`,
    summary:
      'An export in a shape nothing will read, converted into the schema you ' +
      'specify, with complete source-row accounting.',
    bound:
      'One source format, one target schema, up to 50,000 rows. Excludes ' +
      'access to live systems, scheduled runs, data cleaning beyond the ' +
      'stated conversion, and any opinion on what the data means.',
    acceptance:
      'Every input row appears in the output or in a reject list with a ' +
      'reason. The counts reconcile or the run fails. One command ' +
      'regenerates the whole output from the source. You run the acceptance ' +
      'tests yourself.',
    refund:
      'Refunded in full if the file cannot be read, or if the conversion ' +
      'turns out to fall outside the published scope.',
    payment:
      'Bought directly at /buy/file-conversion/ before work starts. Paying is ' +
      'acceptance of the scope published on that page.',
    turnaround:
      'Two business days from receipt of both the file and the target schema.'
  },
  {
    id: 'integration-triage',
    name: 'Integration triage',
    priceUsd: 1200,
    url: `${SITE_URL}/engagements/`,
    summary:
      'A failure that is intermittent, silent or production-only, reproduced ' +
      'and traced to a cause before anyone is paid to fix it.',
    bound:
      'Diagnosis only. The repair is quoted separately once the cause is ' +
      'established.',
    acceptance:
      'A reproduction of the failure with the evidence that establishes the ' +
      'cause, plus a fix plan you can check.',
    refund: 'Refunded in full if the failure cannot be reproduced.',
    payment:
      'Scope and acceptance test agreed in writing first; paid after the ' +
      'acceptance test passes.',
    turnaround: 'Quoted with the scope. No turnaround is published in advance.'
  },
  {
    id: 'evaluation-harness',
    name: 'Reproducible test or evaluation harness',
    priceUsd: 2200,
    url: `${SITE_URL}/engagements/`,
    summary:
      'A quality number you can defend and re-derive next quarter without ' +
      'paying for it twice.',
    bound:
      'Scores from saved outputs. It does not re-run the system that ' +
      'produced them.',
    acceptance:
      'Byte-stable results: identical inputs give identical output every ' +
      'time. Abstentions, unparseable output and duplicate records are ' +
      'reported separately rather than collapsed into one number.',
    refund:
      'No refund condition is published for this one. Payment falls due only ' +
      'after the acceptance test passes, so an unaccepted result is unpaid.',
    payment:
      'Scope and acceptance test agreed in writing first; paid after the ' +
      'acceptance test passes.',
    turnaround: 'Quoted with the scope. No turnaround is published in advance.'
  }
];

/**
 * Description copy at the lengths directory and procurement forms actually
 * ask for. Pre-written so a third party describing us gets it right without
 * having to summarise the site themselves.
 *
 * Note what these deliberately do NOT say: they do not claim a single payment
 * rule across all three engagements, because there isn't one. File conversion
 * is bought up front; the other two are paid on acceptance.
 */
export const descriptions = {
  /** Fits a 100-character field. */
  oneLine:
    'Fixed-scope software work: published prices, written acceptance test agreed before work starts.',
  words25:
    'Toledo Technologies LLC sells three bounded software engagements at ' +
    'published prices: file conversion, integration triage, evaluation ' +
    'harnesses. Acceptance is agreed in writing beforehand.',
  words50:
    'Toledo Technologies LLC is a software practice selling three bounded ' +
    'engagements at published prices: file conversion with complete row ' +
    'accounting (US$850, bought directly), integration triage refunded if the ' +
    'failure cannot be reproduced (US$1,200), and a reproducible evaluation ' +
    'harness (US$2,200). Scope and acceptance test are written down first. ' +
    'Delivery is AI-operated.',
  words100:
    'Toledo Technologies LLC is a remote software practice that publishes its ' +
    'prices instead of quoting after a discovery call. Three engagements are ' +
    'bounded and listed: file conversion with complete source-row accounting ' +
    '(US$850, bought directly, refunded in full if the file cannot be read or ' +
    'the work falls outside the published scope), integration triage for ' +
    'intermittent or production-only failures, refunded in full if the ' +
    'failure cannot be reproduced (US$1,200), and a reproducible evaluation ' +
    'harness whose results are byte-stable and re-derivable offline ' +
    '(US$2,200). The two quoted engagements are paid after their acceptance ' +
    'test passes. Delivery is AI-operated and disclosed. Two runnable samples ' +
    'are published with full source, test records and stated limits.'
};

/** Category strings and codes directories ask for. */
export const classification = {
  naicsPrimary: {
    code: '541511',
    title: 'Custom Computer Programming Services'
  },
  naicsSecondary: [
    { code: '541512', title: 'Computer Systems Design Services' },
    { code: '541519', title: 'Other Computer Related Services' }
  ],
  // Most directories use free-text categories, not codes. These are the ones
  // that match what we actually sell.
  categories: [
    'Custom software development',
    'Data migration and ETL',
    'API and webhook integration',
    'Software testing and QA automation',
    'Technical due diligence'
  ],
  keywords: [
    'file conversion',
    'schema mapping',
    'data reconciliation',
    'integration triage',
    'webhook debugging',
    'request signing',
    'idempotency',
    'evaluation harness',
    'reproducible benchmarking',
    'Python',
    'TypeScript',
    'Node',
    'SQL',
    'Astro'
  ]
};

export const capabilities = {
  languages: ['Python', 'JavaScript', 'TypeScript', 'Node', 'SQL', 'Shell'],
  data: [
    'CSV',
    'TSV',
    'fixed-width',
    'JSON',
    'XML',
    'Excel output',
    'schema mapping',
    'reconciliation against a source of truth',
    'deduplication with a stated policy'
  ],
  integration: [
    'REST and webhook integrations',
    'request signing',
    'retry and idempotency behaviour',
    'failure queues',
    'API debugging against real traffic'
  ],
  testing: [
    'automated test suites',
    'reproducible evaluation harnesses',
    'adversarial and failure-path testing'
  ]
};

/**
 * The disqualifying facts. Published on purpose: a directory that requires any
 * of these should reject the listing, and finding that out from this page is
 * cheaper for everyone than finding it out from a rejected application.
 *
 * Every entry is a statement about today, not a promise about the future.
 */
export const doesNotHave = [
  'No published client references or named case studies. The samples at /proofs/ use invented data and say so.',
  'No third-party reviews or ratings on any review platform. The nonprofit track at /nonprofit/ does trade reduced pricing for a written case study and a short testimonial; nothing collected that way would be an independent review, and none is published today.',
  'No security, accessibility, clinical or financial certifications, and none are issued.',
  'No published D-U-N-S number, CAGE code or federal contractor registration.',
  'No employees to list. One operator, AI-operated delivery, disclosed.',
  'No hourly rate for the three engagements on this page — they are fixed-scope only, and US$850 is the honest answer to a “minimum project size” field. White-label subcontracting for agencies is a separate track, is priced hourly, and those rates are published at /services/.'
];

/**
 * Payment terms, stated per route rather than as one rule, because the site
 * publishes two different ones. Do not collapse these.
 */
export const paymentTerms = {
  currency: 'USD',
  method: 'Card, via Stripe. Invoiced and collected in USD.',
  directBuy:
    'File conversion is bought up front at /buy/file-conversion/. Paying is ' +
    'acceptance of the scope published on that page, and it is refunded in ' +
    'full if the file cannot be read or the work falls outside that scope.',
  quoted:
    'Integration triage and the evaluation harness are scoped in writing ' +
    'first and paid after the agreed acceptance test passes. Larger work is ' +
    'milestoned against the same rule.',
  tax: 'Prices exclude any tax applicable in the buyer’s jurisdiction.'
};

/** schema.org OfferCatalog. Emitted on /listing/ and as /catalog.json. */
export function offerCatalogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${SITE_URL}/catalog.json#catalog`,
    name: 'Toledo Technologies fixed-scope engagements',
    url: `${SITE_URL}/engagements/`,
    description: descriptions.words50,
    provider: {
      '@type': 'Organization',
      // Same node as the site-wide Organization emitted on the homepage. Name
      // and legalName are kept identical to that node on purpose: redefining a
      // shared @id with a different name gives a consumer two conflicting
      // records for one entity.
      '@id': `${SITE_URL}/#organization`,
      name: entity.tradingName,
      legalName: entity.legalName,
      url: SITE_URL,
      email: entity.engagementsEmail,
      naics: classification.naicsPrimary.code,
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      sameAs: [entity.publicCode]
    },
    itemListElement: offers.map((offer, index) => ({
      '@type': 'Offer',
      '@id': `${SITE_URL}/catalog.json#${offer.id}`,
      position: index + 1,
      url: offer.url,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: offer.priceUsd,
        priceCurrency: paymentTerms.currency,
        valueAddedTaxIncluded: false
      },
      eligibleCustomerType: 'https://schema.org/Business',
      // The price never travels without its boundary, its refund condition and
      // its payment timing. A machine reader that kept only the number and
      // dropped these would be quoting terms we do not offer.
      description: [
        offer.bound,
        offer.refund,
        offer.payment,
        `Turnaround: ${offer.turnaround}`
      ].join(' '),
      itemOffered: {
        '@type': 'Service',
        name: offer.name,
        serviceType: classification.naicsPrimary.title,
        description: `${offer.summary} ${offer.bound}`,
        provider: { '@id': `${SITE_URL}/#organization` }
      }
    }))
  };
}
