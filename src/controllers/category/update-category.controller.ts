import { Request, Response } from "express";
import foodCategoryModel from "../../schema/foodCategory.model";

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    if (!categoryId || !categoryName) {
      res.status(400).json({
        success: false,
        message: "Category ID and updated name are required",
      });
      return;
    }

    const updatedCategory = await foodCategoryModel.findByIdAndUpdate(
      categoryId,
      { categoryName: categoryName },
      { new: true },
    );

    if (!updatedCategory) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export default updateCategory;
