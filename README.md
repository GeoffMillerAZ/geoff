# Geoff Miller Cloud Platform

A sophisticated personal brand and knowledge-sharing website that positions Geoff Miller as a thought leader in platform engineering and cloud architecture. Built with Astro, this platform serves multiple audiences while showcasing deep technical expertise through AI-consumable content architecture.

## 🎯 Project Vision

This platform goes beyond a traditional portfolio site to create a comprehensive resource hub that:
- Establishes expertise in platform engineering and cloud architecture
- Provides actionable value to the software engineering community
- Pioneers content structures optimized for both human and AI consumption
- Serves as a go-to destination for platform engineering guidance

## 🏗️ Architecture

### Technology Stack
- **Framework**: [Astro 4.0+](https://astro.build/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **Content**: MDX with Git-based workflow
- **Search**: [Algolia DocSearch](https://docsearch.algolia.com/)
- **Hosting**: [Vercel](https://vercel.com/) with global CDN
- **Analytics**: Vercel Analytics + [PostHog](https://posthog.com/)

### Key Features
- 🚀 High-performance static site generation with minimal JavaScript
- 📝 Rich content authoring with MDX and embedded React components
- 🔍 Full-text search with faceted filtering
- 🤖 AI-consumable structured content architecture
- 📊 Built-in analytics and performance monitoring
- 🌐 Global CDN with edge optimization
- ♿ Accessibility-first design with WCAG AA compliance

## 📁 Project Structure

```
geoff/
├── docs/adr/                   # Architecture Decision Records
├── specs/                      # Feature specifications
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── navigation/        # Navigation components
│   │   └── ui/               # Base UI components
│   ├── content/              # Content collections
│   │   ├── blog/             # Technical blog posts
│   │   ├── projects/         # Project showcases
│   │   ├── guides/           # Platform engineering guides
│   │   └── resources/        # Curated resources
│   ├── layouts/              # Page layouts
│   ├── pages/                # Route definitions and API endpoints
│   └── styles/               # Global styles and design tokens
├── taskfiles/                # Task automation with Taskfile
├── tests/                    # Test suites
└── public/                   # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/geoffmilleraz/geoff.git
   cd geoff
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:4321
   ```

### Environment Variables

```bash
# Algolia Search (required for search functionality)
ALGOLIA_APP_ID=your_app_id
ALGOLIA_API_KEY=your_api_key
ALGOLIA_INDEX_NAME=geoff-miller-platform

# Analytics (optional but recommended)
VERCEL_ANALYTICS_ID=your_analytics_id
POSTHOG_API_KEY=your_posthog_key

# Content Management (for automated workflows)
GITHUB_TOKEN=your_github_token
```

## 📝 Content Management

### Content Types

1. **Blog Posts** (`src/content/blog/`)
   - Technical insights and thought leadership
   - Categorized by: software-engineering, cloud-architecture, platform-engineering, leadership

2. **Projects** (`src/content/projects/`)
   - Detailed case studies with metrics and outcomes
   - Categories: platform-projects, open-source, case-studies

3. **Guides** (`src/content/guides/`)
   - Comprehensive platform engineering frameworks
   - Categories: platform-engineering, architectural-decisions, best-practices

4. **Resources** (`src/content/resources/`)
   - Curated tools, links, and recommendations
   - Categories: tools, reading-list, communities

### Creating New Content

```bash
# Create new blog post
npm run new:blog "Building Platform Engineering Teams"

# Create new project showcase  
npm run new:project "Multi-Cloud Migration Strategy"

# Create new guide
npm run new:guide "Platform Team Operating Model"

# Validate content schemas
npm run validate:content
```

### Content Schema Example

```yaml
---
title: "Building Resilient Platform Engineering Teams"
description: "A comprehensive guide to structuring and scaling platform engineering organizations for maximum impact"
publishDate: 2024-01-15
updateDate: 2024-01-20
tags: ["platform-engineering", "team-building", "leadership"]
category: "platform-engineering"
difficulty: "intermediate"
estimatedReadTime: 12
relatedPosts: ["platform-team-structures", "devops-vs-platform"]
aiSummary: "Strategic guide covering team structure, hiring, and scaling practices for platform engineering organizations"
toc: true
draft: false
featured: true
---
```

## 🛠️ Development Commands

### Core Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # TypeScript type checking
```

### Content Management
```bash
npm run new:blog "Title"       # Create new blog post
npm run new:project "Title"    # Create new project
npm run new:guide "Title"      # Create new guide
npm run validate:content       # Validate all content
```

### Quality Assurance
```bash
npm run test         # Run all tests
npm run test:unit    # Unit tests only
npm run test:e2e     # End-to-end tests
npm run lint         # Lint code and content
npm run format       # Format code with Prettier
npm run a11y         # Accessibility audit
npm run lighthouse   # Performance audit
```

### Build & Deploy
```bash
npm run build        # Production build
npm run deploy:staging   # Deploy to staging
# Production deployment automatic via Git push to main
```

## 🔍 Search Integration

The platform uses Algolia DocSearch for powerful search capabilities:

- **Full-text search** across all content types
- **Faceted filtering** by category, tags, and content type
- **Instant results** with sub-100ms response times
- **Analytics** for search behavior and content optimization
- **API access** for programmatic content discovery

## 🤖 AI-Friendly Architecture

The platform pioneers content structures optimized for AI consumption:

### Structured Data
- JSON-LD schema markup on all pages
- Consistent metadata schemas across content types
- Machine-readable content relationships
- OpenGraph and Twitter Card integration

### Content APIs
- REST endpoints at `/api/content/*`
- GraphQL interface for complex queries
- RSS feeds for content syndication
- Export functionality for AI training data

### Search & Discovery
- Semantic search preparation with content vectorization
- Content classification and difficulty ratings
- Relationship mapping between related content
- Usage analytics for optimization

## 📊 Performance & SEO

### Performance Targets
- ⚡ Page load times under 2 seconds on 3G
- 🎯 Lighthouse performance score above 95
- 📈 Core Web Vitals optimization
- 🖼️ Automatic image optimization and lazy loading

### SEO Optimization
- 🎯 Unique titles and meta descriptions
- 🗺️ XML sitemap generation
- 📊 Structured data markup
- 🔗 Canonical URL management
- 🔍 Rich search results

## 🧪 Testing Strategy

```bash
# Unit Tests
npm run test:unit

# Integration Tests  
npm run test:integration

# End-to-End Tests
npm run test:e2e

# Performance Testing
npm run lighthouse

# Accessibility Testing
npm run a11y
```

### Test Coverage
- ✅ Utility functions and helpers
- ✅ Content processing and validation
- ✅ API endpoints and GraphQL resolvers
- ✅ Component rendering and interactions
- ✅ Critical user journeys (E2E)
- ✅ Performance and accessibility standards

## 🚀 Deployment

### Automatic Deployment
- **Production**: Automatic deployment from `main` branch
- **Staging**: Automatic deployment from `develop` branch  
- **Preview**: Generated for all pull requests

### Manual Deployment
```bash
# Deploy to staging
npm run deploy:staging

# Production deployment via Git
git push origin main
```

### Post-Deployment
- ✅ Automatic CDN cache invalidation
- ✅ Performance monitoring and alerts
- ✅ Search index updates
- ✅ Analytics tracking verification

## 📋 Architecture Decisions

Key architectural decisions are documented in `docs/adr/`:

- [ADR-001: Astro for Static Site Generation](docs/adr/ADR-001-astro-static-site-generation.md)
- [ADR-002: MDX + Git-based Content Management](docs/adr/ADR-002-content-management-strategy.md)
- [ADR-003: Algolia DocSearch Implementation](docs/adr/ADR-003-search-implementation.md)
- [ADR-004: Vercel Hosting and Deployment](docs/adr/ADR-004-hosting-deployment-strategy.md)

## 📝 Specifications

Detailed specifications are available in `specs/`:

- [Site Architecture and Navigation](specs/site-architecture-navigation.md)
- [Content Types and Schemas](specs/content-types-schemas.md)
- [AI-Consumable Content Architecture](specs/ai-consumable-content-architecture.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Code of conduct and contribution guidelines
- Development workflow and pull request process
- Coding standards and style guide
- Testing requirements and quality gates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 **Documentation**: Check `CLAUDE.md` for detailed project context
- 🐛 **Issues**: Report bugs via GitHub Issues
- 💬 **Discussions**: Join conversations in GitHub Discussions
- 📧 **Contact**: [geoff@geoffmiller.dev](mailto:geoff@geoffmiller.dev)

## 🌟 Acknowledgments

- Built with [Astro](https://astro.build/) - The web framework for content-driven websites
- Search powered by [Algolia](https://www.algolia.com/) - Fast, reliable search
- Hosted on [Vercel](https://vercel.com/) - The platform for frontend developers
- Styled with [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

**Made with ❤️ for the platform engineering community**