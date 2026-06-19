import { saveProduct } from '@/lib/actions';
import Link from 'next/link';

type FormProduct = {
  _id?: string;
  title?: string;
  price?: number;
  rating?: number;
  thumbnail?: string;
  description?: string;
};

export default function ProductForm({ product }: { product?: FormProduct }) {
  const inputStyle = {
    padding: '12px 16px',
    width: '100%',
    marginBottom: '20px',
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    color: '#f4f4f5',
    border: '1px solid rgba(63, 63, 70, 0.8)',
    borderRadius: '10px',
    outline: 'none',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#a1a1aa',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.5px'
  };

  return (
    <div style={{ animation: 'slideIn 0.4s ease-out' }}>
      <form action={saveProduct} style={{
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: 'rgba(24, 24, 27, 0.65)',
        backdropFilter: 'blur(16px)',
        padding: '40px',
        borderRadius: '20px',
        border: '1px solid rgba(63, 63, 70, 0.4)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          color: 'white',
          marginBottom: '25px',
          background: 'linear-gradient(to right, #ffffff, #d4d4d8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {product ? '✏️ Edit Product' : '✨ Add New Product'}
        </h2>
        
        <input type="hidden" name="id" value={product?._id?.toString() || ''} />

        <div>
          <label style={labelStyle}>PRODUCT TITLE</label>
          <input style={inputStyle} name="title" defaultValue={product?.title || ''} placeholder="e.g. Wireless Headphones" required />
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>PRICE ($)</label>
            <input style={inputStyle} name="price" type="number" step="0.01" defaultValue={product?.price || ''} placeholder="99.99" required />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>RATING (0-5)</label>
            <input style={inputStyle} name="rating" type="number" step="0.1" min="0" max="5" defaultValue={product?.rating || ''} placeholder="4.5" required />
          </div>
        </div>

        <div>
          <label style={labelStyle}>IMAGE URL</label>
          <input style={inputStyle} name="thumbnail" defaultValue={product?.thumbnail || ''} placeholder="https://example.com/image.jpg" />
        </div>
        
        <div>
          <label style={labelStyle}>DESCRIPTION</label>
          <textarea style={{...inputStyle, height: '110px', resize: 'vertical'}} name="description" defaultValue={product?.description || ''} placeholder="Provide a detailed description of the product..." required />
        </div>

        <button type="submit" style={{
          background: 'linear-gradient(to right, #7c3aed, #8b5cf6)',
          color: 'white',
          padding: '14px 20px',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          width: '100%',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
          transition: 'all 0.2s',
          marginTop: '10px'
        }}>
          {product ? 'Update Product' : 'Create Product'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/products" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
            Cancel and Return
          </Link>
        </div>
      </form>
    </div>
  );
}