import ProductList from '@/components/ProductList';

export default async function ProductsPage() {
  const res = await fetch('https://dummyjson.com/products', { 
    next: { revalidate: 60 } 
  });
  const data = await res.json();
  
  const products = data.products; 

  return (
    <div>
      <h1>Products</h1>
      <ProductList initialProducts={products} />
    </div>
  );
}