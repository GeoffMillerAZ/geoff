import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updateDate: z.date().optional(),
    tags: z.array(z.string()),
    category: z.enum(['software-engineering', 'cloud-architecture', 'platform-engineering', 'leadership']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    estimatedReadTime: z.number(),
    relatedPosts: z.array(z.string()).optional(),
    aiSummary: z.string(),
    toc: z.boolean().default(true),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    author: z.string().default('Geoffrey Miller'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  })
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    status: z.enum(['active', 'completed', 'archived']),
    technologies: z.array(z.string()),
    category: z.enum(['platform-projects', 'open-source', 'case-studies']),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    metrics: z.object({
      users: z.number().optional(),
      performance: z.string().optional(),
      impact: z.string().optional(),
      costSavings: z.string().optional(),
    }).optional(),
    team: z.array(z.string()).optional(),
    client: z.string().optional(),
  })
});

const guideCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updateDate: z.date().optional(),
    tags: z.array(z.string()),
    category: z.enum(['platform-engineering', 'architectural-decisions', 'best-practices', 'frameworks']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    estimatedReadTime: z.number(),
    prerequisites: z.array(z.string()).optional(),
    relatedGuides: z.array(z.string()).optional(),
    aiSummary: z.string(),
    toc: z.boolean().default(true),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    author: z.string().default('Geoffrey Miller'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    downloadable: z.boolean().default(false),
  })
});

const resourceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    category: z.enum(['tools', 'reading-list', 'communities', 'courses', 'conferences']),
    tags: z.array(z.string()),
    rating: z.number().min(1).max(5).optional(),
    cost: z.enum(['free', 'paid', 'freemium']),
    lastChecked: z.date(),
    recommended: z.boolean().default(false),
    aiSummary: z.string(),
    author: z.string().optional(),
    platform: z.string().optional(),
  })
});

export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
  'guides': guideCollection,
  'resources': resourceCollection,
};