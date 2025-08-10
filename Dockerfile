# Multi-stage Dockerfile for Geoff Miller Platform
# Supports both development and production builds

# =============================================================================
# Base Stage - Common dependencies and setup
# =============================================================================
FROM node:20-alpine AS base

# Install system dependencies for native modules and tools
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    libc6-compat \
    && ln -sf python3 /usr/bin/python

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 astro

# =============================================================================
# Dependencies Stage - Install and cache dependencies
# =============================================================================
FROM base AS deps

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with npm ci for reproducible builds
RUN npm ci --only=production --ignore-scripts \
    && cp -R node_modules prod_node_modules \
    && npm ci --ignore-scripts

# =============================================================================
# Development Stage - Hot reloading and development tools
# =============================================================================
FROM base AS development

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy package files
COPY package.json package-lock.json* ./

# Copy application source code
COPY . .

# Change ownership to nodejs user
RUN chown -R astro:nodejs /app
USER astro

# Expose development port
EXPOSE 4321

# Health check for development server
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:4321/ || exit 1

# Default command for development
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# =============================================================================
# Builder Stage - Build the application
# =============================================================================
FROM base AS builder

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source code
COPY . .

# Set environment for build
ENV NODE_ENV=production
ENV ASTRO_TELEMETRY_DISABLED=1

# Run type checking and build
RUN npm run type-check \
    && npm run build

# =============================================================================
# Production Stage - Optimized nginx server
# =============================================================================
FROM nginx:alpine AS production

# Install wget for health checks
RUN apk add --no-cache wget

# Copy custom nginx configuration
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx user and set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check for production server
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# =============================================================================
# Development with volume mounts (for docker-compose)
# =============================================================================
FROM development AS dev-watch

# This stage is optimized for volume mounts in docker-compose
# Source code is mounted as volumes for hot reloading

# Override the default command to support file watching with polling
# This helps with file system events across different host OSes
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4321"]