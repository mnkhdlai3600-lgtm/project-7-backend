import { Request, Response } from "express";
import UserModel from "../../schema/user.model";

export const updateUserByEmail = async (req: Request, res: Response) => {
  try {
    const userMail = req.params.email;
    const updates = req.body;

    if (!userMail) {
      return res.status(400).json({ message: "Email parameter is required" });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userMail },
      { $set: updates },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
