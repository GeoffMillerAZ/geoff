import { Briefcase, MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ExperienceItem {
  id: string
  title: string
  company: string
  companyNote?: string
  location: string
  startDate: string
  endDate: string
  description: string
  achievements: string[]
  technologies: string[]
}

interface ExperienceSectionProps {
  experience: ExperienceItem[]
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="scroll-mt-24">
      <h2 className="text-lg font-semibold text-foreground mb-1">
        Experience
      </h2>
      <div className="h-0.5 w-12 bg-primary mb-6" />

      <div className="space-y-6">
        {experience.map((job, index) => (
          <article
            key={job.id}
            className="bg-card rounded-lg p-6 border border-border relative"
          >
            {/* Timeline indicator */}
            {index < experience.length - 1 && (
              <div className="absolute left-8 top-full w-0.5 h-6 bg-border" />
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  {job.title}
                </h3>
                <p className="text-primary font-medium">
                  {job.company}
                  {job.companyNote && (
                    <span className="text-muted-foreground text-sm ml-1">
                      {job.companyNote}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex flex-col sm:items-end gap-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {job.startDate} - {job.endDate}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {job.description}
            </p>

            {/* Achievements */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Key Achievements
              </h4>
              <ul className="space-y-1">
                {job.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
