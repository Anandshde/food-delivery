// server/models/Food.ts
import mongoose, { Schema } from "mongoose";

const FoodSchema = new Schema({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Categories",
    required: true,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Food = mongoose.model("Food", FoodSchema);
