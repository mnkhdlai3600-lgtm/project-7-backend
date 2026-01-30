import { Request, Response } from "express";
import foodCartModel from "../../schema/foodCart.model";

export const updateFoodCart = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    const updatedCart = await foodCartModel.findByIdAndUpdate(
      order_id,
      { status },
      { new: true },
    );

    if (!updatedCart) {
      return res.status(404).json({
        message: "Food cart not found",
      });
    }

    return res.status(200).json({
      message: "Food cart status updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export default updateFoodCart;
