import { Model, Schema, model, models } from "mongoose";

enum FoodOrderStatusEnum {
  PENDING = "PENDING",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

type FoodOrderItemModelType = {
  quantity: number;
  food: Schema.Types.ObjectId;
  _id: boolean;
};

type FoodOrderModelType = {
  user: Schema.Types.ObjectId;
  totalPrice: number;
  foodOrderItems: FoodOrderItemModelType[];
  status: FoodOrderStatusEnum;
};

const FoodOrderItemSchema = new Schema<FoodOrderItemModelType>(
  {
    quantity: { type: Number, required: true },
    food: { type: Schema.Types.ObjectId, ref: "Foods", required: true },
  },
  { _id: false }
);
const FoodOrderSchema = new Schema<FoodOrderModelType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [FoodOrderItemSchema], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodOrderModel: Model<FoodOrderModelType> =
  models["FoodOrders"] ||
  model<FoodOrderModelType>("FoodOrders", FoodOrderSchema);
