# AI-Consumable Content Architecture Specification

## Goal
Implement structured content architecture that serves both human readers and AI systems for automated content consumption and analysis.

## Context
The Geoff Miller Cloud Platform aims to pioneer content structures that are optimized for AI consumption while maintaining excellent human readability. This includes machine-readable metadata, structured data schemas, and API endpoints that enable AI systems to understand, index, and recommend content effectively.

## Requirements

### Structured Data Implementation
- JSON-LD schema markup for all content types
- OpenGraph and Twitter Card meta tags
- Structured metadata in HTML head sections
- Machine-readable content relationships
- Consistent data schema across all content

### Content APIs
- REST API endpoints for content discovery
- GraphQL interface for complex content queries
- RSS/Atom feeds for content syndication
- Sitemap XML with metadata extensions
- Content export capabilities in JSON format

### AI-Friendly Metadata
- Hierarchical content tagging system
- Difficulty and complexity ratings
- Content relationship mapping
- Topic modeling and classification
- Estimated reading time and content length

### Search Optimization
- Full-text search index with metadata
- Faceted search capabilities
- Content recommendation algorithms
- Semantic search preparation
- Search result ranking based on relevance and recency

### Machine Learning Preparation
- Content vectorization for semantic search
- Training data export formats
- Content classification labels
- Quality scoring metrics
- Usage analytics for content optimization

## Acceptance Tests

### Structured Data Validation
- Google Rich Results Test passes for all content pages
- JSON-LD validation shows no errors or warnings
- Schema.org markup is properly implemented
- Search engines can index and understand content structure

### API Functionality
- GET `/api/content` returns paginated content list with metadata
- GET `/api/content/:slug` returns full content with relationships
- GraphQL queries can filter and sort content by multiple criteria
- RSS feeds validate according to RSS 2.0 specification

### AI Integration Tests
- Content can be exported to JSON format for AI training
- Metadata extraction works programmatically
- Content relationships are discoverable through API
- Search index includes all relevant metadata fields

### Performance Requirements
- API responses are under 200ms for simple queries
- Structured data doesn't negatively impact page load times
- Search index builds complete within 60 seconds
- Content export processes handle large datasets efficiently

## Out of Scope
- Real-time AI chat integration
- Content generation using AI models
- Personalization based on user behavior
- Advanced machine learning model deployment
- Real-time content analysis and scoring

## Implementation Hints

### JSON-LD Schema Implementation
```typescript
// utils/structured-data.ts
interface BlogPostSchema {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: string,
  description: string,
  author: {
    "@type": "Person",
    name: string,
    url: string
  },
  datePublished: string,
  dateModified?: string,
  mainEntityOfPage: string,
  keywords: string[],
  articleSection: string,
  about: {
    "@type": "Thing",
    name: string
  }[]
}

export function generateBlogPostSchema(post: BlogPost): BlogPostSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: "Geoff Miller",
      url: "https://geoffmiller.dev/about"
    },
    datePublished: post.publishDate.toISOString(),
    dateModified: post.updateDate?.toISOString(),
    mainEntityOfPage: `https://geoffmiller.dev/blog/${post.slug}`,
    keywords: post.tags,
    articleSection: post.category,
    about: post.tags.map(tag => ({
      "@type": "Thing",
      name: tag
    }))
  };
}
```

### Content API Endpoints
```typescript
// pages/api/content/index.ts
export async function GET({ request }: APIContext) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const category = url.searchParams.get('category');
  const tags = url.searchParams.get('tags')?.split(',');

  const content = await getContentCollection('blog', (entry) => {
    if (entry.data.draft) return false;
    if (category && entry.data.category !== category) return false;
    if (tags && !tags.some(tag => entry.data.tags.includes(tag))) return false;
    return true;
  });

  const paginatedContent = content
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
    .slice((page - 1) * limit, page * limit);

  return new Response(JSON.stringify({
    content: paginatedContent.map(entry => ({
      slug: entry.slug,
      title: entry.data.title,
      description: entry.data.description,
      publishDate: entry.data.publishDate,
      tags: entry.data.tags,
      category: entry.data.category,
      estimatedReadTime: entry.data.estimatedReadTime,
      aiSummary: entry.data.aiSummary
    })),
    pagination: {
      page,
      limit,
      total: content.length,
      pages: Math.ceil(content.length / limit)
    }
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
```

### Content Relationship Mapping
```typescript
// utils/content-relationships.ts
export interface ContentRelationship {
  type: 'related' | 'prerequisite' | 'followup' | 'reference';
  slug: string;
  title: string;
  relevanceScore: number;
}

export function findRelatedContent(
  currentPost: BlogPost,
  allPosts: BlogPost[]
): ContentRelationship[] {
  return allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => ({
      type: 'related' as const,
      slug: post.slug,
      title: post.title,
      relevanceScore: calculateRelevanceScore(currentPost, post)
    }))
    .filter(relation => relation.relevanceScore > 0.3)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);
}

function calculateRelevanceScore(post1: BlogPost, post2: BlogPost): number {
  const tagOverlap = post1.tags.filter(tag => post2.tags.includes(tag)).length;
  const categoryMatch = post1.category === post2.category ? 0.3 : 0;
  const difficultyMatch = post1.difficulty === post2.difficulty ? 0.1 : 0;
  
  return (tagOverlap * 0.2) + categoryMatch + difficultyMatch;
}
```

### Export Functionality
```typescript
// scripts/export-content.ts
export async function exportContentForAI() {
  const allContent = await Promise.all([
    getContentCollection('blog'),
    getContentCollection('projects'), 
    getContentCollection('guides'),
    getContentCollection('resources')
  ]);

  const exportData = {
    timestamp: new Date().toISOString(),
    version: "1.0",
    content: allContent.flat().map(entry => ({
      id: entry.slug,
      type: entry.collection,
      title: entry.data.title,
      description: entry.data.description,
      content: entry.body,
      metadata: entry.data,
      relationships: findRelatedContent(entry, allContent.flat())
    }))
  };

  await writeFile('dist/ai-export.json', JSON.stringify(exportData, null, 2));
}
```