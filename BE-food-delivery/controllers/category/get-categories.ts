import { Request, Response } from "express";
import { CategoryModel } from "../../models/Category";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find({});
    res.send({ categories: categories });
  } catch (err) {
    res.status(400).send({ message: "Error" });
  }
};
