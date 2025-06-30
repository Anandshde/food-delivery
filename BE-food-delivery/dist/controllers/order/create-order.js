"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const Order_1 = require("../../models/Order");
const createOrder = async (req, res) => {
    const { totalPrice, foodOrderItems, address } = req.body;
    const user = res.locals.userId;
    console.log(user);
    try {
        await Order_1.FoodOrderModel.create({ user, totalPrice, foodOrderItems, address });
        res.status(200).send({ message: "succesfully created order" });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "Order uusgehed aldaa garlaa" });
        return;
    }
};
exports.createOrder = createOrder;
