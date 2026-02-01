import { Trophy } from "lucide-react"

interface Award {
  title: string
  category: string
  year: string
  description: string
}

interface AwardsSectionProps {
  awards: Award[]
}

export function AwardsSection({ awards }: AwardsSectionProps) {
  return (
    <section id="awards" className="scroll-mt-24">
      <h2 className="text-lg font-semibold text-foreground mb-1">
        Awards & Recognition
      </h2>
      <div className="h-0.5 w-12 bg-primary mb-6" />

      <div className="space-y-4">
        {awards.map((award) => (
          <div
            key={award.title}
            className="bg-card rounded-lg p-5 border border-border flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{award.title}</h3>
              <p className="text-sm text-primary">{award.category}</p>
              <p className="text-xs text-muted-foreground mt-1">{award.year}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {award.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
