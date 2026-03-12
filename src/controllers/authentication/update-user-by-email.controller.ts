import { Request, Response } from "express";
import UserModel from "../../schema/user.model";

export const updateCurrentUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const authUser = (req as any).user as { email?: string; _id?: string };

    if (!authUser?.email) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { userName, phoneNumber, user_age, address } = req.body;

    const updates: Record<string, unknown> = {};

    if (userName !== undefined) updates.userName = userName;
    if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber;
    if (user_age !== undefined) updates.user_age = user_age;
    if (address !== undefined) updates.address = address;

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: authUser.email },
      { $set: updates },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE_CURRENT_USER_ERROR:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
