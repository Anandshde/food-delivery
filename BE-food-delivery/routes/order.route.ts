// routes/auth.routes.ts
import { Router } from "express";
import { tokenChecker } from "../utils/token-checker";
import { createOrder } from "../controllers/order/create-order";
import { getOrdersByUsersId } from "../controllers/order/get-order-by-userId";
import { updateOrderStatusBatch } from "../controllers/order/update-order-status";

const OrderRouter = Router();

OrderRouter.post("/createOrder", tokenChecker, createOrder);
OrderRouter.get("/getOrders", tokenChecker, getOrdersByUsersId);
OrderRouter.patch("/updateStatusBatch", updateOrderStatusBatch);

export default OrderRouter;
