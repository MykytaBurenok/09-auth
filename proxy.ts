import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/notes"];
const publicAuthRoutes = ["/sign-in", "/sign-up"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session-token")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPublicAuthRoute = publicAuthRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!sessionCookie && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (sessionCookie && isPublicAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/sign-in", "/sign-up"],
};
