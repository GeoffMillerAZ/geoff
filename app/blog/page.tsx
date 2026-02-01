import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

const posts = [
  { slug: "kubernetes-production-readiness", title: "Kubernetes Production Readiness Checklist", excerpt: "A comprehensive guide to ensuring your Kubernetes clusters are production-ready with security, monitoring, and reliability best practices.", category: "Cloud Architecture", date: "Jan 2024" },
  { slug: "building-platform-teams", title: "Building High-Performance Platform Teams", excerpt: "How to structure and grow platform engineering teams that drive developer productivity and organizational success.", category: "Platform Engineering", date: "Dec 2023" },
  { slug: "platform-teams-structure", title: "Platform Teams Organizational Structure", excerpt: "Exploring different models for organizing platform teams and finding the right fit for your organization.", category: "Leadership", date: "Nov 2023" },
  { slug: "finops-in-practice", title: "FinOps in Practice", excerpt: "Real-world strategies for optimizing cloud costs without sacrificing performance or developer experience.", category: "FinOps", date: "Oct 2023" },
  { slug: "gitops-with-argocd", title: "GitOps with ArgoCD", excerpt: "Implementing GitOps workflows for Kubernetes deployments using ArgoCD and best practices for managing complex environments.", category: "DevOps", date: "Sep 2023" },
  { slug: "internal-developer-platforms", title: "Building Internal Developer Platforms", excerpt: "A practical guide to building IDPs that developers love and that accelerate software delivery.", category: "Platform Engineering", date: "Aug 2023" },
]

const categories = ["All", "Cloud Architecture", "Platform Engineering", "Leadership", "FinOps", "DevOps"]

export default function BlogPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Blog</h1>
        <p style={{ color: 'hsl(230 10% 55%)' }}>Thoughts on cloud architecture, platform engineering, and technical leadership</p>
      </header>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button 
            key={cat}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={{ 
              background: cat === "All" ? 'hsl(180 100% 45% / 0.2)' : 'hsl(230 25% 15%)', 
              color: cat === "All" ? 'hsl(180 100% 45%)' : 'hsl(230 10% 60%)',
              border: cat === "All" ? '1px solid hsl(180 100% 45% / 0.3)' : '1px solid hsl(230 20% 25%)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Posts Grid */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {posts.map((post) => (
          <article 
            key={post.slug}
            className="rounded-2xl p-6 transition-all hover:-translate-y-1"
            style={{ 
              background: 'hsl(230 25% 12%)', 
              border: '1px solid hsl(230 20% 20%)'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span 
                className="px-2 py-1 rounded text-xs font-medium"
                style={{ background: 'hsl(180 100% 45% / 0.15)', color: 'hsl(180 100% 45%)' }}
              >
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: 'hsl(230 10% 50%)' }}>
                <Calendar size={12} />
                {post.date}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">{post.title}</h2>
            <p className="text-sm mb-4" style={{ color: 'hsl(230 10% 60%)' }}>{post.excerpt}</p>
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium"
              style={{ color: 'hsl(180 100% 45%)' }}
            >
              Read more <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
