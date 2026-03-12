import { Request, Response } from "express";
import UserModel from "../../schema/user.model";
import bcrypt from "bcrypt";

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

    const { email, password, userName, phoneNumber, user_age, address } =
      req.body;

    const updates: Record<string, unknown> = {};

    if (userName !== undefined) updates.userName = userName;
    if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber;
    if (user_age !== undefined) updates.user_age = user_age;
    if (address !== undefined) updates.address = address;

    if (email !== undefined) {
      const existingUser = await UserModel.findOne({ email });

      if (existingUser && existingUser.email !== authUser.email) {
        res.status(409).json({
          message: "Энэ имэйл аль хэдийн ашиглагдаж байна.",
        });
        return;
      }

      updates.email = email;
    }

    if (password !== undefined) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

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
