import { Request, Response } from "express";
import { Food } from "../../models/Food";

export const getAllFood = async (_req: Request, res: Response) => {
  try {
    const foods = await Food.find();
    res.status(200).send({ foods });
  } catch (err) {
    console.error("Failed to fetch foods", err);
    res.status(500).send({ message: "Failed to fetch foods" });
  }
};
