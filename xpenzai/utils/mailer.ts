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
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3fb7edceb3d45b",
    pass: "cba613ee2cb460",
  },
});

const sendEmail = async ({ email, emailType, userId }: mailProps) => {
  try {
    // create token
    const token = await bcrypt.hash(userId.toString(), 10);
    //  set token
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // mail1
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
      <a href="${process.env.SERVER}/emailverification/${token}" 
         style="color: #0070f3; text-decoration: none; font-weight: bold;">
         ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
      </a>
    </p>
    <p>Or paste this link into your browser:</p>
    <p style="word-wrap: break-word; color: #555;">
      // link
      ${process.env.SERVER}/emailverification/${token}
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
    console.log("Something went wrong while sending email to the user" + error);
  }
};

export default sendEmail;
