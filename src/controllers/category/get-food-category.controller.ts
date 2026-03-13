import { Response, Request } from "express";
import foodCategoryModel from "../../schema/foodCategory.model";
import FoodModel from "../../schema/food.model";

export const getAllFoodCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await foodCategoryModel.find({});

    const categoriesWithFoods = await Promise.all(
      allCategories.map(async (category) => {
        const foods = await FoodModel.find({
          categoryId: category._id,
        });

        return {
          _id: category._id,
          categoryName: category.categoryName,
          foodIds: foods,
          count: foods.length,
        };
      }),
    );

    res.status(200).json({
      success: true,
      data: categoriesWithFoods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Бүх категорийг татахад алдаа гарлаа",
      error,
    });
  }
};
