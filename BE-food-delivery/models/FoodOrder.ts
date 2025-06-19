// server/models/FoodOrder.ts
import mongoose, { Schema } from "mongoose";
import { FoodOrderStatusEnum } from "../enums/FoodOrderStatusEnum";

const FoodOrderItemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const FoodOrderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  foodOrderItems: { type: [FoodOrderItemSchema], required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(FoodOrderStatusEnum),
    default: FoodOrderStatusEnum.PENDING,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

export const FoodOrder = mongoose.model("FoodOrder", FoodOrderSchema);
