export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      background: '#0a0a12', 
      color: '#fff',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '1rem',
        background: 'linear-gradient(90deg, #ff2e97, #00e6e6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Geoffrey Miller
      </h1>
      <p style={{ color: '#ff2e97', marginBottom: '2rem' }}>
        Infrastructure Director and Principal Cloud Architect
      </p>
      <p style={{ color: '#888', maxWidth: '600px', lineHeight: 1.6 }}>
        Building and leading high-performance engineering teams that transform how organizations deliver software.
        20+ years in IT, 12+ years specializing in cloud architecture and platform engineering.
      </p>
    </main>
  )
}
