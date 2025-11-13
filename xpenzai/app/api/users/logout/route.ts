import connectDb from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDb();
  
  try {
    const response = NextResponse.json(
      { message: "Logout Successfull" },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
