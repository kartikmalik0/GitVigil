"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function getGitHubToken(): Promise<string> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { accessToken: true },
    });

    if (!user?.accessToken) {
      throw new Error("GitHub token not found for user");
    }

    return user.accessToken;
  } catch (error) {
    console.error("Error fetching GitHub token:", error);
    throw error;
  }
}