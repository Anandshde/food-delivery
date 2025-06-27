// routes/category.route.ts
import { Router } from "express";
import { createCategory } from "../controllers/category/create-category";
import { tokenChecker } from "../utils/token-checker";
import { getCategories } from "../controllers/category/get-categories";

const CategoryRouter = Router();

CategoryRouter.post("/", tokenChecker, createCategory);
CategoryRouter.get("/", tokenChecker, getCategories);

export default CategoryRouter;
