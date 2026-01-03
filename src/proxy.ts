import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicRoutes = [
    "/login",
    "/register",
    "/api/auth/signin",
    "/api/auth",
    "/favicon.ico",
    "/_next",
  ];
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log("Token:", token);
  console.log(req.url);
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    console.log(loginUrl);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

// req -> middleware -> server
// login, register, apr, auth
//  home
