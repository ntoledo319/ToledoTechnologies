import { defineCollection, z } from 'astro:content';

/**
 * Blog collection schema.
 * Each post includes SEO metadata, categorization, and optional featured flag.
 */
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    modifiedDate: z.coerce.date().optional(),
    author: z.string().default('Toledo Technologies'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    tldr: z.string().optional(),
  }),
});

/**
 * Codebases collection schema.
 * For product pages of deploy-ready codebases for sale.
 */
const codebases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    status: z.enum(['available', 'limited', 'in-development']),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    included: z.array(z.string()).default([]),
    targetAudience: z.array(z.string()).default([]),
    order: z.number().default(0),
    price: z.number().default(0),
    originalPrice: z.number().optional(),
    pricingNote: z.string().optional(),
  }),
});

/**
 * Case Studies collection schema.
 * Showcases successful projects and client work.
 */
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string().optional(),
    industry: z.string(),
    services: z.array(z.string()).default([]),
    publishedDate: z.coerce.date(),
    featured: z.boolean().default(false),
    results: z.array(z.string()).default([]),
    testimonial: z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string(),
    }).optional(),
  }),
});

export const collections = {
  blog,
  codebases,
  'case-studies': caseStudies,
};
