import { FileText, ExternalLink, Download } from "lucide-react"

const resources = {
  whitepapers: [
    { title: "Enterprise Kubernetes Adoption", description: "Strategies for successfully adopting Kubernetes at enterprise scale.", format: "PDF", pages: 24 },
    { title: "Cloud Cost Optimization Playbook", description: "A comprehensive guide to reducing cloud spend while maintaining performance.", format: "PDF", pages: 18 },
    { title: "Platform Engineering Maturity Model", description: "Assess and improve your organization's platform engineering capabilities.", format: "PDF", pages: 32 },
  ],
  tools: [
    { title: "Kubernetes Cost Calculator", description: "Estimate your Kubernetes infrastructure costs across cloud providers.", type: "Web Tool" },
    { title: "IDP Readiness Assessment", description: "Evaluate your organization's readiness for an Internal Developer Platform.", type: "Assessment" },
    { title: "FinOps Checklist", description: "A practical checklist for implementing FinOps practices.", type: "Checklist" },
  ],
  templates: [
    { title: "Terraform Module Starter", description: "A well-structured Terraform module template with best practices.", format: "GitHub" },
    { title: "ArgoCD Application Templates", description: "Ready-to-use ArgoCD application manifests for common patterns.", format: "GitHub" },
    { title: "Platform Team Charter", description: "Template for defining your platform team's mission and responsibilities.", format: "Doc" },
  ]
}

export default function ResourcesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Resources</h1>
        <p style={{ color: 'hsl(230 10% 55%)' }}>Whitepapers, tools, and templates to help you succeed</p>
      </header>
      
      {/* Whitepapers */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FileText size={20} style={{ color: 'hsl(328 100% 63%)' }} />
          Whitepapers
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.whitepapers.map((item, i) => (
            <div 
              key={i}
              className="rounded-xl p-5 transition-all hover:-translate-y-1"
              style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}
            >
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm mb-4" style={{ color: 'hsl(230 10% 55%)' }}>{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'hsl(230 10% 45%)' }}>{item.format} - {item.pages} pages</span>
                <button className="flex items-center gap-1 text-sm" style={{ color: 'hsl(328 100% 63%)' }}>
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Tools */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span style={{ color: 'hsl(180 100% 45%)' }}>Tools & Calculators</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.tools.map((item, i) => (
            <div 
              key={i}
              className="rounded-xl p-5 transition-all hover:-translate-y-1"
              style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}
            >
              <span className="text-xs px-2 py-1 rounded mb-3 inline-block" style={{ background: 'hsl(180 100% 45% / 0.15)', color: 'hsl(180 100% 45%)' }}>{item.type}</span>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm mb-4" style={{ color: 'hsl(230 10% 55%)' }}>{item.description}</p>
              <button className="flex items-center gap-1 text-sm" style={{ color: 'hsl(180 100% 45%)' }}>
                <ExternalLink size={14} /> Open Tool
              </button>
            </div>
          ))}
        </div>
      </section>
      
      {/* Templates */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span style={{ color: 'hsl(270 100% 70%)' }}>Templates & Starters</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.templates.map((item, i) => (
            <div 
              key={i}
              className="rounded-xl p-5 transition-all hover:-translate-y-1"
              style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}
            >
              <span className="text-xs px-2 py-1 rounded mb-3 inline-block" style={{ background: 'hsl(270 100% 70% / 0.15)', color: 'hsl(270 100% 70%)' }}>{item.format}</span>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm mb-4" style={{ color: 'hsl(230 10% 55%)' }}>{item.description}</p>
              <button className="flex items-center gap-1 text-sm" style={{ color: 'hsl(270 100% 70%)' }}>
                <ExternalLink size={14} /> View Template
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
