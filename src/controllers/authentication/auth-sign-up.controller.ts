import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../schema/user.model";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/node-mailer-utils";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Бүх талбарыг бөглөнө үү." });
      return;
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res
        .status(409)
        .json({ message: "Энэ имэйл хаяг хэдийн бүртгэгдсэн байна." });
      return;
    }

    const userTTL = new Date(Date.now() + 5 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      ttl: userTTL,
      isVerified: false,
    });

    const verifyToken = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "10m",
    });

    await sendVerificationEmail(
      email,
      `${process.env.CLIENT_URL}/verify-email?token=${verifyToken}`,
    );

    res.status(201).json({
      success: true,
      message: "Баталгаажуулах имэйл илгээгдлээ.",
      data: {
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("SIGNUP_ERROR:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};
