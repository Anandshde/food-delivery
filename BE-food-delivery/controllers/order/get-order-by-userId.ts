import { Request, Response } from "express";
import { FoodOrderModel } from "../../models/Order";

export const getOrdersByUsersId = async (_req: Request, res: Response) => {
  const { userId } = res.locals;
  try {
    const allOrdersUserById = await FoodOrderModel.find({
      user: userId,
    });
    res.status(200).send({ order: allOrdersUserById });
  } catch (err) {
    res.status(400).send({ message: "Cannot Get Orders" });
    return;
  }
};
