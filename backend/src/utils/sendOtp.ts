import dotenv from "dotenv";
dotenv.config(); // Load .env FIRST

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const otpStore: Record<string, string> = {};

export const sendOTP = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return otp;
  } catch (error: any) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

export const verifyOTP = (email: string, otp: string): boolean => {
  return otpStore[email] === otp;
};
