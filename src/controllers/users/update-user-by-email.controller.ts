import { Request, Response } from "express";
import { UserModel } from "../../schema";

export const updateUserByEmail = async (req: Request, res: Response) => {
  try {
    const userMail = req.params.email;
    const updates = req.body;

    if (!userMail) {
      return res.status(400).json({ message: "Old email not provided" });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userMail },
      updates,
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Update successful",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
