import { Request, Response } from "express";
import FoodModel from "../../schema/food.model";
import FoodCategoryModel from "../../schema/foodCategory.model";

export const createNewFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, categoryId } = req.body;

    if (!foodName || !price || !image || !ingredients || !categoryId) {
      res.status(400).json({
        success: false,
        message: "Бүх талбарыг бөглөнө үү.",
      });
      return;
    }

    const newFood = await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      categoryId,
    });

    await FoodCategoryModel.findByIdAndUpdate(categoryId, {
      $push: { foodIds: newFood._id },
    });

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
