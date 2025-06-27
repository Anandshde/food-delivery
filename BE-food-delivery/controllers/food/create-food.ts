import { Request, Response } from "express";
import { Food } from "../../models/Food";
import mongoose from "mongoose";
import cloudinary from "../../utils/cloudinary";

export const createFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingriedents, category } = req.body;

    let uploadedImage = image;
    if (image) {
      try {
        const uploadRes = await cloudinary.uploader.upload(image, {
          folder: "food",
        });
        uploadedImage = uploadRes.secure_url;
      } catch (uploadErr) {
        console.error("Failed to upload image to Cloudinary", uploadErr);
      }
    }

    const food = await Food.create({
      _id: new mongoose.Types.ObjectId(),
      foodName,
      price,
      image: uploadedImage,
      ingriedents,
      category,
    });
    res.status(200).send({ food });
  } catch (err) {
    console.error("Failed to create food", err);
    res.status(500).send({ message: "Failed to create food" });
  }
};
