import Image from "next/image"
import { Github, Linkedin, MapPin, Download, Award, GraduationCap, Briefcase, Code2, Trophy, Mail, BookOpen, FileText, Home, User } from "lucide-react"

const resumeData = {
  profile: {
    name: "Geoffrey Miller",
    title: "Infrastructure Director & Principal Cloud Architect",
    location: "Phoenix, AZ",
    photo: "/images/geoff-miller.jpg",
    github: "https://github.com/GeoffMillerAZ",
    linkedin: "https://linkedin.com/in/geoff-e-miller",
    resume: "/GeoffreyMiller-Resume.pdf",
    email: "contact@geoffmiller.dev",
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
  awards: [{ title: "DECA National Competition", achievement: "First Place - Extemporaneous Speaking", year: "2004" }],
  blog: [
    { title: "Kubernetes Production Readiness Checklist", excerpt: "A comprehensive guide to ensuring your Kubernetes clusters are production-ready.", category: "Cloud Architecture", date: "Jan 2024" },
    { title: "Building Platform Teams", excerpt: "How to structure and grow platform engineering teams that drive developer productivity.", category: "Platform Engineering", date: "Dec 2023" },
    { title: "FinOps in Practice", excerpt: "Real-world strategies for optimizing cloud costs without sacrificing performance.", category: "FinOps", date: "Nov 2023" }
  ]
}

const navItems = [
  { label: "Home", href: "#", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Blog", href: "#blog", icon: BookOpen },
  { label: "Contact", href: "#contact", icon: Mail },
]

export default function ResumeDashboard() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f1f5f9' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #1e293b', backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#14b8a6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>GM</span>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#f1f5f9' }}>Geoffrey Miller</span>
            </a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {navItems.map(item => (
                <a key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, borderRadius: '8px', transition: 'all 0.2s' }}>
                  <item.icon style={{ width: '16px', height: '16px' }} />
                  {item.label}
                </a>
              ))}
            </nav>
            <a href={resumeData.profile.resume} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#14b8a6', color: '#0f172a', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
              <Download style={{ width: '16px', height: '16px' }} />
              Resume
            </a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '48px' }}>
          {/* Sidebar */}
          <aside>
            <div style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Profile Card */}
              <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '32px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #14b8a6', marginBottom: '20px', boxShadow: '0 0 40px rgba(20, 184, 166, 0.3)' }}>
                    <Image src={resumeData.profile.photo} alt={resumeData.profile.name} width={140} height={140} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{resumeData.profile.name}</h1>
                  <p style={{ fontSize: '14px', color: '#14b8a6', margin: '8px 0 0 0', fontWeight: 500 }}>{resumeData.profile.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '14px', marginTop: '12px' }}>
                    <MapPin style={{ width: '16px', height: '16px' }} />
                    <span>{resumeData.profile.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
                    <a href={resumeData.profile.github} target="_blank" rel="noopener noreferrer" style={{ padding: '12px', backgroundColor: '#334155', borderRadius: '12px', display: 'flex', transition: 'all 0.2s' }}>
                      <Github style={{ width: '20px', height: '20px', color: '#f1f5f9' }} />
                    </a>
                    <a href={resumeData.profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding: '12px', backgroundColor: '#334155', borderRadius: '12px', display: 'flex', transition: 'all 0.2s' }}>
                      <Linkedin style={{ width: '20px', height: '20px', color: '#f1f5f9' }} />
                    </a>
                    <a href={`mailto:${resumeData.profile.email}`} style={{ padding: '12px', backgroundColor: '#334155', borderRadius: '12px', display: 'flex', transition: 'all 0.2s' }}>
                      <Mail style={{ width: '20px', height: '20px', color: '#f1f5f9' }} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '24px', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 20px 0' }}>Quick Stats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Years in IT', value: `${resumeData.profile.yearsIT}+`, color: '#14b8a6' },
                    { label: 'Years in Cloud', value: `${resumeData.profile.yearsCloud}+`, color: '#8b5cf6' },
                    { label: 'AWS Certifications', value: resumeData.profile.certifications, color: '#f59e0b' }
                  ].map(stat => (
                    <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: 'rgba(51, 65, 85, 0.3)', borderRadius: '12px' }}>
                      <span style={{ color: '#94a3b8', fontSize: '14px' }}>{stat.label}</span>
                      <span style={{ color: stat.color, fontWeight: 700, fontSize: '20px' }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Nav */}
              <nav style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '20px', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px 0' }}>On This Page</h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {['About', 'Experience', 'Skills', 'Certifications', 'Education', 'Awards', 'Blog', 'Contact'].map(section => (
                    <li key={section}>
                      <a href={`#${section.toLowerCase()}`} style={{ display: 'block', padding: '10px 14px', color: '#94a3b8', textDecoration: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 500 }}>{section}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {/* About Section */}
            <section id="about">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', backgroundColor: 'rgba(20, 184, 166, 0.15)', borderRadius: '12px' }}>
                  <User style={{ width: '24px', height: '24px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>About Me</h2>
              </div>
              <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '32px', border: '1px solid #334155' }}>
                <p style={{ fontSize: '20px', color: '#f1f5f9', lineHeight: 1.7, margin: '0 0 24px 0', fontWeight: 500 }}>{resumeData.summary.headline}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {resumeData.summary.highlights.map((highlight, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', backgroundColor: 'rgba(51, 65, 85, 0.3)', borderRadius: '12px' }}>
                      <span style={{ width: '8px', height: '8px', backgroundColor: '#14b8a6', borderRadius: '50%', marginTop: '8px', flexShrink: 0 }} />
                      <span style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.6 }}>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', backgroundColor: 'rgba(20, 184, 166, 0.15)', borderRadius: '12px' }}>
                  <Briefcase style={{ width: '24px', height: '24px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Experience</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {resumeData.experience.map((job, index) => (
                  <div key={index} style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '32px', border: '1px solid #334155', borderLeft: '4px solid #14b8a6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0, color: '#f1f5f9' }}>{job.title}</h3>
                        <p style={{ color: '#14b8a6', margin: '6px 0 0 0', fontWeight: 500, fontSize: '16px' }}>{job.company}</p>
                      </div>
                      <div style={{ textAlign: 'right', padding: '8px 16px', backgroundColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '10px' }}>
                        <p style={{ margin: 0, color: '#f1f5f9', fontWeight: 500, fontSize: '14px' }}>{job.period}</p>
                        <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>{job.location}</p>
                      </div>
                    </div>
                    <p style={{ color: '#94a3b8', margin: '0 0 20px 0', fontSize: '15px', lineHeight: 1.6 }}>{job.description}</p>
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px 0' }}>Key Achievements</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {job.achievements.map((achievement, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#cbd5e1' }}>
                            <span style={{ color: '#14b8a6', fontWeight: 700 }}>+</span>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {job.technologies.map((tech, i) => (
                        <span key={i} style={{ padding: '6px 14px', backgroundColor: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6', fontSize: '13px', borderRadius: '8px', fontWeight: 500, border: '1px solid rgba(20, 184, 166, 0.2)' }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', backgroundColor: 'rgba(20, 184, 166, 0.15)', borderRadius: '12px' }}>
                  <Code2 style={{ width: '24px', height: '24px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Skills & Expertise</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {resumeData.skills.map((skillGroup, index) => (
                  <div key={index} style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '24px', border: '1px solid #334155' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#14b8a6', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0' }}>{skillGroup.category}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {skillGroup.items.map((skill, i) => (
                        <span key={i} style={{ padding: '8px 16px', backgroundColor: 'rgba(51, 65, 85, 0.5)', color: '#f1f5f9', fontSize: '14px', borderRadius: '10px', border: '1px solid #475569' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications Section */}
            <section id="certifications">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', backgroundColor: 'rgba(20, 184, 166, 0.15)', borderRadius: '12px' }}>
                  <Award style={{ width: '24px', height: '24px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Certifications</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '24px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                      <div style={{ padding: '16px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))', borderRadius: '12px' }}>
                        <Award style={{ width: '28px', height: '28px', color: '#f59e0b' }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 600, margin: 0, color: '#f1f5f9' }}>{cert.name}</h3>
                        <p style={{ color: '#14b8a6', fontSize: '14px', margin: '6px 0 0 0', fontWeight: 500 }}>{cert.level}</p>
                        <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0 0' }}>{cert.issuer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section id="education">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', backgroundColor: 'rgba(20, 184, 166, 0.15)', borderRadius: '12px' }}>
                  <GraduationCap style={{ width: '24px', height: '24px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Education</h2>
              </div>
              <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '32px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <div style={{ padding: '16px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))', borderRadius: '12px' }}>
                      <GraduationCap style={{ width: '28px', height: '28px', color: '#8b5cf6' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0, color: '#f1f5f9' }}>{resumeData.education.degree}</h3>
                      <p style={{ color: '#14b8a6', margin: '6px 0 0 0', fontWeight: 500 }}>{resumeData.education.school}</p>
                      <p style={{ color: '#94a3b8', fontSize: '14px', margin: '12px 0 0 0' }}>{resumeData.education.notes}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', padding: '8px 16px', backgroundColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '10px' }}>
                    <p style={{ margin: 0, color: '#f1f5f9', fontWeight: 500, fontSize: '14px' }}>{resumeData.education.period}</p>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>{resumeData.education.location}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Awards Section */}
            <section id="awards">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', backgroundColor: 'rgba(20, 184, 166, 0.15)', borderRadius: '12px' }}>
                  <Trophy style={{ width: '24px', height: '24px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Awards & Recognition</h2>
              </div>
              {resumeData.awards.map((award, index) => (
                <div key={index} style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '32px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <div style={{ padding: '16px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))', borderRadius: '12px' }}>
                      <Trophy style={{ width: '28px', height: '28px', color: '#f59e0b' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0, color: '#f1f5f9' }}>{award.title}</h3>
                      <p style={{ color: '#14b8a6', margin: '6px 0 0 0', fontWeight: 500 }}>{award.achievement}</p>
                      <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 0 0' }}>{award.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Blog Section */}
            <section id="blog">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ padding: '12px', backgroundColor: 'rgba(20, 184, 166, 0.15)', borderRadius: '12px' }}>
                    <BookOpen style={{ width: '24px', height: '24px', color: '#14b8a6' }} />
                  </div>
                  <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Latest Articles</h2>
                </div>
                <a href="/blog" style={{ color: '#14b8a6', textDecoration: 'none', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  View all articles
                  <span style={{ fontSize: '18px' }}>→</span>
                </a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {resumeData.blog.map((post, index) => (
                  <a key={index} href="#" style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '24px', border: '1px solid #334155', textDecoration: 'none', transition: 'all 0.2s' }}>
                    <span style={{ display: 'inline-block', padding: '4px 10px', backgroundColor: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6', fontSize: '11px', borderRadius: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category}</span>
                    <h3 style={{ fontSize: '17px', fontWeight: 600, margin: '16px 0 8px 0', color: '#f1f5f9', lineHeight: 1.4 }}>{post.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{post.excerpt}</p>
                    <p style={{ color: '#64748b', fontSize: '13px', margin: '16px 0 0 0' }}>{post.date}</p>
                  </a>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', backgroundColor: 'rgba(20, 184, 166, 0.15)', borderRadius: '12px' }}>
                  <Mail style={{ width: '24px', height: '24px', color: '#14b8a6' }} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Get In Touch</h2>
              </div>
              <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '48px', border: '1px solid #334155', textAlign: 'center' }}>
                <h3 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 16px 0', color: '#f1f5f9' }}>{"Let's Work Together"}</h3>
                <p style={{ color: '#94a3b8', fontSize: '18px', margin: '0 0 32px 0', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
                  Interested in discussing cloud architecture, platform engineering, or leadership opportunities? I would love to hear from you.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <a href={`mailto:${resumeData.profile.email}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', backgroundColor: '#14b8a6', color: '#0f172a', borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
                    <Mail style={{ width: '18px', height: '18px' }} />
                    Send Email
                  </a>
                  <a href={resumeData.profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', backgroundColor: '#334155', color: '#f1f5f9', borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '15px', border: '1px solid #475569' }}>
                    <Linkedin style={{ width: '18px', height: '18px' }} />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', marginTop: '96px', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#14b8a6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>GM</span>
              </div>
              <span style={{ color: '#64748b', fontSize: '14px' }}>Geoffrey Miller - Built with Next.js</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <a href={resumeData.profile.github} target="_blank" rel="noopener noreferrer" style={{ color: '#64748b' }}>
                <Github style={{ width: '20px', height: '20px' }} />
              </a>
              <a href={resumeData.profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#64748b' }}>
                <Linkedin style={{ width: '20px', height: '20px' }} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
