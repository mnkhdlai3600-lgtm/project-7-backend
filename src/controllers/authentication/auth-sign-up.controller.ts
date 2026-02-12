import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../schema/user.model";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/node-mailer-utils";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      res.status(400).json({ message: "Бүх талбарыг бөглөнө үү." });
      return;
    }

    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ message: "Нууц үгнүүд хоорондоо таарахгүй байна." });
      return;
    }

    const userTTL = new Date(Date.now() + 5 * 60 * 1000);
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res
        .status(409)
        .json({ message: "Энэ имейл хаяг хэдийн бүртгэгдсэн байна." });
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

    await sendVerificationEmail(
      email,
      `${process.env.CLIENT_URL}/authentication/verify-email?token=${token}`,
    );

    res.status(201).json({
      success: true,
      message: "Баталгаажуулах имейл илгээгдлээ.",
      data: newUser,
    });
  } catch (error) {
    console.error("SIGNUP_ERROR:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};
