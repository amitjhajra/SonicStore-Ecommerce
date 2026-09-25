import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config(); // loads variables from .env file
connectDB(); // connect to MongoDB

const app = express();

app.use(cors()); // allows the frontend (different port) to call this backend
app.use(express.json()); // allows us to read JSON from the request body

// Simple test route
app.get("/", (req, res) => {
  res.send("SonicStore API is running...");
});

// Main routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Basic error handler (catches anything that was missed)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
