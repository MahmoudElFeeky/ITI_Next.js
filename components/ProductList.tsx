'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number; 
  thumbnail: string; 
};

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('none');
  const [isPending, startTransition] = useTransition();
  const [filtered, setFiltered] = useState<Product[]>(initialProducts);

  const applyFilters = (searchTerm: string, sortType: string) => {
    const updated = initialProducts.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (sortType === 'price') updated.sort((a, b) => a.price - b.price);
    if (sortType === 'rate') updated.sort((a, b) => b.rating - a.rating); 
    
    setFiltered(updated);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    startTransition(() => applyFilters(val, sort));
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSort(val);
    startTransition(() => applyFilters(search, val));
  };

  const inputStyle = {
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #3f3f46',
    backgroundColor: '#27272a',
    color: 'white',
    flex: '1',
    minWidth: '250px',
    outline: 'none',
    fontSize: '1rem'
  };

  return (
    <div style={{ color: 'white' }}>
      <div style={{ marginBottom: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={search} 
          onChange={handleSearch} 
          style={inputStyle} 
        />
        <select value={sort} onChange={handleSort} style={{...inputStyle, flex: '0 1 200px', cursor: 'pointer'}}>
          <option value="none">Sort By...</option>
          <option value="price">Price (Low to High)</option>
          <option value="rate">Rating (High to Low)</option>
        </select>
        {isPending && <span style={{ color: '#a855f7', fontWeight: 'bold' }}>Updating...</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
        {filtered.map(p => (
          <div key={p.id} style={{ 
            backgroundColor: '#18181b', 
            border: '1px solid #3f3f46', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
          }}>
            
            <div style={{ width: '100%', height: '220px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={p.thumbnail} 
                alt={p.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} 
              />
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', lineHeight: '1.4', color: '#f4f4f5', flex: 1 }}>
                {p.title}
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ color: '#34d399', fontSize: '1.6rem', fontWeight: 'bold' }}>${p.price}</span>
                <span style={{ color: '#fbbf24', fontSize: '1rem', backgroundColor: '#27272a', padding: '4px 8px', borderRadius: '6px' }}>
                  ⭐ {p.rating}
                </span>
              </div>
              
              <Link href={`/products/${p.id}`} style={{ 
                backgroundColor: '#8b5cf6', 
                color: 'white', 
                textAlign: 'center', 
                padding: '14px', 
                borderRadius: '10px', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                display: 'block',
                letterSpacing: '0.5px'
              }}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}