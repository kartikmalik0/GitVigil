export const dynamic = 'force-dynamic'

import HomePage from "@/components/home/HomePage";
import MaxWidhtWrapper from "@/components/MaxWidthWrapper";

export default function Home() {

  return (
    <MaxWidhtWrapper>
      <HomePage />
    </MaxWidhtWrapper>
  );
}

