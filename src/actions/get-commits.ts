// app/actions/getCommitData.ts
"use server";

import { getGitHubToken } from "./get-github-token";

export async function getCommitData() {
    try {
        const encryptedToken = await getGitHubToken();

        const response = await fetch(
            "https://gitvgil-get-commit.kartik20044.workers.dev",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ encryptedToken }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch commit data");
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching commit data:", error);
        throw new Error("Failed to fetch commit data");
    }
}

