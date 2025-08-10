# Nested Guide Directories Hierarchy Specification

## Overview

### Purpose
Implement a nested directory structure for guides that supports up to 5 levels of hierarchy, enabling better content organization, discoverability, and user navigation within the Geoff Miller Cloud Platform. This enhancement will transform the current flat guide structure into a hierarchical system that mirrors complex technical topics and learning paths.

### Goals
- **Enhanced Content Organization**: Create logical groupings and sub-groupings of related guides
- **Improved Navigation**: Provide intuitive breadcrumb navigation and hierarchical menus
- **Better SEO**: Generate more descriptive URLs that reflect content structure
- **Scalable Architecture**: Support future content growth with maintainable organization
- **User Experience**: Enable users to understand content relationships and progressions
- **AI-Friendly Structure**: Maintain machine-readable content relationships for AI consumption

### Current State
- Guides are organized in a flat structure with single-level categories
- Categories: `platform-engineering`, `architectural-decisions`, `best-practices`, `frameworks`
- URL structure: `/guides/[slug]`
- Limited content discoverability and relationship mapping

### Target State
- Hierarchical guide structure supporting up to 5 nested levels
- Category-based directory organization with logical sub-categories
- Enhanced URL structure: `/guides/[level1]/[level2]/[level3]/[level4]/[level5]/[slug]`
- Breadcrumb navigation and hierarchical menus
- Parent-child content relationships

## Requirements

### Functional Requirements

#### FR-01: Directory Structure Support
- **Requirement**: Support nested directories up to 5 levels deep within the guides content collection
- **Acceptance Criteria**:
  - File system supports nested directory structure: `/guides/L1/L2/L3/L4/L5/guide.md`
  - Content collection schema validates nested path structures
  - Build process correctly processes guides at any nesting level
  - URLs are generated correctly for all nesting levels

#### FR-02: Hierarchical Navigation
- **Requirement**: Implement navigation components that display guide hierarchy
- **Acceptance Criteria**:
  - Breadcrumb component shows complete path from root to current guide
  - Sidebar navigation displays hierarchical structure with expand/collapse functionality
  - Parent and child guide relationships are visually represented
  - Mobile navigation adapts to hierarchical structure

#### FR-03: URL Structure Enhancement
- **Requirement**: Generate SEO-friendly URLs that reflect the directory hierarchy
- **Acceptance Criteria**:
  - URLs follow pattern: `/guides/category/subcategory/topic/subtopic/guide-slug`
  - All URLs are unique and deterministic
  - URL structure is preserved during build and deployment
  - Redirects are implemented for any URL changes

#### FR-04: Content Relationship Mapping
- **Requirement**: Establish parent-child and sibling relationships between guides
- **Acceptance Criteria**:
  - Frontmatter schema includes parent, children, and sibling references
  - Related guides are automatically discovered based on directory structure
  - Content suggestions based on hierarchical relationships
  - Cross-references maintain accuracy during content moves

#### FR-05: Search Integration
- **Requirement**: Enhance search functionality to include hierarchical context
- **Acceptance Criteria**:
  - Search results include category path in display
  - Faceted search by category levels
  - Search indexing includes hierarchical metadata
  - Algolia DocSearch configuration supports nested structure

### Non-Functional Requirements

#### NFR-01: Performance
- **Requirement**: Hierarchical structure must not degrade site performance
- **Acceptance Criteria**:
  - Page load times remain under 2 seconds
  - Build times increase by no more than 20%
  - Navigation rendering completes within 100ms
  - Lighthouse performance score maintains >95

#### NFR-02: SEO Optimization
- **Requirement**: Nested structure enhances SEO capabilities
- **Acceptance Criteria**:
  - Structured data includes hierarchical relationships
  - Meta descriptions include category context
  - XML sitemap reflects hierarchical structure
  - Internal linking follows hierarchical patterns

#### NFR-03: Maintainability
- **Requirement**: Directory structure is intuitive for content creators
- **Acceptance Criteria**:
  - Clear naming conventions for directory structures
  - Automated validation of content placement
  - Documentation for content organization guidelines
  - Error messages provide clear guidance for corrections

#### NFR-04: Accessibility
- **Requirement**: Hierarchical navigation meets WCAG 2.1 AA standards
- **Acceptance Criteria**:
  - Keyboard navigation through hierarchical menus
  - Screen reader compatibility with ARIA labels
  - Focus management for expandable menu items
  - High contrast mode support for navigation elements

## Technical Design

### Architecture Overview

#### Directory Structure Pattern
```
src/content/guides/
├── platform-engineering/                    # Level 1
│   ├── fundamentals/                        # Level 2
│   │   ├── getting-started/                 # Level 3
│   │   │   ├── installation/                # Level 4
│   │   │   │   ├── local-setup/             # Level 5
│   │   │   │   │   ├── docker-setup.md
│   │   │   │   │   └── kubernetes-setup.md
│   │   │   │   └── cloud-setup/             # Level 5
│   │   │   │       ├── aws-setup.md
│   │   │   │       └── gcp-setup.md
│   │   │   └── configuration/               # Level 4
│   │   │       └── basic-config.md
│   │   └── advanced/                        # Level 3
│   │       └── scaling-patterns.md
│   ├── implementation/                      # Level 2
│   │   ├── ci-cd-integration.md
│   │   └── monitoring-setup.md
│   └── case-studies/                        # Level 2
│       └── enterprise-adoption.md
├── architectural-decisions/                 # Level 1
│   ├── microservices/                       # Level 2
│   │   ├── service-design/                  # Level 3
│   │   │   └── api-patterns.md
│   │   └── deployment/                      # Level 3
│   │       └── containerization.md
│   └── data-architecture/                   # Level 2
│       └── database-selection.md
├── best-practices/                          # Level 1
│   ├── security/                            # Level 2
│   │   ├── authentication/                  # Level 3
│   │   │   ├── oauth-implementation.md
│   │   │   └── multi-factor-auth.md
│   │   └── authorization/                   # Level 3
│   │       └── rbac-patterns.md
│   └── performance/                         # Level 2
│       └── optimization-strategies.md
└── frameworks/                             # Level 1
    ├── kubernetes/                         # Level 2
    │   ├── operators/                      # Level 3
    │   │   └── custom-operators.md
    │   └── networking/                     # Level 3
    │       └── service-mesh.md
    └── terraform/                          # Level 2
        └── module-development.md
```

#### Content Collection Schema Enhancement

```typescript
// Updated schema in src/content/config.ts
const guideCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Existing fields
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updateDate: z.date().optional(),
    tags: z.array(z.string()),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    estimatedReadTime: z.number(),
    prerequisites: z.array(z.string()).optional(),
    aiSummary: z.string(),
    toc: z.boolean().default(true),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    author: z.string().default('Geoffrey Miller'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    downloadable: z.boolean().default(false),
    
    // New hierarchical fields
    hierarchy: z.object({
      level1: z.string(), // e.g., "platform-engineering"
      level2: z.string().optional(), // e.g., "fundamentals"
      level3: z.string().optional(), // e.g., "getting-started"
      level4: z.string().optional(), // e.g., "installation"
      level5: z.string().optional(), // e.g., "local-setup"
      depth: z.number().min(1).max(5), // Calculated depth
      path: z.string(), // Full hierarchical path
    }),
    
    // Relationship fields
    relationships: z.object({
      parent: z.string().optional(), // Parent guide slug
      children: z.array(z.string()).optional(), // Child guide slugs
      siblings: z.array(z.string()).optional(), // Sibling guide slugs
      relatedGuides: z.array(z.string()).optional(), // Cross-hierarchy relations
      series: z.object({
        name: z.string(),
        order: z.number(),
        next: z.string().optional(),
        previous: z.string().optional(),
      }).optional(),
    }).optional(),
    
    // Navigation metadata
    navigation: z.object({
      showInSidebar: z.boolean().default(true),
      sidebarOrder: z.number().optional(),
      breadcrumbTitle: z.string().optional(), // Shorter title for breadcrumbs
      menuTitle: z.string().optional(), // Title for navigation menus
    }).optional(),
    
    // Legacy category for backward compatibility
    category: z.enum(['platform-engineering', 'architectural-decisions', 'best-practices', 'frameworks']),
  })
});
```

### URL Structure Design

#### URL Pattern Specification
```
Base Pattern: /guides/[hierarchy]/[slug]

Examples:
- /guides/platform-engineering/docker-fundamentals
- /guides/platform-engineering/fundamentals/docker-fundamentals
- /guides/platform-engineering/fundamentals/getting-started/docker-fundamentals
- /guides/platform-engineering/fundamentals/getting-started/installation/docker-fundamentals
- /guides/platform-engineering/fundamentals/getting-started/installation/local-setup/docker-fundamentals

Maximum Pattern: /guides/L1/L2/L3/L4/L5/[slug]
```

#### URL Generation Logic
```typescript
// src/utils/guide-urls.ts
export function generateGuideUrl(guide: GuideEntry): string {
  const { hierarchy, slug } = guide.data;
  const pathSegments = [
    hierarchy.level1,
    hierarchy.level2,
    hierarchy.level3,
    hierarchy.level4,
    hierarchy.level5,
  ].filter(Boolean);
  
  return `/guides/${pathSegments.join('/')}/${slug}`;
}

export function parseGuideUrl(url: string): HierarchyPath {
  const segments = url.replace('/guides/', '').split('/');
  const slug = segments.pop();
  
  return {
    level1: segments[0] || null,
    level2: segments[1] || null,
    level3: segments[2] || null,
    level4: segments[3] || null,
    level5: segments[4] || null,
    slug,
    depth: segments.length,
  };
}
```

### File Structure Implementation

#### Dynamic Routing Enhancement
```astro
---
// src/pages/guides/[...hierarchy].astro
import { getCollection } from 'astro:content';
import GuideLayout from '../../layouts/GuideLayout.astro';
import { generateGuideUrl, parseGuideUrl } from '../../utils/guide-urls';

export async function getStaticPaths() {
  const guides = await getCollection('guides');
  
  return guides
    .filter(guide => !guide.data.draft)
    .map(guide => ({
      params: { 
        hierarchy: generateGuideUrl(guide).replace('/guides/', '')
      },
      props: { guide }
    }));
}

const { guide } = Astro.props;
const { Content } = await guide.render();
const hierarchyData = parseGuideUrl(Astro.url.pathname);
---

<GuideLayout guide={guide} hierarchy={hierarchyData}>
  <Content />
</GuideLayout>
```

#### Build Process Integration
```typescript
// src/utils/content-processor.ts
export async function processGuideHierarchy() {
  const guides = await getCollection('guides');
  
  // Validate hierarchy consistency
  validateHierarchyStructure(guides);
  
  // Generate relationship mappings
  const relationships = generateRelationshipMappings(guides);
  
  // Update guide metadata with computed relationships
  return guides.map(guide => ({
    ...guide,
    data: {
      ...guide.data,
      relationships: relationships[guide.slug],
    }
  }));
}

function validateHierarchyStructure(guides: GuideEntry[]) {
  const hierarchyMap = new Map<string, GuideEntry>();
  
  guides.forEach(guide => {
    const path = guide.data.hierarchy.path;
    if (hierarchyMap.has(path)) {
      throw new Error(`Duplicate hierarchy path: ${path}`);
    }
    hierarchyMap.set(path, guide);
  });
  
  // Validate parent-child relationships
  guides.forEach(guide => {
    if (guide.data.relationships?.parent) {
      const parent = hierarchyMap.get(guide.data.relationships.parent);
      if (!parent) {
        throw new Error(`Parent not found: ${guide.data.relationships.parent}`);
      }
    }
  });
}
```

## User Experience Design

### Navigation Patterns

#### Hierarchical Sidebar Navigation
```astro
---
// src/components/navigation/GuidesSidebar.astro
interface Props {
  currentGuide?: GuideEntry;
  hierarchy: HierarchyStructure;
}

const { currentGuide, hierarchy } = Astro.props;
---

<nav class="guides-sidebar" aria-label="Guides navigation">
  <div class="sidebar-header">
    <h2>Guides</h2>
    <SearchInput />
  </div>
  
  <div class="hierarchy-tree">
    {hierarchy.map(category => (
      <HierarchyNode 
        node={category} 
        currentGuide={currentGuide}
        level={1}
      />
    ))}
  </div>
</nav>

<style>
  .guides-sidebar {
    @apply w-80 h-full bg-white border-r border-gray-200 overflow-y-auto;
  }
  
  .hierarchy-tree {
    @apply p-4 space-y-2;
  }
</style>
```

#### Hierarchical Node Component
```astro
---
// src/components/navigation/HierarchyNode.astro
interface Props {
  node: HierarchyNode;
  currentGuide?: GuideEntry;
  level: number;
}

const { node, currentGuide, level } = Astro.props;
const isCurrentPath = currentGuide && isInPath(currentGuide, node.path);
const hasChildren = node.children && node.children.length > 0;
---

<div class={`hierarchy-node level-${level}`}>
  <div class="node-header">
    {hasChildren && (
      <button 
        class="expand-toggle"
        aria-expanded={isCurrentPath ? 'true' : 'false'}
        aria-controls={`node-${node.id}`}
      >
        <Icon name="chevron-right" />
      </button>
    )}
    
    {node.guide ? (
      <a 
        href={node.guide.url}
        class={`node-link ${currentGuide?.slug === node.guide.slug ? 'active' : ''}`}
        aria-current={currentGuide?.slug === node.guide.slug ? 'page' : undefined}
      >
        {node.guide.data.navigation?.menuTitle || node.guide.data.title}
      </a>
    ) : (
      <span class="node-category">{node.title}</span>
    )}
  </div>
  
  {hasChildren && (
    <div 
      id={`node-${node.id}`}
      class={`node-children ${isCurrentPath ? 'expanded' : 'collapsed'}`}
    >
      {node.children.map(child => (
        <HierarchyNode 
          node={child} 
          currentGuide={currentGuide}
          level={level + 1}
        />
      ))}
    </div>
  )}
</div>

<style>
  .hierarchy-node {
    @apply select-none;
  }
  
  .node-header {
    @apply flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-50;
  }
  
  .expand-toggle {
    @apply p-1 text-gray-400 hover:text-gray-600 transition-transform duration-200;
  }
  
  .expand-toggle[aria-expanded="true"] {
    @apply transform rotate-90;
  }
  
  .node-link {
    @apply text-gray-700 hover:text-blue-600 font-medium;
  }
  
  .node-link.active {
    @apply text-blue-600 bg-blue-50 px-2 py-1 rounded;
  }
  
  .node-category {
    @apply text-gray-900 font-semibold;
  }
  
  .node-children {
    @apply ml-4 border-l border-gray-200 pl-4 mt-1;
  }
  
  .node-children.collapsed {
    @apply hidden;
  }
  
  .level-1 { @apply text-base; }
  .level-2 { @apply text-sm; }
  .level-3 { @apply text-sm text-gray-600; }
  .level-4 { @apply text-xs text-gray-500; }
  .level-5 { @apply text-xs text-gray-400; }
</style>
```

#### Breadcrumb Navigation
```astro
---
// src/components/navigation/GuideBreadcrumbs.astro
interface Props {
  hierarchy: HierarchyPath;
  currentGuide: GuideEntry;
}

const { hierarchy, currentGuide } = Astro.props;
const breadcrumbs = generateBreadcrumbs(hierarchy, currentGuide);
---

<nav class="breadcrumbs" aria-label="Breadcrumb navigation">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/guides" class="breadcrumb-link">Guides</a>
    </li>
    
    {breadcrumbs.map((crumb, index) => (
      <li class="breadcrumb-item">
        <Icon name="chevron-right" class="breadcrumb-separator" />
        {crumb.url ? (
          <a href={crumb.url} class="breadcrumb-link">
            {crumb.title}
          </a>
        ) : (
          <span class="breadcrumb-text">{crumb.title}</span>
        )}
      </li>
    ))}
    
    <li class="breadcrumb-item">
      <Icon name="chevron-right" class="breadcrumb-separator" />
      <span class="breadcrumb-current" aria-current="page">
        {currentGuide.data.navigation?.breadcrumbTitle || currentGuide.data.title}
      </span>
    </li>
  </ol>
</nav>

<style>
  .breadcrumbs {
    @apply py-4 border-b border-gray-200;
  }
  
  .breadcrumb-list {
    @apply flex items-center space-x-2 text-sm;
  }
  
  .breadcrumb-item {
    @apply flex items-center space-x-2;
  }
  
  .breadcrumb-link {
    @apply text-gray-600 hover:text-blue-600 transition-colors;
  }
  
  .breadcrumb-separator {
    @apply text-gray-400 w-4 h-4;
  }
  
  .breadcrumb-current {
    @apply text-gray-900 font-medium;
  }
</style>
```

### Mobile Navigation Adaptation

#### Responsive Hierarchy Menu
```astro
---
// src/components/navigation/MobileGuidesMenu.astro
interface Props {
  hierarchy: HierarchyStructure;
  currentGuide?: GuideEntry;
  isOpen: boolean;
}

const { hierarchy, currentGuide, isOpen } = Astro.props;
---

<div class={`mobile-guides-menu ${isOpen ? 'open' : 'closed'}`}>
  <div class="menu-header">
    <h2>Guides</h2>
    <button class="close-button" aria-label="Close menu">
      <Icon name="x" />
    </button>
  </div>
  
  <div class="menu-search">
    <SearchInput placeholder="Search guides..." />
  </div>
  
  <div class="menu-hierarchy">
    {hierarchy.map(category => (
      <MobileHierarchyNode 
        node={category} 
        currentGuide={currentGuide}
        level={1}
      />
    ))}
  </div>
</div>

<style>
  .mobile-guides-menu {
    @apply fixed inset-0 bg-white z-50 transform transition-transform duration-300;
  }
  
  .mobile-guides-menu.closed {
    @apply translate-x-full;
  }
  
  .mobile-guides-menu.open {
    @apply translate-x-0;
  }
  
  .menu-header {
    @apply flex items-center justify-between p-4 border-b border-gray-200;
  }
  
  .menu-hierarchy {
    @apply flex-1 overflow-y-auto p-4;
  }
</style>
```

## Content Structure Guidelines

### Directory Naming Conventions

#### Naming Rules
1. **Lowercase with hyphens**: Use kebab-case for all directory names
2. **Descriptive**: Names should clearly indicate the content focus
3. **Consistent**: Follow established patterns across all levels
4. **URL-friendly**: Avoid special characters, spaces, or reserved words
5. **Hierarchical logic**: Each level should be more specific than its parent

#### Examples of Good Naming
```
✅ Good Examples:
platform-engineering/
├── fundamentals/
│   ├── getting-started/
│   │   ├── installation/
│   │   │   ├── local-setup/
│   │   └── configuration/
│   └── advanced-concepts/
├── implementation/
└── case-studies/

✅ Specific Use Cases:
security/
├── authentication/
│   ├── oauth-implementation/
│   ├── multi-factor-auth/
│   └── identity-providers/
├── authorization/
│   ├── rbac-patterns/
│   └── policy-engines/
└── compliance/
```

#### Examples of Poor Naming
```
❌ Bad Examples:
PlatformEngineering/          # Use lowercase
platform_engineering/        # Use hyphens, not underscores
platform-eng/               # Don't abbreviate unnecessarily
misc/                        # Too vague
stuff/                       # Non-descriptive
temp/                        # Temporary directories shouldn't be permanent
```

### Content Organization Principles

#### Hierarchical Logic
1. **Level 1 (Categories)**: Broad technical domains
   - `platform-engineering`, `architectural-decisions`, `best-practices`, `frameworks`

2. **Level 2 (Topics)**: Major topic areas within domains
   - `fundamentals`, `implementation`, `case-studies`, `advanced`

3. **Level 3 (Subtopics)**: Specific focus areas
   - `getting-started`, `configuration`, `deployment`, `monitoring`

4. **Level 4 (Implementations)**: Specific technologies or approaches
   - `kubernetes`, `docker`, `terraform`, `aws`, `gcp`

5. **Level 5 (Specifics)**: Very specific implementations or use cases
   - `local-setup`, `production-config`, `multi-cluster`, `cost-optimization`

#### Content Depth Guidelines
```markdown
# Content Depth by Level

## Level 1: Domain Categories (4-8 categories)
- Broad technical domains
- 50-200 guides per category
- Examples: platform-engineering, security, performance

## Level 2: Topic Areas (3-10 per Level 1)
- Major topic divisions
- 10-50 guides per topic
- Examples: fundamentals, advanced, implementation

## Level 3: Focused Topics (2-8 per Level 2)
- Specific technology or concept focus
- 5-20 guides per topic
- Examples: kubernetes, docker, monitoring

## Level 4: Implementation Details (2-6 per Level 3)
- Specific approaches or technologies
- 2-10 guides per implementation
- Examples: local-setup, cloud-deployment

## Level 5: Granular Specifics (1-4 per Level 4)
- Very specific use cases or configurations
- 1-5 guides per specific
- Examples: aws-eks, gcp-gke, azure-aks
```

### Frontmatter Requirements

#### Required Hierarchy Fields
```yaml
---
title: "Setting up Local Kubernetes Development"
description: "Complete guide for setting up a local Kubernetes development environment using Docker Desktop and kind"
publishDate: 2024-01-15
tags: ["kubernetes", "local-development", "docker", "kind"]
category: "platform-engineering"  # Legacy field for backward compatibility
difficulty: "beginner"
estimatedReadTime: 12

# New hierarchy fields (required)
hierarchy:
  level1: "platform-engineering"
  level2: "fundamentals" 
  level3: "getting-started"
  level4: "installation"
  level5: "local-setup"
  depth: 5
  path: "platform-engineering/fundamentals/getting-started/installation/local-setup"

# Relationship fields (optional but recommended)
relationships:
  parent: "kubernetes-installation-overview"
  children: 
    - "docker-desktop-setup"
    - "kind-cluster-setup"
  siblings:
    - "cloud-setup"
    - "production-setup"
  relatedGuides:
    - "kubernetes-networking-basics"
    - "local-development-workflow"

# Navigation metadata (optional)
navigation:
  showInSidebar: true
  sidebarOrder: 1
  breadcrumbTitle: "Local Setup"
  menuTitle: "Local Kubernetes Setup"

aiSummary: "Comprehensive guide covering Docker Desktop and kind setup for local Kubernetes development, including troubleshooting and best practices."
---
```

## API Design

### Content Collection Queries

#### Hierarchical Query Functions
```typescript
// src/utils/guide-queries.ts
import { getCollection } from 'astro:content';

export async function getGuidesByHierarchy(
  level1?: string,
  level2?: string,
  level3?: string,
  level4?: string,
  level5?: string
): Promise<GuideEntry[]> {
  const guides = await getCollection('guides');
  
  return guides.filter(guide => {
    const h = guide.data.hierarchy;
    return (
      (!level1 || h.level1 === level1) &&
      (!level2 || h.level2 === level2) &&
      (!level3 || h.level3 === level3) &&
      (!level4 || h.level4 === level4) &&
      (!level5 || h.level5 === level5)
    );
  });
}

export async function getHierarchyStructure(): Promise<HierarchyStructure> {
  const guides = await getCollection('guides');
  const structure: HierarchyStructure = [];
  
  guides.forEach(guide => {
    const h = guide.data.hierarchy;
    insertIntoHierarchy(structure, h, guide);
  });
  
  return sortHierarchyStructure(structure);
}

export async function getGuideAncestors(guide: GuideEntry): Promise<GuideEntry[]> {
  const ancestors: GuideEntry[] = [];
  let current = guide;
  
  while (current.data.relationships?.parent) {
    const parent = await getGuideBySlug(current.data.relationships.parent);
    if (parent) {
      ancestors.unshift(parent);
      current = parent;
    } else {
      break;
    }
  }
  
  return ancestors;
}

export async function getGuideDescendants(guide: GuideEntry): Promise<GuideEntry[]> {
  const descendants: GuideEntry[] = [];
  const children = guide.data.relationships?.children || [];
  
  for (const childSlug of children) {
    const child = await getGuideBySlug(childSlug);
    if (child) {
      descendants.push(child);
      const grandchildren = await getGuideDescendants(child);
      descendants.push(...grandchildren);
    }
  }
  
  return descendants;
}
```

#### Hierarchy Navigation API
```typescript
// src/utils/hierarchy-navigation.ts
export interface NavigationContext {
  current: GuideEntry;
  ancestors: GuideEntry[];
  siblings: GuideEntry[];
  children: GuideEntry[];
  next?: GuideEntry;
  previous?: GuideEntry;
}

export async function getNavigationContext(guide: GuideEntry): Promise<NavigationContext> {
  const [ancestors, siblings, children] = await Promise.all([
    getGuideAncestors(guide),
    getGuideSiblings(guide),
    getGuideChildren(guide),
  ]);
  
  const next = await getNextGuide(guide, siblings);
  const previous = await getPreviousGuide(guide, siblings);
  
  return {
    current: guide,
    ancestors,
    siblings,
    children,
    next,
    previous,
  };
}

export async function getGuideSiblings(guide: GuideEntry): Promise<GuideEntry[]> {
  const h = guide.data.hierarchy;
  const siblings = await getGuidesByHierarchy(
    h.level1,
    h.level2,
    h.level3,
    h.level4,
    h.level5
  );
  
  return siblings
    .filter(s => s.slug !== guide.slug)
    .sort((a, b) => {
      const orderA = a.data.navigation?.sidebarOrder || 999;
      const orderB = b.data.navigation?.sidebarOrder || 999;
      return orderA - orderB;
    });
}
```

### REST API Endpoints

#### Hierarchy Data Endpoints
```typescript
// src/pages/api/guides/hierarchy.ts
export async function GET() {
  try {
    const hierarchy = await getHierarchyStructure();
    
    return new Response(JSON.stringify({
      success: true,
      data: hierarchy,
      metadata: {
        totalLevels: getMaxDepth(hierarchy),
        totalGuides: countTotalGuides(hierarchy),
        lastUpdated: new Date().toISOString(),
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

#### Guide Navigation Endpoint
```typescript
// src/pages/api/guides/[slug]/navigation.ts
export async function GET({ params }) {
  try {
    const guide = await getGuideBySlug(params.slug);
    if (!guide) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Guide not found'
      }), { status: 404 });
    }
    
    const navigationContext = await getNavigationContext(guide);
    
    return new Response(JSON.stringify({
      success: true,
      data: navigationContext
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { status: 500 });
  }
}
```

## Navigation Components

### Component Architecture

#### Core Navigation Components
```
src/components/navigation/
├── GuidesSidebar.astro           # Main hierarchical sidebar
├── HierarchyNode.astro           # Individual hierarchy node
├── GuideBreadcrumbs.astro        # Breadcrumb navigation
├── MobileGuidesMenu.astro        # Mobile-optimized menu
├── GuideNavigation.astro         # Prev/next navigation
├── HierarchyOverview.astro       # Category overview pages
└── utils/
    ├── hierarchy-builder.ts      # Hierarchy structure building
    ├── navigation-state.ts       # Navigation state management
    └── mobile-menu-controller.ts # Mobile menu interactions
```

#### Sidebar Component Implementation
```astro
---
// src/components/navigation/GuidesSidebar.astro
import { getHierarchyStructure, getNavigationContext } from '../../utils/guide-queries';
import HierarchyNode from './HierarchyNode.astro';
import SearchInput from '../ui/SearchInput.astro';

interface Props {
  currentGuide?: GuideEntry;
  className?: string;
}

const { currentGuide, className = '' } = Astro.props;
const hierarchy = await getHierarchyStructure();
const navigationContext = currentGuide ? await getNavigationContext(currentGuide) : null;
---

<aside class={`guides-sidebar ${className}`} role="navigation" aria-label="Guides navigation">
  <div class="sidebar-header">
    <h2 class="sidebar-title">
      <a href="/guides" class="title-link">Guides</a>
    </h2>
    <SearchInput 
      placeholder="Search guides..." 
      className="sidebar-search"
      endpoint="/api/search/guides"
    />
  </div>
  
  <nav class="hierarchy-navigation">
    <ul class="hierarchy-list" role="tree">
      {hierarchy.map((category) => (
        <li role="treeitem">
          <HierarchyNode 
            node={category}
            currentGuide={currentGuide}
            navigationContext={navigationContext}
            level={1}
            isRoot={true}
          />
        </li>
      ))}
    </ul>
  </nav>
  
  {currentGuide && navigationContext && (
    <div class="current-guide-info">
      <div class="guide-metadata">
        <span class="difficulty-badge difficulty-{currentGuide.data.difficulty}">
          {currentGuide.data.difficulty}
        </span>
        <span class="read-time">
          {currentGuide.data.estimatedReadTime} min read
        </span>
      </div>
      
      {navigationContext.children.length > 0 && (
        <div class="child-guides">
          <h3>In this section:</h3>
          <ul>
            {navigationContext.children.map(child => (
              <li>
                <a href={`/guides/${child.slug}`}>
                  {child.data.navigation?.menuTitle || child.data.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )}
</aside>

<style>
  .guides-sidebar {
    @apply w-80 h-full bg-white border-r border-gray-200 flex flex-col;
  }
  
  .sidebar-header {
    @apply p-6 border-b border-gray-100;
  }
  
  .sidebar-title {
    @apply text-xl font-bold text-gray-900 mb-4;
  }
  
  .title-link {
    @apply text-gray-900 hover:text-blue-600 transition-colors;
  }
  
  .hierarchy-navigation {
    @apply flex-1 overflow-y-auto p-4;
  }
  
  .hierarchy-list {
    @apply space-y-1;
  }
  
  .current-guide-info {
    @apply p-4 border-t border-gray-100 bg-gray-50;
  }
  
  .guide-metadata {
    @apply flex items-center gap-2 mb-3;
  }
  
  .difficulty-badge {
    @apply px-2 py-1 text-xs font-medium rounded-full;
  }
  
  .difficulty-beginner {
    @apply bg-green-100 text-green-800;
  }
  
  .difficulty-intermediate {
    @apply bg-yellow-100 text-yellow-800;
  }
  
  .difficulty-advanced {
    @apply bg-red-100 text-red-800;
  }
  
  .read-time {
    @apply text-xs text-gray-600;
  }
  
  .child-guides h3 {
    @apply text-sm font-medium text-gray-900 mb-2;
  }
  
  .child-guides ul {
    @apply space-y-1;
  }
  
  .child-guides a {
    @apply text-sm text-gray-600 hover:text-blue-600 block py-1;
  }
</style>
```

#### Interactive Hierarchy Node
```astro
---
// src/components/navigation/HierarchyNode.astro
interface Props {
  node: HierarchyNode;
  currentGuide?: GuideEntry;
  navigationContext?: NavigationContext;
  level: number;
  isRoot?: boolean;
}

const { node, currentGuide, navigationContext, level, isRoot = false } = Astro.props;

const isCurrentPath = currentGuide && isInHierarchyPath(currentGuide, node.path);
const isActive = currentGuide?.slug === node.guide?.slug;
const hasChildren = node.children && node.children.length > 0;
const shouldExpand = isCurrentPath || (isRoot && level === 1);

// Determine if this node should be highlighted as part of current path
const isInCurrentPath = navigationContext?.ancestors.some(ancestor => 
  ancestor.data.hierarchy.path.startsWith(node.path)
) || isCurrentPath;
---

<div 
  class={`hierarchy-node level-${level} ${isActive ? 'active' : ''} ${isInCurrentPath ? 'in-path' : ''}`}
  data-level={level}
  data-path={node.path}
>
  <div class="node-header">
    {hasChildren && (
      <button 
        class="expand-toggle"
        aria-expanded={shouldExpand ? 'true' : 'false'}
        aria-controls={`node-${node.id}-children`}
        data-toggle="hierarchy-node"
      >
        <Icon name="chevron-right" class="chevron-icon" />
      </button>
    )}
    
    {node.guide ? (
      <a 
        href={`/guides/${node.guide.slug}`}
        class={`node-link ${isActive ? 'active' : ''}`}
        aria-current={isActive ? 'page' : undefined}
        data-guide-slug={node.guide.slug}
      >
        <span class="link-text">
          {node.guide.data.navigation?.menuTitle || node.guide.data.title}
        </span>
        
        {node.guide.data.difficulty && (
          <span class={`difficulty-indicator difficulty-${node.guide.data.difficulty}`}>
            {node.guide.data.difficulty.charAt(0).toUpperCase()}
          </span>
        )}
      </a>
    ) : (
      <div class="node-category">
        <Icon name={getCategoryIcon(node.name)} class="category-icon" />
        <span class="category-text">{formatCategoryName(node.name)}</span>
        <span class="guide-count">({node.totalGuides})</span>
      </div>
    )}
  </div>
  
  {hasChildren && (
    <div 
      id={`node-${node.id}-children`}
      class={`node-children ${shouldExpand ? 'expanded' : 'collapsed'}`}
      role="group"
    >
      {node.children.map(child => (
        <HierarchyNode 
          node={child}
          currentGuide={currentGuide}
          navigationContext={navigationContext}
          level={level + 1}
        />
      ))}
    </div>
  )}
</div>

<script>
  // Progressive enhancement for expand/collapse functionality
  document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('[data-toggle="hierarchy-node"]');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const targetId = button.getAttribute('aria-controls');
        const target = document.getElementById(targetId);
        
        if (target) {
          button.setAttribute('aria-expanded', (!isExpanded).toString());
          target.classList.toggle('expanded', !isExpanded);
          target.classList.toggle('collapsed', isExpanded);
          
          // Animate chevron rotation
          const chevron = button.querySelector('.chevron-icon');
          if (chevron) {
            chevron.style.transform = !isExpanded ? 'rotate(90deg)' : 'rotate(0deg)';
          }
        }
      });
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const focused = document.activeElement;
        if (focused?.hasAttribute('data-toggle')) {
          e.preventDefault();
          const isExpanded = focused.getAttribute('aria-expanded') === 'true';
          
          if (e.key === 'ArrowRight' && !isExpanded) {
            focused.click();
          } else if (e.key === 'ArrowLeft' && isExpanded) {
            focused.click();
          }
        }
      }
    });
  });
</script>

<style>
  .hierarchy-node {
    @apply transition-all duration-200 ease-in-out;
  }
  
  .node-header {
    @apply flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors;
  }
  
  .expand-toggle {
    @apply flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded transition-all duration-200;
  }
  
  .expand-toggle:focus {
    @apply outline-none ring-2 ring-blue-500 ring-offset-1;
  }
  
  .chevron-icon {
    @apply w-4 h-4 transition-transform duration-200;
  }
  
  .node-link {
    @apply flex-1 flex items-center justify-between text-gray-700 hover:text-blue-600 font-medium transition-colors;
  }
  
  .node-link:focus {
    @apply outline-none ring-2 ring-blue-500 ring-offset-1 rounded;
  }
  
  .node-link.active {
    @apply text-blue-600 bg-blue-50 rounded px-2 py-1 -ml-2;
  }
  
  .node-category {
    @apply flex items-center gap-2 text-gray-900 font-semibold;
  }
  
  .category-icon {
    @apply w-4 h-4 text-gray-500;
  }
  
  .difficulty-indicator {
    @apply w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full;
  }
  
  .difficulty-beginner {
    @apply bg-green-100 text-green-800;
  }
  
  .difficulty-intermediate {
    @apply bg-yellow-100 text-yellow-800;
  }
  
  .difficulty-advanced {
    @apply bg-red-100 text-red-800;
  }
  
  .guide-count {
    @apply text-xs text-gray-500 ml-auto;
  }
  
  .node-children {
    @apply ml-6 border-l-2 border-gray-100 pl-4 mt-1 transition-all duration-300;
  }
  
  .node-children.collapsed {
    @apply max-h-0 overflow-hidden opacity-0;
  }
  
  .node-children.expanded {
    @apply max-h-screen opacity-100;
  }
  
  /* Level-specific styling */
  .level-1 { 
    @apply text-base font-semibold; 
  }
  
  .level-1 .node-header {
    @apply py-2;
  }
  
  .level-2 { 
    @apply text-sm; 
  }
  
  .level-3 { 
    @apply text-sm text-gray-700; 
  }
  
  .level-4 { 
    @apply text-xs text-gray-600; 
  }
  
  .level-5 { 
    @apply text-xs text-gray-500; 
  }
  
  /* Path highlighting */
  .hierarchy-node.in-path > .node-header {
    @apply bg-blue-25 border-l-2 border-blue-200 pl-1;
  }
  
  .hierarchy-node.active > .node-header {
    @apply bg-blue-50 border-l-2 border-blue-500 pl-1;
  }
</style>
```

## Search Integration

### Algolia DocSearch Enhancement

#### Enhanced Search Configuration
```javascript
// algolia-search-config.js
export const searchConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  indexName: 'geoff-miller-guides',
  
  // Enhanced hierarchy support
  hierarchicalFilters: {
    level1: 'hierarchy.level1',
    level2: 'hierarchy.level2', 
    level3: 'hierarchy.level3',
    level4: 'hierarchy.level4',
    level5: 'hierarchy.level5',
  },
  
  facetFilters: [
    'type:guide',
    'draft:false'
  ],
  
  searchParameters: {
    hitsPerPage: 10,
    attributesToHighlight: [
      'title',
      'description', 
      'content',
      'hierarchy.level1',
      'hierarchy.level2',
      'hierarchy.level3'
    ],
    attributesToSnippet: [
      'content:50',
      'description:30'
    ],
    ranking: [
      'words',
      'typo', 
      'proximity',
      'attribute',
      'exact',
      'custom'
    ]
  },
  
  // Enhanced record structure
  recordExtractor: ({ $, helpers }) => {
    const records = [];
    const guide = extractGuideMetadata($);
    
    // Main guide record
    records.push({
      objectID: guide.slug,
      type: 'guide',
      title: guide.title,
      description: guide.description,
      content: extractCleanContent($),
      url: `/guides/${guide.slug}`,
      hierarchy: guide.hierarchy,
      tags: guide.tags,
      difficulty: guide.difficulty,
      estimatedReadTime: guide.estimatedReadTime,
      publishDate: guide.publishDate,
      author: guide.author,
      
      // Hierarchical facets for filtering
      'hierarchy.level1': guide.hierarchy.level1,
      'hierarchy.level2': guide.hierarchy.level2,
      'hierarchy.level3': guide.hierarchy.level3, 
      'hierarchy.level4': guide.hierarchy.level4,
      'hierarchy.level5': guide.hierarchy.level5,
      
      // Breadcrumb path for display
      hierarchyPath: buildHierarchyPath(guide.hierarchy),
      
      // Search ranking factors
      featured: guide.featured,
      popularityScore: calculatePopularityScore(guide),
    });
    
    // Section-level records for better search granularity
    $('h2, h3, h4').each((i, heading) => {
      const section = extractSectionContent($, heading);
      if (section.content.length > 50) {
        records.push({
          objectID: `${guide.slug}-section-${i}`,
          type: 'section',
          title: `${guide.title} - ${section.title}`,
          content: section.content,
          url: `${guide.url}#${section.anchor}`,
          hierarchy: guide.hierarchy,
          parentGuide: guide.slug,
          sectionLevel: section.level,
        });
      }
    });
    
    return records;
  }
};
```

#### Faceted Search Interface
```astro
---
// src/components/search/GuidesSearch.astro
interface Props {
  placeholder?: string;
  showFilters?: boolean;
  className?: string;
}

const { placeholder = "Search guides...", showFilters = true, className = "" } = Astro.props;
---

<div class={`guides-search ${className}`}>
  <div class="search-input-container">
    <Icon name="search" class="search-icon" />
    <input 
      type="text"
      class="search-input"
      placeholder={placeholder}
      id="guides-search-input"
      aria-label="Search guides"
      autocomplete="off"
      role="combobox"
      aria-expanded="false"
      aria-haspopup="listbox"
    />
    <button class="clear-search" aria-label="Clear search">
      <Icon name="x" />
    </button>
  </div>
  
  {showFilters && (
    <div class="search-filters" id="search-filters">
      <div class="filter-group">
        <label class="filter-label">Category</label>
        <select class="filter-select" data-filter="hierarchy.level1">
          <option value="">All Categories</option>
          <option value="platform-engineering">Platform Engineering</option>
          <option value="architectural-decisions">Architectural Decisions</option>
          <option value="best-practices">Best Practices</option>
          <option value="frameworks">Frameworks</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label class="filter-label">Difficulty</label>
        <select class="filter-select" data-filter="difficulty">
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label class="filter-label">Read Time</label>
        <select class="filter-select" data-filter="readTime">
          <option value="">Any Length</option>
          <option value="0-5">Quick (0-5 min)</option>
          <option value="6-15">Medium (6-15 min)</option>
          <option value="16+">Long (16+ min)</option>
        </select>
      </div>
    </div>
  )}
  
  <div class="search-results" id="search-results" role="listbox" aria-label="Search results">
    <!-- Results populated by JavaScript -->
  </div>
</div>

<script>
import { searchClient } from '../../utils/search-client';

class GuidesSearch {
  constructor() {
    this.searchInput = document.getElementById('guides-search-input');
    this.searchResults = document.getElementById('search-results');
    this.filters = document.querySelectorAll('[data-filter]');
    this.clearButton = document.querySelector('.clear-search');
    
    this.currentQuery = '';
    this.currentFilters = {};
    this.debounceTimeout = null;
    
    this.init();
  }
  
  init() {
    // Search input handling
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });
    
    this.searchInput.addEventListener('keydown', (e) => {
      this.handleKeyNavigation(e);
    });
    
    // Filter handling
    this.filters.forEach(filter => {
      filter.addEventListener('change', (e) => {
        this.updateFilter(e.target.dataset.filter, e.target.value);
        this.performSearch(this.currentQuery);
      });
    });
    
    // Clear button
    this.clearButton.addEventListener('click', () => {
      this.clearSearch();
    });
    
    // Click outside to close results
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.guides-search')) {
        this.hideResults();
      }
    });
  }
  
  async performSearch(query) {
    this.currentQuery = query;
    
    if (query.length < 2) {
      this.hideResults();
      return;
    }
    
    try {
      const searchParams = {
        query,
        filters: this.buildFilters(),
        hitsPerPage: 10,
        attributesToHighlight: ['title', 'description', 'hierarchyPath'],
        attributesToSnippet: ['content:50']
      };
      
      const results = await searchClient.search(searchParams);
      this.displayResults(results.hits);
      
    } catch (error) {
      console.error('Search error:', error);
      this.displayError('Search temporarily unavailable');
    }
  }
  
  buildFilters() {
    const filters = [];
    
    Object.entries(this.currentFilters).forEach(([key, value]) => {
      if (value) {
        if (key === 'readTime') {
          // Special handling for read time ranges
          const [min, max] = value.split('-');
          if (max === '+') {
            filters.push(`estimatedReadTime >= ${min}`);
          } else {
            filters.push(`estimatedReadTime >= ${min} AND estimatedReadTime <= ${max}`);
          }
        } else {
          filters.push(`${key}:"${value}"`);
        }
      }
    });
    
    return filters.join(' AND ');
  }
  
  displayResults(hits) {
    if (hits.length === 0) {
      this.searchResults.innerHTML = `
        <div class="no-results">
          <Icon name="search" />
          <p>No guides found for "${this.currentQuery}"</p>
          <p class="suggestion">Try different keywords or check the filters</p>
        </div>
      `;
    } else {
      this.searchResults.innerHTML = hits.map((hit, index) => `
        <div class="search-result" role="option" data-index="${index}">
          <a href="${hit.url}" class="result-link">
            <div class="result-header">
              <h3 class="result-title">${this.highlightText(hit.title, hit._highlightResult?.title)}</h3>
              <div class="result-meta">
                <span class="difficulty-badge difficulty-${hit.difficulty}">${hit.difficulty}</span>
                <span class="read-time">${hit.estimatedReadTime} min</span>
              </div>
            </div>
            
            <div class="result-path">
              ${this.formatHierarchyPath(hit.hierarchyPath)}
            </div>
            
            <div class="result-description">
              ${this.highlightText(hit.description, hit._highlightResult?.description)}
            </div>
            
            ${hit._snippetResult?.content ? `
              <div class="result-snippet">
                ${hit._snippetResult.content.value}
              </div>
            ` : ''}
          </a>
        </div>
      `).join('');
    }
    
    this.showResults();
  }
  
  highlightText(text, highlight) {
    if (!highlight || !highlight.matchedWords.length) {
      return text;
    }
    return highlight.value;
  }
  
  formatHierarchyPath(path) {
    return path.split(' > ').map(segment => 
      `<span class="path-segment">${segment}</span>`
    ).join('<Icon name="chevron-right" class="path-separator" />');
  }
  
  showResults() {
    this.searchResults.classList.add('visible');
    this.searchInput.setAttribute('aria-expanded', 'true');
  }
  
  hideResults() {
    this.searchResults.classList.remove('visible');
    this.searchInput.setAttribute('aria-expanded', 'false');
  }
  
  updateFilter(filterName, value) {
    this.currentFilters[filterName] = value;
  }
  
  clearSearch() {
    this.searchInput.value = '';
    this.currentQuery = '';
    this.hideResults();
    this.searchInput.focus();
  }
  
  handleKeyNavigation(e) {
    const results = this.searchResults.querySelectorAll('.search-result');
    const currentActive = this.searchResults.querySelector('.search-result.active');
    let activeIndex = currentActive ? parseInt(currentActive.dataset.index) : -1;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, results.length - 1);
        this.setActiveResult(activeIndex);
        break;
        
      case 'ArrowUp':  
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        this.setActiveResult(activeIndex);
        break;
        
      case 'Enter':
        e.preventDefault();
        if (currentActive) {
          const link = currentActive.querySelector('.result-link');
          if (link) link.click();
        }
        break;
        
      case 'Escape':
        this.hideResults();
        break;
    }
  }
  
  setActiveResult(index) {
    const results = this.searchResults.querySelectorAll('.search-result');
    results.forEach((result, i) => {
      result.classList.toggle('active', i === index);
    });
  }
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GuidesSearch();
});
</script>

<style>
  .guides-search {
    @apply relative;
  }
  
  .search-input-container {
    @apply relative flex items-center;
  }
  
  .search-icon {
    @apply absolute left-3 w-5 h-5 text-gray-400 pointer-events-none;
  }
  
  .search-input {
    @apply w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
  }
  
  .clear-search {
    @apply absolute right-3 w-5 h-5 text-gray-400 hover:text-gray-600 opacity-0 transition-opacity;
  }
  
  .search-input:not(:placeholder-shown) + .clear-search {
    @apply opacity-100;
  }
  
  .search-filters {
    @apply flex gap-4 mt-3 p-3 bg-gray-50 rounded-lg;
  }
  
  .filter-group {
    @apply flex flex-col gap-1;
  }
  
  .filter-label {
    @apply text-xs font-medium text-gray-700;
  }
  
  .filter-select {
    @apply text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500;
  }
  
  .search-results {
    @apply absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto opacity-0 invisible transition-all duration-200;
  }
  
  .search-results.visible {
    @apply opacity-100 visible;
  }
  
  .search-result {
    @apply border-b border-gray-100 last:border-b-0;
  }
  
  .search-result.active {
    @apply bg-blue-50;
  }
  
  .result-link {
    @apply block p-4 hover:bg-gray-50 transition-colors;
  }
  
  .result-header {
    @apply flex items-start justify-between gap-2 mb-2;
  }
  
  .result-title {
    @apply text-sm font-medium text-gray-900 line-clamp-2;
  }
  
  .result-meta {
    @apply flex items-center gap-2 flex-shrink-0;
  }
  
  .difficulty-badge {
    @apply px-2 py-1 text-xs font-medium rounded-full;
  }
  
  .difficulty-beginner {
    @apply bg-green-100 text-green-800;
  }
  
  .difficulty-intermediate {
    @apply bg-yellow-100 text-yellow-800;
  }
  
  .difficulty-advanced {
    @apply bg-red-100 text-red-800;
  }
  
  .read-time {
    @apply text-xs text-gray-500;
  }
  
  .result-path {
    @apply flex items-center gap-1 text-xs text-gray-600 mb-2;
  }
  
  .path-segment {
    @apply bg-gray-100 px-2 py-1 rounded;
  }
  
  .path-separator {
    @apply w-3 h-3 text-gray-400;
  }
  
  .result-description {
    @apply text-sm text-gray-600 line-clamp-2 mb-2;
  }
  
  .result-snippet {
    @apply text-xs text-gray-500 bg-gray-50 p-2 rounded;
  }
  
  .no-results {
    @apply text-center py-8 text-gray-500;
  }
  
  .no-results svg {
    @apply w-8 h-8 mx-auto mb-2 text-gray-400;
  }
  
  .suggestion {
    @apply text-xs mt-1;
  }
</style>
```

### Search Analytics Integration

#### Search Metrics Collection
```typescript
// src/utils/search-analytics.ts
export class SearchAnalytics {
  private analytics: any;
  
  constructor() {
    this.analytics = window.gtag || window.analytics || null;
  }
  
  trackSearch(query: string, filters: any, resultCount: number) {
    if (this.analytics) {
      this.analytics('event', 'search', {
        search_term: query,
        content_type: 'guides',
        filters: JSON.stringify(filters),
        result_count: resultCount,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Store for internal analytics
    this.storeSearchMetric({
      type: 'search_performed',
      query,
      filters,
      resultCount,
      timestamp: Date.now(),
    });
  }
  
  trackSearchClick(query: string, resultUrl: string, position: number) {
    if (this.analytics) {
      this.analytics('event', 'search_result_click', {
        search_term: query,
        result_url: resultUrl,
        result_position: position,
        content_type: 'guides',
      });
    }
    
    this.storeSearchMetric({
      type: 'search_click',
      query,
      resultUrl, 
      position,
      timestamp: Date.now(),
    });
  }
  
  trackNoResults(query: string, filters: any) {
    if (this.analytics) {
      this.analytics('event', 'search_no_results', {
        search_term: query,
        filters: JSON.stringify(filters),
        content_type: 'guides',
      });
    }
    
    this.storeSearchMetric({
      type: 'no_results',
      query,
      filters,
      timestamp: Date.now(),
    });
  }
  
  private storeSearchMetric(metric: any) {
    const metrics = JSON.parse(localStorage.getItem('searchMetrics') || '[]');
    metrics.push(metric);
    
    // Keep only last 100 metrics
    if (metrics.length > 100) {
      metrics.splice(0, metrics.length - 100);
    }
    
    localStorage.setItem('searchMetrics', JSON.stringify(metrics));
  }
}
```

## Migration Plan

### Phase 1: Foundation Setup (Week 1-2)

#### Week 1: Schema and Infrastructure
**Objectives**: Update content collection schema and build process

**Tasks**:
1. **Update Content Schema** (2 days)
   - Modify `src/content/config.ts` with hierarchical fields
   - Add backward compatibility for existing guides
   - Create validation functions for hierarchy structure
   - Test schema changes with existing content

2. **File Structure Analysis** (1 day)
   - Audit current guide organization
   - Map existing guides to proposed hierarchy
   - Identify content that needs reorganization
   - Document migration mapping

3. **Build Process Updates** (2 days)
   - Update Astro routing for hierarchical URLs
   - Modify static path generation
   - Test build process with sample hierarchical content
   - Ensure backward compatibility

**Deliverables**:
- Updated content collection schema
- Migration mapping document
- Modified build configuration
- Test suite for schema validation

#### Week 2: Core Utilities and URL Structure
**Objectives**: Implement core hierarchy utilities and URL generation

**Tasks**:
1. **Utility Functions** (3 days)
   - Implement hierarchy parsing and validation
   - Create URL generation functions
   - Build relationship mapping utilities
   - Add content processing helpers

2. **URL Structure Implementation** (2 days)
   - Update dynamic routing patterns
   - Implement URL generation logic
   - Create redirect handling for URL changes
   - Test URL structure with sample content

**Deliverables**:
- Complete utility function library
- Working URL generation system
- Redirect configuration
- Unit tests for core functions

### Phase 2: Content Migration (Week 3-4)

#### Week 3: Content Reorganization
**Objectives**: Migrate existing guides to hierarchical structure

**Tasks**:
1. **Directory Restructure** (2 days)
   - Create new directory structure
   - Move existing guides to appropriate locations
   - Update file paths and references
   - Validate directory organization

2. **Frontmatter Updates** (2 days)
   - Add hierarchy metadata to existing guides
   - Update relationships between guides
   - Add navigation metadata
   - Validate frontmatter consistency

3. **Content Validation** (1 day)
   - Run validation scripts on migrated content
   - Fix any schema violations
   - Test content loading and processing
   - Verify URL generation

**Deliverables**:
- Reorganized content directory structure
- Updated guide frontmatter
- Content validation report
- Migration verification tests

#### Week 4: Relationship Mapping
**Objectives**: Establish parent-child and sibling relationships

**Tasks**:
1. **Automated Relationship Detection** (2 days)
   - Implement automatic relationship discovery
   - Generate parent-child mappings
   - Create sibling relationship links
   - Validate relationship accuracy  

2. **Manual Relationship Curation** (2 days)
   - Review auto-generated relationships
   - Add manual cross-hierarchy relationships
   - Define guide series and progressions
   - Document content organization rationale

3. **Relationship Validation** (1 day)
   - Test relationship integrity
   - Validate bidirectional links
   - Check for orphaned content
   - Verify navigation paths

**Deliverables**:
- Complete relationship mapping
- Manual relationship overrides
- Relationship validation report
- Navigation path documentation

### Phase 3: Navigation Implementation (Week 5-6)

#### Week 5: Core Navigation Components
**Objectives**: Implement hierarchical navigation components

**Tasks**:
1. **Sidebar Navigation** (3 days)
   - Build hierarchical sidebar component
   - Implement expand/collapse functionality
   - Add current path highlighting
   - Ensure keyboard accessibility

2. **Breadcrumb Navigation** (1 day)
   - Create breadcrumb component
   - Implement path generation
   - Add structured data markup
   - Test breadcrumb accuracy

3. **Mobile Navigation** (1 day)
   - Adapt sidebar for mobile devices
   - Implement touch-friendly interactions
   - Test responsive behavior
   - Optimize performance

**Deliverables**:
- Complete navigation component suite
- Accessibility test results
- Mobile responsiveness validation
- Performance benchmarks

#### Week 6: Navigation Enhancement and Polish
**Objectives**: Add advanced navigation features and polish

**Tasks**:
1. **Interactive Features** (2 days)
   - Add search integration to navigation
   - Implement guide metadata display
   - Create quick navigation shortcuts
   - Add navigation state persistence

2. **Visual Polish** (2 days)
   - Apply design system styling
   - Add smooth animations and transitions
   - Implement visual hierarchy indicators
   - Optimize for various screen sizes

3. **Navigation Testing** (1 day)
   - Conduct user experience testing
   - Validate accessibility compliance
   - Test keyboard navigation flows
   - Verify cross-browser compatibility

**Deliverables**:
- Polished navigation interface
- UX testing results
- Accessibility compliance report
- Cross-browser test results

### Phase 4: Search Integration (Week 7-8)

#### Week 7: Search Enhancement
**Objectives**: Update search functionality for hierarchical content

**Tasks**:
1. **Algolia Configuration** (2 days)
   - Update search index structure
   - Add hierarchical metadata to records
   - Configure faceted search options
   - Test search index building

2. **Search Interface Updates** (2 days)
   - Enhance search results display
   - Add hierarchy context to results
   - Implement faceted filtering
   - Update search result ranking

3. **Search Analytics** (1 day)
   - Add search tracking
   - Implement search metrics collection
   - Create search performance monitoring
   - Test analytics data flow

**Deliverables**:
- Updated search configuration
- Enhanced search interface
- Search analytics implementation
- Search performance baseline

#### Week 8: Search Optimization and Testing
**Objectives**: Optimize search performance and user experience

**Tasks**:
1. **Search Performance** (2 days)
   - Optimize search query performance
   - Implement search result caching
   - Tune search ranking algorithms
   - Test search responsiveness

2. **User Experience** (2 days)
   - Refine search result presentation
   - Add search suggestions and autocomplete
   - Implement search history
   - Test search user workflows

3. **Search Validation** (1 day)
   - Validate search accuracy
   - Test edge cases and error handling
   - Verify search accessibility
   - Document search behavior

**Deliverables**:
- Optimized search performance
- Enhanced search user experience
- Search validation report
- Search documentation

### Phase 5: Testing and Launch (Week 9-10)

#### Week 9: Comprehensive Testing
**Objectives**: Conduct thorough testing of all hierarchical features

**Tasks**:
1. **Functional Testing** (2 days)
   - Test all navigation workflows
   - Validate URL structure and routing
   - Check content relationships
   - Verify search functionality

2. **Performance Testing** (2 days)
   - Benchmark page load times
   - Test build performance
   - Validate Core Web Vitals
   - Check search response times

3. **Accessibility Testing** (1 day)
   - Conduct comprehensive accessibility audit
   - Test with screen readers
   - Validate keyboard navigation
   - Check color contrast and focus management

**Deliverables**:
- Comprehensive test results
- Performance benchmark report
- Accessibility audit results
- Bug fix and optimization plan

#### Week 10: Launch Preparation and Deployment
**Objectives**: Prepare for production deployment and launch

**Tasks**:
1. **Documentation Updates** (1 day)
   - Update content creation guidelines
   - Document new navigation features
   - Create user guides for hierarchy usage
   - Update development documentation

2. **Deployment Preparation** (2 days)
   - Prepare production build configuration
   - Set up redirect rules for URL changes
   - Configure search index for production
   - Test deployment process

3. **Launch and Monitoring** (2 days)
   - Deploy to production environment
   - Monitor system performance
   - Track user behavior and engagement
   - Address any immediate issues

**Deliverables**:
- Updated documentation suite
- Production deployment
- Launch monitoring dashboard
- Post-launch optimization plan

### Migration Checklist

#### Pre-Migration Validation
- [ ] Current content inventory complete
- [ ] Migration mapping documented and reviewed
- [ ] Backup of current content structure created
- [ ] Schema validation tests passing
- [ ] Build process tested with sample hierarchical content

#### Content Migration Validation
- [ ] All guides moved to appropriate hierarchy locations
- [ ] Frontmatter updated with hierarchy metadata
- [ ] Parent-child relationships established
- [ ] Sibling relationships configured
- [ ] Cross-hierarchy relationships defined
- [ ] Navigation metadata added
- [ ] Content validation passing

#### Technical Implementation Validation
- [ ] URL generation working correctly
- [ ] Dynamic routing handling all hierarchy levels
- [ ] Navigation components rendering properly
- [ ] Breadcrumb navigation accurate
- [ ] Search integration functional
- [ ] Mobile navigation responsive
- [ ] Accessibility requirements met

#### Performance and Quality Validation
- [ ] Page load times under 2 seconds
- [ ] Build times acceptable (<20% increase)
- [ ] Lighthouse scores maintained (>95)
- [ ] Search response times under 200ms
- [ ] Core Web Vitals passing
- [ ] Cross-browser compatibility verified

#### Launch Readiness Validation
- [ ] Content creation guidelines updated
- [ ] User documentation complete
- [ ] Deployment process tested
- [ ] Monitoring and analytics configured
- [ ] Rollback plan prepared
- [ ] Team training completed

### Risk Mitigation

#### High-Risk Areas
1. **URL Structure Changes**
   - Risk: Broken links and SEO impact
   - Mitigation: Comprehensive redirect mapping, gradual migration, monitoring

2. **Search Index Disruption**
   - Risk: Search functionality degradation
   - Mitigation: Parallel index building, rollback capability, testing

3. **Content Relationship Complexity**
   - Risk: Broken or incorrect relationships
   - Mitigation: Automated validation, manual review, incremental updates

4. **Navigation Performance**
   - Risk: Slow navigation rendering
   - Mitigation: Performance testing, optimization, caching strategies

#### Medium-Risk Areas
1. **Mobile User Experience**
   - Risk: Poor mobile navigation experience
   - Mitigation: Responsive design testing, touch interaction optimization

2. **Content Creator Adoption**
   - Risk: Resistance to new structure
   - Mitigation: Clear documentation, training, gradual rollout

3. **Build Process Changes**
   - Risk: Build failures or performance issues
   - Mitigation: Incremental changes, thorough testing, monitoring

### Success Metrics

#### User Experience Metrics
- **Navigation Efficiency**: Time to find specific content reduced by 30%
- **Content Discoverability**: Increase in guide page views by 25%
- **User Engagement**: Increase in pages per session by 20%
- **Mobile Usage**: Improved mobile navigation satisfaction scores

#### Technical Metrics  
- **Page Performance**: Maintain Lighthouse scores >95
- **Build Performance**: Build time increase <20%
- **Search Performance**: Search response times <200ms
- **Content Management**: Reduce content organization time by 40%

#### Content Metrics
- **Content Relationships**: 90% of guides have appropriate relationships
- **Navigation Accuracy**: 95% of navigation paths are correct
- **Search Relevance**: Improve search result relevance by 30%
- **Content Coverage**: All major topics have complete hierarchical coverage

This comprehensive specification provides a detailed roadmap for implementing nested guide directories with up to 5 levels of hierarchy. The implementation focuses on maintainability, user experience, and technical excellence while ensuring the platform scales effectively with future content growth.