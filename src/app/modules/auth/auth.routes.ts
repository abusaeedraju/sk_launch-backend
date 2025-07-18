import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const route = Router();

route.post("/login", validateRequest(authValidation.loginUser), authController.logInUserController);
route.post("/verify-otp", validateRequest(authValidation.verifyOtp), authController.verifyOtp);
route.post("/forget-password", validateRequest(authValidation.forgotPassword), authController.forgetPasswordController);
route.post("/forget-otp-verify", authController.resetOtpVerifyController);
route.post("/resend-otp",authController.resendOtpController);
route.post("/reset-password", authController.resetPasswordController);

route.post("/login/social", authController.socialLoginController);
route.post("/login/apple", authController.appleLoginController);

export const authRoutes = route;
