import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../schema/user.model";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/node-mailer-utils";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const userTTL = new Date(Date.now() + 5 * 60 * 1000);

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(409).json({
        message: "Username or email already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      ttl: userTTL,
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: 600,
    });
    console.log(token);
    await sendVerificationEmail(
      email,
      `${process.env.CLIENT_API}/authentication/verify-email?token=${token}`,
    );
    res.status(201).json({
      success: true,
      message: "Verification email sent",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
