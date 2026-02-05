import { Router } from "express";
import { createFoodCategory } from "../controllers/category";
import getFoodCategory from "../controllers/category/get-food-category.controller";
import updateCategory from "../controllers/category/update-category.controller";
import deleteCategory from "../controllers/category/delete-category.controller";
import { authentication, authorization } from "../middlewares";
import { userRoles } from "../schema";

const categoryRouter = Router();

categoryRouter.post(
  "/create-category",
  authentication,
  authorization(userRoles.Admin),
  createFoodCategory,
);
categoryRouter.get(
  "/get-category",
  authentication,
  authorization(userRoles.Admin),
  getFoodCategory,
);
categoryRouter.put(
  "/update-category/:categoryId",
  authentication,
  authorization(userRoles.Admin),
  updateCategory,
);
categoryRouter.delete(
  "/delete-category/:categoryId",
  authentication,
  authorization(userRoles.Admin),
  deleteCategory,
);

export default categoryRouter;
