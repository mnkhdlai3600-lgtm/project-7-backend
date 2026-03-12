import { Request, Response } from "express";
import userModel from "../../schema/user.model";
import bcrypt from "bcrypt";

export const updatePasswordController = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      res.status(400).json({ message: "impormation required" });
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
    );

    res.status(200).json({
      success: true,
      message: "Your password updated",
    });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
