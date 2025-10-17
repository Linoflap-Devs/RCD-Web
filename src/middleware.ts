import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Protect dashboard and agents routes
  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/agents") ||
      req.nextUrl.pathname.startsWith("/agents-registration") ||
      req.nextUrl.pathname.startsWith("/agents-registration/approval")
    )
  ) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/agents/:path*", 
    "/agents-registration/:path*", 
    "/agents-registration/approval/:path*"
  ],
};
