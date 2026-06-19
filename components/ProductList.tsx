'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { deleteProduct } from '@/lib/actions';

type Product = {
  id: string | number;
  title: string;
  price: number;
  rating: number; 
  thumbnail: string; 
};

export default function ProductList({ initialProducts, isAdmin }: { initialProducts: Product[], isAdmin: boolean }) {
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
    padding: '14px 18px',
    borderRadius: '12px',
    border: '1px solid rgba(63, 63, 70, 0.6)',
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    color: '#f4f4f5',
    flex: '1',
    minWidth: '250px',
    outline: 'none',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
  };

  return (
    <div style={{ animation: 'slideIn 0.4s ease-out' }}>
      <div style={{ 
        marginBottom: '40px', 
        display: 'flex', 
        gap: '15px', 
        flexWrap: 'wrap', 
        alignItems: 'center',
        background: 'rgba(24, 24, 27, 0.3)',
        padding: '20px',
        borderRadius: '16px',
        border: '1px solid rgba(63, 63, 70, 0.3)',
        backdropFilter: 'blur(8px)'
      }}>
        <input 
          type="text" 
          placeholder="Search products by title..." 
          value={search} 
          onChange={handleSearch} 
          style={inputStyle} 
        />
        <select value={sort} onChange={handleSort} style={{...inputStyle, flex: '0 1 220px', cursor: 'pointer'}}>
          <option value="none">Sort By...</option>
          <option value="price">Price (Low to High)</option>
          <option value="rate">Rating (High to Low)</option>
        </select>
        {isPending && (
          <span style={{ 
            color: '#a78bfa', 
            fontWeight: 600, 
            fontSize: '0.9rem',
            animation: 'fadeIn 0.2s ease',
            marginLeft: '10px'
          }}>
            Filtering...
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
        {filtered.map(p => (
          <div key={p.id} className="glass-card" style={{ 
            borderRadius: '18px', 
            overflow: 'hidden', 
            display: 'flex',
            flexDirection: 'column',
          }}>
            
            {/* Image Section */}
            <div style={{ 
              width: '100%', 
              height: '240px', 
              backgroundColor: '#ffffff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative',
              borderBottom: '1px solid rgba(63, 63, 70, 0.2)'
            }}>
              <img 
                src={p.thumbnail} 
                alt={p.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '15px' }} 
              />
            </div>

            {/* Content Section */}
            <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ 
                fontSize: '1.05rem', 
                fontWeight: 600,
                marginBottom: '15px', 
                lineHeight: '1.4', 
                color: '#f4f4f5', 
                flex: 1 
              }}>
                {p.title}
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <span style={{ 
                  color: '#34d399', 
                  fontSize: '1.6rem', 
                  fontWeight: 800,
                  letterSpacing: '-0.5px' 
                }}>
                  ${p.price}
                </span>
                <span style={{ 
                  color: '#fbbf24', 
                  fontSize: '0.85rem', 
                  backgroundColor: 'rgba(251, 191, 36, 0.1)', 
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  padding: '4px 8px', 
                  borderRadius: '6px',
                  fontWeight: 600
                }}>
                  ⭐ {p.rating}
                </span>
              </div>

              {isAdmin && (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <Link 
                    href={`/products/form?id=${p.id}`} 
                    style={{ 
                      flex: 1, 
                      backgroundColor: 'rgba(63, 63, 70, 0.5)', 
                      textAlign: 'center', 
                      padding: '10px', 
                      borderRadius: '8px', 
                      color: 'white', 
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      border: '1px solid rgba(63, 63, 70, 0.8)',
                      transition: 'background 0.2s'
                    }}
                  >
                    Edit
                  </Link>
                  <form action={deleteProduct} style={{ flex: 1 }}>
                    <input type="hidden" name="id" value={p.id} />
                    <button 
                      type="submit" 
                      style={{ 
                        width: '100%', 
                        backgroundColor: 'rgba(239, 68, 68, 0.15)', 
                        color: '#fca5a5', 
                        border: '1px solid rgba(239, 68, 68, 0.3)', 
                        padding: '10px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        transition: 'all 0.2s'
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              )}

              <Link href={`/products/${p.id}`} style={{ 
                background: 'linear-gradient(to right, #7c3aed, #8b5cf6)',
                color: 'white', 
                textAlign: 'center', 
                padding: '12px', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                display: 'block',
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)',
                transition: 'all 0.2s'
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