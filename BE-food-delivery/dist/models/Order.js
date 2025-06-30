"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodOrderModel = void 0;
const mongoose_1 = require("mongoose");
var FoodOrderStatusEnum;
(function (FoodOrderStatusEnum) {
    FoodOrderStatusEnum["PENDING"] = "PENDING";
    FoodOrderStatusEnum["DELIVERED"] = "DELIVERED";
    FoodOrderStatusEnum["CANCELED"] = "CANCELED";
})(FoodOrderStatusEnum || (FoodOrderStatusEnum = {}));
const FoodOrderItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, { _id: false });
const FoodOrderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: true },
    address: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [FoodOrderItemSchema], required: true },
    status: {
        type: String,
        enum: Object.values(FoodOrderStatusEnum),
        default: FoodOrderStatusEnum.PENDING,
        required: true,
    },
}, { timestamps: true });
exports.FoodOrderModel = mongoose_1.models["FoodOrders"] ||
    (0, mongoose_1.model)("FoodOrders", FoodOrderSchema);
