import { Router } from "express";
import { createFoodCategory } from "../controllers/category";
import getFoodCategory from "../controllers/category/get-food-category.controller";
import updateCategory from "../controllers/category/update-category.controller";
import deleteCategory from "../controllers/category/delete-category.controller";

const categoryRouter = Router();

categoryRouter.post("/create-category", createFoodCategory);
categoryRouter.get("/get-category", getFoodCategory);
categoryRouter.put("/update-category/:categoryId", updateCategory);
categoryRouter.delete("/delete-category/:categoryId", deleteCategory);

export default categoryRouter;
