"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = void 0;
// server/utils/mailer.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: `"" <${process.env.EMAIL_USER}>`,
        to,
        subject: "🔐 Your OTP Code",
        html: `<h2>Your OTP Code is: ${otp}</h2><p>This code is valid for 5 minutes.</p>`,
    };
    await transporter.sendMail(mailOptions);
};
exports.sendOtpEmail = sendOtpEmail;
