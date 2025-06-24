// routes/auth.routes.ts
import { Router } from "express";
import {
  sendOtpController,
  verifyOtpController,
  signupController,
  updateUserController,
  loginController,
  resetPasswordRequestController,
  verifyResetPasswordRequestController,
  resetPasswordController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/signup", signupController);
router.put("/signup", updateUserController);
router.post("/login", loginController);
router.post("/reset-password-request", resetPasswordRequestController);
router.post("/verify-reset-password-request", verifyResetPasswordRequestController);
router.post("/reset-password", resetPasswordController);

export default router;
