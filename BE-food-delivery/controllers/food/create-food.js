"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFood = void 0;
const Food_1 = require("../../models/Food");
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const createFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, image, ingredients, category } = req.body;
        let uploadedImage = image;
        if (image) {
            try {
                const uploadRes = yield cloudinary_1.default.uploader.upload(image, {
                    folder: "food",
                });
                uploadedImage = uploadRes.secure_url;
            }
            catch (uploadErr) {
                console.error("Failed to upload image to Cloudinary", uploadErr);
            }
        }
        const food = yield Food_1.Food.create({
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
});
exports.createFood = createFood;
