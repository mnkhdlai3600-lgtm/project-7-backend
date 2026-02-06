import { Router } from "express";
import {
  deleteUser,
  findUserEmail,
  resetPasswordRequestController,
  signInController,
  signUpController,
  updatePasswordController,
  updateUserByEmail,
  verifyEmailController,
  verifyResetPasswordController,
} from "../controllers/authentication";
import { authentication, authorization } from "../middlewares";
import { userRoles } from "../schema";
import { refreshToken } from "../controllers/authentication/auth-refresh-token.controller";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", signInController);
authenticationRouter.post("/sign-up", signUpController);
authenticationRouter.get("/refresh-token", refreshToken);
authenticationRouter.get(
  "/find-user/:id",
  authentication,
  authorization(userRoles.Admin),
  findUserEmail,
);
authenticationRouter.delete(
  "/delete-user",
  authentication,
  authorization(userRoles.Admin),
  deleteUser,
);
authenticationRouter.get("/verify-email", verifyEmailController);
authenticationRouter.put(
  "/update-user/:email",
  authentication,
  updateUserByEmail,
);
authenticationRouter.post(
  "/reset-password-request",
  resetPasswordRequestController,
);
authenticationRouter.post(
  "/verify-reset-password",
  verifyResetPasswordController,
);
authenticationRouter.put(
  "/reset-password",

  updatePasswordController,
);

export default authenticationRouter;
