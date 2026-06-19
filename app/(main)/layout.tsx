import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(9, 9, 11, 0.8)',
        borderBottom: '1px solid rgba(63, 63, 70, 0.4)',
        padding: '1rem 2rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', background: 'linear-gradient(to right, #a78bfa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>
              ✦ NextStore
            </Link>
            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link href="/" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>Home</Link>
              <Link href="/products" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>Products</Link>
              <Link href="/quotes" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>Quotes</Link>
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {session ? (
              <>
                <span style={{
                  fontSize: '0.8rem',
                  backgroundColor: 'rgba(139, 92, 246, 0.15)',
                  color: '#c084fc',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}>
                  🛡️ Admin Mode
                </span>
                <Link href="/api/auth/signout" style={{
                  color: '#f4f4f5',
                  backgroundColor: '#27272a',
                  border: '1px solid #3f3f46',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}>
                  Sign Out
                </Link>
              </>
            ) : (
              <Link href="/api/auth/signin" style={{
                color: 'white',
                background: 'linear-gradient(to right, #7c3aed, #8b5cf6)',
                padding: '8px 18px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
                transition: 'all 0.2s'
              }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '2.5rem 2rem' }}>
        {children}
      </main>
    </div>
  );
}