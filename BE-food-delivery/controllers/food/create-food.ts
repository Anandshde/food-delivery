import { Request, Response } from "express";
import { Food } from "../../models/Food";
import mongoose from "mongoose";

export const createFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingriedents, category } = req.body;
    const food = await Food.create({
      _id: new mongoose.Types.ObjectId(),
      foodName,
      price,
      image,
      ingriedents,
      category,
    });
    res.status(200).send({ food });
  } catch (err) {
    console.error("Failed to create food", err);
    res.status(500).send({ message: "Failed to create food" });
  }
};
