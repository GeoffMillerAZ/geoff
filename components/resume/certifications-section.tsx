import { Award } from "lucide-react"

interface Certification {
  name: string
  level: string
  issuer: string
  icon: string
}

interface CertificationsSectionProps {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="scroll-mt-24">
      <h2 className="text-lg font-semibold text-foreground mb-1">
        Certifications
      </h2>
      <div className="h-0.5 w-12 bg-primary mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="bg-card rounded-lg p-5 border border-border flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{cert.name}</h3>
              <p className="text-sm text-primary">{cert.level}</p>
              <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
