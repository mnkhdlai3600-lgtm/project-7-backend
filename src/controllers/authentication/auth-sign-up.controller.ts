import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../schema/user.model";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const existingUser = await UserModel.findOne({
      $or: [{ email }],
    });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        success: true,
        data: newUser,
      });
    } else {
      res.status(409).json({ message: "Username or email already exists" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
