"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/category.route.ts
const express_1 = require("express");
const create_category_1 = require("../controllers/category/create-category");
const token_checker_1 = require("../utils/token-checker");
const get_categories_1 = require("../controllers/category/get-categories");
const CategoryRouter = (0, express_1.Router)();
CategoryRouter.post("/", token_checker_1.tokenChecker, create_category_1.createCategory);
CategoryRouter.get("/", token_checker_1.tokenChecker, get_categories_1.getCategories);
exports.default = CategoryRouter;
