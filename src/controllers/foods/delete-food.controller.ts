import { Request, Response } from "express";
import FoodModel from "../../schema/food.model";
import mongoose from "mongoose";

export const deleteFood = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    console.log("DELETE req.params.id:", id);
    console.log(
      "isValidObjectId:",
      mongoose.Types.ObjectId.isValid(id as string),
    );

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Food id is required",
      });
    }

    const existingFood = await FoodModel.findById(id);
    console.log("existingFood:", existingFood);

    if (!existingFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found before delete",
      });
    }

    const deletedFood = await FoodModel.findByIdAndDelete(id);
    console.log("deletedFood:", deletedFood);

    return res.status(200).json({
      success: true,
      message: "Food deleted successfully",
      data: deletedFood,
    });
  } catch (error: any) {
    console.error("DELETE FOOD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
