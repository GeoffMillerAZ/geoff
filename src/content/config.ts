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
    // Series navigation
    series: z.object({
      name: z.string(),
      order: z.number(),
      next: z.string().optional(), // slug of next post
      previous: z.string().optional(), // slug of previous post
    }).optional(),
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

// Resume collection with multiple types
const resumeCollection = defineCollection({
  type: 'content',
  schema: z.discriminatedUnion('type', [
    // Experience entries
    z.object({
      type: z.literal('experience'),
      position: z.string(),
      company: z.string(),
      location: z.string(),
      startDate: z.date(),
      endDate: z.date().optional(),
      current: z.boolean().default(false),
      highlights: z.array(z.string()).optional(),
      technologies: z.array(z.string()).optional(),
      showInMainSection: z.boolean().default(true),
      order: z.number(),
    }),
    // Education entries
    z.object({
      type: z.literal('education'),
      degree: z.string(),
      institution: z.string(),
      location: z.string(),
      graduationDate: z.date().optional(),
      gpa: z.string().optional(),
      honors: z.array(z.string()).optional(),
      order: z.number(),
    }),
    // Certification entries
    z.object({
      type: z.literal('certification'),
      name: z.string(),
      issuer: z.string(),
      issueDate: z.date(),
      expirationDate: z.date().optional(),
      credentialId: z.string().optional(),
      url: z.string().url().optional(),
      order: z.number(),
    }),
    // Skill entries
    z.object({
      type: z.literal('skill'),
      category: z.string(),
      skills: z.array(z.string()),
      proficiencyLevel: z.enum(['expert', 'advanced', 'intermediate']).optional(),
      order: z.number(),
    }),
    // Achievement entries
    z.object({
      type: z.literal('achievement'),
      title: z.string(),
      description: z.string(),
      date: z.date().optional(),
      category: z.enum(['technical', 'leadership', 'business', 'community']),
      metrics: z.string().optional(),
      order: z.number(),
    }),
    // Award entries
    z.object({
      type: z.literal('award'),
      title: z.string(),
      organization: z.string(),
      description: z.string().optional(),
      date: z.date().optional(),
      order: z.number(),
    }),
  ])
});

export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
  'guides': guideCollection,
  'resources': resourceCollection,
  'resume': resumeCollection,
};