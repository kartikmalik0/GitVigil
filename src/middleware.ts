import { NextResponse } from "next/server";
import { auth } from "@/auth";

const allowedPathsRegex = /^\/($|login|api\/auth\/session)/;
const isStaticFile = (pathname: string) => /^\/_next\/|^\/static\/|\./.test(pathname);

export default auth((req) => {
    const { pathname, origin } = req.nextUrl;

    if (
        !req.auth &&
        !allowedPathsRegex.test(pathname) &&
        !isStaticFile(pathname)
    ) {
        return NextResponse.redirect(new URL("/login", origin));
    }

    if (req.auth && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", origin));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
