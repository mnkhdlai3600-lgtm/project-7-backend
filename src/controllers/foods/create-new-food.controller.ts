import { Request, Response } from "express";
import FoodModel from "../../schema/food.model";

export const createNewFood = async (req: Request, res: Response) => {
  try {
    const newFood = await FoodModel.create(req.body);

    res.status(201).json({
      success: true,
      data: newFood,
    });
  } catch (error: any) {
    console.error("CREATE_NEW_FOOD_ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
