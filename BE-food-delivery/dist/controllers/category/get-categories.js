"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const Category_1 = require("../../models/Category");
const getCategories = async (req, res) => {
    try {
        const categories = await Category_1.CategoryModel.find({});
        res.send({ categories: categories });
    }
    catch (err) {
        res.status(400).send({ message: "Error" });
    }
};
exports.getCategories = getCategories;
