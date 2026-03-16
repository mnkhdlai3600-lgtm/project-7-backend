import { Router } from "express";
import {
  currentUser,
  deleteUser,
  resetPasswordRequestController,
  signInController,
  signUpController,
  updateCurrentUserController,
  updatePasswordController,
  verifyEmailController,
  verifyResetPasswordController,
} from "../controllers/authentication";
import { authentication, authorization } from "../middlewares";
import { userRoles } from "../schema";
import { refreshTokenController } from "../controllers/authentication/auth-refresh-token.controller";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", signInController);
authenticationRouter.post("/sign-up", signUpController);
authenticationRouter.get("/refresh-token", refreshTokenController);
authenticationRouter.get("/current-user", authentication, currentUser);
authenticationRouter.delete(
  "/delete-user",
  authentication,
  authorization(userRoles.Admin),
  deleteUser,
);
authenticationRouter.get("/verify-email", verifyEmailController);
authenticationRouter.put(
  "/update-user",
  authentication,
  updateCurrentUserController,
);
authenticationRouter.post(
  "/reset-password-request",
  resetPasswordRequestController,
);
authenticationRouter.post(
  "/verify-reset-password",
  verifyResetPasswordController,
);
authenticationRouter.put("/reset-password", updatePasswordController);

export default authenticationRouter;
