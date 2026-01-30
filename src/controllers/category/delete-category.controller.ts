import { Response, Request } from "express";
import foodCategoryModel from "../../schema/foodCategory.model";

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const deleteCategory =
      await foodCategoryModel.findByIdAndDelete(categoryId);
    if (!deleteCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category deleted successfully", data: deleteCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export default deleteCategory;
