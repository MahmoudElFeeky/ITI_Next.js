'use client';

import { useState, useEffect } from 'react';

type Quote = {
  id: number;
  quote: string;
  author: string;
};

export default function QuoteInterval({ quotes = [] }: { quotes?: Quote[] }) {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!quotes || quotes.length === 0) return;

    let toastTimeout: NodeJS.Timeout;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const random = quotes[randomIndex];
      if (random && random.quote) {
        setToast(random.quote);
        
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => setToast(null), 3000); 
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(toastTimeout);
    };
  }, [quotes]);

  if (!quotes || quotes.length === 0) {
    return <p style={{ color: '#a1a1aa' }}>No quotes available.</p>;
  }

  return (
    <div>
      <p style={{ color: '#a1a1aa', marginBottom: '20px' }}><em>Wait 5 seconds to see a random quote toast pop up...</em></p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: 0, listStyle: 'none' }}>
        {quotes.slice(0, 5).map(q => (
          <li key={q.id} style={{
            backgroundColor: '#18181b',
            border: '1px solid #27272a',
            padding: '15px 20px',
            borderRadius: '10px',
            color: '#e4e4e7',
            lineHeight: '1.6'
          }}>
            &ldquo;{q.quote}&rdquo; <strong style={{ color: '#8b5cf6', marginLeft: '10px' }}>— {q.author}</strong>
          </li>
        ))}
      </ul>

      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
          color: 'white',
          padding: '18px 24px', 
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(124,58,237,0.4)',
          maxWidth: '350px',
          zIndex: 100,
          border: '1px solid rgba(255,255,255,0.1)',
          animation: 'slideIn 0.3s ease-out',
          lineHeight: '1.5',
          fontSize: '0.95rem'
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}