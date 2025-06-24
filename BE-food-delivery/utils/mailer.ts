// server/utils/mailer.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (to: string, otp: string) => {
  const mailOptions = {
    from: `"" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🔐 Your OTP Code",
    html: `<h2>Your OTP Code is: ${otp}</h2><p>This code is valid for 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
