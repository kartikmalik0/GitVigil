import { auth } from "@/auth";
import MaxWidhtWrapper from "@/components/MaxWidthWrapper";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

export default async function Home() {
  const session = await auth()
  console.log(session?.user.token)
  return (
    <MaxWidhtWrapper>
      hello
    </MaxWidhtWrapper>
  );
}