import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { tokenTypes } from "@/app/api/users/login/route";

// public api that anyone can hit
const PUBLIC_API: string[] = ["/api/users"];

// private api that only user with token can hit
const PRIVATE_API: string[] = ["/api/wallet"];

// paths that user can hit when they have no token
const NO_TOKEN_PATH: string[] = ["/auth"];

// paths that user can hit when they have  token
const TOKEN_PATH: string[] = ["/overview"];

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  let user: tokenTypes | null = null;

  if (token) {
    try {
      // verify token and get user from it
      user = jwt.verify(token, process.env.TOKEN_SECRET!) as tokenTypes;
    } catch (error: any) {
      user = null;
    }
  }

  const headers = new Headers(req.headers);

  //   LOGIC FOR PUBLIC API THAT ANYONE CAN HIT
  if (PUBLIC_API.some((p) => path.startsWith(p)) && path !== "/api/users/me") {
    return NextResponse.next();
  }

  //   LOGIC FOR API THAT ONLY PEOPLE WITH TOKEN CAN HIT
  if (TOKEN_PATH.some((p) => path.startsWith(p))) {
    if (user) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  //  LOGIC FOR PATH THAT ONLY PEOPLE WITH NO TOKEN CAN SEE
  if (NO_TOKEN_PATH.some((p) => path.startsWith(p)) || path === "/") {
    if (!user) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/overview", req.url));
    }
  }

  //   LOGIC FOR PATH THAT ONLY PEOPLE WITH TOKEN CAN SEE
  if (PRIVATE_API.some((p) => path.startsWith(p)) || path === "/api/users/me") {
    if (user) {
      headers.set("x-user-id", user.id.toString());
      return NextResponse.next({
        request: { headers },
      });
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // everything except static assets
  ],
};
