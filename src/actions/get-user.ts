"use server";
import { Octokit } from "octokit";
import { decryptToken } from "@/lib/token-encryption";
import { getGitHubToken } from "./get-github-token";
import { redis } from "@/lib/redis";
import { auth } from "@/auth";

interface GitHubUser {
    avatar_url: string;
    name?: string | null;
    bio?: string | null;
    html_url: string;
    followers: number | null
    following : number | null
}

export async function getUser(): Promise<{ data: GitHubUser }> {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    const cacheKey = `git-user:${session.user.id}`;

    try {
        const encryptedToken = await getGitHubToken();
        const token = decryptToken(encryptedToken);
        const octokit: Octokit = new Octokit({ auth: token });
        console.time("Redis user");

        const cachedUser = await redis.get(cacheKey);

        if (cachedUser) {
            // Check if cachedUser is already an object
            if (typeof cachedUser === "object" && cachedUser !== null) {
                return cachedUser as { data: GitHubUser };
            } else if (typeof cachedUser === "string") {
                return JSON.parse(cachedUser) as { data: GitHubUser };
            }
        }

        const { data } = await octokit.rest.users.getAuthenticated();
        if (data) {
            const userData: GitHubUser = {
                avatar_url: data.avatar_url,
                name: data.name,
                bio: data.bio,
                html_url: data.html_url,
                followers: data.followers,
                following: data.following
                // We can add more propertiues here
            };
            await redis.set(cacheKey, JSON.stringify({ data: userData }));
            return { data: userData };
        }

        throw new Error("Unable to fetch User");
    } catch (error: any) {
        if (error.message.includes("GitHub token not found")) {
            throw new Error("GitHub token not found");
        }
        throw new Error("Unable to fetch User");
    }
}
