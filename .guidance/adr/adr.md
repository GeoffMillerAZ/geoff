# Architecture Decision Records (ADRs)

## Purpose
ADRs document architectural decisions and tooling selections for your project. They capture the "why" behind significant technical choices.

## Location
Store ADRs in `docs/adr/` directory of your project.

## When to Use ADRs
- Selecting frameworks, libraries, or major tools
- Choosing architectural patterns (microservices, monolith, etc.)
- Database technology decisions
- Infrastructure choices
- API design approaches
- Security architecture decisions

## ADR vs Specs
- **ADRs**: High-level architectural and tooling decisions
- **Specs**: Low-level implementation details and feature requirements

## Template Structure
```
# ADR-001: [Title]

## Status
[Proposed | Accepted | Rejected | Superseded]

## Context
What is the issue that we're seeing that is motivating this decision or change?

## Decision
What is the change that we're proposing and/or doing?

## Consequences
What becomes easier or more difficult to do because of this change?
```

## Best Practices
- Number ADRs sequentially (ADR-001, ADR-002, etc.)
- Keep them concise but comprehensive
- Update status when decisions change
- Reference related ADRs when superseding
