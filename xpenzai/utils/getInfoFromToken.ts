import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { tokenTypes } from "@/app/api/users/login/route";


export async function getInformationFromToken(request: NextRequest) {
  try {
    // extract token
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { message: "Token Invalid or Does not exist" },
        { status: 404 }
      );
    }
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as tokenTypes;

    return decodedToken.id;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
