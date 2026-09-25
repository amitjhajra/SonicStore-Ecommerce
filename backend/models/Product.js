import mongoose from "mongoose";

// This defines what a "Product" looks like in the database
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true, // e.g. "Headphones", "Speakers", "Earbuds"
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String, // we just store an image URL, keeps things simple
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
