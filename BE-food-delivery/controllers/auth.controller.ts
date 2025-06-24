// controllers/auth.controller.ts
import { Request, Response } from "express";
import { sendOtpEmail } from "../utils/mailer";
import { createToken } from "../utils/jwt";

const otpStore: Record<string, { otp: string; expires: number }> = {};

export const sendOtpController = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5 * 60 * 1000;
  otpStore[email] = { otp, expires };

  try {
    await sendOtpEmail(email, otp);
    res.json({ message: "OTP sent successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
    return;
  }
};

export const verifyOtpController = (req: Request, res: Response) => {
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

import bcrypt from "bcrypt";
import { User } from "../models/User";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password required" });
      return;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "User created", user: newUser });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
    return;
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and new password required" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User updated", user: updatedUser });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
    return;
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    const token = createToken({
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
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};
