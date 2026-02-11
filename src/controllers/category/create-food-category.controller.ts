import { Response, Request } from "express";
import foodCategoryModel from "../../schema/foodCategory.model";

export const createFoodCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, foods } = req.body;

    const existingCategory = await foodCategoryModel.findOne({ categoryName });

    if (!existingCategory) {
      const createdCategory = await foodCategoryModel.create({
        categoryName,
        foods: foods || [],
      });

      res.status(201).json({
        message: "Food category created successfully with foods",
        data: createdCategory,
      });
    } else {
      res.status(409).json({
        message: "Food category already exists",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
