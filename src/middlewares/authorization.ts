import { Request, Response, NextFunction } from "express";
import { userRoles } from "../schema";

export const authorization =
  (...role: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    console.log({ user });
    if (role.includes(user.role)) {
      req.body.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid role bro" });
    }
  };
