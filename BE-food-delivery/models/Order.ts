import { Model, Schema, model, models } from "mongoose";

enum FoodOrderStatusEnum {
  PENDING = "PENDING",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

type FoodOrderItemModelType = {
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type FoodOrderModelType = {
  user: Schema.Types.ObjectId;
  address: string;
  totalPrice: number;
  foodOrderItems: FoodOrderItemModelType[];
  status: FoodOrderStatusEnum;
};

const FoodOrderItemSchema = new Schema<FoodOrderItemModelType>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);
const FoodOrderSchema = new Schema<FoodOrderModelType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    address: { type: String, required: true },
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
