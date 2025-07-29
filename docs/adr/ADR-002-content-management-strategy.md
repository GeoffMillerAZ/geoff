# ADR-002: MDX + Git-based Content Management

## Status
Accepted

## Context
The Geoff Miller Cloud Platform requires a content management approach that supports:
- Technical content with code examples and interactive components
- Version control and collaboration on content changes
- AI-consumable structured content with consistent metadata
- Multiple content authors and review processes
- Rich formatting beyond standard Markdown capabilities
- Integration with static site generation workflow
- Future scalability without vendor lock-in

Traditional CMS solutions (WordPress, Contentful, Strapi) were evaluated against file-based approaches (Markdown, MDX) with Git workflow integration.

## Decision
We will use MDX (Markdown + JSX) with a Git-based workflow for content management.

**MDX Benefits:**
- Combines Markdown simplicity with React component flexibility
- Enables interactive content elements (diagrams, code playgrounds, decision trees)
- Supports rich metadata through frontmatter
- Allows custom components for consistent formatting
- Version control-friendly text format

**Git-based Workflow Advantages:**
- Full version history for all content changes
- Collaborative editing through pull requests
- Content review process aligned with code review practices
- Branch-based content development for experimental features
- Backup and recovery through distributed version control
- Integration with existing development workflows

**Content Structure:**
- Frontmatter for metadata (title, date, tags, SEO, AI-consumable fields)
- Markdown body for main content
- JSX components for interactive elements
- Consistent schema validation across content types

## Consequences

**Positive:**
- Content changes tracked with full audit trail
- Collaborative editing without conflicts through Git branches
- No vendor lock-in or monthly CMS subscription costs
- Content portable to any static site generator
- Technical content can include live code examples
- AI systems can easily parse structured frontmatter
- Content review process ensures quality control
- Offline content editing capability

**Negative:**
- Non-technical contributors may need Git training
- No real-time collaborative editing (like Google Docs)
- Requires developer-friendly tools for content creation
- Manual deployment process for content updates (mitigated by automation)

**Neutral:**
- Content creation process more technical than traditional CMS
- Learning curve for MDX syntax (offset by documentation)

## Implementation Notes

**Content Organization:**
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

**Frontmatter Schema:**
```yaml
title: "Article Title"
description: "SEO description"
publishDate: 2024-01-15
updateDate: 2024-01-20
tags: ["platform-engineering", "architecture"]
category: "technical"
difficulty: "intermediate"
estimatedReadTime: 8
relatedPosts: ["post-slug-1", "post-slug-2"]
aiSummary: "Brief summary for AI consumption"
toc: true
draft: false
```

**Custom Components:**
- `<CodeBlock>` for syntax-highlighted code with copy functionality
- `<DecisionTree>` for interactive decision-making guides
- `<ArchitectureDiagram>` for system architecture visualizations
- `<TechRadar>` for technology adoption status
- `<CalloutBox>` for highlighting important information

**Content Validation:**
- Schema validation for frontmatter consistency
- Automated link checking for internal and external references
- Image optimization and alt-text validation
- Content length and readability analysis