import { Mail, Linkedin, Github, MessageSquare } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Get in Touch</h1>
        <p style={{ color: 'hsl(230 10% 55%)' }}>I'd love to hear from you. Let's connect!</p>
      </header>
      
      {/* Contact Card */}
      <div 
        className="rounded-2xl p-8 sm:p-10 text-center mb-8"
        style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}
      >
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: 'hsl(328 100% 63% / 0.15)' }}
        >
          <MessageSquare size={32} style={{ color: 'hsl(328 100% 63%)' }} />
        </div>
        
        <h2 className="text-xl font-bold text-white mb-2">Let's Connect</h2>
        <p className="mb-6" style={{ color: 'hsl(230 10% 55%)' }}>
          Whether you want to discuss cloud architecture, platform engineering, 
          or just say hello, I'm always happy to chat.
        </p>
        
        <a 
          href="mailto:contact@geoffmiller.dev"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
          style={{ 
            background: 'hsl(328 100% 63%)', 
            color: 'white',
            boxShadow: '0 0 20px rgba(255, 46, 151, 0.3)'
          }}
        >
          <Mail size={18} />
          contact@geoffmiller.dev
        </a>
      </div>
      
      {/* Social Links */}
      <div className="grid sm:grid-cols-2 gap-4">
        <a 
          href="https://linkedin.com/in/geoff-e-miller"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-xl transition-all hover:-translate-y-1"
          style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}
        >
          <div 
            className="p-3 rounded-lg"
            style={{ background: 'hsl(210 100% 50% / 0.15)' }}
          >
            <Linkedin size={24} style={{ color: 'hsl(210 100% 50%)' }} />
          </div>
          <div>
            <p className="font-medium text-white">LinkedIn</p>
            <p className="text-sm" style={{ color: 'hsl(230 10% 55%)' }}>Connect professionally</p>
          </div>
        </a>
        
        <a 
          href="https://github.com/GeoffMillerAZ"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-xl transition-all hover:-translate-y-1"
          style={{ background: 'hsl(230 25% 12%)', border: '1px solid hsl(230 20% 20%)' }}
        >
          <div 
            className="p-3 rounded-lg"
            style={{ background: 'hsl(0 0% 100% / 0.1)' }}
          >
            <Github size={24} style={{ color: 'hsl(0 0% 90%)' }} />
          </div>
          <div>
            <p className="font-medium text-white">GitHub</p>
            <p className="text-sm" style={{ color: 'hsl(230 10% 55%)' }}>Check out my code</p>
          </div>
        </a>
      </div>
      
      {/* Availability */}
      <div 
        className="mt-8 p-6 rounded-xl text-center"
        style={{ background: 'hsl(180 100% 45% / 0.1)', border: '1px solid hsl(180 100% 45% / 0.2)' }}
      >
        <p className="text-sm" style={{ color: 'hsl(180 100% 45%)' }}>
          Currently open to advisory roles, speaking engagements, and interesting conversations about cloud architecture and platform engineering.
        </p>
      </div>
    </div>
  )
}
