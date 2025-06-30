"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByUsersId = void 0;
const Order_1 = require("../../models/Order");
const getOrdersByUsersId = async (_req, res) => {
    const { userId } = res.locals;
    console.log("🔍 Getting orders for user:", userId);
    try {
        const allOrdersUserById = await Order_1.FoodOrderModel.find({ user: userId })
            .populate({ path: "user", model: "User", select: "email" })
            .sort({ createdAt: -1 });
        console.log("✅ Orders found:", allOrdersUserById.length);
        res.status(200).send({ order: allOrdersUserById });
    }
    catch (err) {
        console.error("❌ Failed to get orders:", err);
        res.status(400).send({ message: "Cannot Get Orders" });
    }
};
exports.getOrdersByUsersId = getOrdersByUsersId;
