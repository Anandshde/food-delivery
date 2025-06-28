import { Request, Response } from "express";
import { CategoryModel } from "../../models/Category";
import mongoose from "mongoose";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      res.status(400).json({ message: "Invalid category name" });
      return;
    }

    // ✅ Check if category already exists
    const existing = await CategoryModel.findOne({ name });
    if (existing) {
      res.status(409).json({ message: "Category already exists" });
      return;
    }

    const category = await CategoryModel.create({
      _id: new mongoose.Types.ObjectId(),
      name,
    });

    res.status(201).json({ _id: category._id, name: category.name });
  } catch (err) {
    console.error("❌ Failed to create category", err);
    res.status(500).json({ message: "Server error" });
  }
};
