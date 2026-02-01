import { Award, MapPin, Calendar, Briefcase } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">About Me</h1>
        <p style={{ color: 'hsl(230 10% 55%)' }}>Infrastructure Director & Principal Cloud Architect</p>
      </header>
      
      {/* Bio Card */}
      <section className="rounded-2xl p-6 sm:p-8 mb-6" style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}>
        <p className="text-lg leading-relaxed mb-6" style={{ color: 'hsl(0 0% 85%)' }}>
          I'm a technology leader with over <span style={{ color: 'hsl(328 100% 63%)' }}>20 years of IT experience</span> and 
          <span style={{ color: 'hsl(180 100% 45%)' }}> 12+ years specializing in cloud architecture</span> and platform engineering.
        </p>
        <p className="text-base leading-relaxed mb-6" style={{ color: 'hsl(230 10% 65%)' }}>
          Currently serving as Director of Cloud Infrastructure at First Citizens Bank (formerly Silicon Valley Bank), 
          I lead teams that build and scale enterprise cloud platforms serving hundreds of applications and thousands of developers.
        </p>
        <p className="text-base leading-relaxed" style={{ color: 'hsl(230 10% 65%)' }}>
          My passion lies at the intersection of technology and people - building high-performing teams, 
          creating exceptional developer experiences, and transforming how organizations deliver software.
        </p>
      </section>
      
      {/* Info Grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl p-5" style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}>
          <div className="flex items-center gap-3 mb-3">
            <MapPin size={18} style={{ color: 'hsl(328 100% 63%)' }} />
            <span className="text-sm font-medium" style={{ color: 'hsl(230 10% 55%)' }}>Location</span>
          </div>
          <p className="text-white font-medium">Phoenix, Arizona</p>
        </div>
        <div className="rounded-xl p-5" style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}>
          <div className="flex items-center gap-3 mb-3">
            <Briefcase size={18} style={{ color: 'hsl(180 100% 45%)' }} />
            <span className="text-sm font-medium" style={{ color: 'hsl(230 10% 55%)' }}>Current Role</span>
          </div>
          <p className="text-white font-medium">Director of Cloud Infrastructure</p>
        </div>
      </div>
      
      {/* Focus Areas */}
      <section className="rounded-2xl p-6 sm:p-8 mb-6" style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}>
        <h2 className="text-xl font-bold text-white mb-4">What I Focus On</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "Cloud Architecture", desc: "Designing scalable, secure multi-region cloud platforms on AWS" },
            { title: "Platform Engineering", desc: "Building Internal Developer Platforms that accelerate delivery" },
            { title: "FinOps", desc: "Optimizing cloud costs while maintaining performance and reliability" },
            { title: "Team Leadership", desc: "Growing and mentoring high-performing engineering teams" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg" style={{ background: 'hsl(230 25% 15%)' }}>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm" style={{ color: 'hsl(230 10% 55%)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Certifications */}
      <section className="rounded-2xl p-6 sm:p-8" style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}>
        <h2 className="text-xl font-bold text-white mb-4">Certifications</h2>
        <div className="space-y-3">
          {[
            { name: "AWS Certified Solutions Architect", level: "Associate" },
            { name: "AWS Certified Developer", level: "Associate" },
          ].map((cert, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: 'hsl(230 25% 15%)' }}>
              <Award size={24} style={{ color: 'hsl(25 100% 55%)' }} />
              <div>
                <p className="font-medium text-white">{cert.name}</p>
                <p className="text-sm" style={{ color: 'hsl(25 100% 55%)' }}>{cert.level}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
