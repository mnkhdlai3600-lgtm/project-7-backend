import { Request, Response } from "express";
import UserModel from "../../schema/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET!,
    );
    console.log(token);
    res.status(200).json({
      message: "Sign-in successful",
      success: true,
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// user token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhcmtwdW1hMzYwMDBAZ21haWwuY29tIiwiX2lkIjoiNjk4NDA2ZmFkOWNmMjU1OTMxOTUzMDQ1IiwiaWF0IjoxNzcwMjYwMzA5fQ.0QxPL6koi1ILWuHD3-bWH-rb1VHQRkWtEqvNSde5LbY
// admin token
