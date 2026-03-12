import { verify } from "jsonwebtoken";
import userModel from "../schema/user.model";
import { NextFunction, Request, Response } from "express";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      res.status(401).json({ message: "invalid token1" });
      return;
    }

    if (!authToken.startsWith("Bearer ")) {
      res.status(401).json({ message: "invalid token2" });
      return;
    }

    const token = authToken.split(" ")[1];

    const verifiedToken = verify(token, process.env.JWT_SECRET!) as {
      _id: string;
      email?: string;
    };

    if (!verifiedToken._id) {
      res.status(401).json({ message: "invalid token3" });
      return;
    }

    const existingUser = await userModel
      .findById(verifiedToken._id)
      .select("-password");

    if (!existingUser) {
      res.status(401).json({ message: "invalid token4" });
      return;
    }

    (req as any).user = existingUser;

    next();
  } catch (error) {
    console.error("AUTHENTICATION_ERROR:", error);
    res.status(401).json({ message: "invalid token", error });
  }
};
