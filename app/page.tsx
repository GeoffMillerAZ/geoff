import Image from "next/image"
import { Github, Linkedin, MapPin, Download, Award, GraduationCap, Briefcase, Code2, Trophy } from "lucide-react"

const resumeData = {
  profile: {
    name: "Geoffrey Miller",
    title: "Infrastructure Director & Principal Cloud Architect",
    location: "Phoenix, AZ",
    photo: "/images/geoff-miller.jpg",
    github: "https://github.com/GeoffMillerAZ",
    linkedin: "https://linkedin.com/in/geoff-e-miller",
    resume: "/GeoffreyMiller-Resume.pdf",
    yearsIT: 20,
    yearsCloud: 12,
    certifications: 2
  },
  summary: {
    headline: "Building and leading high-performing platform engineering teams that transform how organizations deliver software.",
    highlights: [
      "12 years specializing in cloud architecture and platform engineering",
      "Currently leading cloud infrastructure at First Citizens Bank (formerly Silicon Valley Bank)",
      "Expert in AWS, Kubernetes, and the CNCF ecosystem",
      "Passionate about FinOps, developer experience, and building internal developer platforms"
    ]
  },
  experience: [
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
      technologies: ["AWS", "Kubernetes", "Terraform", "ArgoCD", "Istio"]
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
      technologies: ["AWS", "Kubernetes", "Jenkins", "Terraform", "Docker"]
    },
    {
      title: "Lead DevOps Engineer",
      company: "OWNZONES Media Network",
      location: "Los Angeles, CA",
      period: "2016 - 2018",
      description: "Built cloud infrastructure for streaming media platform serving millions of users.",
      achievements: [
        "Designed auto-scaling infrastructure handling 10x traffic spikes",
        "Implemented monitoring and observability stack"
      ],
      technologies: ["AWS", "Docker", "Ansible", "CloudFormation"]
    }
  ],
  skills: [
    { category: "Cloud Platforms", items: ["AWS", "Multi-Cloud Strategy", "Cost Optimization", "Well-Architected Framework"] },
    { category: "Platform Engineering", items: ["Kubernetes", "Service Mesh (Istio)", "Internal Developer Platforms", "GitOps"] },
    { category: "DevOps & SRE", items: ["CI/CD", "Infrastructure as Code", "Observability", "Incident Management"] },
    { category: "Leadership", items: ["Team Building", "Technical Strategy", "Stakeholder Management", "Mentoring"] },
    { category: "Technologies", items: ["Go", "Python", "TypeScript", "Terraform", "ArgoCD", "Prometheus"] }
  ],
  certifications: [
    { name: "AWS Certified Solutions Architect", level: "Associate", issuer: "Amazon Web Services" },
    { name: "AWS Certified Developer", level: "Associate", issuer: "Amazon Web Services" }
  ],
  education: { degree: "Computer Science Studies", school: "Northern Illinois University", location: "DeKalb, IL", period: "2005 - 2008", notes: "Teaching Assistant for Introduction to Programming" },
  awards: [{ title: "DECA National Competition", achievement: "First Place - Extemporaneous Speaking", year: "2004" }]
}

export default function ResumeDashboard() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f1f5f9' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #1e293b', backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#14b8a6' }}>GM</span>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {['About', 'Experience', 'Skills', 'Certifications'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
              ))}
            </nav>
            <a href={resumeData.profile.resume} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#14b8a6', color: '#0f172a', borderRadius: '8px', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>
              <Download style={{ width: '16px', height: '16px' }} />
              Resume
            </a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
          {/* Sidebar */}
          <aside>
            <div style={{ position: 'sticky', top: '96px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Profile Card */}
              <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: '128px', height: '128px', borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(20, 184, 166, 0.2)', marginBottom: '16px' }}>
                    <Image src={resumeData.profile.photo} alt={resumeData.profile.name} width={128} height={128} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>{resumeData.profile.name}</h1>
                  <p style={{ fontSize: '14px', color: '#14b8a6', margin: '4px 0 0 0' }}>{resumeData.profile.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>
                    <MapPin style={{ width: '16px', height: '16px' }} />
                    <span>{resumeData.profile.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
                    <a href={resumeData.profile.github} target="_blank" rel="noopener noreferrer" style={{ padding: '10px', backgroundColor: '#334155', borderRadius: '8px', display: 'flex' }}>
                      <Github style={{ width: '20px', height: '20px', color: '#cbd5e1' }} />
                    </a>
                    <a href={resumeData.profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding: '10px', backgroundColor: '#334155', borderRadius: '8px', display: 'flex' }}>
                      <Linkedin style={{ width: '20px', height: '20px', color: '#cbd5e1' }} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0' }}>Quick Stats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Years in IT', value: `${resumeData.profile.yearsIT}+` },
                    { label: 'Years in Cloud', value: `${resumeData.profile.yearsCloud}+` },
                    { label: 'AWS Certifications', value: resumeData.profile.certifications }
                  ].map(stat => (
                    <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#94a3b8', fontSize: '14px' }}>{stat.label}</span>
                      <span style={{ color: '#14b8a6', fontWeight: 700, fontSize: '18px' }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Nav */}
              <nav style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '16px', border: '1px solid #334155' }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {['About', 'Experience', 'Skills', 'Certifications', 'Education', 'Awards'].map(section => (
                    <li key={section}>
                      <a href={`#${section.toLowerCase()}`} style={{ display: 'block', padding: '8px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: '8px', fontSize: '14px' }}>{section}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* About Section */}
            <section id="about">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '8px', backgroundColor: 'rgba(20, 184, 166, 0.1)', borderRadius: '8px' }}>
                  <Briefcase style={{ width: '20px', height: '20px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Career Summary</h2>
              </div>
              <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
                <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 16px 0' }}>{resumeData.summary.headline}</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {resumeData.summary.highlights.map((highlight, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ width: '6px', height: '6px', backgroundColor: '#14b8a6', borderRadius: '50%', marginTop: '8px', flexShrink: 0 }} />
                      <span style={{ color: '#94a3b8' }}>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '8px', backgroundColor: 'rgba(20, 184, 166, 0.1)', borderRadius: '8px' }}>
                  <Briefcase style={{ width: '20px', height: '20px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Experience</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {resumeData.experience.map((job, index) => (
                  <div key={index} style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{job.title}</h3>
                        <p style={{ color: '#14b8a6', margin: '4px 0 0 0' }}>{job.company}</p>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '14px', color: '#64748b' }}>
                        <p style={{ margin: 0 }}>{job.period}</p>
                        <p style={{ margin: '2px 0 0 0' }}>{job.location}</p>
                      </div>
                    </div>
                    <p style={{ color: '#94a3b8', margin: '0 0 16px 0' }}>{job.description}</p>
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#cbd5e1', margin: '0 0 8px 0' }}>Key Achievements</h4>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {job.achievements.map((achievement, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: '#94a3b8' }}>
                            <span style={{ color: '#14b8a6' }}>-</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {job.technologies.map((tech, i) => (
                        <span key={i} style={{ padding: '4px 12px', backgroundColor: '#334155', color: '#cbd5e1', fontSize: '12px', borderRadius: '9999px' }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '8px', backgroundColor: 'rgba(20, 184, 166, 0.1)', borderRadius: '8px' }}>
                  <Code2 style={{ width: '20px', height: '20px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Skills & Expertise</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {resumeData.skills.map((skillGroup, index) => (
                  <div key={index} style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '20px', border: '1px solid #334155' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#14b8a6', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px 0' }}>{skillGroup.category}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {skillGroup.items.map((skill, i) => (
                        <span key={i} style={{ padding: '6px 12px', backgroundColor: 'rgba(51, 65, 85, 0.5)', color: '#cbd5e1', fontSize: '14px', borderRadius: '8px', border: '1px solid #475569' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications Section */}
            <section id="certifications">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '8px', backgroundColor: 'rgba(20, 184, 166, 0.1)', borderRadius: '8px' }}>
                  <Award style={{ width: '20px', height: '20px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Certifications</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '20px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ padding: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
                        <Award style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{cert.name}</h3>
                        <p style={{ color: '#14b8a6', fontSize: '14px', margin: '4px 0 0 0' }}>{cert.level}</p>
                        <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>{cert.issuer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section id="education">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '8px', backgroundColor: 'rgba(20, 184, 166, 0.1)', borderRadius: '8px' }}>
                  <GraduationCap style={{ width: '20px', height: '20px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Education</h2>
              </div>
              <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{resumeData.education.degree}</h3>
                    <p style={{ color: '#14b8a6', margin: '4px 0 0 0' }}>{resumeData.education.school}</p>
                    <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 0 0' }}>{resumeData.education.notes}</p>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '14px', color: '#64748b' }}>
                    <p style={{ margin: 0 }}>{resumeData.education.period}</p>
                    <p style={{ margin: '2px 0 0 0' }}>{resumeData.education.location}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Awards Section */}
            <section id="awards">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '8px', backgroundColor: 'rgba(20, 184, 166, 0.1)', borderRadius: '8px' }}>
                  <Trophy style={{ width: '20px', height: '20px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Awards & Recognition</h2>
              </div>
              {resumeData.awards.map((award, index) => (
                <div key={index} style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
                      <Trophy style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{award.title}</h3>
                      <p style={{ color: '#14b8a6', margin: '4px 0 0 0' }}>{award.achievement}</p>
                      <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>{award.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', marginTop: '64px', padding: '32px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          <p style={{ margin: 0 }}>Geoffrey Miller - Built with Next.js</p>
        </div>
      </footer>
    </div>
  )
}
