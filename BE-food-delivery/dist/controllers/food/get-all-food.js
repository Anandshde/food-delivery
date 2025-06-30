"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFood = void 0;
const Food_1 = require("../../models/Food");
const getAllFood = async (_req, res) => {
    try {
        const foods = await Food_1.Food.find();
        res.status(200).send({ foods });
    }
    catch (err) {
        console.error("Failed to fetch foods", err);
        res.status(500).send({ message: "Failed to fetch foods" });
    }
};
exports.getAllFood = getAllFood;
