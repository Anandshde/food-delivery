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
const PORT = process.env.PORT || 8000; // ✅ Use Render port
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/upload", upload_route_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/order", order_route_1.default);
app.use("/api/food", food_route_1.default);
app.use("/api/category", category_route_1.default);
(0, db_1.connectDB)().catch((err) => {
    console.error("❌ Failed to connect to database:", err);
});
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
