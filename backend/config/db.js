import mongoose from "mongoose";

// Simple function to connect to MongoDB.
// We call this once when the server starts (see server.js).
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // stop the app if DB connection fails
  }
};

export default connectDB;
