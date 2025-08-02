"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const db_1 = require("./db");
const order_route_1 = __importDefault(require("./routes/order.route"));
const food_route_1 = __importDefault(require("./routes/food.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const upload_route_1 = __importDefault(require("./routes/upload.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.get("/", (req, res) => {
    res.json({
        message: "🍕 Food Delivery API is running!",
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});
app.get("/api/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});
app.use("/api/upload", upload_route_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/order", order_route_1.default);
app.use("/api/food", food_route_1.default);
app.use("/api/category", category_route_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
