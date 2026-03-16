import { Request, Response } from "express";
import FoodModel from "../../schema/food.model";

export const updateFood = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Хоолын ID заавал шаардлагатай",
      });
    }

    if (!update || Object.keys(update).length === 0) {
      return res.status(400).json({
        message: "Шинэ мэдээлэл оруулна уу",
      });
    }

    const updatedFood = await FoodModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return res.status(404).json({
        message: "Хоол олдсонгүй",
      });
    }

    return res.status(200).json({
      message: "Амжилттай шинэчлэгдлээ",
      food: updatedFood,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Серверийн алдаа",
      error,
    });
  }
};
