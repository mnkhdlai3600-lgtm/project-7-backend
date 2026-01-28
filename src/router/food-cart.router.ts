// routes/foodCart.ts
import { Router } from "express";
import { createFoodCart } from "../controllers/food-order";

const foodCartRouter = Router();

foodCartRouter.post("/create-food-cart", createFoodCart);

export default foodCartRouter;
