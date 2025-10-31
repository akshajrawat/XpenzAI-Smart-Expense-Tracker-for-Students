import connectDb from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

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
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
