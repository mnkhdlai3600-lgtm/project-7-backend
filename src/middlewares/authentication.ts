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
    console.log(authToken);
    if (!authToken) {
      res.status(400).json({ message: "invalid token1" });
      return;
    }
    if (!authToken.startsWith("Bearer")) {
      res.status(400).json({ message: "invalid token2" });
      return;
    }

    const token = authToken?.split(" ")[1];

    const verifiedToken = verify(token, process.env.JWT_SECRET!) as {
      _id: string;
    };

    if (!verifiedToken._id) {
      res.status(400).json({ message: "invalid token3" });
      return;
    }

    const userId = verifiedToken._id;

    const existingUser = await userModel.findById(userId);

    if (!existingUser) {
      res.status(400).json({ message: "invalid token4" });
      return;
    }
    req.body.user = existingUser;

    // next();
    res.status(200).send({ user: req.body });
  } catch (error) {
    res.status(400).json({ message: "internar server error", error });
  }
};
