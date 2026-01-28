import { Request, Response } from "express";
import UserModel from "../../schema/user.model";
import bcrypt from "bcrypt";

export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({
      message: "Sign-in successful",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
