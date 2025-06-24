import { Request, Response } from "express";
import { FoodOrderModel } from "../../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  const { user, totalPrice, foodOrderItems } = req.body;
  try {
    await FoodOrderModel.create({ user, totalPrice, foodOrderItems });
    res.status(200).send({ message: "succesfully created order" });
    return;
  } catch (err) {
    res.status(400).send({ message: "Order uusgehed aldaa garlaa" });
    return;
  }
};
