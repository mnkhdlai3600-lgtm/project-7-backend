import { Router } from "express";
import { findByIdUser } from "../controllers/users/find-by-id-user.controller";
import { updateUserByEmail } from "../controllers/users/update-user-by-email.controller";
import { deleteUser } from "../controllers/users/delete-user.controller";

export const userRouter = Router();

userRouter.get("/find-user-id/:id", findByIdUser);
userRouter.put("/update-user-email/:email", updateUserByEmail);
userRouter.delete("/delete-user/:email", deleteUser);
