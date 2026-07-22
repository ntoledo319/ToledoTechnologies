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
    tldr: z.string().optional()
  })
});

/**
 * Proof-note collection schema.
 * Every entry declares its evidence type and limitations so independent
 * research can never be rendered as paid client work by implication.
 */
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    industry: z.string(),
    services: z.array(z.string()).default([]),
    publishedDate: z.coerce.date(),
    measurementDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    results: z.array(z.string()).default([]),
    evidenceType: z.enum(['independent-research', 'sample-deliverable']),
    evidenceNote: z.string(),
    limitations: z.string()
  })
});

export const collections = {
  blog,
  'case-studies': caseStudies
};
