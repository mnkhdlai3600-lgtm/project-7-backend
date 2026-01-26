import { Request, Response } from "express";
import { UserModel } from "../../schema";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "User үүсгэхэд алдаа гарлаа",
    });
  }
};
