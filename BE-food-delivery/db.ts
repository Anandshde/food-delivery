// server/db.ts
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(
      "mongodb+srv://anandoctane4:uVPeDYELoaGaO46X@food-delivery.wdjmkc7.mongodb.net/food-delivery"
    );
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
  }
};
