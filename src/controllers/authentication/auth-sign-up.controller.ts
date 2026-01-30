import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../schema/user.model";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/node-mailer-utils";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY || "secret", {
      expiresIn: 600,
    });
    await sendVerificationEmail(
      email,
      `${process.env.TEST_API}/authentication/verify-email?token=${token}`,
    );

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        success: true,
        data: newUser,
        token,
        message: "User registered successfully",
      });
    } else {
      res.status(409).json({ message: "Username or email already exists" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
