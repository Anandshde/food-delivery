"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.verifyResetPasswordRequestController = exports.resetPasswordRequestController = exports.loginController = exports.updateUserController = exports.signupController = exports.verifyOtpController = exports.sendOtpController = void 0;
const mailer_1 = require("../utils/mailer");
const jwt_1 = require("../utils/jwt");
const otpStore = {};
const resetOtpStore = {};
const sendOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000;
    otpStore[email] = { otp, expires };
    try {
        yield (0, mailer_1.sendOtpEmail)(email, otp);
        res.json({ message: "OTP sent successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Failed to send OTP", error });
        return;
    }
});
exports.sendOtpController = sendOtpController;
const verifyOtpController = (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore[email];
    if (!record) {
        res.status(400).json({ message: "No OTP sent" });
        return;
    }
    if (Date.now() > record.expires) {
        res.status(400).json({ message: "OTP expired" });
        return;
    }
    if (record.otp !== otp) {
        res.status(400).json({ message: "Invalid OTP" });
        return;
    }
    delete otpStore[email];
    res.json({ message: "OTP verified successfully" });
    return;
};
exports.verifyOtpController = verifyOtpController;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password required" });
            return;
        }
        const existing = yield User_1.User.findOne({ email });
        if (existing) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield User_1.User.create({ email, password: hashedPassword });
        res.status(201).json({ message: "User created", user: newUser });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
        return;
    }
});
exports.signupController = signupController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and new password required" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const updatedUser = yield User_1.User.findOneAndUpdate({ email }, { password: hashedPassword, updatedAt: new Date() }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({ message: "User updated", user: updatedUser });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
        return;
    }
});
exports.updateUserController = updateUserController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        const token = (0, jwt_1.createToken)({
            _id: user._id,
            email: user.email,
        });
        res.json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                email: user.email,
            },
        });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
        return;
    }
});
exports.loginController = loginController;
const resetPasswordRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
    }
    const user = yield User_1.User.findOne({ email });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000;
    resetOtpStore[email] = { otp, expires };
    try {
        yield (0, mailer_1.sendOtpEmail)(email, otp);
        res.json({ message: "Reset OTP sent" });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Failed to send OTP" });
        return;
    }
});
exports.resetPasswordRequestController = resetPasswordRequestController;
const verifyResetPasswordRequestController = (req, res) => {
    const { email, otp } = req.body;
    const record = resetOtpStore[email];
    if (!record) {
        res.status(400).json({ message: "No OTP sent" });
        return;
    }
    if (Date.now() > record.expires) {
        res.status(400).json({ message: "OTP expired" });
        return;
    }
    if (record.otp !== otp) {
        res.status(400).json({ message: "Invalid OTP" });
        return;
    }
    res.json({ message: "OTP verified" });
};
exports.verifyResetPasswordRequestController = verifyResetPasswordRequestController;
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
        res.status(400).json({ message: "Email, otp and password are required" });
        return;
    }
    const record = resetOtpStore[email];
    if (!record) {
        res.status(400).json({ message: "No OTP sent" });
        return;
    }
    if (Date.now() > record.expires || record.otp !== otp) {
        res.status(400).json({ message: "Invalid or expired OTP" });
        return;
    }
    try {
        const hashed = yield bcrypt_1.default.hash(password, 10);
        const updated = yield User_1.User.findOneAndUpdate({ email }, { password: hashed, updatedAt: new Date() }, { new: true });
        if (!updated) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        delete resetOtpStore[email];
        res.json({ message: "Password updated" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update password" });
    }
});
exports.resetPasswordController = resetPasswordController;
