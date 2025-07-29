import { Request, Response } from "express";
import User from "../models/User";
import { sendOTP, verifyOTP } from "../utils/sendOtp";
import jwt from "jsonwebtoken";

// Send OTP to email
export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    await sendOTP(email);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send OTP" });
  }
};

// Verify OTP and register/login user
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp, name, dob } = req.body;

  if (!verifyOTP(email, otp)) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  let user = await User.findOne({ email });

  if (!user) {
    // Create new user
    user = new User({ email, name, dob, authType: "email" });
    await user.save();
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
    expiresIn: "7d",
  });

  return res.status(200).json({ message: "Logged in", token, user });
};
