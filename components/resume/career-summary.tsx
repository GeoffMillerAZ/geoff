import { CheckCircle2 } from "lucide-react"

interface CareerSummaryProps {
  careerSummary: {
    headline: string
    summary: string
    highlights: string[]
  }
}

export function CareerSummary({ careerSummary }: CareerSummaryProps) {
  return (
    <section id="career-summary" className="scroll-mt-24">
      <h2 className="text-lg font-semibold text-foreground mb-1">
        Career Summary
      </h2>
      <div className="h-0.5 w-12 bg-primary mb-6" />

      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">
          {careerSummary.headline}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {careerSummary.summary}
        </p>

        <div className="space-y-3">
          {careerSummary.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
