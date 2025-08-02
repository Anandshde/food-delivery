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
const PORT = process.env.PORT || 8000;

// CORS configuration for deployment
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
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

// API routes
app.use("/api/upload", UploadRouter);
app.use("/api/auth", authRoutes);
app.use("/api/order", OrderRouter);
app.use("/api/food", FoodRouter);
app.use("/api/category", CategoryRouter);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
