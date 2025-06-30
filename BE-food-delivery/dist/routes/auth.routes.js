"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/send-otp", auth_controller_1.sendOtpController);
router.post("/verify-otp", auth_controller_1.verifyOtpController);
router.post("/signup", auth_controller_1.signupController);
router.put("/signup", auth_controller_1.updateUserController);
router.post("/login", auth_controller_1.loginController);
router.post("/reset-password-request", auth_controller_1.resetPasswordRequestController);
router.post("/verify-reset-password-request", auth_controller_1.verifyResetPasswordRequestController);
router.post("/reset-password", auth_controller_1.resetPasswordController);
exports.default = router;
