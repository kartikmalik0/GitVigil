import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Octokit } from "octokit";

const REPO_NAME = "github-streak-manager";
const REPO_DESCRIPTION = "Repository for managing GitHub contribution streak";
const FILE_PATH = "streak.md";

export default async function Home() {
    const session = await auth();
    if (!session?.user?.token) {
        return (
            <MaxWidthWrapper>
                <p>Please log in to manage your streak.</p>
            </MaxWidthWrapper>
        );
    }

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });

    try {
        const { data: userData } = await octokit.rest.users.getAuthenticated();
        console.log("Authenticated user:", userData);

        // Check if the repository exists
        let repo;
        let repoJustCreated = false;
        try {
            const { data: repoData } = await octokit.rest.repos.get({
                owner: userData.login,
                repo: REPO_NAME,
            });
            repo = repoData;
        } catch (error) {
            if (error.status === 404) {
                // Repository doesn't exist, create it
                const { data: newRepoData } = await octokit.rest.repos.createForAuthenticatedUser({
                    name: REPO_NAME,
                    description: REPO_DESCRIPTION,
                    private: false,
                });
                repo = newRepoData;
                repoJustCreated = true;
                console.log("Repository created:", repo);
            } else {
                throw error;
            }
        }

        // Get the current date
        const currentDate = new Date().toISOString().split('T')[0];

        // Check if a file exists and get its content
        let fileContent = "";
        let fileSha = "";
        if (!repoJustCreated) {
            try {
                const { data: fileData } = await octokit.rest.repos.getContent({
                    owner: userData.login,
                    repo: REPO_NAME,
                    path: FILE_PATH,
                });
                fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
                fileSha = fileData.sha;
            } catch (error) {
                if (error.status !== 404) {
                    throw error;
                }
            }
        }

        // Update file content with the new date
        const updatedContent = fileContent ? `${fileContent}\n${currentDate}` : currentDate;

        // Create or update the file
        const { data: commitData } = await octokit.rest.repos.createOrUpdateFileContents({
            owner: userData.login,
            repo: REPO_NAME,
            path: FILE_PATH,
            message: `Update streak for ${currentDate}`,
            content: Buffer.from(updatedContent).toString('base64'),
            sha: fileSha || undefined,
        });

        console.log("Commit created:", commitData);

        return (
            <MaxWidthWrapper>
                <h1>Streak Updated Successfully!</h1>
                <p>Date added: {currentDate}</p>
                <p>Repository: {repoJustCreated ? "Newly created" : "Existing"}</p>
                <p>File: {fileSha ? "Updated" : "Created"}</p>
            </MaxWidthWrapper>
        );
    } catch (error: any) {
        console.error("Error managing streak:", error.message);
        if (error.response) {
            console.error("Error response:", error.response.data);
        }
        return (
            <MaxWidthWrapper>
                <p>Error managing streak: {error.message}</p>
            </MaxWidthWrapper>
        );
    }
}