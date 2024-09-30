import { NextResponse } from "next/server";
import { auth as middleware } from "@/auth";
import { getGitHubToken } from "./actions/get-github-token";

export default middleware(async (req) => {
    const { pathname, origin } = req.nextUrl;

    const allowedPaths = ["/", "/login", "http://localhost:3000/api/auth/session"];
    const isStaticFile = pathname.startsWith("/_next/") || pathname.startsWith("/static/") || pathname.includes(".");

    if (!req.auth && !allowedPaths.includes(pathname) && !isStaticFile) {
        return NextResponse.redirect(new URL("/login", origin));
    }

    if (req.auth && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", origin));
    }

    if (pathname === "/dashboard") {
        const token = await getGitHubToken();
        if (token === "NO_TOKEN") {
            return NextResponse.redirect(new URL("/", origin));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};