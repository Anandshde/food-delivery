import { Request, Response } from "express";
import { FoodOrderModel } from "../../models/Order";
import { FoodOrderStatusEnum } from "../../enums/FoodOrderStatusEnum";

export const updateOrderStatusBatch = async (req: Request, res: Response) => {
  const { orderIds, status } = req.body;

  if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
    res.status(400).json({ message: "Order IDs are required" });
    return;
  }

  if (!Object.values(FoodOrderStatusEnum).includes(status)) {
    res.status(400).json({ message: "Invalid status" });
    return;
  }

  try {
    const result = await FoodOrderModel.updateMany(
      { _id: { $in: orderIds } },
      { $set: { status } }
    );

    res.status(200).json({
      message: `${result.modifiedCount} orders updated`,
    });
  } catch (err) {
    console.error("❌ Failed to update order statuses", err);
    res.status(500).json({ message: "Failed to update order statuses" });
  }
};
