import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../schema/user.model";

type DeleteCurrentUserBody = {
  password: string;
};

type AuthenticatedRequest = Request<unknown, unknown, DeleteCurrentUserBody> & {
  user?: {
    _id: string;
    email?: string;
  };
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { password } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Хэрэглэгч баталгаажаагүй байна",
      });
      return;
    }

    if (!password || password.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: "Нууц үг заавал оруулна",
      });
      return;
    }

    const user = await UserModel.findById(userId).select("+password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json({
        success: false,
        message: "Нууц үг буруу байна",
      });
      return;
    }

    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "Хэрэглэгч амжилттай устгагдлаа",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Тодорхойгүй серверийн алдаа";

    res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа",
      error: errorMessage,
    });
  }
};
