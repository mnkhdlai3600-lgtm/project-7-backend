import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../../schema/user.model";

export const findUserEmail = async (req: Request, res: Response) => {
  try {
    const UserId = req.params.id;

    if (!UserId) {
      return res
        .status(400)
        .json({ message: "Имэйл хаяг заавал шаардлагатай" });
    }

    const user = await UserModel.findById({ _id: UserId });

    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    return res
      .status(200)
      .json({ message: "Хэрэглэгч амжилттай олдлоо", data: user });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Серверийн алдаа гарлаа", error: error.message });
  }
};
