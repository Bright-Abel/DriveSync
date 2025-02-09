import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMiddleWareUser } from "./lib/actions/texting";

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("appwrite-session");
  const url = req.nextUrl.clone();

  // Redirect to login if no session cookie
  if (!cookie) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  try {
    const user = await getMiddleWareUser();

    if (!user) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
    const isVerified = user.emailVerification;
    if (isVerified) {
      if (
        url.pathname.startsWith("/verify") ||
        url.pathname.startsWith("/auth")
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } else {
      if (
        url.pathname.startsWith("/dashboard") ||
        url.pathname.startsWith("/auth")
      ) {
        return NextResponse.redirect(
          new URL("/verify/email-verification", req.url)
        );
      }
    }
    // } else if (!user.emailVerification && cookie) {
    //   if (
    //     url.pathname.startsWith("/auth") ||
    //     url.pathname.startsWith("/dashboard")
    //   ) {
    //     return NextResponse.redirect(
    //       new URL("/verify/email-verification", req.url)
    //     );
    //   }
    // }
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/verify/:path*", "/auth/:path*"],
};
