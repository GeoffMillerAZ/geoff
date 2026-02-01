import { GraduationCap, MapPin } from "lucide-react"

interface Education {
  institution: string
  degree: string
  location: string
  note?: string
}

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="scroll-mt-24">
      <h2 className="text-lg font-semibold text-foreground mb-1">
        Education
      </h2>
      <div className="h-0.5 w-12 bg-primary mb-6" />

      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.institution}
            className="bg-card rounded-lg p-5 border border-border flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{edu.institution}</h3>
              <p className="text-sm text-primary">{edu.degree}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {edu.location}
              </p>
              {edu.note && (
                <p className="text-sm text-muted-foreground mt-2 italic">
                  {edu.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
