import Link from "next/link"
import { Clock, ArrowRight, BookOpen } from "lucide-react"

const guides = [
  { slug: "production-kubernetes-security", title: "Production Kubernetes Security", description: "A comprehensive security checklist for hardening your Kubernetes clusters in production environments.", category: "Best Practices", readTime: "25 min", chapters: 8 },
  { slug: "building-idp", title: "Building Internal Developer Platforms", description: "Step-by-step guide to designing and implementing an Internal Developer Platform that accelerates delivery.", category: "Platform Engineering", readTime: "45 min", chapters: 12 },
  { slug: "kubernetes-platform-blueprint", title: "Kubernetes Platform Blueprint", description: "Reference architecture for building enterprise-grade Kubernetes platforms on AWS.", category: "Architecture", readTime: "35 min", chapters: 10 },
  { slug: "gitops-adoption", title: "GitOps Adoption Guide", description: "How to successfully adopt GitOps practices in your organization with ArgoCD.", category: "DevOps", readTime: "30 min", chapters: 7 },
  { slug: "finops-framework", title: "FinOps Implementation Framework", description: "A practical framework for implementing FinOps practices and optimizing cloud costs.", category: "FinOps", readTime: "40 min", chapters: 9 },
]

export default function GuidesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Guides</h1>
        <p style={{ color: 'hsl(230 10% 55%)' }}>In-depth technical guides and best practices</p>
      </header>
      
      <div className="space-y-4">
        {guides.map((guide) => (
          <article 
            key={guide.slug}
            className="rounded-2xl p-6 transition-all hover:-translate-y-1"
            style={{ 
              background: 'hsl(230 25% 12%)', 
              border: '1px solid hsl(230 20% 20%)',
              borderLeft: '4px solid hsl(270 100% 70%)'
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span 
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{ background: 'hsl(270 100% 70% / 0.15)', color: 'hsl(270 100% 70%)' }}
                  >
                    {guide.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{guide.title}</h2>
                <p className="text-sm mb-4" style={{ color: 'hsl(230 10% 60%)' }}>{guide.description}</p>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'hsl(230 10% 50%)' }}>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {guide.readTime} read
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} />
                    {guide.chapters} chapters
                  </span>
                </div>
              </div>
              <Link 
                href={`/guides/${guide.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ 
                  background: 'hsl(270 100% 70% / 0.15)', 
                  color: 'hsl(270 100% 70%)',
                  border: '1px solid hsl(270 100% 70% / 0.3)'
                }}
              >
                Start Guide <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
