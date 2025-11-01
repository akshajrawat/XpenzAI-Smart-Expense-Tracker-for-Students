import connectDb from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sendEmail from "@/utils/mailer";

connectDb();

export async function POST(request: NextRequest) {
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
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
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
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    // send final resposne
    const finalUser = await User.findOne({ email }).select("-password");
    NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        user: finalUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
