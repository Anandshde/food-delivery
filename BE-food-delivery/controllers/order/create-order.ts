import { Request, Response } from "express";
import { FoodOrderModel } from "../../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  const { totalPrice, foodOrderItems, address } = req.body;
  const user = res.locals.userId;
  console.log(user);
  try {
    await FoodOrderModel.create({ user, totalPrice, foodOrderItems, address });
    res.status(200).send({ message: "succesfully created order" });
    return;
  } catch (err) {
    console.log(err);

    res.status(400).send({ message: "Order uusgehed aldaa garlaa" });
    return;
  }
};
