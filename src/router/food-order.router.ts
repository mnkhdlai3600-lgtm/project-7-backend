// routes/foodCart.ts
import { Router } from "express";
import { createFoodCart } from "../controllers";
import getOrderedFoodController from "../controllers/food-order/get-oredered-food.controller";
import getAllOrderController from "../controllers/food-order/get-all-order.controller";
import { updateFoodCart } from "../controllers/food-order/food-order-update.controller";

const foodCartRouter = Router();

foodCartRouter.post("/create-food-cart", createFoodCart);
foodCartRouter.get("/get-food-cart/:user_id", getOrderedFoodController);
foodCartRouter.get("/get-all-orders", getAllOrderController);
foodCartRouter.patch("/update-food-cart/:order_id", updateFoodCart);

export default foodCartRouter;
