import { Request, Response } from "express";
import { UserModel } from "../../schema";

export const findByIdUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ message: "User ID байхгүй байна" });
      return;
    }

    const userById = await UserModel.findById(userId);

    if (userId) {
      res.status(200).json({ message: "Success", userById });
    }

    if (!userById) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    res.status(200).json(userById);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Серверийн алдаа гарлаа", error: error.message });
  }
};
