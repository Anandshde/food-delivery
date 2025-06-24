// routes/auth.routes.ts
import { Router } from "express";
import { tokenChecker } from "../utils/token-checker";
import { createOrder } from "../controllers/order/create-order";
import { getOrdersByUsersId } from "../controllers/order/get-order-by-userId";

const OrderRouter = Router();

OrderRouter.post("/createOrder", tokenChecker, createOrder);
OrderRouter.put("/getOrders", tokenChecker, getOrdersByUsersId);

export default OrderRouter;
