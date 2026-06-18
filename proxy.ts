import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

const isPrivateRoute = (pathname: string) =>
  privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

const isPublicRoute = (pathname: string) =>
  publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession =
    request.cookies.get("token") ||
    request.cookies.get("session") ||
    request.cookies.get("refreshToken");

  if (isPrivateRoute(pathname) && !hasSession) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicRoute(pathname) && hasSession) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
