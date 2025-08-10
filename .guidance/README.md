# Guidance Directory

This directory contains organizational patterns, specifications, and guidance documents for development workflows in this DDD Python template.

## Directory Structure

```
.guidance/
├── README.md                   # This overview (organizational patterns)
├── spec/                       # Spec-driven development documents
│   ├── README.md              # Specification system overview
│   └── *.md                   # Individual feature specifications
└── workflows/                  # Development workflow documentation
    ├── README.md              # Workflow overview
    ├── spec-driven-dev.md     # Spec-driven development process
    └── ai-assisted-dev.md     # AI-assisted development patterns
```

## Purpose

The `.guidance/` directory serves as the central hub for:

1. **Organizational Patterns** - How to structure development work
2. **Specification Management** - Requirements and acceptance criteria
3. **Workflow Documentation** - Step-by-step development processes
4. **AI Assistance Guidelines** - Best practices for AI-assisted development

## Key Concepts

### Spec-Driven Development (.guidance/spec/)

**Critical Workflow**: Always consult `.guidance/spec/` before making code changes.

- **Check existing specs** - Ensure proposed changes align with documented requirements
- **Update specs first** - If changes aren't covered, update specs before implementation
- **Spec files are authoritative** - They define intended behavior and architecture
- **Review specs like code** - Specs should be reviewed and approved

### Organizational Patterns

#### 1. Layer-First Organization
When adding new features, organize by DDD layers:
```
src/domain/     → Core business logic first
src/application/ → Use cases and DTOs
src/infrastructure/ → External integrations
src/presentation/   → API endpoints last
```

#### 2. Specification-First Development
```
1. .guidance/spec/ → Define requirements
2. Plan implementation approach
3. Implement following DDD patterns
4. Test against spec acceptance criteria
5. Update docs and examples
```

#### 3. Test Pyramid Structure
```
tests/unit/        → Fast, isolated (70%)
tests/integration/ → Component interaction (20%)
tests/e2e/         → Complete workflows (10%)
```

### Development Workflow Integration

#### With Task System
- Use `task examples:*` for pattern exploration
- Use `task check` and `task fix` for code quality
- Use `task version:*` for release management

#### With Examples System
- Reference `examples/` for pattern implementations
- Use `examples/_template/` for creating new modules
- Delete `examples/` directory for clean template usage

#### With Claude Code (.claude/instructions.md)
- Always follow spec-driven development process
- Consult relevant specs before implementation
- Update specs when implementation reveals gaps

## Common Workflows

### Adding a New Feature

1. **Specification Phase**
   ```bash
   # Create or update feature specification
   vim .guidance/spec/user-authentication.md
   
   # Review with team if needed
   git add .guidance/spec/user-authentication.md
   git commit -m "spec: Add user authentication requirements"
   ```

2. **Implementation Phase**
   ```bash
   # Follow DDD layer organization
   # Domain → Application → Infrastructure → Presentation
   
   # Run quality checks
   task check
   task fix
   ```

3. **Testing Phase**
   ```bash
   # Test against spec acceptance criteria
   task test:unit
   task test:integration
   task test:e2e
   ```

4. **Documentation Phase**
   ```bash
   # Update release notes
   vim .versioning/release.md
   
   # Create example if it demonstrates new pattern
   task examples:create feature-name
   ```

### Updating Architecture

1. **Document Decision**
   ```bash
   # Create ADR for architectural changes
   vim docs/adr/ADR-XXX-new-architecture-decision.md
   ```

2. **Update Specifications**
   ```bash
   # Update affected spec files
   vim .guidance/spec/affected-feature.md
   ```

3. **Implement Changes**
   ```bash
   # Follow layer-first organization
   # Update from inside-out (Domain → Presentation)
   ```

4. **Update Examples**
   ```bash
   # Update relevant examples to match new patterns
   task examples:update
   ```

### Working with AI Assistance

1. **Always Start with Specs**
   - Share relevant spec files with AI assistant
   - Reference existing architectural decisions (ADRs)
   - Point to examples that demonstrate similar patterns

2. **Use Structured Prompts**
   ```
   Context: Working on [feature] according to .guidance/spec/[spec-file].md
   Architecture: Following DDD patterns as shown in examples/[example]/
   Request: [specific implementation request]
   Constraints: [any specific constraints or requirements]
   ```

3. **Validate Against Specs**
   - Ensure AI-generated code matches spec requirements
   - Check that implementation follows established patterns
   - Verify architectural boundaries are maintained

## Best Practices

### Specification Management
- ✅ Keep specs up-to-date with implementation
- ✅ Write specs in terms of user outcomes, not technical details
- ✅ Include acceptance criteria for each requirement
- ✅ Reference related specs and ADRs

### Code Organization
- ✅ Follow DDD layer separation strictly
- ✅ Use dependency injection consistently
- ✅ Keep business logic in domain layer
- ✅ Use repository pattern for all data access

### Testing Strategy
- ✅ Write tests that validate spec requirements
- ✅ Focus on behavior, not implementation details
- ✅ Use appropriate test type for each scenario
- ✅ Maintain high coverage for domain logic

### Documentation
- ✅ Update documentation with code changes
- ✅ Keep examples aligned with current patterns
- ✅ Document architectural decisions in ADRs
- ✅ Maintain clear separation between specs and implementation docs

## Integration Points

### With .claude/instructions.md
- Spec-driven development is emphasized as critical workflow
- References this directory for organizational patterns
- Ensures AI assistance follows established patterns

### With examples/ System
- Examples demonstrate patterns defined in specs
- Modular examples can be used or removed as needed
- Examples serve as reference implementations

### With docs/adr/ System
- ADRs document architectural decisions
- Specs implement the business requirements within architectural constraints
- Both inform development decisions

### With .versioning/ System
- Release notes track implementation of spec requirements
- Changelog documents completed features and their specs
- Version management ensures traceability

This guidance system ensures consistent, specification-driven development while maintaining flexibility for different development approaches and tool preferences.