import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import mongoose from 'mongoose';
import Link from 'next/link';

type ProductId = { id: number };

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  let product = null;

  // 1. Try to find the product in local MongoDB first (if the ID looks like a MongoDB ObjectId)
  try {
    await connectDB();
    if (mongoose.Types.ObjectId.isValid(id)) {
      const dbProduct = await Product.findById(id).lean();
      if (dbProduct) {
        product = {
          id: dbProduct._id.toString(),
          title: dbProduct.title,
          price: dbProduct.price,
          rating: dbProduct.rating,
          thumbnail: dbProduct.thumbnail,
          description: dbProduct.description,
        };
      }
    }
  } catch (err) {
    console.error("Failed to query product from DB:", err);
  }

  // 2. Fallback to DummyJSON if not found in MongoDB
  if (!product) {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, { 
        next: { revalidate: 60 } 
      });
      if (res.ok) {
        product = await res.json();
      }
    } catch (e) {
      console.error("Failed to fetch product from DummyJSON:", e);
    }
  }

  if (!product || !product.title) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{ color: 'white', marginBottom: '20px' }}>Product Not Found</h1>
        <Link href="/products" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '40px auto', 
      padding: '30px', 
      backgroundColor: '#18181b', 
      color: 'white', 
      borderRadius: '16px', 
      border: '1px solid #3f3f46',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/products" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          ← Back to Products
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
        />
      </div>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#f4f4f5' }}>{product.title}</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <h2 style={{ color: '#34d399', fontSize: '2.2rem', margin: 0, fontWeight: 'bold' }}>${product.price}</h2>
        <span style={{ backgroundColor: '#27272a', padding: '6px 12px', borderRadius: '8px', fontSize: '1.1rem', color: '#fbbf24' }}>
          ⭐ {product.rating}
        </span>
      </div>
      
      <p style={{ lineHeight: '1.8', color: '#a1a1aa', fontSize: '1.1rem', marginTop: '20px' }}>
        {product.description}
      </p>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const res = await fetch('https://dummyjson.com/products');
    if (res.ok) {
      const data = await res.json();
      return data.products.map((p: ProductId) => ({ id: p.id.toString() }));
    }
  } catch (e) {
    console.error("Error in generateStaticParams:", e);
  }
  return [];
}