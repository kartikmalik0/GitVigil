"use server";

import { revalidatePath } from "next/cache";
import { Octokit } from "octokit";
import crypto from "crypto";
import { getGitHubToken } from "./get-github-token";
import { decryptToken } from "@/lib/token-encryption";

export async function createGitStreakRepo() {
    try {
        const token = await getGitHubToken();
        const decryptGitToken = decryptToken(token);
        const octokit = new Octokit({ auth: decryptGitToken });

        const repoName = "git-streak-maintain";
        const fileName = "streak.txt";
        const { data: user } = await octokit.rest.users.getAuthenticated();

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
        const commitMessage = `Update streak: ${date.toISOString().split("T")[0]}`;
        const newContent = generateRandomContent();

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

        if (existingFile && 'sha' in existingFile) {
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

        console.log(`File ${fileName} updated in ${repoName} with message: ${commitMessage}`);

        revalidatePath("/dashboard");
        return {
            success: true,
            message: "Git streak repository updated successfully.",
        };
    } catch (error: any) {
        console.error("Error managing GitHub repository:", error);
        return {
            success: false,
            message: error.message || "An error occurred while managing the repository.",
        };
    }
}

function generateRandomContent() {
    const randomString = crypto.randomBytes(16).toString("hex");
    const date = new Date().toISOString();
    return `Streak updated on: ${date}\nRandom content: ${randomString}`;
}