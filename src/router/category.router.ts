import { Router } from "express";
import { authentication, authorization } from "../middlewares";
import { userRoles } from "../schema";
import { createFoodCategory, getAllFoodCategories } from "../controllers";
import updateCategory from "../controllers/category/update-category.controller";
import deleteCategory from "../controllers/category/delete-category.controller";

const categoryRouter = Router();

categoryRouter.post(
  "/create-category",
  authentication,
  authorization(userRoles.Admin),
  createFoodCategory,
);
categoryRouter.post("/get-category", getAllFoodCategories);
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
