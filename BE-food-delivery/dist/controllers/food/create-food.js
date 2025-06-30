"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFood = void 0;
const Food_1 = require("../../models/Food");
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const createFood = async (req, res) => {
    try {
        const { name, price, image, ingredients, category } = req.body;
        let uploadedImage = image;
        if (image) {
            try {
                const uploadRes = await cloudinary_1.default.uploader.upload(image, {
                    folder: "food",
                });
                uploadedImage = uploadRes.secure_url;
            }
            catch (uploadErr) {
                console.error("Failed to upload image to Cloudinary", uploadErr);
            }
        }
        const food = await Food_1.Food.create({
            foodName: name,
            price,
            image: uploadedImage,
            ingredients,
            category,
        });
        res.status(200).send({ food });
    }
    catch (err) {
        console.error("Failed to create food", err);
        res.status(500).send({ message: "Failed to create food" });
    }
};
exports.createFood = createFood;
