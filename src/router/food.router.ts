import { Router } from "express";
import { createNewFood } from "../controllers";
import { deleteFood } from "../controllers/foods/delete-food.controller";
import { updateFood } from "../controllers/foods/update-food.controller";
import { findByIdfood } from "../controllers/foods/get-by-id-food.controller";
const foodRouter = Router();

foodRouter.post("/add-new-food", createNewFood);
foodRouter.delete("/delete-food/:id", deleteFood);
foodRouter.put("/update-food/:id", updateFood);
foodRouter.get("/get-by-id-food/:id", findByIdfood);

export default foodRouter;
