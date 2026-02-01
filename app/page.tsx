import Link from "next/link"
import { ArrowRight, Briefcase, BookOpen, FolderGit2, FileText, Award, Cloud, Users, Zap } from "lucide-react"

export default function Dashboard() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ marginBottom: '48px' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          marginBottom: '12px',
          background: 'linear-gradient(90deg, #ff2e97, #00e6e6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome to my digital space
        </h1>
        <p style={{ color: 'hsl(230 10% 55%)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>
          Building and leading high-performance engineering teams that transform how organizations deliver software. 
          Currently directing cloud infrastructure at First Citizens Bank.
        </p>
      </section>

      {/* Stats Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '48px'
      }}>
        {[
          { label: 'Years Experience', value: '20+', icon: Zap, color: '#ff2e97' },
          { label: 'Cloud Expertise', value: '12+', icon: Cloud, color: '#00e6e6' },
          { label: 'Team Size Led', value: '50+', icon: Users, color: '#a755ff' },
          { label: 'AWS Certifications', value: '2', icon: Award, color: '#ff9500' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} style={{
              background: 'hsl(230 25% 12%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid hsl(230 20% 18%)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'hsl(230 10% 55%)', marginTop: '4px' }}>{stat.label}</div>
            </div>
          )
        })}
      </section>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column */}
        <div>
          {/* Latest Experience */}
          <section style={{
            background: 'hsl(230 25% 12%)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid hsl(230 20% 18%)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={18} style={{ color: '#ff2e97' }} />
                Current Role
              </h2>
              <Link href="/experience" style={{ color: '#00e6e6', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ borderLeft: '2px solid #ff2e97', paddingLeft: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                Director of Cloud Infrastructure
              </h3>
              <p style={{ color: '#00e6e6', fontSize: '0.9rem', marginBottom: '8px' }}>
                First Citizens Bank (formerly Silicon Valley Bank)
              </p>
              <p style={{ color: 'hsl(230 10% 55%)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '12px' }}>
                Leading cloud infrastructure strategy and platform engineering initiatives. Managing hybrid cloud environments 
                and driving FinOps practices across the organization.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['AWS', 'Kubernetes', 'Terraform', 'ArgoCD', 'FinOps'].map(tag => (
                  <span key={tag} style={{
                    padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem',
                    background: 'hsl(230 25% 18%)', color: 'hsl(230 10% 70%)'
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Blog Posts */}
          <section style={{
            background: 'hsl(230 25% 12%)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid hsl(230 20% 18%)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={18} style={{ color: '#00e6e6' }} />
                Recent Articles
              </h2>
              <Link href="/blog" style={{ color: '#00e6e6', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Kubernetes Production Readiness Checklist', category: 'Cloud Architecture', date: 'Jan 2024' },
                { title: 'Building Platform Teams That Scale', category: 'Platform Engineering', date: 'Dec 2023' },
                { title: 'FinOps Best Practices for Enterprise', category: 'FinOps', date: 'Nov 2023' },
              ].map((post, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: 'hsl(230 25% 15%)',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}>
                  <span style={{ fontSize: '0.7rem', color: '#a755ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {post.category}
                  </span>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, margin: '6px 0' }}>{post.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'hsl(230 10% 50%)' }}>{post.date}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div>
          {/* Featured Project */}
          <section style={{
            background: 'hsl(230 25% 12%)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid hsl(230 20% 18%)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FolderGit2 size={18} style={{ color: '#a755ff' }} />
                Featured Project
              </h2>
              <Link href="/projects" style={{ color: '#00e6e6', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, hsl(230 25% 15%), hsl(270 30% 15%))',
              borderRadius: '10px',
              border: '1px solid hsl(270 50% 25%)'
            }}>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>
                Internal Developer Platform
              </h4>
              <p style={{ color: 'hsl(230 10% 55%)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '12px' }}>
                Building a self-service platform for engineering teams with automated provisioning, observability, and deployment pipelines.
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Backstage', 'Crossplane', 'ArgoCD'].map(tag => (
                  <span key={tag} style={{
                    padding: '3px 8px', borderRadius: '4px', fontSize: '0.65rem',
                    background: '#a755ff30', color: '#a755ff'
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Latest Guide */}
          <section style={{
            background: 'hsl(230 25% 12%)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid hsl(230 20% 18%)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={18} style={{ color: '#ff9500' }} />
                Latest Guide
              </h2>
              <Link href="/guides" style={{ color: '#00e6e6', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, hsl(230 25% 15%), hsl(25 40% 15%))',
              borderRadius: '10px',
              border: '1px solid hsl(25 50% 25%)'
            }}>
              <span style={{ fontSize: '0.65rem', color: '#ff9500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                8 Chapters - 45 min read
              </span>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, margin: '8px 0' }}>
                Production Kubernetes Security
              </h4>
              <p style={{ color: 'hsl(230 10% 55%)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                A comprehensive guide to securing Kubernetes clusters in enterprise environments.
              </p>
            </div>
          </section>

          {/* Skills Preview */}
          <section style={{
            background: 'hsl(230 25% 12%)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid hsl(230 20% 18%)'
          }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
              Core Expertise
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Cloud Architecture', level: 95, color: '#ff2e97' },
                { name: 'Kubernetes', level: 90, color: '#00e6e6' },
                { name: 'Platform Engineering', level: 88, color: '#a755ff' },
                { name: 'Leadership', level: 92, color: '#ff9500' },
              ].map(skill => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'hsl(230 10% 70%)' }}>{skill.name}</span>
                    <span style={{ fontSize: '0.75rem', color: skill.color }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'hsl(230 25% 20%)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${skill.level}%`, height: '100%', background: skill.color, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
