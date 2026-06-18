import QuoteInterval from '@/components/QuoteInterval';

export default async function QuotesPage() {
  const res = await fetch('https://dummyjson.com/quotes', { cache: 'no-store' });
  const data = await res.json();

  return (
    <div>
      <h1>Quotes (SSR)</h1>
      <QuoteInterval quotes={data.quotes} />
    </div>
  );
}