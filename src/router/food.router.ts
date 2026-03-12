import { Router } from "express";

import { authentication, authorization } from "../middlewares";
import {
  createNewFood,
  deleteFood,
  findByIdfood,
  updateFood,
} from "../controllers";
import getFood from "../controllers/foods/get-food.controller";
import { userRoles } from "../schema";
const foodRouter = Router();

foodRouter.post(
  "/add-new-food",
  authentication,
  authorization(userRoles.Admin),
  createNewFood,
);
foodRouter.delete(
  "/delete-food/:id",
  authentication,
  authorization(userRoles.Admin),
  deleteFood,
);
foodRouter.put(
  "/update-food/:id",
  authentication,
  authorization(userRoles.Admin),
  updateFood,
);
foodRouter.post(
  "/get-by-id-food/:id",
  authentication,
  authorization(userRoles.Admin),
  findByIdfood,
);
foodRouter.post("/get-food", getFood);

export default foodRouter;
