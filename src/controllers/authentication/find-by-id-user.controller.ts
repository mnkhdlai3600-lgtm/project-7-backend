import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../../schema/user.model";

export const findByIdUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId as string))
      return res.status(400).json({ message: "Invalid ID" });

    const userById = await UserModel.findById(userId)
      .select("-password")
      .populate({
        path: "orderedFoods",
        populate: {
          path: "foodOrderitems.food",
        },
      });

    if (!userById)
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });

    return res.status(200).json({
      message: "Success",
      data: userById,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Серверийн алдаа гарлаа", error: error.message });
  }
};
