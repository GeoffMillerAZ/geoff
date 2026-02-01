import Link from "next/link"
import { 
  Briefcase, 
  BookOpen, 
  FileText, 
  FolderOpen, 
  ArrowRight,
  Award,
  Cloud,
  Users,
  TrendingUp
} from "lucide-react"

function DashboardCard({ 
  title, 
  icon: Icon, 
  href, 
  children, 
  accentColor = "pink" 
}: { 
  title: string
  icon: React.ElementType
  href: string
  children: React.ReactNode
  accentColor?: "pink" | "cyan" | "purple" | "orange"
}) {
  const colors = {
    pink: { accent: 'hsl(328 100% 63%)', glow: 'rgba(255, 46, 151, 0.15)' },
    cyan: { accent: 'hsl(180 100% 45%)', glow: 'rgba(0, 230, 230, 0.15)' },
    purple: { accent: 'hsl(270 100% 70%)', glow: 'rgba(167, 85, 255, 0.15)' },
    orange: { accent: 'hsl(25 100% 55%)', glow: 'rgba(255, 140, 0, 0.15)' },
  }
  
  return (
    <div 
      className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ 
        background: 'hsl(230 25% 12%)',
        border: '1px solid hsl(230 20% 20%)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ background: colors[accentColor].glow }}>
            <Icon size={20} style={{ color: colors[accentColor].accent }} />
          </div>
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        <Link 
          href={href}
          className="flex items-center gap-1 text-sm transition-colors hover:opacity-80"
          style={{ color: colors[accentColor].accent }}
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>
      {children}
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <div 
      className="rounded-xl p-4 text-center"
      style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}
    >
      <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ background: `${color}20` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs mt-1" style={{ color: 'hsl(230 10% 55%)' }}>{label}</div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Hero */}
      <section className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Welcome to my{" "}
          <span style={{ color: 'hsl(328 100% 63%)', textShadow: '0 0 20px rgba(255, 46, 151, 0.5)' }}>
            Digital Hub
          </span>
        </h1>
        <p className="text-base sm:text-lg" style={{ color: 'hsl(230 10% 55%)' }}>
          Infrastructure Director & Principal Cloud Architect with 20+ years transforming how organizations build and deliver software.
        </p>
      </section>
      
      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <StatCard label="Years in IT" value="20+" icon={TrendingUp} color="hsl(328 100% 63%)" />
        <StatCard label="Years in Cloud" value="12+" icon={Cloud} color="hsl(180 100% 45%)" />
        <StatCard label="AWS Certs" value="2" icon={Award} color="hsl(270 100% 70%)" />
        <StatCard label="Teams Led" value="50+" icon={Users} color="hsl(25 100% 55%)" />
      </section>
      
      {/* Dashboard Grid */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <DashboardCard title="Experience" icon={Briefcase} href="/experience" accentColor="pink">
          <div className="space-y-3">
            {[
              { role: "Director of Cloud Infrastructure", company: "First Citizens Bank", period: "2021 - Present" },
              { role: "Senior DevOps Architect", company: "Carvana", period: "2018 - 2021" },
              { role: "Lead DevOps Engineer", company: "OWNZONES Media", period: "2016 - 2018" },
            ].map((job, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'hsl(230 25% 15%)', borderLeft: '3px solid hsl(328 100% 63%)' }}>
                <div className="font-medium text-white text-sm">{job.role}</div>
                <div className="text-xs mt-1" style={{ color: 'hsl(328 100% 63%)' }}>{job.company}</div>
                <div className="text-xs" style={{ color: 'hsl(230 10% 55%)' }}>{job.period}</div>
              </div>
            ))}
          </div>
        </DashboardCard>
        
        <DashboardCard title="Latest Articles" icon={BookOpen} href="/blog" accentColor="cyan">
          <div className="space-y-3">
            {[
              { title: "Kubernetes Production Readiness Checklist", category: "Cloud Architecture" },
              { title: "Building High-Performance Platform Teams", category: "Platform Engineering" },
              { title: "Platform Teams Organizational Structure", category: "Leadership" },
            ].map((post, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'hsl(230 25% 15%)', borderLeft: '3px solid hsl(180 100% 45%)' }}>
                <div className="font-medium text-white text-sm">{post.title}</div>
                <div className="text-xs mt-1" style={{ color: 'hsl(180 100% 45%)' }}>{post.category}</div>
              </div>
            ))}
          </div>
        </DashboardCard>
        
        <DashboardCard title="Featured Guides" icon={FileText} href="/guides" accentColor="purple">
          <div className="space-y-3">
            {[
              { title: "Production Kubernetes Security", type: "Best Practices" },
              { title: "Building Internal Developer Platforms", type: "Platform Engineering" },
              { title: "Kubernetes Platform Blueprint", type: "Architecture" },
            ].map((guide, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'hsl(230 25% 15%)', borderLeft: '3px solid hsl(270 100% 70%)' }}>
                <div className="font-medium text-white text-sm">{guide.title}</div>
                <div className="text-xs mt-1" style={{ color: 'hsl(270 100% 70%)' }}>{guide.type}</div>
              </div>
            ))}
          </div>
        </DashboardCard>
        
        <DashboardCard title="Projects" icon={FolderOpen} href="/projects" accentColor="orange">
          <div className="space-y-3">
            {[
              { name: "Cloud Infrastructure Automation", tech: "Terraform, AWS, Kubernetes" },
              { name: "Platform Engineering Toolkit", tech: "Go, ArgoCD, Backstage" },
              { name: "FinOps Dashboard", tech: "Python, React, CloudHealth" },
            ].map((project, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'hsl(230 25% 15%)', borderLeft: '3px solid hsl(25 100% 55%)' }}>
                <div className="font-medium text-white text-sm">{project.name}</div>
                <div className="text-xs mt-1" style={{ color: 'hsl(25 100% 55%)' }}>{project.tech}</div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
      
      {/* Skills */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Core Expertise</h2>
        <div className="flex flex-wrap gap-2">
          {["AWS", "Kubernetes", "Terraform", "Platform Engineering", "DevOps", "Cloud Architecture", "FinOps", "Team Leadership", "CI/CD", "IaC", "Service Mesh", "Observability", "Python", "Go", "ArgoCD"].map((skill) => (
            <span 
              key={skill}
              className="px-3 py-1.5 rounded-full text-sm"
              style={{ background: 'hsl(230 25% 15%)', color: 'hsl(230 10% 70%)', border: '1px solid hsl(230 20% 25%)' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
