# Workspace Convention

The workspace directory in the root of the project provides a standardized location for all developer-local artifacts. This convention separates project code from temporary files, build outputs, and development utilities.

## Directory Structure

```
workspace/
├── artifacts/     # Build outputs and generated files
├── locks/         # Lock files for coordinating concurrent tasks
├── logging/       # Log files from development tools and scripts
├── secrets/       # Developer-specific secrets (never committed)
└── tmp/           # Short-lived scratch files
```

## Usage Guidelines

### Build Artifacts (`workspace/artifacts/`)
- Compiled binaries and executables
- Generated documentation files
- Packaged distributions
- Coverage reports and analysis outputs

### Lock Files (`workspace/locks/`)
- Process coordination files for concurrent development
- Task-specific lock files to prevent conflicts
- Build system coordination markers

### Logging (`workspace/logging/`)
- Development server logs
- Build process logs
- Test execution logs
- Tool-specific debug outputs

### Secrets (`workspace/secrets/`)
- API keys and tokens for local development
- Database connection strings
- Service account credentials
- **Never committed to version control**

### Temporary Files (`workspace/tmp/`)
- Short-lived scratch files
- Intermediate processing files
- Download cache
- Experimental code snippets

## Git Configuration

The workspace follows a "structure preserved, contents ignored" approach:

- `.gitignore` includes `workspace/**` to ignore all workspace contents
- Each subdirectory contains `.gitkeep` to preserve directory structure
- Directory structure survives git operations (clone, clean, etc.)
- Makes the workspace pattern immediately discoverable to new developers

## Tool Integration

Development tools should be configured to use workspace directories:

- Build systems output to `workspace/artifacts/`
- Development scripts log to `workspace/logging/`
- Concurrent tasks coordinate via `workspace/locks/`
- Local secrets stored in `workspace/secrets/`
- Temporary files use `workspace/tmp/`

## Cleanup Strategy

Regular maintenance of workspace contents:

- Use `task clean` to clean workspace subdirectories
- Automated cleanup of old logs and temporary files
- Secrets directory preserved during cleanup operations
- Lock files cleaned when safe (no active processes)

## Benefits

- **Consistent Organization**: All developers use the same structure
- **Security**: Reduced risk of committing secrets
- **Easy Cleanup**: Single directory for all development artifacts
- **Discoverable**: Clear location for development utilities
- **Documentation**: Obvious pattern for team onboarding
