import { Response, Request } from "express";
import foodCategoryModel from "../../schema/foodCategory.model";

export const getAllFoodCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await foodCategoryModel.find({}).populate("foodIds");

    res.status(200).json({
      success: true,
      data: allCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Бүх категорийг татахад алдаа гарлаа",
      error,
    });
  }
};
