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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const Order_1 = require("../../models/Order");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { totalPrice, foodOrderItems, address } = req.body;
    const user = res.locals.userId;
    console.log(user);
    try {
        yield Order_1.FoodOrderModel.create({ user, totalPrice, foodOrderItems, address });
        res.status(200).send({ message: "succesfully created order" });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "Order uusgehed aldaa garlaa" });
        return;
    }
});
exports.createOrder = createOrder;
