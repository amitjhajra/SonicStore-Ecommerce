// This script fills the database with some sample audio products
// so the store isn't empty. Run it once with: npm run seed

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();
connectDB();

const sampleProducts = [
  {
    name: "SonicWave Pro Headphones",
    description: "Over-ear wireless headphones with active noise cancellation and 30-hour battery life.",
    price: 4999,
    category: "Headphones",
    brand: "Sonic",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
    countInStock: 15,
    rating: 4.6,
  },
  {
    name: "BassBoom Bluetooth Speaker",
    description: "Portable waterproof speaker with deep bass and 12-hour playtime.",
    price: 2499,
    category: "Speakers",
    brand: "Sonic",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    countInStock: 20,
    rating: 4.3,
  },
  {
    name: "AirPods-style True Wireless Earbuds",
    description: "Compact true wireless earbuds with touch controls and charging case.",
    price: 1999,
    category: "Earbuds",
    brand: "Sonic",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500",
    countInStock: 30,
    rating: 4.4,
  },
  {
    name: "StudioMix DJ Headphones",
    description: "Professional monitoring headphones with foldable design and coiled cable.",
    price: 5999,
    category: "Headphones",
    brand: "SonicPro",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
    countInStock: 10,
    rating: 4.7,
  },
  {
    name: "MiniPod Bluetooth Speaker",
    description: "Pocket-sized speaker perfect for travel, with surprisingly loud sound.",
    price: 1299,
    category: "Speakers",
    brand: "Sonic",
    image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=500",
    countInStock: 25,
    rating: 4.1,
  },
  {
    name: "SportFit Wireless Earbuds",
    description: "Sweat-resistant earbuds with secure ear hooks, made for workouts.",
    price: 1799,
    category: "Earbuds",
    brand: "SonicPro",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    countInStock: 18,
    rating: 4.2,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany(); // clear existing products first
    await Product.insertMany(sampleProducts);
    console.log("Sample products imported successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
