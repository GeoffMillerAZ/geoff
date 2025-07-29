# ADR-004: Vercel for Hosting and Deployment

## Status
Accepted

## Context
The Geoff Miller Cloud Platform requires hosting and deployment infrastructure that provides:
- Fast global content delivery with edge computing capabilities
- Automatic deployments from Git repositories
- Preview deployments for content review
- Built-in analytics and performance monitoring
- SSL/TLS certificates with automatic renewal
- Custom domain support with advanced DNS features
- Scalable infrastructure that grows with traffic
- Cost-effective pricing for personal branding projects

Evaluated hosting options:
1. Vercel (specialized for static sites and serverless)
2. Netlify (JAMstack-focused hosting)
3. GitHub Pages (free static hosting)
4. AWS S3 + CloudFront (manual CDN setup)
5. DigitalOcean App Platform (general-purpose hosting)

## Decision
We will use Vercel for hosting and deployment based on these advantages:

**Performance Optimization:**
- Global Edge Network with 100+ locations worldwide
- Automatic image optimization and WebP conversion
- Smart CDN with intelligent caching strategies
- Edge functions for dynamic content generation
- Core Web Vitals optimization built-in

**Deployment Excellence:**
- Zero-configuration deployments from Git
- Instant rollbacks to previous deployments
- Preview deployments for every pull request
- Branch-based deployments for staging environments
- Automatic HTTPS with custom domains

**Developer Experience:**
- Seamless integration with Astro and static sites
- Real-time deployment logs and debugging
- Environment variable management
- Custom build commands and configurations
- CLI tools for local development

**Analytics & Monitoring:**
- Built-in Web Analytics with privacy compliance
- Core Web Vitals monitoring and alerts
- Traffic insights and geographic distribution
- Performance recommendations and optimization tips

**Astro Integration:**
- Official Astro adapter with optimized builds
- Server-side rendering support if needed
- Static site generation with smart caching
- API routes for dynamic functionality

## Consequences

**Positive:**
- Excellent performance with minimal configuration
- Professional deployment workflow aligned with development practices
- Built-in analytics eliminate need for separate tracking
- Automatic security updates and SSL management
- Generous free tier with reasonable paid pricing
- Strong integration with the Astro ecosystem

**Negative:**
- Vendor lock-in for deployment infrastructure
- Costs scale with bandwidth usage (though competitive)
- Less control over server configuration than self-hosted options
- Function execution limits for serverless features

**Neutral:**
- Learning curve for Vercel-specific features and configuration
- Need to monitor usage to optimize costs at scale

## Implementation Notes

**Deployment Configuration:**
```json
// vercel.json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "functions": {
    "src/pages/api/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

**Environment Setup:**
- Production: `main` branch auto-deployment
- Staging: `develop` branch auto-deployment
- Preview: Pull request deployments for content review
- Local: Development server with hot reloading

**Performance Optimization:**
- Image optimization with `@astrojs/image`
- CSS minification and purging
- JavaScript bundling and tree-shaking
- Preload critical resources
- Service worker for offline capabilities

**Monitoring & Analytics:**
- Vercel Analytics for traffic insights
- Core Web Vitals monitoring
- Error tracking and alerting
- Performance budget enforcement

**Domain Configuration:**
- Custom domain with DNS management
- SSL/TLS certificates with automatic renewal
- CDN configuration for optimal caching
- Security headers and HSTS enforcement