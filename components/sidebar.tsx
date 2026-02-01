"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  User, 
  Briefcase, 
  BookOpen, 
  FileText, 
  FolderOpen, 
  Library,
  Mail,
  Download,
  Github,
  Linkedin
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Guides", href: "/guides", icon: FileText },
  { name: "Resources", href: "/resources", icon: Library },
  { name: "Contact", href: "/contact", icon: Mail },
]

export function Sidebar() {
  const pathname = usePathname()
  
  return (
    <aside 
      className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 lg:z-50"
      style={{ background: 'hsl(230 25% 10%)' }}
    >
      {/* Logo/Profile Section */}
      <div className="flex flex-col items-center py-8 px-4 border-b" style={{ borderColor: 'hsl(230 20% 20%)' }}>
        <div 
          className="w-20 h-20 rounded-full overflow-hidden mb-4"
          style={{ 
            border: '3px solid hsl(328 100% 63%)',
            boxShadow: '0 0 20px rgba(255, 46, 151, 0.4)'
          }}
        >
          <img 
            src="/images/geoff-miller.jpg" 
            alt="Geoffrey Miller"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-lg font-bold text-white">Geoffrey Miller</h1>
        <p className="text-xs text-center mt-1" style={{ color: 'hsl(328 100% 63%)' }}>
          Infrastructure Director
        </p>
        <p className="text-xs" style={{ color: 'hsl(230 10% 55%)' }}>Phoenix, AZ</p>
        
        {/* Social Links */}
        <div className="flex gap-3 mt-4">
          <a 
            href="https://github.com/GeoffMillerAZ" 
            target="_blank"
            className="p-2 rounded-lg transition-all hover:scale-110"
            style={{ background: 'hsl(230 25% 18%)', color: 'hsl(230 10% 55%)' }}
          >
            <Github size={18} />
          </a>
          <a 
            href="https://linkedin.com/in/geoff-e-miller" 
            target="_blank"
            className="p-2 rounded-lg transition-all hover:scale-110"
            style={{ background: 'hsl(230 25% 18%)', color: 'hsl(230 10% 55%)' }}
          >
            <Linkedin size={18} />
          </a>
          <a 
            href="/resume.pdf"
            className="p-2 rounded-lg transition-all hover:scale-110"
            style={{ background: 'hsl(328 100% 63% / 0.2)', color: 'hsl(328 100% 63%)' }}
          >
            <Download size={18} />
          </a>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: isActive ? 'hsl(328 100% 63% / 0.15)' : 'transparent',
                    color: isActive ? 'hsl(328 100% 63%)' : 'hsl(230 10% 55%)',
                    borderLeft: isActive ? '3px solid hsl(328 100% 63%)' : '3px solid transparent'
                  }}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      {/* Footer Stats */}
      <div className="p-4 border-t" style={{ borderColor: 'hsl(230 20% 20%)' }}>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold" style={{ color: 'hsl(328 100% 63%)' }}>20+</div>
            <div className="text-xs" style={{ color: 'hsl(230 10% 55%)' }}>Years IT</div>
          </div>
          <div>
            <div className="text-lg font-bold" style={{ color: 'hsl(180 100% 45%)' }}>12+</div>
            <div className="text-xs" style={{ color: 'hsl(230 10% 55%)' }}>Cloud</div>
          </div>
          <div>
            <div className="text-lg font-bold" style={{ color: 'hsl(270 100% 70%)' }}>2</div>
            <div className="text-xs" style={{ color: 'hsl(230 10% 55%)' }}>AWS Certs</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
