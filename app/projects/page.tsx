import { Github, ExternalLink } from "lucide-react"

const projects = [
  { 
    name: "Cloud Infrastructure Automation", 
    description: "Terraform modules and automation scripts for provisioning enterprise-grade AWS infrastructure with best practices for security, networking, and cost optimization.",
    technologies: ["Terraform", "AWS", "Python", "GitHub Actions"],
    status: "Active",
    github: "https://github.com/GeoffMillerAZ",
    color: "pink"
  },
  { 
    name: "Kubernetes Platform Toolkit", 
    description: "A collection of tools and configurations for building production-ready Kubernetes platforms including ArgoCD apps, Helm charts, and Crossplane compositions.",
    technologies: ["Kubernetes", "ArgoCD", "Helm", "Crossplane", "Go"],
    status: "Active",
    github: "https://github.com/GeoffMillerAZ",
    color: "cyan"
  },
  { 
    name: "FinOps Dashboard", 
    description: "Real-time cloud cost monitoring and optimization dashboard with anomaly detection, budget alerts, and recommendation engine.",
    technologies: ["Python", "React", "AWS Cost Explorer", "Grafana"],
    status: "In Progress",
    github: "https://github.com/GeoffMillerAZ",
    color: "purple"
  },
  { 
    name: "Developer Portal (Backstage)", 
    description: "Custom Backstage plugins and templates for building an Internal Developer Platform with service catalog, scaffolding, and documentation.",
    technologies: ["TypeScript", "Backstage", "React", "PostgreSQL"],
    status: "Active",
    github: "https://github.com/GeoffMillerAZ",
    color: "orange"
  },
  { 
    name: "Observability Stack", 
    description: "Comprehensive observability setup with Prometheus, Grafana, Loki, and Tempo for metrics, logs, and traces in Kubernetes.",
    technologies: ["Prometheus", "Grafana", "Loki", "Tempo", "OpenTelemetry"],
    status: "Maintained",
    github: "https://github.com/GeoffMillerAZ",
    color: "pink"
  },
]

const colorMap = {
  pink: { accent: 'hsl(328 100% 63%)', bg: 'hsl(328 100% 63% / 0.15)' },
  cyan: { accent: 'hsl(180 100% 45%)', bg: 'hsl(180 100% 45% / 0.15)' },
  purple: { accent: 'hsl(270 100% 70%)', bg: 'hsl(270 100% 70% / 0.15)' },
  orange: { accent: 'hsl(25 100% 55%)', bg: 'hsl(25 100% 55% / 0.15)' },
}

export default function ProjectsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Projects</h1>
        <p style={{ color: 'hsl(230 10% 55%)' }}>Open source projects and tools I've built or contributed to</p>
      </header>
      
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project, i) => {
          const colors = colorMap[project.color as keyof typeof colorMap]
          return (
            <article 
              key={i}
              className="rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{ 
                background: 'hsl(230 25% 12%)', 
                border: '1px solid hsl(230 20% 20%)',
                borderTop: `3px solid ${colors.accent}`
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span 
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{ background: colors.bg, color: colors.accent }}
                >
                  {project.status}
                </span>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors"
                  style={{ background: 'hsl(230 25% 18%)', color: 'hsl(230 10% 60%)' }}
                >
                  <Github size={18} />
                </a>
              </div>
              
              <h2 className="text-lg font-bold text-white mb-2">{project.name}</h2>
              <p className="text-sm mb-4" style={{ color: 'hsl(230 10% 60%)' }}>{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, j) => (
                  <span 
                    key={j}
                    className="px-2 py-1 rounded text-xs"
                    style={{ background: 'hsl(230 25% 18%)', color: 'hsl(230 10% 65%)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
