import ProductList from '@/components/ProductList';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = !!session;

  await connectDB();

  // Auto-seed database if empty to provide a rich demonstration out of the box
  let count = 0;
  try {
    count = await Product.countDocuments();
  } catch (e) {
    console.error("Failed to count products:", e);
  }

  if (count === 0) {
    try {
      console.log("Seeding local MongoDB with initial products...");
      const res = await fetch('https://dummyjson.com/products?limit=12');
      if (res.ok) {
        const data = await res.json();
        const seedProducts = data.products.map((p: {
          title: string;
          price: number;
          description: string;
          rating: number;
          thumbnail: string;
        }) => ({
          title: p.title,
          price: p.price,
          description: p.description,
          rating: p.rating,
          thumbnail: p.thumbnail,
        }));
        await Product.insertMany(seedProducts);
        console.log("Database seeded successfully!");
      }
    } catch (err) {
      console.error("Seeding error:", err);
    }
  }

  const productsData = await Product.find({}).lean();
  
  let products = productsData.map(p => ({
    id: p._id.toString(),
    title: p.title || '',
    price: p.price || 0,
    rating: p.rating || 0,
    thumbnail: p.thumbnail || '',
  }));

  if (!isAdmin) {
    products = products.slice(0, 3);
  }

  return (
    <div style={{ animation: 'slideIn 0.4s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '35px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '10px',
            background: 'linear-gradient(to right, #ffffff, #a1a1aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Products Catalog
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: '1rem', margin: 0 }}>
            {isAdmin ? "Manage and curate the full store collection from your admin dashboard." : "Browse the latest collection of premium items available."}
          </p>
        </div>
        {isAdmin && (
          <Link href="/products/form" style={{
            background: 'linear-gradient(to right, #7c3aed, #8b5cf6)',
            padding: '12px 24px',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
            transition: 'all 0.2s',
          }}>
            + Add Product
          </Link>
        )}
      </div>

      <ProductList initialProducts={products} isAdmin={isAdmin} />
    </div>
  );
}