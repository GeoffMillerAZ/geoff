# Local Development Workflow Specification

## Goal
Define containerized local development patterns that provide consistent, isolated environments with streamlined workflows and automatic browser launching for immediate feedback.

## Context
The Geoff Miller Platform uses containerized development to ensure consistency across different development environments, eliminate "works on my machine" issues, and provide immediate feedback through automated browser launching. This approach supports both native development (via devbox) and containerized development workflows.

## Architecture Overview

### Development Modes
1. **Native Development**: Direct development using devbox and local Node.js
2. **Containerized Development**: Isolated Docker-based development with volume mounts
3. **Production Testing**: Local production build testing with nginx

### Container Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Host Development Machine                  │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   Source Code   │────│  Docker Volume  │                │
│  │   (./src)       │    │  (node_modules) │                │
│  └─────────────────┘    └─────────────────┘                │
│           │                       │                        │
│           │              ┌────────▼────────┐               │
│           └──────────────▶│ Dev Container   │               │
│                          │ (port 4321)     │               │
│                          │ - Astro dev     │               │
│                          │ - Hot reloading │               │
│                          │ - Health checks │               │
│                          └─────────────────┘               │
│                                   │                        │
│           ┌───────────────────────┼───────────────────────┐│
│           │                       ▼                       ││
│           │            Browser Auto-Launch                ││
│           │         http://localhost:4321                 ││
│           └───────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Task (go-task.sh) installed
- Git repository cloned

### One-Command Development
```bash
# Start containerized development with browser launch
task dev:container

# Alternative: Start native development
task dev
```

## Containerized Development Workflow

### Primary Commands

#### Start Development Environment
```bash
task dev:container
```
**What it does:**
1. Builds the development Docker image (if needed)
2. Starts the development container with volume mounts
3. Waits for the development server to be healthy
4. Automatically opens browser to `http://localhost:4321`
5. Provides helpful next-step commands

#### Monitor Development
```bash
# View real-time logs
task dev:container:logs

# Access container shell for debugging
task dev:container:shell

# Restart container (useful for configuration changes)
task dev:container:restart
```

#### Stop Development
```bash
# Stop containers
task dev:container:stop

# Clean up containers and images
task dev:container:clean
```

### Development Container Features

#### Hot Reloading
- **Source Code**: `./src` mounted as volume with hot reloading
- **Public Assets**: `./public` mounted for immediate asset updates
- **Configuration**: Config files mounted for instant updates
- **Dependencies**: `node_modules` in named volume for performance

#### File Watching
- Uses polling-based file watching for cross-platform compatibility
- Environment variables configured for optimal watching:
  - `CHOKIDAR_USEPOLLING=true`
  - `WATCHPACK_POLLING=true`

#### Health Monitoring
- Container health checks every 10 seconds
- Startup grace period of 10 seconds
- Automatic failure detection and recovery

## Production Testing Workflow

### Testing Production Builds
```bash
# Build and start production container
task prod:container

# View production logs
task prod:container:logs

# Stop production container
task prod:container:stop
```

### Production Container Features
- **Nginx-based serving** with optimized configuration
- **Gzip compression** for all assets
- **Security headers** for production readiness
- **Health endpoint** at `/health`
- **Asset caching** with appropriate cache headers

## Cross-Platform Browser Launching

### Supported Platforms
- **macOS**: Uses `open` command
- **Linux**: Uses `xdg-open` or `gnome-open`
- **Windows**: Uses `start` command
- **Fallback**: Manual instruction for unsupported platforms

### Browser Launch Process
1. Wait for container health check to pass
2. Detect host operating system
3. Execute appropriate browser launch command
4. Fall back to manual instruction if command fails

## File Structure

### Docker Configuration
```
├── Dockerfile              # Multi-stage build (dev, prod)
├── docker-compose.yml      # Development services
├── .dockerignore          # Build context optimization
└── docker/
    └── nginx.dev.conf     # Development proxy config (optional)
```

### Volume Mounts
```
Container Path              Host Path                   Purpose
──────────────────────────────────────────────────────────────
/app/src                   ./src                       Source code hot reload
/app/public                ./public                    Static assets
/app/package.json          ./package.json              Dependencies reference
/app/astro.config.mjs      ./astro.config.mjs         Astro configuration
/app/tailwind.config.mjs   ./tailwind.config.mjs      Tailwind configuration
/app/tsconfig.json         ./tsconfig.json            TypeScript config
/app/node_modules          node_modules (volume)       Isolated dependencies
```

## Performance Optimizations

### Build Performance
- **Multi-stage builds** for optimized images
- **Layer caching** for fast rebuilds
- **Named volumes** for dependency persistence
- **Optimized .dockerignore** for minimal build context

### Runtime Performance
- **Volume mounts** for instant file updates
- **Polling-based watching** for reliable cross-platform file detection
- **Health checks** for reliable startup detection
- **Resource constraints** for consistent performance

## Development Modes Comparison

| Feature                | Native (devbox)     | Containerized       | Production Test    |
|------------------------|--------------------|--------------------|-------------------|
| **Setup Time**         | Fast               | Medium             | Medium            |
| **Isolation**          | Limited            | Complete           | Complete          |
| **Hot Reload**         | Fast               | Fast               | N/A               |
| **Dependencies**       | Host-managed       | Container-managed  | Built-in          |
| **Port**               | 4321               | 4321               | 8080              |
| **Browser Launch**     | Manual             | Automatic          | Automatic         |
| **Resource Usage**     | Low                | Medium             | Low               |

## Troubleshooting

### Common Issues

#### Container Won't Start
```bash
# Check container status
docker-compose ps

# View container logs
task dev:container:logs

# Rebuild from scratch
task dev:container:clean
task dev:container
```

#### File Changes Not Detected
```bash
# Verify volume mounts
docker-compose exec dev ls -la /app/src

# Check file watching settings
docker-compose exec dev env | grep -E "(CHOKIDAR|WATCHPACK)"

# Restart container
task dev:container:restart
```

#### Port Already in Use
```bash
# Check what's using port 4321
lsof -i :4321  # macOS/Linux
netstat -ano | findstr :4321  # Windows

# Stop conflicting processes or use different port
# Modify docker-compose.yml port mapping if needed
```

#### Browser Doesn't Launch
- Verify browser is installed and in PATH
- Check console output for error messages
- Manually open `http://localhost:4321`
- Ensure container is healthy: `docker-compose ps`

### Performance Issues

#### Slow File Watching
```bash
# Increase polling interval (in docker-compose.yml)
CHOKIDAR_INTERVAL: 1000

# Use native file watching if supported
CHOKIDAR_USEPOLLING: false
```

#### High CPU Usage
```bash
# Check container resource usage
docker stats

# Limit container resources (in docker-compose.yml)
deploy:
  resources:
    limits:
      cpus: '2.0'
      memory: 2G
```

## Integration with Existing Tools

### Devbox Compatibility
- Containerized development runs alongside devbox
- Use devbox for shell tools and utilities
- Container handles Node.js and npm dependencies

### Task Integration
- All container commands integrated into main Taskfile.yml
- Consistent command patterns across development modes
- Helpful output and error handling

### Git Workflow
- `.dockerignore` prevents container files from being committed
- Container development doesn't interfere with git operations
- All source changes reflected immediately

## Best Practices

### Development Workflow
1. **Start with containers** for consistency
2. **Use native development** for debugging complex issues
3. **Test with production containers** before deployment
4. **Clean up regularly** to manage disk space

### File Management
- **Edit files on host** using your preferred editor
- **View logs in terminal** for debugging
- **Use container shell** only for inspection
- **Avoid editing files inside container**

### Performance
- **Use named volumes** for node_modules
- **Mount only necessary directories**
- **Enable polling** for reliable file watching
- **Monitor resource usage** regularly

## Security Considerations

### Container Security
- **Non-root user** in container (astro:nodejs)
- **Read-only mounts** for configuration files
- **Network isolation** via Docker networks
- **No sensitive data** in container images

### Development Safety
- **Isolated dependencies** in containers
- **Host file system protection** via volume mounts
- **Easy cleanup** of development artifacts
- **No global pollution** of development machine

## Future Enhancements

### Planned Features
- **VS Code Dev Container** integration
- **Remote development** support
- **Multi-service orchestration** for complex scenarios
- **Automated testing** in containers

### Monitoring Integration
- **Development metrics** collection
- **Performance monitoring** for development workflow
- **Error tracking** for development issues
- **Usage analytics** for workflow optimization

---

*This specification is part of the Geoff Miller Platform development documentation. For updates and contributions, see CONTRIBUTING.md.*