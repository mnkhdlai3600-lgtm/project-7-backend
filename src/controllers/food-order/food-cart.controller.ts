import { Request, Response } from "express";
import mongoose from "mongoose";
import foodCartModel from "../../schema/foodCart.model";
import FoodModel from "../../schema/food.model";
import UserModel from "../../schema/user.model";

export const createFoodCart = async (req: Request, res: Response) => {
  try {
    const { user_id, food_id, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id))
      res.status(400).json({ message: "Invalid user_id" });

    if (!mongoose.Types.ObjectId.isValid(food_id))
      res.status(400).json({ message: "Invalid food_id" });

    if (!quantity || quantity <= 0)
      res.status(400).json({ message: "Invalid quantity" });

    const food = await FoodModel.findById(food_id);
    if (!food) res.status(404).json({ message: "Food not found" });

    const cart = await foodCartModel.create({
      user_id,
      foodOrderitems: [{ food: food_id, quantity }],
    });

    await UserModel.findByIdAndUpdate(user_id, {
      $push: { orderedFoods: cart._id },
    });

    const populatedCart = await foodCartModel
      .findById(cart._id)
      .populate("foodOrderitems.food");

    res.status(201).json({
      message: "Food order created successfully",
      data: populatedCart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
