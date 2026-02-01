"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Menu, 
  X,
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

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  return (
    <>
      {/* Mobile Header */}
      <header 
        className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4"
        style={{ background: 'hsl(230 25% 10%)', borderBottom: '1px solid hsl(230 20% 20%)' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full overflow-hidden"
            style={{ border: '2px solid hsl(328 100% 63%)' }}
          >
            <img 
              src="/images/geoff-miller.jpg" 
              alt="GM"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">Geoffrey Miller</h1>
            <p className="text-xs" style={{ color: 'hsl(328 100% 63%)' }}>Cloud Architect</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg"
          style={{ background: 'hsl(230 25% 18%)', color: 'hsl(328 100% 63%)' }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 pt-16"
          style={{ background: 'hsl(230 25% 7% / 0.98)' }}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium transition-all"
                      style={{
                        background: isActive ? 'hsl(328 100% 63% / 0.15)' : 'hsl(230 25% 12%)',
                        color: isActive ? 'hsl(328 100% 63%)' : 'hsl(0 0% 95%)',
                        border: isActive ? '1px solid hsl(328 100% 63% / 0.3)' : '1px solid hsl(230 20% 20%)'
                      }}
                    >
                      <item.icon size={20} />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
            
            {/* Mobile Social Links */}
            <div className="mt-8 flex justify-center gap-4">
              <a 
                href="https://github.com/GeoffMillerAZ" 
                target="_blank"
                className="p-3 rounded-xl"
                style={{ background: 'hsl(230 25% 12%)', color: 'hsl(230 10% 55%)' }}
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/geoff-e-miller" 
                target="_blank"
                className="p-3 rounded-xl"
                style={{ background: 'hsl(230 25% 12%)', color: 'hsl(230 10% 55%)' }}
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="/resume.pdf"
                className="p-3 rounded-xl"
                style={{ background: 'hsl(328 100% 63% / 0.2)', color: 'hsl(328 100% 63%)' }}
              >
                <Download size={24} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
