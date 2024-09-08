"use server";

import { Octokit } from "@octokit/rest";
import { getGitHubToken } from "./get-github-token";
import { decryptToken } from "@/lib/token-encryption";

async function fetchTodayCommits(octokit: Octokit) {
  const user = await octokit.users.getAuthenticated();
  const repos = await octokit.paginate(
    octokit.repos.listForAuthenticatedUser,
    {
      per_page: 100,
    }
  );

  let todayCommits: any[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const repo of repos) {
    try {
      const commits = await octokit.paginate(octokit.repos.listCommits, {
        owner: user.data.login,
        repo: repo.name,
        per_page: 100,
        since: today.toISOString(),
      });

      todayCommits = todayCommits.concat(
        commits.map((commit) => ({
          sha: commit.sha,
          message: commit.commit.message,
          date: commit.commit.author?.date,
          author: commit.commit.author?.name,
          repo: repo.name,
          url: commit.html_url,
        }))
      );
    } catch (error) {
      console.error(`Error fetching commits for ${repo.name}:`, error);
    }
  }

  return todayCommits;
}

function processCommits(commits: any[]) {
  const commitsByRepo: { [key: string]: number } = {};

  commits.forEach((commit) => {
    if (commit.repo) {
      commitsByRepo[commit.repo] = (commitsByRepo[commit.repo] || 0) + 1;
    }
  });

  return {
    totalCommits: commits.length,
    commitsByRepo: Object.entries(commitsByRepo).map(([repo, count]) => ({ repo, count })),
    commits: commits,
  };
}

export async function getCommitData() {
  try {
    const encryptedToken = await getGitHubToken();
    const token = decryptToken(encryptedToken);

    const octokit = new Octokit({ auth: token });
    const commits = await fetchTodayCommits(octokit);

    const processedCommits = processCommits(commits);
    return processedCommits;
  } catch (error) {
    console.error("Error fetching commit data:", error);
    throw new Error("Failed to fetch commit data");
  }
}