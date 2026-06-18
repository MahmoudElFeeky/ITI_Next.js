type ProductId = { id: number };

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const res = await fetch(`https://dummyjson.com/products/${resolvedParams.id}`, { 
    next: { revalidate: 60 } 
  });
  const product = await res.json();

  if (!product || !product.title) {
    return <h1 style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Product not found</h1>;
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
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '30px', textAlign: 'center' }}>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          style={{ maxHeight: '350px', objectFit: 'contain', width: '100%' }} 
        />
      </div>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#f4f4f5' }}>{product.title}</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <h2 style={{ color: '#34d399', fontSize: '2.2rem', margin: 0, fontWeight: 'bold' }}>${product.price}</h2>
        <span style={{ backgroundColor: '#27272a', padding: '6px 12px', borderRadius: '8px', fontSize: '1.1rem' }}>
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
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products.map((p: ProductId) => ({ id: p.id.toString() }));
}