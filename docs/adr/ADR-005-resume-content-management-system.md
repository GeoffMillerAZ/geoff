# ADR-005: Resume Content Management System

## Status
Accepted

## Context
The Geoff Miller Cloud Platform initially implemented resume sections (experience, education, skills, certifications, achievements) as hardcoded Astro components with static data. This approach presented several challenges:

- **Content Updates**: Modifying resume information required code changes and deployments
- **Version Control**: Resume history was lost as content was overwritten rather than versioned
- **AI Consumption**: Static components were difficult for AI systems to parse and analyze
- **Content Reuse**: Resume data couldn't be easily repurposed for other formats (PDF, API endpoints)
- **Maintainability**: Multiple hardcoded components led to scattered resume logic
- **SEO**: Search engines had difficulty parsing structured resume data from component markup

The existing implementation used separate Astro components:
- `ExperienceTimeline.astro` and `ExperienceTimelineNew.astro` for work history
- `EducationSection.astro` for educational background
- `SkillsSection.astro` for technical competencies
- `AchievementsSection.astro` for notable accomplishments
- Individual PDF files stored in both `public/resume/` and `src/assets/resume/`

## Decision
We will migrate resume content from hardcoded Astro components to a markdown-based content management system using Astro's content collections. This involves:

**Content Collections Structure:**
- `src/content/resume-experience/` - Individual markdown files for each role
- `src/content/resume-education/` - Educational background entries
- `src/content/resume-skills/` - Technical skills by category
- `src/content/resume-certifications/` - Professional certifications
- `src/content/resume-achievements/` - Notable accomplishments and recognitions

**Content Schema Implementation:**
Each content type will have defined TypeScript interfaces in `src/content/config.ts`:
```typescript
// Experience entries with comprehensive metadata
const resumeExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  type: z.enum(['full-time', 'contract', 'consulting']),
  technologies: z.array(z.string()),
  achievements: z.array(z.string()),
  aiSummary: z.string() // For AI consumption
});
```

**Data-Driven Components:**
Replace hardcoded components with data-driven versions that consume content collections:
- Components query collections using `getCollection('resume-experience')`
- Automatic sorting by date and relevance
- Type-safe content access with TypeScript
- Consistent rendering across different contexts

## Consequences

**Positive:**
- **Easy Content Updates**: Resume changes require only markdown edits, not code deployments
- **Version History**: Git provides complete history of resume changes and evolution
- **AI-Friendly**: Structured markdown with frontmatter is easily parsed by AI systems
- **Content Reuse**: Resume data can be exported to JSON, PDF generation, or API endpoints
- **SEO Enhancement**: Structured data markup generated from consistent schemas
- **Type Safety**: TypeScript interfaces ensure data consistency and catch errors
- **Performance**: Content collections provide optimized build-time processing
- **Maintainability**: Single source of truth for resume data reduces code duplication

**Negative:**
- **Migration Effort**: Requires extracting existing hardcoded data into markdown files
- **Learning Curve**: Content editors need to understand frontmatter YAML syntax
- **Build Complexity**: Additional content collection configuration and schema validation
- **Potential Inconsistency**: Multiple markdown files could lead to formatting variations

**Neutral:**
- **Development Workflow**: Shift from component editing to content management workflow
- **File Organization**: More files in content directories, but better organized by type

## Implementation Notes

**Migration Strategy:**
1. Create content collection schemas in `src/content/config.ts`
2. Extract existing hardcoded data into structured markdown files
3. Update components to use `getCollection()` and `getEntry()` APIs
4. Maintain existing visual design while switching to data-driven rendering
5. Add validation to ensure content completeness and accuracy

**Content Organization:**
```
src/content/
├── resume-experience/
│   ├── 01-director-fcb.md
│   ├── 02-director-repay.md
│   └── 03-devops-ews.md
├── resume-education/
│   └── 01-masters.md
├── resume-certifications/
│   └── 01-cka.md
└── resume-skills/
    └── [skills categories]
```

**Schema Design Principles:**
- Include `aiSummary` fields for AI consumption
- Use semantic dates and structured metadata
- Support both current and historical information
- Enable flexible sorting and filtering
- Maintain backward compatibility with existing designs

**Performance Considerations:**
- Content collections are processed at build time for optimal performance
- Static generation ensures fast page loads
- Structured data enables better caching strategies
- Type checking prevents runtime errors

**Future Enhancements:**
- API endpoints for resume data export
- PDF generation from structured content
- Integration with job application systems
- Analytics on content engagement and effectiveness