import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub, Google],
    pages: {
        signIn: "/login",
    },
    // cookies: {
    //     csrfToken: {
    //       name: "next-auth.csrf-token",
    //       options: {
    //         httpOnly: true,
    //         sameSite: "none",
    //         path: "/",
    //         secure: false,
    //       },
    //     },
    //   },
});
