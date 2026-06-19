import QuoteInterval from '@/components/QuoteInterval';

export default async function QuotesPage() {
  let quotes = [];
  try {
    const res = await fetch('https://dummyjson.com/quotes', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      quotes = data.quotes || [];
    }
  } catch (e) {
    console.error("Failed to fetch quotes:", e);
  }

  return (
    <div style={{ animation: 'slideIn 0.4s ease-out' }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 800,
        marginBottom: '10px',
        background: 'linear-gradient(to right, #ffffff, #a1a1aa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Quotes Feed
      </h1>
      <p style={{ color: '#a1a1aa', fontSize: '1rem', marginBottom: '35px' }}>
        Dynamic server-side rendered quotes with client-side interactive toast notifications.
      </p>
      
      <QuoteInterval quotes={quotes} />
    </div>
  );
}