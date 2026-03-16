import { Request, Response } from "express";
import userModel from "../../schema/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const updatePasswordController = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ message: "Мэдээлэл дутуу байна." });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword },
    );

    res.status(200).json({
      success: true,
      message: "Нууц үг амжилттай шинэчлэгдлээ.",
    });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(400).json({
      message: "Token буруу эсвэл хугацаа нь дууссан байна.",
    });
  }
};
