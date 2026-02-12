import { Response, Request } from "express";
import foodCategoryModel from "../../schema/foodCategory.model";

// Энэ функц баазад байгаа БҮХ категорийг авчирна
export const getAllFoodCategories = async (req: Request, res: Response) => {
  try {
    // find({}) гэвэл бүх өгөгдлийг шүүж авна
    const allCategories = await foodCategoryModel.find({}).populate("foodIds"); // Таны Compass дээр foodId байвал "foodId" гэж засаарай

    res.status(200).json({
      success: true,
      data: allCategories, // Энэ нь [ {Appetizers}, {Salads}, ... ] гэсэн массив байна
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Бүх категорийг татахад алдаа гарлаа",
      error,
    });
  }
};
