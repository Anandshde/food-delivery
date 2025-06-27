// routes/category.route.ts
import { Router } from "express";
import { createCategory } from "../controllers/category/create-category";
import { tokenChecker } from "../utils/token-checker";

const CategoryRouter = Router();

CategoryRouter.post("/", tokenChecker, createCategory);

export default CategoryRouter;
