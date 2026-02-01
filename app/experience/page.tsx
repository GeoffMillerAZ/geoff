import { MapPin, Calendar } from "lucide-react"

const experience = [
  {
    title: "Director of Cloud Infrastructure",
    company: "First Citizens Bank",
    location: "Remote",
    period: "Jun 2021 - Present",
    description: "Leading cloud infrastructure strategy and platform engineering for a top-20 US bank.",
    achievements: [
      "Built and scaled platform engineering team from 3 to 15+ engineers",
      "Architected multi-region Kubernetes platform serving 500+ microservices",
      "Reduced cloud costs by 40% through FinOps initiatives",
      "Established Internal Developer Platform reducing deployment time by 80%"
    ],
    technologies: ["AWS", "Kubernetes", "Terraform", "ArgoCD", "Istio", "Prometheus"]
  },
  {
    title: "Senior DevOps Architect",
    company: "Carvana",
    location: "Phoenix, AZ",
    period: "2018 - 2021",
    description: "Led DevOps transformation and cloud migration for the fastest-growing automotive retailer.",
    achievements: [
      "Migrated 200+ applications to Kubernetes",
      "Implemented GitOps workflows with ArgoCD",
      "Built CI/CD pipelines reducing release cycles from weeks to hours"
    ],
    technologies: ["AWS", "Kubernetes", "Jenkins", "Terraform", "Docker", "Datadog"]
  },
  {
    title: "Lead DevOps Engineer",
    company: "OWNZONES Media Network",
    location: "Los Angeles, CA",
    period: "2016 - 2018",
    description: "Built cloud infrastructure for streaming media platform serving millions of users.",
    achievements: [
      "Designed auto-scaling infrastructure handling 10x traffic spikes",
      "Implemented comprehensive monitoring and observability stack",
      "Reduced infrastructure costs by 35% through optimization"
    ],
    technologies: ["AWS", "Docker", "Ansible", "CloudFormation", "ELK Stack"]
  },
]

export default function ExperiencePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Experience</h1>
        <p style={{ color: 'hsl(230 10% 55%)' }}>20+ years of IT experience, 12+ years in cloud architecture</p>
      </header>
      
      <div className="space-y-6">
        {experience.map((job, index) => (
          <article 
            key={index} 
            className="rounded-2xl p-6 sm:p-8 transition-all"
            style={{ 
              background: 'hsl(230 25% 12%)', 
              border: '1px solid hsl(230 20% 20%)',
              borderLeft: '4px solid hsl(328 100% 63%)'
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{job.title}</h2>
                <p className="text-base font-medium" style={{ color: 'hsl(328 100% 63%)' }}>{job.company}</p>
              </div>
              <div className="flex flex-col sm:items-end gap-1 text-sm" style={{ color: 'hsl(230 10% 55%)' }}>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{job.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            
            <p className="mb-4" style={{ color: 'hsl(230 10% 65%)' }}>{job.description}</p>
            
            <div className="mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'hsl(230 10% 45%)' }}>Key Achievements</h3>
              <ul className="space-y-2">
                {job.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'hsl(0 0% 80%)' }}>
                    <span style={{ color: 'hsl(328 100% 63%)' }}>+</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    background: 'hsl(328 100% 63% / 0.15)', 
                    color: 'hsl(328 100% 63%)',
                    border: '1px solid hsl(328 100% 63% / 0.3)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
