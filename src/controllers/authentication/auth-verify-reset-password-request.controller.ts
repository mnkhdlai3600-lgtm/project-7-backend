import { Request, Response } from "express";
import userModel from "../../schema/user.model";
import userOTPModel from "../../schema/userOTP.model";

export const verifyResetPasswordController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email bas OTP code alga!" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user bdgue." });
    }

    const otpData = await userOTPModel.findOne({
      userId: user._id,
      otp: otp,
    });

    if (!otpData) {
      return res.status(400).json({
        message: "invalid otp eswel hugatsaa",
      });
    }

    await userOTPModel.deleteOne({ _id: otpData._id });

    return res.status(200).json({
      success: true,
      message: "success",
      userId: user._id,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
