import { Response, Request } from "express";
import foodCategoryModel from "../../schema/foodCategory.model";
import FoodModel from "../../schema/food.model";

export const getAllFoodCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await foodCategoryModel.find({});

    const categoriesWithCount = await Promise.all(
      allCategories.map(async (category) => {
        const count = await FoodModel.countDocuments({
          categoryId: category._id,
        });

        return {
          _id: category._id,
          categoryName: category.categoryName,
          count,
        };
      }),
    );

    res.status(200).json({
      success: true,
      data: categoriesWithCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Бүх категорийг татахад алдаа гарлаа",
      error,
    });
  }
};
