const SITE_URL = import.meta.env.SITE || 'https://toledotechnologies.com';
const SITE_NAME = 'Toledo Technologies';
const GITHUB_URL = 'https://github.com/ntoledo319';
const CONTACT_EMAIL = 'hello@toledotechnologies.com';

/**
 * Organization schema for the company.
 * Used on homepage and anywhere company info is relevant.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512
    },
    email: CONTACT_EMAIL,
    sameAs: [GITHUB_URL],
    description:
      'Founder-led software practice for custom websites, applications, automation, performance work, and technical discovery.',
    knowsAbout: [
      'Software Development',
      'Bug Fixes',
      'Feature Implementation',
      'Custom Automation',
      'MVP Development',
      'Security and Compliance Tooling'
    ]
  };
}

/**
 * WebSite schema with search action.
 * Used on homepage.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      'Founder-led software practice for custom builds, repairs, performance work, and paid discovery.',
    publisher: {
      '@id': `${SITE_URL}/#organization`
    }
  };
}

/**
 * BreadcrumbList schema for interior pages.
 * Helps search engines understand site hierarchy.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

/**
 * Service schema for the services page.
 * Lists offered services with descriptions.
 */
export function serviceSchema(
  services: { name: string; description: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Software Development Services',
    provider: {
      '@id': `${SITE_URL}/#organization`
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Development Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description
        }
      }))
    }
  };
}

/**
 * BlogPosting schema for individual blog posts.
 */
export function blogPostingSchema(post: {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url.startsWith('http') ? post.url : `${SITE_URL}${post.url}`,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate || post.publishedDate,
    author: {
      '@type': 'Organization',
      name: post.author || SITE_NAME,
      url: SITE_URL
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url.startsWith('http') ? post.url : `${SITE_URL}${post.url}`
    },
    image: post.image
      ? post.image.startsWith('http')
        ? post.image
        : `${SITE_URL}${post.image}`
      : `${SITE_URL}/og-default.png`
  };
}

/**
 * ItemList schema for catalog pages (codebases, blog index).
 */
export function itemListSchema(
  items: { name: string; url: string; description?: string }[],
  listName: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
      description: item.description
    }))
  };
}

/**
 * Article schema for case studies and long-form content.
 */
export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url.startsWith('http')
      ? article.url
      : `${SITE_URL}${article.url}`,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      '@type': 'Organization',
      name: article.author || SITE_NAME,
      url: SITE_URL
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url.startsWith('http')
        ? article.url
        : `${SITE_URL}${article.url}`
    },
    image: article.image
      ? article.image.startsWith('http')
        ? article.image
        : `${SITE_URL}${article.image}`
      : `${SITE_URL}/og-default.png`
  };
}

/**
 * SoftwareSourceCode schema for public capability notes.
 * Deliberately excludes Offer data: the archive is not a storefront.
 */
export function softwareSchema(software: {
  name: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
  codeRepository?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: software.name,
    description: software.description,
    url: software.url.startsWith('http')
      ? software.url
      : `${SITE_URL}${software.url}`,
    ...(software.codeRepository
      ? { codeRepository: software.codeRepository }
      : {}),
    creator: {
      '@id': `${SITE_URL}/#organization`
    },
    applicationCategory: software.category || 'Software',
    keywords: software.tags?.join(', ')
  };
}

/**
 * FAQPage schema for FAQ sections.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * ProfessionalService (LocalBusiness) schema — the local-search / Maps signal.
 * Toledo is a service-area business: a Connecticut web studio that also works remote.
 * Used on the homepage and site-wide (via BaseLayout) so local intent can surface it.
 */
export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    legalName: 'Toledo Technologies LLC',
    url: SITE_URL,
    email: CONTACT_EMAIL,
    image: `${SITE_URL}/og-default.png`,
    description:
      'Custom websites and software for Connecticut businesses, including new sites, redesigns, WordPress-exit migrations, web applications, mobile products, and governed automation. Scope, timing, and ownership terms are confirmed in writing.',
    founder: { '@type': 'Person', name: 'Nicholas Toledo' },
    areaServed: [
      { '@type': 'State', name: 'Connecticut' },
      { '@type': 'Country', name: 'United States' }
    ],
    serviceType: [
      'Custom Website Design',
      'Website Redesign',
      'Landing Page Design',
      'WordPress Migration',
      'Website Integrations',
      'Website Maintenance'
    ],
    knowsAbout: [
      'Web design',
      'Accessibility',
      'SEO',
      'Astro',
      'Next.js',
      'API integrations',
      'WordPress migration'
    ],
    priceRange: '$$',
    sameAs: [GITHUB_URL]
  };
}
