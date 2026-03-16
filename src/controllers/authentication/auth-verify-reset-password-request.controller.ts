import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../../schema/user.model";
import userOTPModel from "../../schema/userOTP.model";

export const verifyResetPasswordController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({ message: "Имэйл болон OTP код шаардлагатай." });
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
      return;
    }

    const otpData = await userOTPModel.findOne({
      userId: user._id,
      otp: otp,
    });

    if (!otpData) {
      res.status(400).json({
        message: "Баталгаажуулах код буруу эсвэл хугацаа нь дууссан байна.",
      });
      return;
    }

    await userOTPModel.deleteOne({ _id: otpData._id });

    const resetToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "10m" },
    );

    res.status(200).json({
      success: true,
      message: "OTP амжилттай баталгаажлаа.",
      token: resetToken,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
