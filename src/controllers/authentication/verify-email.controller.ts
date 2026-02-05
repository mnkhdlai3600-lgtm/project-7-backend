import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../schema/user.model";

export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;

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

    if (verifiedUser) {
      res.status(200).json({
        message: "Email verified successfully",
        data: verifiedUser,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
