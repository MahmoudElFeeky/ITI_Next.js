import Link from 'next/link';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav style={{ padding: '1rem', background: '#333', color: '#fff', display: 'flex', gap: '2rem' }}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/quotes">Quotes</Link>
      </nav>
      <main style={{ padding: '2rem' }}>{children}</main>
    </>
  );
}