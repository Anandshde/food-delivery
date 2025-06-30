"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
// server/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose_1.default.connect(uri);
        console.log("✅ Connected to database");
    }
    catch (error) {
        console.error("❌ Failed to connect to database:", error);
    }
};
exports.connectDB = connectDB;
