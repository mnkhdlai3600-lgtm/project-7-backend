import { Request, Response } from "express";
import UserModel from "../../schema/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "Имэйл эсвэл нууц үг буруу байна.",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Имэйл эсвэл нууц үг буруу байна.",
      });
      return;
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET!,
    );

    res.status(200).json({
      message: "Амжилттай нэвтэрлээ.",
      success: true,
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Серверийн дотоод алдаа гарлаа.",
      error,
    });
  }
};
