// routes/foodCart.ts
import { Router } from "express";
import { createFoodCart } from "../controllers/foods";

const foodCart = Router();

foodCart.post("/create-food-cart", createFoodCart);

export default foodCart;
