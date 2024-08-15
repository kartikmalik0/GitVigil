import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: " repo", // Add 'repo' scope here
                },
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token, user }) {
            const getToken = await prisma.account.findFirst({
                where: {
                    userId: user.id,
                },
            });

            let accessToken: string | null = null;
            if (getToken) {
                accessToken = getToken.access_token!;
            }

            session.user.token = accessToken;
            return session;
        },
    },
});
