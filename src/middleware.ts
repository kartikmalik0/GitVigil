import { NextResponse } from 'next/server';
import { auth as middleware } from "@/auth";

export default middleware((req) => {
  const allowedPaths = ["/", "/login", "http://localhost:3000/api/auth/session"];
  const { pathname, origin } = req.nextUrl;

  // Check if the request is for a static file
  const isStaticFile = pathname.startsWith("/_next/") || pathname.startsWith("/static/") || pathname.includes(".");

  if (!req.auth && !allowedPaths.includes(pathname) && !isStaticFile) {
    const newUrl = new URL("/login", origin);
    return NextResponse.redirect(newUrl);
  }

  // If user is authenticated and trying to access /login, redirect to /dashboard or /
  if (req.auth && pathname === "/login") {
    const dashboardUrl = new URL("/dashboard", origin);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};