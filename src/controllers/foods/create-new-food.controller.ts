import { Request, Response } from "express";
import FoodModel from "../../schema/food.model";

export const createNewFood = async (req: Request, res: Response) => {
  try {
    const newFood = await FoodModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: newFood,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
