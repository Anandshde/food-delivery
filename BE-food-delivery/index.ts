import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./db";
import OrderRouter from "./routes/order.route";
import FoodRouter from "./routes/food.route";
import CategoryRouter from "./routes/category.route";
import UploadRouter from "./routes/upload.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; // ✅ Use Render port

app.use(cors());
app.use(express.json());

app.use("/api/upload", UploadRouter);
app.use("/api/auth", authRoutes);
app.use("/api/order", OrderRouter);
app.use("/api/food", FoodRouter);
app.use("/api/category", CategoryRouter);

connectDB().catch((err) => {
  console.error("❌ Failed to connect to database:", err);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
