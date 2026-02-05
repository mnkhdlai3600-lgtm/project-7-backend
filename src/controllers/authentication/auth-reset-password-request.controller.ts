import { Request, Response } from "express";
import { ResetPasswordVerificationEmail } from "../../utils/reset-password-nodemailer.utils";
import userModel from "../../schema/user.model";
import userOTPModel from "../../schema/userOTP.model";

export const resetPasswordRequestController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await userOTPModel.create({ userId: user._id, otp: otpCode });
    console.log(otpCode);

    await ResetPasswordVerificationEmail(email, otpCode);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
