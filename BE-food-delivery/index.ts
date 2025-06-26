import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./db";
import OrderRouter from "./routes/order.route";
import FoodRouter from "./routes/food.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/order", OrderRouter);
app.use("/api/food", FoodRouter);

connectDB().catch((err) => {
  console.error("❌ Failed to connect to database:", err);
});

app.listen(8000, () => {
  console.log("🚀 Server running at http://localhost:8000");
});
