# Specification System

This directory contains feature specifications that define requirements, acceptance criteria, and implementation guidelines for the DDD Python template.

## Purpose

Specifications serve as the authoritative source for:
- Feature requirements and business logic
- Acceptance criteria and validation rules
- Implementation guidelines and constraints
- Integration points and dependencies

## Spec-Driven Development Workflow

### CRITICAL: Always Follow This Process

**Before making ANY code changes:**

1. **Consult existing specs** - Check if your change is already specified
2. **Check for conflicts** - Ensure changes don't contradict existing specs
3. **Update specs first** - If changes aren't covered, create/update specs
4. **Get approval** - Review spec changes before implementation
5. **Implement according to spec** - Use specs as implementation guide
6. **Validate against criteria** - Test against spec acceptance criteria

## Specification Format

Each spec file should follow this structure:

```markdown
# Feature Name

## Overview
Brief description of the feature and its purpose.

## Requirements
### Functional Requirements
- REQ-001: Specific functional requirement
- REQ-002: Another functional requirement

### Non-Functional Requirements
- NFR-001: Performance requirement
- NFR-002: Security requirement

## Acceptance Criteria
### Scenario 1: Primary Happy Path
- Given: Initial conditions
- When: User action or system event
- Then: Expected outcome

### Scenario 2: Edge Case
- Given: Edge case conditions
- When: Action under edge conditions
- Then: Expected handling

## Implementation Guidelines
### Architecture Constraints
- Must follow DDD layer separation
- Use repository pattern for data access
- Implement proper error handling

### Integration Points
- References to related specs
- Dependencies on other features
- External system requirements

## Validation Rules
- Data validation requirements
- Business rule validations
- Security validations

## Related Documentation
- ADR references for architectural decisions
- Example implementations
- API documentation references
```

## Current Specifications

### Core Template Specs
- `template-architecture.md` - Overall template architecture and constraints
- `ddd-patterns.md` - Domain-driven design pattern requirements
- `testing-strategy.md` - Testing approach and coverage requirements

### Feature Specs
- `user-management.md` - User entity and management features
- `api-endpoints.md` - REST API design and behavior
- `data-persistence.md` - Repository and database patterns

### Infrastructure Specs
- `development-environment.md` - Development setup and tooling
- `deployment.md` - Deployment and containerization requirements
- `monitoring.md` - Logging and monitoring specifications

## Working with Specifications

### Creating New Specs

1. **Use Template Structure**
   ```bash
   cp .guidance/spec/_template.md .guidance/spec/new-feature.md
   vim .guidance/spec/new-feature.md
   ```

2. **Follow Naming Conventions**
   - Use kebab-case for filenames
   - Include feature scope in name
   - Keep names descriptive but concise

3. **Link Related Specs**
   - Reference dependent specifications
   - Link to relevant ADRs
   - Connect to implementation examples

### Updating Existing Specs

1. **Identify Impact**
   - List affected specifications
   - Check for breaking changes
   - Consider backward compatibility

2. **Update Dependencies**
   - Update related specs
   - Modify affected acceptance criteria
   - Adjust implementation guidelines

3. **Version Changes**
   - Document changes in release notes
   - Update related documentation
   - Notify affected team members

### Validating Implementation

1. **Check Acceptance Criteria**
   - Run tests that validate each criterion
   - Verify edge cases are handled
   - Confirm integration points work

2. **Architectural Compliance**
   - Ensure DDD patterns are followed
   - Verify layer boundaries are respected
   - Check dependency injection usage

3. **Code Quality**
   - Run linting and type checking
   - Verify test coverage meets requirements
   - Check documentation is updated

## Integration with Development Tools

### Task System Integration
```bash
# Validate implementation against specs
task spec:validate

# Generate code from specifications
task spec:generate

# Update specs with implementation changes
task spec:update
```

### Testing Integration
- Unit tests validate individual requirements
- Integration tests verify acceptance criteria
- E2E tests confirm complete user scenarios

### Documentation Integration
- ADRs document architectural decisions
- Examples demonstrate spec implementations
- API docs reflect spec requirements

## Best Practices

### Writing Specifications

✅ **Do:**
- Write from user perspective
- Include specific acceptance criteria
- Define clear validation rules
- Reference architectural constraints
- Link to related documentation

❌ **Don't:**
- Write implementation details in specs
- Create specs that are too broad or vague
- Skip acceptance criteria
- Ignore architectural boundaries
- Write specs in isolation

### Maintaining Specifications

✅ **Do:**
- Keep specs updated with implementation
- Review specs during code reviews
- Validate specs against actual usage
- Archive obsolete specifications
- Version significant spec changes

❌ **Don't:**
- Let specs drift from implementation
- Change specs without team review
- Skip spec updates during feature work
- Keep conflicting specifications
- Make breaking changes without notice

### Using Specifications for AI Assistance

✅ **Do:**
- Share relevant specs with AI assistants
- Reference acceptance criteria in prompts
- Point to architectural constraints
- Include related ADRs and examples
- Validate AI output against specs

❌ **Don't:**
- Skip spec consultation with AI help
- Let AI generate specs without review
- Ignore spec conflicts in AI suggestions
- Skip validation of AI-generated code
- Override specs based on AI recommendations alone

## Specification Lifecycle

### 1. Draft Phase
- Initial requirements gathering
- Stakeholder input and feedback
- Architecture alignment review

### 2. Review Phase
- Technical review for feasibility
- Architecture review for compliance
- Acceptance criteria validation

### 3. Approved Phase
- Ready for implementation
- Serves as implementation guide
- Used for validation and testing

### 4. Implemented Phase
- Implementation completed
- Tests passing against criteria
- Documentation updated

### 5. Deprecated Phase
- Feature being replaced
- Migration path documented
- Sunset timeline established

This specification system ensures consistent, requirements-driven development while maintaining architectural integrity and enabling effective collaboration between human developers and AI assistants.
