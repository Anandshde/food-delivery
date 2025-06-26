import { Router } from "express";
import { getAllFood } from "../controllers/food/get-all-food";
import { createFood } from "../controllers/food/create-food";
import { tokenChecker } from "../utils/token-checker";

const FoodRouter = Router();

FoodRouter.get("/", getAllFood);
FoodRouter.post("/", tokenChecker, createFood);

export default FoodRouter;
