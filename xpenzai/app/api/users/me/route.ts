import connectDb from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getInformationFromToken } from "@/utils/getInfoFromToken";

export async function GET(request: NextRequest) {
  await connectDb();

  try {
    // extract id from token

    const id = await getInformationFromToken(request);
    if (!id) {
      return NextResponse.json(
        { message: "Id did not received in api/me" },
        { status: 404 }
      );
    }

    //   get the user from the database
    const user = await User.findById(id).select("-password");

    if (!user) {
      const res = NextResponse.json(
        { message: "User not found in api/me" },
        { status: 404 }
      );
      res.cookies.delete("token");
      return res;
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
