# Site Architecture and Navigation Specification

## Goal
Implement the foundational site architecture and navigation system for the Geoff Miller Cloud Platform using Astro.

## Context
Building a professional platform engineering and cloud architecture website that showcases expertise while providing value to the software engineering community. The site needs clear information architecture that serves both human visitors and AI systems, with intuitive navigation that scales as content grows.

## Requirements

### Site Structure
- Implement hierarchical site structure with homepage as professional portfolio
- Root-level navigation: Home, About, Blog, Projects, Guides, Resources, Contact
- Homepage features personal brand with resume-style layout and synthwave theme
- Category-based organization within blog and guide sections
- Breadcrumb navigation for deep content hierarchy
- Mobile-responsive navigation with hamburger menu
- Sticky sidebar navigation on desktop with profile information

### Navigation Components
- Primary navigation header with logo and main menu links (implemented in Header.astro)
- Mobile-responsive hamburger menu with slide-down navigation
- Footer navigation with quick links, social media, and site information (implemented in Footer.astro)
- Sticky header with glassmorphic card design matching site theme
- Table of contents for long-form content (planned for blog/guide layouts)

### URL Structure
- SEO-friendly URLs following RESTful patterns
- Homepage at root `/` with professional portfolio content
- Consistent slug generation from titles
- Category-based URL hierarchy (e.g., `/blog/platform-engineering/article-title`)
- Static pages: `/about`, `/blog`, `/projects`, `/guides`, `/resources`, `/contact`
- Canonical URL management for duplicate content
- 404 page with suggested content and search

### Content Organization
- File-based routing aligned with content structure (implemented with Astro pages)
- Dynamic routing for content collections (configured in src/content/config.ts)
- Content collections: blog, projects, guides, resources with TypeScript schemas
- Tag-based content relationships with frontmatter metadata
- Category-based content organization within each collection
- Related content suggestions via relatedPosts/relatedGuides fields

### Performance Requirements
- Page load times under 2 seconds on 3G
- Lighthouse performance score above 95
- Core Web Vitals optimization
- Progressive enhancement for JavaScript features
- Image optimization and lazy loading

## Acceptance Tests

### Navigation Tests
- All primary navigation links are accessible and functional
- Mobile navigation works on devices under 768px width
- Breadcrumb navigation shows correct hierarchy
- Search functionality returns relevant results
- 404 page redirects users to helpful content

### Performance Tests
- `lighthouse --url=http://localhost:3000 --view` shows performance score > 95
- `npm run build` completes without errors
- Static site generation produces optimized HTML/CSS/JS
- Images are automatically optimized and served in modern formats

### Accessibility Tests
- Navigation is keyboard accessible (Tab, Enter, Escape keys)
- Screen reader compatibility with proper ARIA labels
- Color contrast meets WCAG AA standards
- Focus indicators are visible and consistent

### SEO Tests
- Each page has unique title and meta description
- Structured data (JSON-LD) is present on all content pages
- XML sitemap is generated automatically
- robots.txt allows search engine indexing

## Out of Scope
- Content creation (handled separately)
- Advanced interactive features (phase 2)
- User authentication or personalization
- E-commerce or payment integration
- Real-time features or WebSocket connections

## Implementation Hints

### Technology Stack
- Astro 4.0+ with TypeScript configuration
- Tailwind CSS for styling with custom design system
- Astro content collections for content management
- `@astrojs/sitemap` for XML sitemap generation
- `@astrojs/rss` for blog feed generation

### File Structure
```
src/
├── layouts/
│   ├── BaseLayout.astro
│   ├── HomeLayout.astro
│   ├── BlogLayout.astro
│   └── GuideLayout.astro
├── components/
│   ├── navigation/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Breadcrumbs.astro
│   │   └── MobileMenu.astro
│   ├── home/
│   │   ├── ProfileCard.astro
│   │   ├── ExperienceTimeline.astro
│   │   ├── SkillsSection.astro
│   │   └── AchievementsSection.astro
│   └── ui/
│       ├── Button.astro
│       ├── Card.astro
│       ├── SkillBadge.astro
│       └── Tag.astro
├── pages/
│   ├── index.astro (homepage with portfolio)
│   ├── about.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [category]/
│   │       └── [...slug].astro
│   ├── projects/
│   ├── guides/
│   ├── resources/
│   └── contact.astro
├── content/
│   ├── config.ts
│   ├── blog/
│   ├── projects/
│   ├── guides/
│   └── resources/
└── styles/
    ├── global.css
    └── synthwave-theme.css
```

### Configuration
- Configure Astro content collections with proper TypeScript schemas
- Set up Tailwind CSS with custom color palette and typography
- Configure build optimization for static site generation
- Set up development server with hot reloading and TypeScript checking