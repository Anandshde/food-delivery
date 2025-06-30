"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/auth.routes.ts
const express_1 = require("express");
const token_checker_1 = require("../utils/token-checker");
const create_order_1 = require("../controllers/order/create-order");
const get_order_by_userId_1 = require("../controllers/order/get-order-by-userId");
const update_order_status_1 = require("../controllers/order/update-order-status");
const OrderRouter = (0, express_1.Router)();
OrderRouter.post("/createOrder", token_checker_1.tokenChecker, create_order_1.createOrder);
OrderRouter.get("/getOrders", token_checker_1.tokenChecker, get_order_by_userId_1.getOrdersByUsersId);
OrderRouter.patch("/updateStatusBatch", update_order_status_1.updateOrderStatusBatch);
exports.default = OrderRouter;
