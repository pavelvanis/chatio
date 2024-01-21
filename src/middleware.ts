import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/jwt";
import { InvalidTokenError } from "jwt-decode";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  try {
    const token = req.headers
      .get("Authorization")
      ?.replace("Bearer", "")
      .trim();

    // Returned when token exist and is varified
    if (token && verifyJwt(token)) return;
    // Throw JwtError
    else throw new InvalidTokenError("Invalid token");
  } catch (error) {
    console.error(error);
    if (error instanceof InvalidTokenError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 401 }
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/api/servers/:path*",
    "/api/member-ships/:path*",
    "/api/messages/:path*",
    "/api/chat/:path*",
    "/api/users/:path*",
  ],
};
