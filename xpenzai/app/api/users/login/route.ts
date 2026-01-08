import connectDb from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "@/utils/mailer";
import { Types } from "mongoose";
import Wallet from "@/models/walletModel";

export interface tokenTypes extends JwtPayload {
  id: Types.ObjectId;
  username: string;
  email: string;
  isVerified: boolean;
}

export async function POST(request: NextRequest) {
  await connectDb();

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
    const tokenPayload: tokenTypes = {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
    };
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    // check if the user already has a wallet created or not
    if (user.isWalletCreated === false) {
      try {
        await Wallet.create({
          name: "Personal-Wallet",
          type: "Personal",
          balanceInMin: 0,
          members: [
            {
              userId: user._id,
              totalContribution: 0,
            },
          ],
        });
        user.isWalletCreated = true;
        await user.save();
      } catch (error) {
        return NextResponse.json(
          {
            message:
              "There was some problem while creating wallet during login",
            error,
          },
          { status: 400 }
        );
      }
    }

    // response
    const response = NextResponse.json(
      {
        message: "User login successfull",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isWalletCreated: user.isWalletCreated,
          isVerified: user.isVerified,
          isAdmin: user.isAdmin,
        },
        success: true,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
