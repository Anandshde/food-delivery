// routes/auth.routes.ts
import { Router } from "express";
import {
  sendOtpController,
  verifyOtpController,
  signupController,
  updateUserController,
  loginController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/signup", signupController);
router.put("/signup", updateUserController);
router.post("/login", loginController);

export default router;
