import { Request, Response } from "express";
import UserModel from "../../schema/user.model";

type AuthenticatedRequest = Request & {
  body: {
    user?: {
      _id: string;
    };
  };
};

export const currentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.body.user?._id;

    if (!userId) {
      res.status(401).json({ message: "Хэрэглэгч баталгаажаагүй байна" });
      return;
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    res.status(200).json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай авлаа",
      data: user,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Тодорхойгүй алдаа";

    res.status(500).json({
      message: "Серверийн алдаа гарлаа",
      error: message,
    });
  }
};
