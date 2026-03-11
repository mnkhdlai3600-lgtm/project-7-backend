import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../schema/user.model";

export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;

    if (!token) {
      res.status(400).json({ message: "Token байхгүй байна." });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    const verifiedUser = await UserModel.findOneAndUpdate(
      { email: decodedToken.email },
      {
        $set: { isVerified: true },
        $unset: { ttl: 1 },
      },
      { new: true },
    );

    if (!verifiedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const accessToken = jwt.sign(
      { email: verifiedUser.email, _id: verifiedUser._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      accessToken,
      data: {
        _id: verifiedUser._id,
        email: verifiedUser.email,
        isVerified: verifiedUser.isVerified,
      },
    });
  } catch (error) {
    console.error("VERIFY_EMAIL_ERROR:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
