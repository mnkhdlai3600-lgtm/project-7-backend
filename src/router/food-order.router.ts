// routes/foodCart.ts
import { Router } from "express";
import { createFoodCart } from "../controllers";
import getOrderedFoodController from "../controllers/food-order/get-oredered-food.controller";
import getAllOrderController from "../controllers/food-order/get-all-order.controller";
import { updateFoodCart } from "../controllers/food-order/food-order-update.controller";
import { authentication, authorization } from "../middlewares";
import { userRoles } from "../schema";

const foodCartRouter = Router();

foodCartRouter.post("/create-food-cart", authentication, createFoodCart);
foodCartRouter.get(
  "/get-food-cart/:user_id",
  authentication,
  authorization(userRoles.Admin),
  getOrderedFoodController,
);
foodCartRouter.get(
  "/get-all-orders",
  authentication,
  authorization(userRoles.Admin),
  getAllOrderController,
);
foodCartRouter.patch(
  "/update-food-cart/:order_id",
  authentication,
  authorization(userRoles.Admin),
  updateFoodCart,
);

export default foodCartRouter;
