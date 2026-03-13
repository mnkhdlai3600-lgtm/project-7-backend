import { Request, Response } from "express";
import mongoose from "mongoose";
import foodCartModel from "../../schema/foodCart.model";
import FoodModel from "../../schema/food.model";
import UserModel from "../../schema/user.model";

export const createFoodCart = async (req: Request, res: Response) => {
  try {
    const { user_id, foodOrderitems } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      res.status(400).json({ message: "User id буруу байна" });
      return;
    }

    if (!Array.isArray(foodOrderitems) || foodOrderitems.length === 0) {
      res.status(400).json({ message: "foodOrderitems хоосон байна" });
      return;
    }

    for (const item of foodOrderitems) {
      if (
        !item ||
        !mongoose.Types.ObjectId.isValid(item.food) ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0
      ) {
        res.status(400).json({
          message: "foodOrderitems буруу байна",
        });
        return;
      }
    }

    const foodIds = foodOrderitems.map(
      (item: { food: string; quantity: number }) => item.food,
    );

    const foods = await FoodModel.find({
      _id: { $in: foodIds },
    });

    if (foods.length !== foodIds.length) {
      res.status(404).json({ message: "Зарим food олдсонгүй" });
      return;
    }

    const foodPriceMap = new Map(
      foods.map((food) => [String(food._id), food.price]),
    );

    const totalPrice = foodOrderitems.reduce(
      (sum: number, item: { food: string; quantity: number }) =>
        sum + (foodPriceMap.get(String(item.food)) || 0) * item.quantity,
      0,
    );

    const cart = await foodCartModel.create({
      user_id,
      foodOrderitems,
      totalPrice,
    });

    await UserModel.findByIdAndUpdate(user_id, {
      $push: { orderedFoods: cart._id },
    });

    const populatedCart = await foodCartModel
      .findById(cart._id)
      .populate("foodOrderitems.food")
      .populate("user_id", "-password");

    res.status(201).json({
      message: "success",
      data: populatedCart,
    });
  } catch (error) {
    console.error("CREATE_FOOD_CART_ERROR:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
