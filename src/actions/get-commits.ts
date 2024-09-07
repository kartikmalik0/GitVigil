// File: app/actions/githubCommits.ts
"use server";

import { Octokit } from "@octokit/rest";
import { getGitHubToken } from "./get-github-token";
import { decryptToken } from "@/lib/token-encryption";

async function fetchAllCommits(octokit: Octokit) {
  const user = await octokit.users.getAuthenticated();
  const repos = await octokit.paginate(
    octokit.repos.listForAuthenticatedUser,
    {
      per_page: 100,
    }
  );

  let allCommits: any[] = [];

  for (const repo of repos) {
    try {
      const commits = await octokit.paginate(octokit.repos.listCommits, {
        owner: user.data.login,
        repo: repo.name,
        per_page: 100,
        since: new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(), // Last 30 days
      });

      allCommits = allCommits.concat(
        commits.map((commit) => ({
        //   sha: commit.sha,
        //   message: commit.commit.message,
          date: commit.commit.author?.date,
        //   author: commit.commit.author?.name,
        //   repo: repo.name,
        }))
      );
    } catch (error) {
      console.error(`Error fetching commits for ${repo.name}:`, error);
    }
  }

  return allCommits;
}

function processCommitsByDate(commits: any[]) {
  const commitsByDate: { [key: string]: number } = {};

  // Get the date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Initialize all dates in the last 30 days with 0 commits
  for (let d = new Date(thirtyDaysAgo); d <= new Date(); d.setDate(d.getDate() + 1)) {
    commitsByDate[d.toISOString().split('T')[0]] = 0;
  }

  // Count commits for each date
  commits.forEach((commit) => {
    if (commit.date) {
      const date = new Date(commit.date).toISOString().split('T')[0];
      if (commitsByDate.hasOwnProperty(date)) {
        commitsByDate[date]++;
      }
    }
  });

  // Convert to array and sort by date
  return Object.entries(commitsByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getCommitData() {
  try {
    const encryptedToken = await getGitHubToken();
    const token = decryptToken(encryptedToken);

    const octokit = new Octokit({ auth: token });
    const commits = await fetchAllCommits(octokit);

    // console.log("Total commits fetched:", commits.length);

    const processedCommits = processCommitsByDate(commits);
    // console.log("Processed commits:", processedCommits);

    return processedCommits; // Return processed commit data
  } catch (error) {
    console.error("Error fetching commit data:", error);
    throw new Error("Failed to fetch commit data");
  }
}