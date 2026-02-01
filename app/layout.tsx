import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Home, User, Briefcase, FolderGit2, BookOpen, FileText, Wrench, Mail, Download, Github, Linkedin, Menu } from "lucide-react"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Geoffrey Miller | Cloud Architect",
  description: "Infrastructure Director & Principal Cloud Architect - 20+ years transforming how organizations deliver software.",
}

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/guides", label: "Guides", icon: FileText },
  { href: "/resources", label: "Resources", icon: Wrench },
  { href: "/contact", label: "Contact", icon: Mail },
]

function Sidebar() {
  return (
    <aside className="desktop-sidebar" style={{
      width: '280px',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, hsl(230 25% 10%) 0%, hsl(230 25% 7%) 100%)',
      borderRight: '1px solid hsl(230 20% 20%)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 50
    }}>
      {/* Profile Section */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          margin: '0 auto 16px',
          background: 'linear-gradient(135deg, #ff2e97, #00e6e6)',
          padding: '3px',
        }}>
          <img 
            src="/images/geoff-miller.jpg" 
            alt="Geoffrey Miller"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              background: 'hsl(230 25% 12%)'
            }}
          />
        </div>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          background: 'linear-gradient(90deg, #ff2e97, #a755ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '4px'
        }}>Geoffrey Miller</h2>
        <p style={{ fontSize: '0.75rem', color: '#00e6e6', letterSpacing: '0.05em' }}>
          INFRASTRUCTURE DIRECTOR
        </p>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link 
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                color: 'hsl(230 10% 65%)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                marginBottom: '4px',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Quick Stats */}
      <div style={{
        background: 'hsl(230 25% 12%)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        border: '1px solid hsl(230 20% 18%)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: 'hsl(230 10% 55%)', fontSize: '0.75rem' }}>Years in IT</span>
          <span style={{ color: '#ff2e97', fontWeight: 700 }}>20+</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: 'hsl(230 10% 55%)', fontSize: '0.75rem' }}>Years in Cloud</span>
          <span style={{ color: '#00e6e6', fontWeight: 700 }}>12+</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'hsl(230 10% 55%)', fontSize: '0.75rem' }}>AWS Certs</span>
          <span style={{ color: '#a755ff', fontWeight: 700 }}>2</span>
        </div>
      </div>

      {/* Social Links & Resume */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <a href="https://github.com/GeoffMillerAZ" target="_blank" rel="noopener noreferrer" style={{
          width: '40px', height: '40px', borderRadius: '8px',
          background: 'hsl(230 25% 15%)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'hsl(230 10% 65%)', border: '1px solid hsl(230 20% 20%)'
        }}>
          <Github size={18} />
        </a>
        <a href="https://linkedin.com/in/geoff-e-miller" target="_blank" rel="noopener noreferrer" style={{
          width: '40px', height: '40px', borderRadius: '8px',
          background: 'hsl(230 25% 15%)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'hsl(230 10% 65%)', border: '1px solid hsl(230 20% 20%)'
        }}>
          <Linkedin size={18} />
        </a>
        <a href="/resume.pdf" style={{
          flex: 1, height: '40px', borderRadius: '8px',
          background: 'linear-gradient(90deg, #ff2e97, #a755ff)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 600, fontSize: '0.8rem', gap: '6px', textDecoration: 'none'
        }}>
          <Download size={16} /> Resume
        </a>
      </div>
    </aside>
  )
}

function MobileHeader() {
  return (
    <header className="mobile-header" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '64px',
      background: 'hsl(230 25% 10%)',
      borderBottom: '1px solid hsl(230 20% 20%)',
      padding: '0 16px',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #ff2e97, #00e6e6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '0.9rem', color: '#fff'
        }}>GM</div>
        <span style={{ fontWeight: 600, color: '#fff' }}>Geoffrey Miller</span>
      </Link>
      <nav style={{ display: 'flex', gap: '4px' }}>
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon
          return (
            <Link 
              key={item.href}
              href={item.href}
              style={{
                width: '40px', height: '40px', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'hsl(230 10% 65%)', textDecoration: 'none'
              }}
            >
              <Icon size={18} />
            </Link>
          )
        })}
        <button style={{
          width: '40px', height: '40px', borderRadius: '8px',
          background: 'transparent', border: '1px solid hsl(230 20% 25%)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }}>
          <Menu size={20} />
        </button>
      </nav>
    </header>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased synthwave-grid`} suppressHydrationWarning style={{ display: 'flex' }}>
        <Sidebar />
        <MobileHeader />
        <main className="main-content" style={{ 
          marginLeft: '280px', 
          flex: 1, 
          minHeight: '100vh',
          padding: '32px',
          background: 'hsl(230 25% 7%)'
        }}>
          {children}
        </main>
      </body>
    </html>
  )
}
