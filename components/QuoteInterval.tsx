'use client';

import { useState, useEffect } from 'react';

type Quote = {
  id: number;
  quote: string;
  author: string;
};

export default function QuoteInterval({ quotes }: { quotes: Quote[] }) {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      setToast(random.quote);
      
      setTimeout(() => setToast(null), 3000); 
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <div>
      <p><em>Wait 5 seconds to see a random quote toast pop up...</em></p>
      <ul>
        {quotes.slice(0, 5).map(q => (
          <li key={q.id}>{q.quote}</li>
        ))}
      </ul>

      {toast && (
        <div style={{
          position: 'fixed', bottom: '20px', right: '20px',
          background: '#0070f3', color: 'white', padding: '15px 20px', 
          borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}