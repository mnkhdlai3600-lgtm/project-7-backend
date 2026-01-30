import { Response, Request } from "express";
import foodCategoryModel from "../../schema/foodCategory.model";

const getFoodCategory = async (req: Request, res: Response) => {
  try {
    const foodCategory = req.body.categoryName;

    if (!foodCategory) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }
    const foodCategoryData = await foodCategoryModel.findOne({
      categoryName: foodCategory,
    });
    if (!foodCategoryData) {
      return res.status(404).json({
        success: false,
        message: "Food category not found",
      });
    }
    res.status(200).json({
      success: true,
      data: foodCategoryData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
export default getFoodCategory;
