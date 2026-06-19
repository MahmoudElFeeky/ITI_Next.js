import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  rating: Number,
  thumbnail: String
});

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);