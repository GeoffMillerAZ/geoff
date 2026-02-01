import Image from "next/image"
import { Github, Linkedin, MapPin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileSidebarProps {
  profile: {
    name: string
    title: string
    location: string
    photo: string
    links: {
      github: string
      linkedin: string
    }
    resumeUrl: string
  }
  quickStats: {
    yearsIT: number
    yearsCloud: number
    certifications: number
  }
}

const sectionNavItems = [
  { label: "Career Summary", href: "#career-summary" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Awards", href: "#awards" },
]

export function ProfileSidebar({ profile, quickStats }: ProfileSidebarProps) {
  return (
    <aside className="flex flex-col gap-8">
      {/* Profile Card */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/50">
          <Image
            src={profile.photo}
            alt={profile.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{profile.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">{profile.title}</p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-2">
            <MapPin className="w-3 h-3" />
            {profile.location}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-3">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Download Resume Button */}
        <Button asChild className="w-full">
          <a href={profile.resumeUrl} download>
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </a>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Quick Stats
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Years in IT</span>
            <span className="text-sm font-semibold text-foreground">{quickStats.yearsIT}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Years in Cloud</span>
            <span className="text-sm font-semibold text-foreground">{quickStats.yearsCloud}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">AWS Certifications</span>
            <span className="text-sm font-semibold text-foreground">{quickStats.certifications}</span>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <nav className="hidden lg:block">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Sections
        </h2>
        <ul className="space-y-1">
          {sectionNavItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
