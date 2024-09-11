"use server";

import { Octokit } from "@octokit/rest";
import { getGitHubToken } from "./get-github-token";
import { decryptToken } from "@/lib/token-encryption";

async function fetchCommitsForRepo(octokit: Octokit, owner: string, repo: string, since: string) {
  try {
    const commits = await octokit.paginate(octokit.repos.listCommits, {
      owner,
      repo,
      per_page: 100,
      since,
      headers: {
        "If-None-Match": "" // Bypass GitHub's cache
      }
    });

    return commits.map((commit) => ({
      date: commit.commit.author?.date,
    }));
  } catch (error) {
    console.error(`Error fetching commits for ${repo}:`, error);
    return [];
  }
}

async function fetchAllCommits(octokit: Octokit) {
  const user = await octokit.users.getAuthenticated();
  const repos = await octokit.paginate(octokit.repos.listForAuthenticatedUser, {
    per_page: 100,
    sort: 'pushed',
    direction: 'desc'
  });

  const thirtyDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const commitPromises = repos.map(repo => 
    fetchCommitsForRepo(octokit, user.data.login, repo.name, thirtyDaysAgo)
  );

  const allCommits = await Promise.all(commitPromises);
  return allCommits.flat();
}

function processCommitsByDate(commits: any[]) {
  const commitsByDate = new Map<string, number>();
  const thirtyDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Initialize all dates in the last 30 days with 0 commits
  for (let d = new Date(thirtyDaysAgo); d <= new Date(); d.setDate(d.getDate() + 1)) {
    commitsByDate.set(d.toISOString().split('T')[0], 0);
  }

  // Count commits for each date
  commits.forEach((commit) => {
    if (commit.date) {
      const date = new Date(commit.date).toISOString().split('T')[0];
      if (commitsByDate.has(date)) {
        commitsByDate.set(date, commitsByDate.get(date)! + 1);
      }
    }
  });

  // Convert to array and sort by date
  return Array.from(commitsByDate.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getCommitData() {
  try {
    const encryptedToken = await getGitHubToken();
    const token = decryptToken(encryptedToken);

    const octokit = new Octokit({ auth: token });
    const commits = await fetchAllCommits(octokit);

    const processedCommits = processCommitsByDate(commits);

    return processedCommits;
  } catch (error) {
    console.error("Error fetching commit data:", error);
    throw new Error("Failed to fetch commit data");
  }
}