# Contributing to Geoff Miller Cloud Platform

Thank you for your interest in contributing to the Geoff Miller Cloud Platform! This guide will help you understand our development process and how to contribute effectively.

## =� Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Content Contributions](#content-contributions)
- [Code Contributions](#code-contributions)  
- [Testing Requirements](#testing-requirements)
- [Style Guidelines](#style-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## > Code of Conduct

This project is committed to providing a welcoming and inclusive environment for all contributors. We expect all participants to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## =� Getting Started

### Prerequisites
- Node.js 18+ (for native development)
- Docker and Docker Compose (for containerized development - recommended)
- Task (go-task) for build automation
- Git
- Basic understanding of Astro, TypeScript, and MDX

### Initial Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/geoff.git
   cd geoff
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up development environment**
   
   **Option A: Containerized Development (Recommended)**
   ```bash
   # Start development with automatic browser launch
   task dev:container
   
   # View logs
   task dev:container:logs
   
   # Access container shell if needed
   task dev:container:shell
   ```
   
   **Option B: Native Development**
   ```bash
   # Set up devbox environment (if available)
   devbox shell
   
   # Start development server
   npm run dev
   ```

4. **Verify setup**
   ```bash
   # Run tests
   npm run test
   
   # Check code formatting
   npm run lint
   ```

## = Development Workflow

### Containerized Development (Recommended)

We use Docker containers to ensure consistent development environments across all contributors. This eliminates "works on my machine" issues and provides automated browser launching for immediate feedback.

#### Quick Commands
```bash
# Start development environment
task dev:container

# Monitor development
task dev:container:logs

# Debug in container
task dev:container:shell

# Restart container
task dev:container:restart

# Stop development
task dev:container:stop

# Clean up
task dev:container:clean
```

#### Container Features
- **Hot Reloading**: File changes in `./src` trigger automatic rebuilds
- **Volume Mounts**: Source code mounted for instant updates
- **Health Checks**: Automatic readiness detection
- **Browser Launch**: Automatically opens `http://localhost:4321`
- **Cross-Platform**: Works consistently on macOS, Linux, and Windows

#### Production Testing
```bash
# Test production build locally
task prod:container

# Access at http://localhost:8080
# Stop with: task prod:container:stop
```

#### Troubleshooting Container Issues
```bash
# Container won't start
docker-compose ps
task dev:container:logs

# File changes not detected
task dev:container:restart

# Clean slate
task dev:container:clean
task dev:container
```### Branch Strategy
- `main` - Production branch (auto-deployed)
- `develop` - Staging branch (auto-deployed to preview)
- `feature/*` - Feature development branches
- `hotfix/*` - Emergency fixes

### Creating a Feature Branch
```bash
# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Work on your changes
# ...

# Push branch
git push -u origin feature/your-feature-name
```

### Daily Workflow
```bash
# Pull latest changes
git pull origin develop

# Create your feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git add .
git commit -m "feat: add amazing feature"

# Push and create pull request
git push origin feature/amazing-feature
```

## =� Content Contributions

### Content Types
We welcome contributions for:
- **Blog Posts**: Technical insights and platform engineering content
- **Project Showcases**: Case studies and technical documentation
- **Guides**: Platform engineering best practices and frameworks
- **Resources**: Curated tools, links, and recommendations

### Content Creation Process

1. **Use content generators**
   ```bash
   # Create new blog post
   task content:new-blog -- "Your Blog Post Title"
   
   # Create new project showcase
   task content:new-project -- "Your Project Name"
   
   # Create new guide
   task content:new-guide -- "Your Guide Title"
   ```

2. **Content requirements**
   - Follow the established frontmatter schema
   - Include proper tags and categorization
   - Add estimated reading time
   - Provide AI-friendly summary
   - Use proper markdown formatting

3. **Content quality checklist**
   - [ ] Frontmatter is complete and valid
   - [ ] Content follows style guide
   - [ ] Images have alt text
   - [ ] Code examples are tested
   - [ ] Links are functional
   - [ ] Grammar and spelling checked

### Content Schema Example
```yaml
---
title: "Your Article Title"
description: "SEO-optimized description under 160 characters"
publishDate: 2024-01-15
tags: ["platform-engineering", "relevant-tag"]
category: "platform-engineering"
difficulty: "intermediate"
estimatedReadTime: 8
aiSummary: "Brief summary for AI consumption"
toc: true
draft: false
featured: false
---
```

## =� Code Contributions

### Areas for Contribution
- **Components**: Reusable UI components
- **Layouts**: Page layout improvements
- **Utilities**: Helper functions and tools
- **API Endpoints**: Content and search APIs
- **Performance**: Optimization and build improvements

### Code Quality Standards
- Write TypeScript with proper typing
- Follow established naming conventions
- Include unit tests for new functionality
- Ensure accessibility compliance (WCAG AA)
- Maintain performance standards

### Development Commands
```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Quality Assurance
npm run type-check      # TypeScript checking
npm run lint            # Lint code and content
npm run format          # Format with Prettier
npm run test            # Run all tests

# Content Management
task content:validate   # Validate all content
task content:stats      # Content statistics
```

## >� Testing Requirements

### Test Coverage
All contributions must include appropriate tests:

- **Unit Tests**: For utility functions and components
- **Integration Tests**: For API endpoints and content processing
- **E2E Tests**: For critical user journeys
- **Content Tests**: For schema validation and processing

### Running Tests
```bash
# All tests
npm run test

# Specific test types
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:content

# Test coverage
npm run test:coverage
```

### Performance Testing
```bash
# Lighthouse audit
npm run lighthouse

# Accessibility testing
npm run a11y

# Load testing
task test:performance
```

## <� Style Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Use functional components and hooks
- Implement proper error handling
- Write descriptive commit messages

### Content Style
- Use clear, concise language
- Write for technical professionals
- Include practical examples
- Structure content with proper headings
- Follow the established voice and tone

### Commit Messages
Follow conventional commit format:
```
type(scope): description

feat(blog): add new platform engineering post
fix(search): resolve indexing issue
docs(readme): update installation instructions
style(components): format with prettier
test(api): add integration tests
```

### File Naming
- Use kebab-case for files and directories
- Component files: `PascalCase.astro`
- Utility files: `camelCase.ts`
- Content files: `kebab-case.mdx`

## =� Pull Request Process

### Before Submitting
- [ ] Fork the repository and create feature branch
- [ ] Make your changes following style guidelines
- [ ] Add/update tests as necessary
- [ ] Update documentation if needed
- [ ] Run full test suite and ensure passing
- [ ] Check that build completes successfully

### PR Template
When creating a pull request, include:

```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Content addition

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility verified

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process
1. **Automated checks**: All CI checks must pass
2. **Code review**: At least one maintainer review required
3. **Testing**: Manual testing of key functionality
4. **Deployment**: Preview deployment for visual verification
5. **Approval**: Final approval and merge

### After Approval
- Squash and merge for clean commit history
- Delete feature branch after merge
- Monitor deployment for any issues

## = Issue Guidelines

### Reporting Bugs
When reporting bugs, include:

- **Environment**: OS, browser, Node.js version
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Additional context**: Any relevant information

### Feature Requests
For new features, provide:

- **Problem statement**: What problem does this solve?
- **Proposed solution**: How should it work?
- **Alternatives considered**: Other approaches
- **Additional context**: Use cases, examples

### Issue Labels
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority:high` - High priority items

## =' Development Tools

### Recommended Extensions (VS Code)
- Astro
- TypeScript and JavaScript Language Features
- Prettier
- ESLint
- Tailwind CSS IntelliSense
- MDX

### Local Development Tools
```bash
# Task runner
npm install -g @go-task/cli

# Development environment
devbox shell

# Code quality
npm run lint:fix
npm run format
```

## =� Resources

### Documentation
- [Astro Documentation](https://docs.astro.build/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Project Resources
- **CLAUDE.md**: Complete project context and commands
- **README.md**: Project overview and setup
- **docs/adr/**: Architecture decision records
- **specs/**: Feature specifications
- **STYLE_GUIDE.md**: Detailed style guidelines

## > Questions?

If you have questions about contributing:

1. Check existing [GitHub Issues](https://github.com/geoffmilleraz/geoff/issues)
2. Review project documentation
3. Create a new issue with the `question` label
4. Reach out to maintainers

## =O Recognition

All contributors will be recognized in:
- Repository contributors list
- Release notes for significant contributions
- Annual contributor acknowledgments

Thank you for helping make the Geoff Miller Cloud Platform better for everyone! =�