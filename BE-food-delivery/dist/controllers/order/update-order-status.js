"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusBatch = void 0;
const Order_1 = require("../../models/Order");
const FoodOrderStatusEnum_1 = require("../../enums/FoodOrderStatusEnum");
const updateOrderStatusBatch = async (req, res) => {
    const { orderIds, status } = req.body;
    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
        res.status(400).json({ message: "Order IDs are required" });
        return;
    }
    if (!Object.values(FoodOrderStatusEnum_1.FoodOrderStatusEnum).includes(status)) {
        res.status(400).json({ message: "Invalid status" });
        return;
    }
    try {
        const result = await Order_1.FoodOrderModel.updateMany({ _id: { $in: orderIds } }, { $set: { status } });
        res.status(200).json({
            message: `${result.modifiedCount} orders updated`,
        });
    }
    catch (err) {
        console.error("❌ Failed to update order statuses", err);
        res.status(500).json({ message: "Failed to update order statuses" });
    }
};
exports.updateOrderStatusBatch = updateOrderStatusBatch;
