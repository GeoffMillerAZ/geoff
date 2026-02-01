import { Badge } from "@/components/ui/badge"
import {
  Cloud,
  Layers,
  GitBranch,
  Users,
  Code,
  Shield,
} from "lucide-react"

interface SkillsSectionProps {
  skills: Record<string, string[]>
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Cloud Platforms": <Cloud className="w-5 h-5" />,
  "Platform Engineering": <Layers className="w-5 h-5" />,
  "DevOps & SRE": <GitBranch className="w-5 h-5" />,
  "Leadership": <Users className="w-5 h-5" />,
  "Technologies": <Code className="w-5 h-5" />,
  "Specializations": <Shield className="w-5 h-5" />,
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = Object.entries(skills)

  return (
    <section id="skills" className="scroll-mt-24">
      <h2 className="text-lg font-semibold text-foreground mb-1">
        Skills & Expertise
      </h2>
      <div className="h-0.5 w-12 bg-primary mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(([category, skillList]) => (
          <div
            key={category}
            className="bg-card rounded-lg p-5 border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary">
                {categoryIcons[category] || <Code className="w-5 h-5" />}
              </span>
              <h3 className="font-semibold text-foreground">{category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillList.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="bg-background/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
