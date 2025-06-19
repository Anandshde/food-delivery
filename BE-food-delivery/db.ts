// server/db.ts
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(uri);
    console.log("✅ Connected to database");
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
  }
};
