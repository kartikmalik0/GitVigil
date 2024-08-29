import { auth } from "@/auth";
import HomePage from "@/components/home/HomePage";
import MaxWidhtWrapper from "@/components/MaxWidthWrapper";
import { Octokit } from "octokit";

export default async function Home() {
  // const session = await auth();

  // if (!session?.user?.token) {
  //   return (
  //     <MaxWidhtWrapper>
  //       <p>Please log in to create a repository.</p>
  //     </MaxWidhtWrapper>
  //   );
  // }

  // const octokit = new Octokit({
  //   auth: "asdkfikasdf"
  //   // "",
  // });

  // try {
  //   // Check token scopes
  //   const { headers } = await octokit.request('GET /');
  //   console.log('Token scopes:', headers['x-oauth-scopes']);

  //   // Check rate limit
  //   const { data: rateLimit } = await octokit.rest.rateLimit.get();
  //   console.log('API Rate Limit:', rateLimit);

  //   const { data: userData } = await octokit.rest.users.getAuthenticated();
  //   console.log("Authenticated user:", userData);

  //   const repoName = "my-new-repo";
  //   const repoDescription = "My new repository";

  //   const { data: repoData } = await octokit.rest.repos.createForAuthenticatedUser({
  //     name: repoName,
  //     description: repoDescription,
  //     private: false,
  //   });

  //   console.log("Repository created:", repoData);

  //   return (
  //     <MaxWidhtWrapper>
  //       <h1>Repository Created Successfully!</h1>
  //     </MaxWidhtWrapper>
  //   );
  // } catch (error: any) {
  //   console.error("Error creating repository:", error.message);
  //   if (error.response) {
  //     console.error("Error response:", error.response.data);
  //   }
  return (
    <MaxWidhtWrapper>
      <HomePage />
    </MaxWidhtWrapper>
  );
}
