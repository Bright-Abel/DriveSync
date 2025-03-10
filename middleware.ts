import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMiddleWareUser } from "./lib/actions/texting";

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("appwrite-session");
  const url = req.nextUrl.clone();
  const path = url.pathname;

  if (path === "/") {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  if (!cookie) {
    // Allow access to sign-in and sign-up pages
    if (
      !path.startsWith("/auth/sign-in") &&
      !path.startsWith("/auth/sign-up")
    ) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  } else {
    try {
      const user = await getMiddleWareUser();

      if (!user) {
        // Allow unauthenticated users to sign in or sign up
        if (
          !path.startsWith("/auth/sign-in") &&
          !path.startsWith("/auth/sign-up")
        ) {
          return NextResponse.redirect(new URL("/auth/sign-in", req.url));
        }
      }

      const isVerified = user.emailVerification;

      if (isVerified) {
        // Redirect verified users away from auth pages
        if (path.startsWith("/verify") || path.startsWith("/auth")) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } else {
        // Redirect unverified users to email verification page, but allow them to access it
        if (
          path.startsWith("/dashboard") ||
          path.startsWith("/auth")
          // !path.includes("/email-verification")
        ) {
          return NextResponse.redirect(
            new URL("/verify/email-verification", req.url)
          );
        }
      }
    } catch (error) {
      if (
        !path.startsWith("/auth/sign-in") &&
        !path.startsWith("/auth/sign-up")
      ) {
        return NextResponse.redirect(new URL("/auth/sign-in", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/verify/:path*", "/auth/:path*", "/"],
};
