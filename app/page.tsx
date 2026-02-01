import Image from "next/image"
import { Github, Linkedin, MapPin, Download, Award, GraduationCap, Briefcase, Code2, Trophy } from "lucide-react"

const resumeData = {
  profile: {
    name: "Geoffrey Miller",
    title: "Infrastructure Director & Principal Cloud Architect",
    location: "Phoenix, AZ",
    photo: "/images/geoff-miller.jpg",
    links: {
      github: "https://github.com/GeoffMillerAZ",
      linkedin: "https://linkedin.com/in/geoff-e-miller",
      resume: "/GeoffreyMiller-Resume.pdf"
    },
    stats: {
      yearsIT: 20,
      yearsCloud: 12,
      certifications: 2
    }
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
      description: "Leading cloud infrastructure strategy and platform engineering for a top-20 US bank. Managing teams responsible for Kubernetes platforms, cloud architecture, and developer experience.",
      achievements: [
        "Built and scaled platform engineering team from 3 to 15+ engineers",
        "Architected multi-region Kubernetes platform serving 500+ microservices",
        "Reduced cloud costs by 40% through FinOps initiatives",
        "Established Internal Developer Platform (IDP) reducing deployment time by 80%"
      ],
      technologies: ["AWS", "Kubernetes", "Terraform", "ArgoCD", "Istio"]
    },
    {
      title: "Senior DevOps Architect",
      company: "Carvana",
      location: "Phoenix, AZ",
      period: "2018 - 2021",
      description: "Led DevOps transformation and cloud migration initiatives for the fastest-growing automotive retailer.",
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
    {
      category: "Cloud Platforms",
      items: ["AWS", "Multi-Cloud Strategy", "Cost Optimization", "Well-Architected Framework"]
    },
    {
      category: "Platform Engineering",
      items: ["Kubernetes", "Service Mesh (Istio)", "Internal Developer Platforms", "GitOps"]
    },
    {
      category: "DevOps & SRE",
      items: ["CI/CD", "Infrastructure as Code", "Observability", "Incident Management"]
    },
    {
      category: "Leadership",
      items: ["Team Building", "Technical Strategy", "Stakeholder Management", "Mentoring"]
    },
    {
      category: "Technologies",
      items: ["Go", "Python", "TypeScript", "Terraform", "ArgoCD", "Prometheus"]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      level: "Associate",
      issuer: "Amazon Web Services"
    },
    {
      name: "AWS Certified Developer",
      level: "Associate", 
      issuer: "Amazon Web Services"
    }
  ],
  education: [
    {
      degree: "Computer Science Studies",
      school: "Northern Illinois University",
      location: "DeKalb, IL",
      period: "2005 - 2008",
      notes: "Teaching Assistant for Introduction to Programming"
    }
  ],
  awards: [
    {
      title: "DECA National Competition",
      achievement: "First Place - Extemporaneous Speaking",
      year: "2004"
    }
  ]
}

export default function ResumeDashboard() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold text-teal-400">GM</span>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-slate-400 hover:text-teal-400 transition-colors">About</a>
              <a href="#experience" className="text-slate-400 hover:text-teal-400 transition-colors">Experience</a>
              <a href="#skills" className="text-slate-400 hover:text-teal-400 transition-colors">Skills</a>
              <a href="#certifications" className="text-slate-400 hover:text-teal-400 transition-colors">Certifications</a>
            </nav>
            <a 
              href={resumeData.profile.links.resume}
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 mb-8 lg:mb-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Profile Card */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500/20 mb-4">
                    <Image
                      src={resumeData.profile.photo}
                      alt={resumeData.profile.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h1 className="text-xl font-bold text-slate-100">{resumeData.profile.name}</h1>
                  <p className="text-sm text-teal-400 mt-1">{resumeData.profile.title}</p>
                  <div className="flex items-center gap-1 text-slate-400 text-sm mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{resumeData.profile.location}</span>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center gap-3 mt-4">
                    <a 
                      href={resumeData.profile.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <Github className="w-5 h-5 text-slate-300" />
                    </a>
                    <a 
                      href={resumeData.profile.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-slate-300" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Years in IT</span>
                    <span className="text-teal-400 font-bold">{resumeData.profile.stats.yearsIT}+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Years in Cloud</span>
                    <span className="text-teal-400 font-bold">{resumeData.profile.stats.yearsCloud}+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">AWS Certifications</span>
                    <span className="text-teal-400 font-bold">{resumeData.profile.stats.certifications}</span>
                  </div>
                </div>
              </div>

              {/* Section Nav */}
              <nav className="hidden lg:block bg-slate-800 rounded-xl p-4 border border-slate-700">
                <ul className="space-y-2">
                  {["About", "Experience", "Skills", "Certifications", "Education", "Awards"].map((section) => (
                    <li key={section}>
                      <a 
                        href={`#${section.toLowerCase()}`}
                        className="block px-3 py-2 text-slate-400 hover:text-teal-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        {section}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            {/* About Section */}
            <section id="about" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <Briefcase className="w-5 h-5 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">Career Summary</h2>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <p className="text-lg text-slate-300 leading-relaxed mb-4">
                  {resumeData.summary.headline}
                </p>
                <ul className="space-y-2">
                  {resumeData.summary.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-400">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <Briefcase className="w-5 h-5 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">Experience</h2>
              </div>
              <div className="space-y-6">
                {resumeData.experience.map((job, index) => (
                  <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-100">{job.title}</h3>
                        <p className="text-teal-400">{job.company}</p>
                      </div>
                      <div className="text-sm text-slate-400">
                        <p>{job.period}</p>
                        <p>{job.location}</p>
                      </div>
                    </div>
                    <p className="text-slate-400 mb-4">{job.description}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Achievements</h4>
                      <ul className="space-y-1">
                        {job.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                            <span className="text-teal-400 mt-1">-</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-slate-700 text-slate-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <Code2 className="w-5 h-5 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">Skills & Expertise</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {resumeData.skills.map((skillGroup, index) => (
                  <div key={index} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                    <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-3">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1.5 bg-slate-700/50 text-slate-300 text-sm rounded-lg border border-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications Section */}
            <section id="certifications" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <Award className="w-5 h-5 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">Certifications</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-500/10 rounded-lg">
                        <Award className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-100">{cert.name}</h3>
                        <p className="text-sm text-teal-400">{cert.level}</p>
                        <p className="text-sm text-slate-400 mt-1">{cert.issuer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section id="education" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">Education</h2>
              </div>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100">{edu.degree}</h3>
                      <p className="text-teal-400">{edu.school}</p>
                      {edu.notes && <p className="text-sm text-slate-400 mt-2">{edu.notes}</p>}
                    </div>
                    <div className="text-sm text-slate-400">
                      <p>{edu.period}</p>
                      <p>{edu.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Awards Section */}
            <section id="awards" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">Awards & Recognition</h2>
              </div>
              {resumeData.awards.map((award, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-lg">
                      <Trophy className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-100">{award.title}</h3>
                      <p className="text-teal-400">{award.achievement}</p>
                      <p className="text-sm text-slate-400 mt-1">{award.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
          <p>Geoffrey Miller - Built with Next.js and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
