import ProductForm from '@/components/ProductForm';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';

export default async function ProductFormPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  // Protect route - only allow admins
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/products');
  }

  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams.id;

  let product = undefined;

  if (id) {
    await connectDB();
    if (mongoose.Types.ObjectId.isValid(id)) {
      const dbProduct = await Product.findById(id).lean();
      if (dbProduct) {
        product = {
          _id: dbProduct._id.toString(),
          title: dbProduct.title,
          price: dbProduct.price,
          rating: dbProduct.rating,
          thumbnail: dbProduct.thumbnail,
          description: dbProduct.description,
        };
      }
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <ProductForm product={product} />
    </div>
  );
}
