// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}
