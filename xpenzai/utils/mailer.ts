import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import nodemailer from "nodemailer";

interface mailProps {
  email: string;
  emailType: string;
  userId: Types.ObjectId | string;
}

// create a transporter
var transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async ({ email, emailType, userId }: mailProps) => {
  try {
    // create and set token 
    if (emailType === "VERIFY") {
      const token = await bcrypt.hash(userId.toString(), 10);
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      const token = await bcrypt.hash(userId.toString(), 10);
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // mail
    const mailOptions = {
      from: "akshajr11@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 500px; border: 1px solid #e5e7eb; padding: 20px; border-radius: 10px;">
    <h2 style="color: #111;">
      ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
    </h2>
    <p>
      Click the link below to 
      ${
        emailType === "VERIFY"
          ? "verify your email address"
          : "reset your password"
      }:
    </p>
    <p>
      <a href="" 
         style="color: #0070f3; text-decoration: none; font-weight: bold;">
         ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
      </a>
    </p>
    <p>Or paste this link into your browser:</p>
    <p style="word-wrap: break-word; color: #555;">
      // link
    </p>
    <br/>
    <p style="font-size: 0.9em; color: #777;">
      This link will expire in 1 hour.
    </p>
  </div>
`,
    };
    const mainResponse = await transporter.sendMail(mailOptions);
    return mainResponse;
  } catch (error) {
    console.log("Something went wrong while sending email to the user");
  }
};

export default sendEmail;
