import { Router } from "express";
import {
  deleteUser,
  refreshController,
  resetPasswordController,
  resetPasswordRequestController,
  signInController,
  signUpController,
  verifyResetPasswordRequestController,
} from "../controllers/authentication";

const authenticationRouter = Router();

authenticationRouter.post("/refresh-user", refreshController);
authenticationRouter.post(
  "/reset-password-request",
  resetPasswordRequestController,
);
authenticationRouter.post("/reset-password", resetPasswordController);
authenticationRouter.post("/sign-in", signInController);
authenticationRouter.post("/sign-up", signUpController);
authenticationRouter.post(
  "/verify-reset-password-request",
  verifyResetPasswordRequestController,
);
authenticationRouter.delete("/delete-user/:email", deleteUser);

export default authenticationRouter;
