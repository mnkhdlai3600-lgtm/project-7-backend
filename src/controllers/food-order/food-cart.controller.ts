import { Request, Response } from "express";
import mongoose from "mongoose";
import foodCartModel from "../../schema/foodCart.model";
import FoodModel from "../../schema/food.model";
import UserModel from "../../schema/user.model";

export const createFoodCart = async (req: Request, res: Response) => {
  try {
    const { user_id, foodOrderitems } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "user id obso" });
    }

    const cart = await foodCartModel.create({
      user_id,
      foodOrderitems,
    });

    await UserModel.findByIdAndUpdate(user_id, {
      $push: { orderedFoods: cart._id },
    });

    const populatedCart = await foodCartModel
      .findById(cart._id)
      .populate("foodOrderitems.food");

    return res.status(200).json({ message: "success", populatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
