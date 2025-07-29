# Content Types and Schemas Specification

## Goal
Define and implement comprehensive content type schemas and management system for the Geoff Miller Cloud Platform.

## Context
The platform requires structured content management that supports multiple content types (blog posts, projects, guides, resources) with consistent metadata schemas. Content must be AI-consumable while remaining human-friendly for editing and maintenance. Each content type needs specific fields and validation rules.

## Requirements

### Content Collections
- Blog posts with technical articles and thought leadership
- Project showcases with case studies and technical documentation
- Platform engineering guides with decision frameworks
- Resource library with curated links and evaluations
- Architecture Decision Records (ADRs) with structured reasoning

### Content Schemas
- Consistent frontmatter structure across all content types
- TypeScript validation for content structure
- Required and optional fields for each content type
- Metadata for SEO, AI consumption, and content relationships
- Taxonomy system for categorization and tagging

### Content Management
- MDX support for rich content with embedded components
- Image handling with automatic optimization
- Code syntax highlighting with copy functionality
- Related content suggestions based on tags and categories
- Content validation and linting

### AI-Friendly Structure
- Structured metadata for machine consumption
- Consistent schema for content extraction
- Searchable content with proper indexing
- JSON-LD structured data generation
- Content relationship mapping

## Acceptance Tests

### Schema Validation
- `npm run type-check` passes for all content files
- Invalid frontmatter structure causes build failure
- Required fields are enforced for each content type
- Date formats are validated and consistent

### Content Generation
- New blog post can be created with `npm run new:blog "Title"`
- Content collections are properly typed in TypeScript
- Frontmatter is validated against schema definitions
- Build process generates proper static pages

### Content Processing
- MDX components render correctly in all content types
- Code blocks have syntax highlighting and copy buttons
- Images are optimized and served with proper alt text
- Related content suggestions are accurate and relevant

### Search and Discovery
- All content is indexed for search functionality
- Tags and categories are properly extracted and linked
- Content relationships are established through metadata
- RSS feeds are generated for relevant content types

## Out of Scope
- Content creation tools or CMS interface
- Real-time content collaboration features
- Content versioning beyond Git history
- User-generated content or comments
- Content analytics and tracking

## Implementation Hints

### Astro Content Collections Configuration
```typescript
// src/content/config.ts
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
```

### Content Directory Structure
```
src/content/
├── blog/
│   ├── software-engineering/
│   ├── cloud-architecture/
│   ├── platform-engineering/
│   └── leadership/
├── projects/
│   ├── platform-projects/
│   ├── open-source/
│   └── case-studies/
├── guides/
│   ├── platform-engineering/
│   ├── architectural-decisions/
│   └── best-practices/
└── resources/
    ├── tools/
    ├── reading-list/
    └── communities/
```

### Frontmatter Examples
```yaml
# Blog Post
---
title: "Building Platform Engineering Teams"
description: "A comprehensive guide to structuring and scaling platform engineering organizations"
publishDate: 2024-01-15
updateDate: 2024-01-20
tags: ["platform-engineering", "team-building", "leadership"]
category: "platform-engineering"
difficulty: "intermediate"
estimatedReadTime: 12
relatedPosts: ["platform-team-structures", "devops-vs-platform"]
aiSummary: "Guide covering team structure, hiring, and scaling for platform engineering organizations"
toc: true
draft: false
featured: true
---
```

### Custom MDX Components
- `<CodeBlock>` for enhanced code display
- `<Callout>` for highlighting important information
- `<TechStack>` for displaying technology lists
- `<Metrics>` for project performance data
- `<Timeline>` for project milestones