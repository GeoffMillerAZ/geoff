# ADR-003: Algolia DocSearch for Site Search

## Status
Accepted

## Context
The Geoff Miller Cloud Platform requires comprehensive search functionality to help users find relevant content across:
- Blog posts and technical articles
- Platform engineering guides and documentation
- Project case studies and portfolios
- Resource libraries and curated links
- Architecture decision records

Search requirements include:
- Full-text search with relevance ranking
- Faceted search with filtering by content type, tags, and categories
- Fast search performance with sub-second response times
- Search analytics to understand user behavior
- AI-friendly search API for automated content discovery
- Minimal maintenance overhead

Evaluated options included:
1. Algolia DocSearch (hosted search service)
2. Lunr.js (client-side search)
3. Elasticsearch (self-hosted)
4. Fuse.js (client-side fuzzy search)
5. Pagefind (static search index)

## Decision
We will implement Algolia DocSearch for the following reasons:

**Performance & Scalability:**
- Sub-100ms search response times globally
- CDN-distributed search infrastructure
- Automatic scaling with content growth
- Advanced relevance algorithms and ranking

**Developer Experience:**
- Simple integration with static sites
- Minimal configuration required
- Excellent documentation and community support
- Built-in search UI components

**Content Discovery:**
- Automatic content indexing via web crawling
- Supports structured data and metadata
- Faceted search with custom attributes
- Real-time index updates

**Analytics & Insights:**
- Comprehensive search analytics dashboard
- Query performance monitoring
- Popular search terms and content insights
- AI-consumable search API endpoints

**Maintenance:**
- Fully managed service with no infrastructure overhead
- Automatic security updates and performance optimizations
- 99.99% uptime SLA

## Consequences

**Positive:**
- Excellent search experience with fast, relevant results
- Comprehensive analytics for content optimization
- Minimal development and maintenance effort
- Professional search UI that matches site design
- API access for future AI integrations
- Scales automatically with content growth

**Negative:**
- Monthly cost scales with search operations (~$100/month projected)
- Dependency on external service for core functionality
- Limited customization compared to self-hosted solutions
- Requires careful configuration for optimal results

**Neutral:**
- Need to implement fallback for search service outages
- Search index rebuild required for major content restructuring

## Implementation Notes

**Configuration:**
```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [
    // Algolia DocSearch integration
    algolia({
      appId: 'ALGOLIA_APP_ID',
      apiKey: 'ALGOLIA_SEARCH_KEY',
      indexName: 'geoff-miller-platform'
    })
  ]
});
```

**Search Index Structure:**
- Hierarchical content organization (site > section > page > heading)
- Custom attributes for content type, tags, difficulty level
- Metadata extraction from frontmatter
- Content freshness scoring based on publish/update dates

**Search UI Features:**
- Instant search with autocomplete
- Keyboard navigation support
- Mobile-responsive design
- Search result highlighting
- Filter by content type and tags

**Analytics Integration:**
- Search query tracking
- Result click-through rates
- Popular content identification
- Search performance monitoring

**Fallback Strategy:**
- Client-side search using Lunr.js for service outages
- Static search index generation for critical content
- Graceful degradation to simple site navigation