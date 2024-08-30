import { auth } from "@/auth";
import HomePage from "@/components/home/HomePage";
import MaxWidhtWrapper from "@/components/MaxWidthWrapper";
import { Octokit } from "octokit";

export default async function Home() {

  return (
    <MaxWidhtWrapper>
      <HomePage />
    </MaxWidhtWrapper>
  );
}

