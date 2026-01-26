import { Request, Response } from "express";
import FoodModel from "../../schema/food.model";

export const deleteFood = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedFood = await FoodModel.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food deleted successfully",
      data: deletedFood,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
