// import { NextResponse } from "next/server";
// import { auth as middleware } from "@/auth";
// import { getGitHubToken } from "./actions/get-github-token";

// export default middleware(async (req) => {
//     const { pathname, origin } = req.nextUrl;

//     const allowedPaths = ["/", "/login", "http://localhost:3000/api/auth/session"];
//     const isStaticFile = pathname.startsWith("/_next/") || pathname.startsWith("/static/") || pathname.includes(".");

//     if (!req.auth && !allowedPaths.includes(pathname) && !isStaticFile) {
//         return NextResponse.redirect(new URL("/login", origin));
//     }

//     if (req.auth && pathname === "/login") {
//         return NextResponse.redirect(new URL("/dashboard", origin));
//     }

//     if (pathname === "/dashboard") {
//         const token = await getGitHubToken();
//         if (token === "NO_TOKEN") {
//             return NextResponse.redirect(new URL("/", origin));
//         }
//     }

//     return NextResponse.next();
// });

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getGitHubToken } from "./actions/get-github-token";

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

    if (pathname === "/dashboard") {
        return getGitHubToken().then((token) =>
            token === "NO_TOKEN"
                ? NextResponse.redirect(new URL("/", origin))
                : NextResponse.next()
        );
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
