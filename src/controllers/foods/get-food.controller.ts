import { Request, Response } from "express";
import FoodModel from "../../schema/food.model";

const getFood = async (req: Request, res: Response) => {
  try {
    const foods = await FoodModel.find();
    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
export default getFood;
