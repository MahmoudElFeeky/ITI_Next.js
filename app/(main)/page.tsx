import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      animation: 'slideIn 0.6s ease-out',
      textAlign: 'center',
      padding: '4rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    }}>
      <div style={{
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
        border: '1px solid rgba(139, 92, 246, 0.15)',
        color: '#c084fc',
        padding: '6px 16px',
        borderRadius: '9999px',
        fontSize: '0.9rem',
        fontWeight: 600,
        letterSpacing: '1px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.05)',
        marginBottom: '1rem'
      }}>
        ✨ NEXT-GENERATION WEB STORE
      </div>

      <h1 style={{
        fontSize: '4.5rem',
        fontWeight: 800,
        lineHeight: '1.1',
        letterSpacing: '-2px',
        background: 'linear-gradient(135deg, #ffffff 30%, #a1a1aa 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        Experience the Future of E-Commerce
      </h1>

      <p style={{
        fontSize: '1.25rem',
        color: '#a1a1aa',
        maxWidth: '600px',
        lineHeight: '1.6',
        fontWeight: 400
      }}>
        A premium showcase application powered by Next.js, Mongoose, and NextAuth. Fully customizable, secure, and blazingly fast.
      </p>

      <div style={{
        display: 'flex',
        gap: '1.25rem',
        marginTop: '2rem'
      }}>
        <Link href="/products" style={{
          color: 'white',
          background: 'linear-gradient(to right, #7c3aed, #8b5cf6)',
          padding: '16px 36px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontSize: '1.05rem',
          fontWeight: 'bold',
          boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)',
          transition: 'all 0.2s',
        }}>
          Explore Products
        </Link>
        <Link href="/quotes" style={{
          color: '#e4e4e7',
          backgroundColor: '#18181b',
          border: '1px solid #3f3f46',
          padding: '16px 36px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontSize: '1.05rem',
          fontWeight: 'bold',
          transition: 'all 0.2s',
        }}>
          Read Quotes
        </Link>
      </div>

      {/* Feature Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '960px',
        marginTop: '6rem',
        textAlign: 'left'
      }}>
        <div style={{
          background: 'rgba(24, 24, 27, 0.4)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '16px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '2rem' }}>⚡</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f4f4f5' }}>SSR & SSG Driven</h3>
          <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>Combining static and dynamic rendering for lightning-fast page loading and optimized bundle sizes.</p>
        </div>

        <div style={{
          background: 'rgba(24, 24, 27, 0.4)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '16px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '2rem' }}>💾</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f4f4f5' }}>MongoDB Database</h3>
          <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>Robust schema validation, seamless CRUD transactions, and local clustering integration.</p>
        </div>

        <div style={{
          background: 'rgba(24, 24, 27, 0.4)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '16px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '2rem' }}>🔒</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f4f4f5' }}>NextAuth Security</h3>
          <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>Granular role check routing ensuring credentials security and administrative path isolation.</p>
        </div>
      </div>
    </div>
  );
}