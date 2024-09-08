"use server";

import { decryptToken } from "@/lib/token-encryption";
import { getGitHubToken } from "./get-github-token";
import { Octokit } from "octokit";

export async function getUser() {
    try {
        const encryptedToken = await getGitHubToken();
        const token = decryptToken(encryptedToken);

        const octokit: Octokit = new Octokit({ auth: token });
        const user = await octokit.rest.users.getAuthenticated();
        return user;
    } catch (error) {
        throw new Error("Unbale to fetch User");
    }
}
