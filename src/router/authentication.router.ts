import { Router } from "express";
import {
  refreshController,
  resetPasswordController,
  resetPasswordRequestController,
  signInController,
  signUpController,
  verifyResetPasswordRequestController,
} from "../controllers/authentication";
import { verifyEmailController } from "../controllers/authentication/verify-email.controller";
import { findByIdUser } from "../controllers/authentication/find-by-id-user.controller";
import { deleteUser } from "../controllers/authentication/delete-user.controller";

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
authenticationRouter.get("/user-by-id/:id", findByIdUser);
authenticationRouter.delete("/delete-user/:email", deleteUser);
authenticationRouter.get("/verify-email", verifyEmailController);
export default authenticationRouter;
