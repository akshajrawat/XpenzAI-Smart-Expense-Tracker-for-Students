import connectDb from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sendEmail from "@/utils/mailer";

export async function POST(request: NextRequest) {
  await connectDb();

  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check if all the fields are present or not
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All the field are mandatory" },
        { status: 400 }
      );
    }

    // check if user already exist
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user && user.isVerified === true) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    } else if (user && user.isVerified === false) {
      await sendEmail({
        email,
        emailType: "VERIFY",
        userId: user._id,
      });
      return NextResponse.json(
        {
          message: "Please check your email for verification",
        },
        { status: 200 }
      );
    }

    // register user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // send verification email
    try {
      await sendEmail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id,
      });
    } catch (error) {
      return NextResponse.json(
        { error: "error while sending email" },
        { status: 400 }
      );
    }

    // send final resposne
    const finalUser = await User.findOne({ email }).select("-password");
    return NextResponse.json(
      {
        message: "Please check your email for verification",
        success: true,
        user: finalUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// todo :- Make uniqueness ceck for username and password too
