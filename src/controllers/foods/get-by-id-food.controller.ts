import { Request, Response } from "express";
import FoodModel from "../../schema/food.model";

export const findByIdfood = async (req: Request, res: Response) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res.status(400).json({ message: "Food ID байхгүй байна" });
    }

    const foodById = await FoodModel.findById(foodId);

    if (!foodById) {
      return res.status(404).json({ message: "Хоол олдсонгүй" });
    }

    res.status(200).json({ message: "Амжилттай олдлоо", foodById });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Серверийн алдаа гарлаа", error: error.message });
  }
};
