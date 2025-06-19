// server/models/Food.ts
import mongoose, { Schema } from "mongoose";

const FoodSchema = new Schema({
  _id: Schema.Types.ObjectId,
  foodName: String,
  price: Number,
  image: String,
  ingriedents: String,
  category: Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Food = mongoose.model("Food", FoodSchema);
