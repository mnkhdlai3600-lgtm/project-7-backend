// controllers/foods.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import foodCartModel from "../../schema/foodCart.model";
import FoodModel from "../../schema/food.model";

export const createFoodCart = async (req: Request, res: Response) => {
  try {
    const { user_id, food_id, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid user_id" });
    }

    if (!mongoose.Types.ObjectId.isValid(food_id)) {
      return res.status(400).json({ message: "Invalid food_id" });
    }

    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const food = await FoodModel.findById(food_id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    let cartItem = await foodCartModel.findOne({ user_id, food_id });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await foodCartModel.create({ user_id, food_id, quantity });
    }

    const populatedCart = await foodCartModel.findById(cartItem._id).populate({
      path: "food_id",
      select: "food_name food_price poster_img",
    });

    res.status(201).json({
      message: "Food added to cart successfully",
      data: populatedCart,
    });
  } catch (error: any) {
    console.error("Create Food Cart Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
