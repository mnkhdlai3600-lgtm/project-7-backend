import { Router } from "express";
import { createFoodCart, updateFoodCart } from "../controllers";
import getOrderedFoodController from "../controllers/food-order/get-oredered-food.controller";

import { authentication, authorization } from "../middlewares";
import { userRoles } from "../schema";
import getAllOrderController from "../controllers/food-order/get-all-order.controller";

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
foodCartRouter.put(
  "/update-food-cart/:order_id",
  authentication,
  authorization(userRoles.Admin),
  updateFoodCart,
);

export default foodCartRouter;
