import { Request, Response } from "express";
import { UserModel } from "../../schema";

type DeleteUserFilter = {
  email?: string;
  user_name?: string;
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { user_name } = req.body as { user_name?: string };

    if (!email && !user_name) {
      return res.status(400).json({
        success: false,
        message: "Email or user_name must be provided",
      });
    }

    const filter: DeleteUserFilter = {};
    if (typeof email === "string") filter.email = email;
    if (typeof user_name === "string") filter.user_name = user_name;

    const deletedUser = await UserModel.findOneAndDelete(filter);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
