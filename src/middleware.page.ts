import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("token");

  if (request.nextUrl.pathname.startsWith("/auth") && cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname == "/" && !cookie) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    (request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/user")) &&
    !cookie
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/user/:path*", "/auth/:path*", "/admin/:path*"],
};
