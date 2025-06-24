import { Request, Response } from "express";
import { FoodOrderModel } from "../../models/Order";
import { FoodOrderStatusEnum } from "../../enums/FoodOrderStatusEnum";

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    res.status(400).send({ message: "Order id and status are required" });
    return;
  }

  if (!Object.values(FoodOrderStatusEnum).includes(status)) {
    res.status(400).send({ message: "Invalid status" });
    return;
  }

  try {
    const order = await FoodOrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      res.status(404).send({ message: "Order not found" });
      return;
    }

    res.status(200).send({ order });
  } catch (err) {
    res.status(500).send({ message: "Failed to update status" });
  }
};
