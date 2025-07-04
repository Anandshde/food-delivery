"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodOrder = void 0;
// server/models/FoodOrder.ts
const mongoose_1 = __importStar(require("mongoose"));
const FoodOrderStatusEnum_1 = require("../enums/FoodOrderStatusEnum");
const FoodOrderItemSchema = new mongoose_1.Schema({
    food: { type: mongoose_1.Schema.Types.ObjectId, ref: "Food", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
const FoodOrderSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    foodOrderItems: { type: [FoodOrderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(FoodOrderStatusEnum_1.FoodOrderStatusEnum),
        default: FoodOrderStatusEnum_1.FoodOrderStatusEnum.PENDING,
    },
    createdAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date, default: Date.now },
});
exports.FoodOrder = mongoose_1.default.model("FoodOrder", FoodOrderSchema);
