# Toledo Technologies Website

Static website for [toledotechnologies.com](https://toledotechnologies.com) built with Astro, Tailwind CSS, and TypeScript.

## Tech Stack

- **Framework**: [Astro](https://astro.build) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4
- **Language**: TypeScript
- **Deployment**: Vercel Static Site

## Project Structure

```text
/
├── public/              # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/         # Content collections (blog, codebases, case-studies)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   ├── styles/          # Global CSS
│   └── utils/           # Utility functions (JSON-LD helpers, etc.)
├── astro.config.mjs     # Astro configuration
└── package.json
```

## Local Development

```bash
# Install dependencies
npm ci

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Vercel Deployment Settings

When deploying to Vercel as a Static Site:

| Setting               | Value                     |
| :-------------------- | :------------------------ |
| **Build Command**     | `npm ci && npm run build` |
| **Publish Directory** | `dist`                    |
| **Node Version**      | 20 or higher              |

### Environment Variables

No environment variables are required. The site builds with zero configuration.

## Post-Launch SEO Checklist

After deploying to production:

### Google Search Console

- [ ] Add property for `toledotechnologies.com`
- [ ] Verify ownership (DNS or HTML file)
- [ ] Submit sitemap: `https://toledotechnologies.com/sitemap-index.xml`
- [ ] Request indexing for key pages

### Social Preview Testing

- [ ] Test Open Graph with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test X (Twitter) Cards with the [Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verify OG images render correctly

### Performance & SEO Audit

- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on homepage
- [ ] Check [Core Web Vitals](https://web.dev/vitals/) in Search Console
- [ ] Verify all pages return 200 status
- [ ] Test 404 page works correctly
- [ ] Confirm sitemap is accessible and valid

### Analytics (Optional)

- [ ] Set up Google Analytics 4 or Plausible
- [ ] Configure goal tracking for contact form submissions

## Content Collections

### Blog Posts

Add new posts to `src/content/blog/` as Markdown files with frontmatter:

```yaml
---
title: 'Post Title'
description: 'Brief description for SEO'
publishedDate: 2024-01-15
modifiedDate: 2024-01-20
author: 'Author Name'
tags: ['tag1', 'tag2']
featured: false
draft: false
tldr: 'One-sentence summary'
---
```

### Codebases

Add products to `src/content/codebases/`:

```yaml
---
title: 'Product Name'
tagline: 'Short tagline'
description: 'Full description'
status: 'available' # or "limited" or "in-development"
category: 'Security'
tags: ['tag1', 'tag2']
features: ['Feature 1', 'Feature 2']
included: ['Item 1', 'Item 2']
targetAudience: ['Audience 1', 'Audience 2']
order: 1
price: 0
originalPrice: 0
pricingNote: 'Optional pricing note'
stripeLink: 'https://buy.stripe.com/...'
licensesAvailable: 10
---
```

### Case Studies

Add case studies to `src/content/case-studies/`:

```yaml
---
title: 'Case Study Title'
description: 'Brief description'
client: 'Client Name'
industry: 'Industry Name'
services: ['Service 1', 'Service 2']
publishedDate: 2024-01-15
featured: false
results: ['Result 1', 'Result 2']
testimonial:
  quote: 'Testimonial text'
  author: 'Person Name'
  role: 'Their Role'
---
```

## Contact Form

The contact form uses [FormSubmit](https://formsubmit.co/) for processing. No backend required.

- Submissions go to: `hello@toledotechnologies.com`
- Honeypot spam protection enabled
- CAPTCHA disabled for better UX

## License

Proprietary - Toledo Technologies
