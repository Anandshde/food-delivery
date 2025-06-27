import { CategoryModel } from "./../../models/Catergory";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name?.trim()) {
    res.status(400).send({ message: "Category name is required" });
    return;
  }

  try {
    const existing = await CategoryModel.findOne({ name: name.trim() });
    if (existing) {
      res.status(409).send({ message: "Category already exists" });
      return;
    }

    const newCategory = await CategoryModel.create({ name: name.trim() });
    res.status(201).send({ name: newCategory.name });
  } catch (err) {
    res.status(500).send({ message: "Failed to create category" });
  }
};
