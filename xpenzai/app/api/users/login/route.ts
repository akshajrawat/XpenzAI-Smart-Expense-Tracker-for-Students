import connectDb from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "@/utils/mailer";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if all the fields are present or not
    if (!password || !email) {
      return NextResponse.json(
        { message: "All the field are mandatory" },
        { status: 400 }
      );
    }

    // check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    // check whether the user is verified or not
    if (!user.isVerified) {
      await sendEmail({
        email,
        emailType: "VERIFY",
        userId: user._id,
      });
      return NextResponse.json(
        { message: "Please verify email before logging in." },
        { status: 400 }
      );
    }

    // check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    // create a jwt token
    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
    };
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    // response
    const response = NextResponse.json(
      { message: "User login successfull", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
