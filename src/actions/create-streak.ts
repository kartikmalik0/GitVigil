"use server";

// import { revalidatePath } from "next/cache";
import { Octokit } from "octokit";
import { getGitHubToken } from "./get-github-token";
import { decryptToken, generateRandomContent } from "@/lib/token-encryption";
import prisma from "@/lib/prisma";
import { generateEmail } from "./send-email";

export async function createGitStreakRepo(userId?: string) {
    if (!userId) {
        console.log('No userId provided, using default value or skipping.');
        // Perform your logic without userId here
      }
    try {
        let token;
        if (userId) {
            // If userId is provided, fetch the token from the database
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { accessToken: true },
            });
            if (!user || !user.accessToken) {
                throw new Error("User not found or GitHub token not available");
            }
            token = user.accessToken;
        } else {
            // If no userId, use the getGitHubToken function (for non-scheduled calls(
            token = await getGitHubToken();
        }

        const decryptGitToken = await decryptToken(token);
        const octokit = new Octokit({ auth: decryptGitToken });

        const repoName = "git-streak-maintain-2";
        const fileName = "streak.txt";
        const { data: user } = await octokit.rest.users.getAuthenticated();
        const { data: emails } = await octokit.rest.users.listEmailsForAuthenticatedUser();

        const primaryEmail = emails.find((email: any) => email.primary && email.verified);

        if (!primaryEmail) {
            throw new Error("Primary verified email not found for the user.");
        }
        
        console.log("Primary email:", primaryEmail.email);
        
        // Check if the repository already exists
        try {
            await octokit.rest.repos.get({
                owner: user.login,
                repo: repoName,
            });
            console.log(`Repository ${repoName} already exists.`);
        } catch (error: any) {
            if (error.status === 404) {
                // Create the repository if it doesn't exist
                await octokit.rest.repos.createForAuthenticatedUser({
                    name: repoName,
                    private: true,
                    auto_init: true,
                });
                console.log(`Private repository ${repoName} created.`);
            } else {
                throw error;
            }
        }

        // Create or update the streak file
        const date = new Date();
        const commitMessage = `Update streak: ${
            date.toISOString().split("T")[0]
        }`;
        const newContent =  generateRandomContent();

        // Check if the file already exists
        let existingFile;
        try {
            const { data } = await octokit.rest.repos.getContent({
                owner: user.login,
                repo: repoName,
                path: fileName,
            });
            existingFile = data;
        } catch (error: any) {
            if (error.status !== 404) throw error;
        }

        if (existingFile && "sha" in existingFile) {
            // Update existing file
            await octokit.rest.repos.createOrUpdateFileContents({
                owner: user.login,
                repo: repoName,
                path: fileName,
                message: commitMessage,
                content: Buffer.from(newContent).toString("base64"),
                sha: existingFile.sha,
            });
        } else {
            // Create new file
            await octokit.rest.repos.createOrUpdateFileContents({
                owner: user.login,
                repo: repoName,
                path: fileName,
                message: commitMessage,
                content: Buffer.from(newContent).toString("base64"),
            });
        }
        await generateEmail(primaryEmail.email)
        // revalidatePath("/dashboard");
        return {
            success: true,
            message: "Git streak repository updated successfully.",
        };
    } catch (error: any) {
        console.error("Error managing GitHub repository:", error);
        return {
            success: false,
            message:
                error.message ||
                "An error occurred while managing the repository.",
        };
    }
}


