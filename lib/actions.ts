'use server';

import { connectDB } from './db';
import { Product } from '@/models/Product';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveProduct(formData: FormData) {
  await connectDB();
  
  const id = formData.get('id') as string;
  const productData = {
    title: formData.get('title'),
    price: Number(formData.get('price')),
    description: formData.get('description'),
    rating: Number(formData.get('rating')),
    thumbnail: formData.get('thumbnail') || 'https://dummyjson.com/image/150',
  };

  if (id) {
    await Product.findByIdAndUpdate(id, productData); // UPDATE
  } else {
    await Product.create(productData); // CREATE
  }

  revalidatePath('/products');
  redirect('/products');
}

export async function deleteProduct(formData: FormData) {
  await connectDB();
  const id = formData.get('id') as string;
  await Product.findByIdAndDelete(id); // DELETE
  revalidatePath('/products');
}