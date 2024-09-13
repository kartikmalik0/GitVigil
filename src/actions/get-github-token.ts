"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";

const TOKEN_EXPIRATION = 3600; // 1 hour in seconds

export async function getGitHubToken(): Promise<string> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const cacheKey = `git-token:${session.user.id}`;

    console.time("Redis Query Time");
    const cachedToken = await redis.get<string>(cacheKey);
    console.timeEnd("Redis Query Time");

    if (cachedToken) {
      return cachedToken;
    }

    console.time("DB Query Time");
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { accessToken: true },
    });
    console.timeEnd("DB Query Time");

    if (!user?.accessToken) {
      throw new Error("GitHub token not found for user");
    }

    console.time("Redis Set Time");
    await redis.set(cacheKey, user.accessToken, {
      ex: TOKEN_EXPIRATION
    });
    console.timeEnd("Redis Set Time");

    return user.accessToken;
  } catch (error) {
    console.error("Error fetching GitHub token:", error);
    throw error;
  }
}