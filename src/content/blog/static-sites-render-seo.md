---
title: "Static Sites on Render: SEO Setup Checklist"
description: "A practical checklist for deploying SEO-optimized static sites to Render. Covers sitemaps, meta tags, performance, and common gotchas."
publishedDate: 2024-02-12
tags: ["seo", "static-sites", "render", "deployment"]
featured: true
tldr: "Sitemap, robots.txt, meta tags, canonical URLs, fast hosting. Check each box before launch."
---

## Why Static Sites Are Great for SEO

Static sites have inherent SEO advantages:
- **Fast load times**: No server-side processing means quick responses
- **Predictable HTML**: Search engines see exactly what you build
- **Easy caching**: CDN distribution is straightforward
- **High reliability**: No database to go down

But you still need to do the fundamentals right.

## The Pre-Launch Checklist

### 1. Sitemap Configuration

Your sitemap tells search engines what pages exist and how to find them.

**Requirements:**
- Generate `sitemap.xml` or `sitemap-index.xml` automatically
- Include all canonical URLs
- Update it when content changes
- Reference it in `robots.txt`

**For Astro:** Use `@astrojs/sitemap` integration with your site URL configured.

### 2. Robots.txt

A simple but essential file:

```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap-index.xml
```

Don't overcomplicate it unless you have specific pages to exclude.

### 3. Meta Tags Per Page

Every page needs unique:
- `<title>` tag (50-60 characters ideal)
- Meta description (150-160 characters)
- Canonical URL
- Open Graph tags for social sharing
- Twitter Card tags

### 4. Structured Data (JSON-LD)

Help search engines understand your content:
- **Organization schema** on homepage
- **BreadcrumbList** on interior pages
- **BlogPosting** for blog posts
- **Product** or **Service** schemas where relevant

### 5. Performance Optimization

Google uses Core Web Vitals as a ranking factor:

- **LCP (Largest Contentful Paint)**: Under 2.5 seconds
- **FID (First Input Delay)**: Under 100 milliseconds
- **CLS (Cumulative Layout Shift)**: Under 0.1

For static sites on Render, you're already ahead—but still optimize images and minimize JavaScript.

## Render-Specific Setup

### Build Configuration
```
Build Command: npm ci && npm run build
Publish Directory: dist
```

### Headers for Caching

Add a `_headers` file for Netlify-style static hosting or configure through Render's dashboard:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

## Post-Launch Steps

1. **Submit to Google Search Console**: Add your property and submit the sitemap
2. **Check indexing**: Use "URL Inspection" tool
3. **Test Open Graph**: Use Facebook's Sharing Debugger and Twitter's Card Validator
4. **Monitor Core Web Vitals**: Use Search Console's experience reports

## Common Mistakes to Avoid

- **Forgetting trailing slashes**: Be consistent with URL structure
- **Duplicate content**: Use canonical URLs properly
- **Missing alt text**: Every image needs descriptive alt text
- **Blocking JavaScript**: Don't prevent crawlers from accessing your JS

---

**Launching a static site?** [We can help with the technical SEO setup](/contact?subject=Static%20Site%20SEO).
