import { Request, Response } from "express";
import UserModel from "../../schema/user.model";

export const updateUserByEmail = async (req: Request, res: Response) => {
  try {
    const userMail = req.params.email;
    const updates = req.body;

    if (!userMail) {
      res.status(400).json({ message: "Email parameter is required" });
      return;
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userMail },
      { $set: updates },
      { new: true },
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
