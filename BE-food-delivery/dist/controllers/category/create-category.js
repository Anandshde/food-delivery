"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const Category_1 = require("../../models/Category");
const mongoose_1 = __importDefault(require("mongoose"));
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || typeof name !== "string") {
            res.status(400).json({ message: "Invalid category name" });
            return;
        }
        // ✅ Check if category already exists
        const existing = await Category_1.CategoryModel.findOne({ name });
        if (existing) {
            res.status(409).json({ message: "Category already exists" });
            return;
        }
        const category = await Category_1.CategoryModel.create({
            _id: new mongoose_1.default.Types.ObjectId(),
            name,
        });
        res.status(201).json({ _id: category._id, name: category.name });
    }
    catch (err) {
        console.error("❌ Failed to create category", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createCategory = createCategory;
