import { Request, Response } from "express";
import { Food } from "../../models/Food";
import { CategoryModel } from "../../models/Catergory";
import mongoose from "mongoose";
import cloudinary from "../../utils/cloudinary";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingriedents, category } = req.body;

    // 🧠 1. Convert category name ("Appetizers") to ObjectId
    const categoryDoc = await CategoryModel.findOne({ name: category });
    if (!categoryDoc) {
      res.status(400).json({ message: "Category not found" });
      return;
    }

    // 🌩️ 2. Upload image to Cloudinary if needed
    let uploadedImage = image;
    if (image && !image.startsWith("http")) {
      try {
        const uploadRes = await cloudinary.uploader.upload(image, {
          folder: "food",
        });
        uploadedImage = uploadRes.secure_url;
      } catch (uploadErr) {
        console.error("❌ Failed to upload image to Cloudinary", uploadErr);
      }
    }

    // 🍽️ 3. Create food document
    const food = await Food.create({
      _id: new mongoose.Types.ObjectId(),
      foodName,
      price,
      image: uploadedImage,
      ingriedents,
      category: categoryDoc._id, // ✅ assign ObjectId
    });

    res.status(201).json({ food });
  } catch (err) {
    console.error("❌ Failed to create food", err);
    res.status(500).json({ message: "Failed to create food" });
  }
};
