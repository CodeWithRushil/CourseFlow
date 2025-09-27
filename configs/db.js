// configs/db.js
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("⚠️ Please add MONGO_URL in .env file");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ Connected to Database!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
