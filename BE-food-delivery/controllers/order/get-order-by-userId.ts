import { Request, Response } from "express";
import { FoodOrderModel } from "../../models/Order";

export const getOrdersByUsersId = async (_req: Request, res: Response) => {
  const { userId } = res.locals;

  console.log("🔍 Getting orders for user:", userId);

  try {
    const allOrdersUserById = await FoodOrderModel.find({ user: userId })
      .populate({ path: "user", model: "User", select: "email" })
      .sort({ createdAt: -1 });

    console.log("✅ Orders found:", allOrdersUserById.length);

    res.status(200).send({ order: allOrdersUserById });
  } catch (err) {
    console.error("❌ Failed to get orders:", err);
    res.status(400).send({ message: "Cannot Get Orders" });
  }
};
