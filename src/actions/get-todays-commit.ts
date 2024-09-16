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
      sha: commit.sha,
      message: commit.commit.message,
      date: commit.commit.author?.date,
      author: commit.commit.author?.name,
      repo: repo,
      url: commit.html_url,
    }));
  } catch (error) {
    console.error(`Error fetching commits for ${repo}:`, error);
    return [];
  }
}

async function fetchTodayCommits(octokit: Octokit) {
  const user = await octokit.users.getAuthenticated();
  const repos = await octokit.paginate(octokit.repos.listForAuthenticatedUser, {
    per_page: 100,
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const commitPromises = repos.map(repo => 
    fetchCommitsForRepo(octokit, user.data.login, repo.name, today.toISOString())
  );

  const allCommits = await Promise.all(commitPromises);
  return allCommits.flat();
}

function processCommits(commits: any[]) {
  const commitsByRepo = new Map<string, number>();
  
  commits.forEach((commit) => {
    if (commit.repo) {
      commitsByRepo.set(commit.repo, (commitsByRepo.get(commit.repo) || 0) + 1);
    }
  });

  return {
    totalCommits: commits.length,
    commitsByRepo: Array.from(commitsByRepo.entries()).map(([repo, count]) => ({
      repo,
      count,
    })),
    commits: commits,
  };
}

export async function getCurrentDayCommitData() {
  try {
    const encryptedToken = await getGitHubToken();
    const token = await decryptToken(encryptedToken);
    console.log(token)
    const octokit = new Octokit({ auth: token });
    
    // Check rate limit before making requests
    const { data: rateLimit } = await octokit.rest.rateLimit.get();
    console.log("API Rate Limit:", rateLimit);
    
    if (rateLimit.resources.core.remaining < 100) {
      throw new Error("GitHub API rate limit is too low to proceed safely");
    }

    const commits = await fetchTodayCommits(octokit);
    const processedCommits = processCommits(commits);
    return processedCommits;
  } catch (error) {
    console.error("Error fetching commit data:", error);
    throw new Error("Failed to fetch commit data");
  }
}