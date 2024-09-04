"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGitHubToken() {
    try {
        const session = await auth();
        console.log(session);
        if (!session || !session.user || !session.user.id) {
            throw new Error("Unauthorized");
        }

        const user = await prisma.user.findFirst({
            where: { id: session.user.id },
            select: { accessToken: true },
        });
        if (!user || !user.accessToken) {
            throw new Error("GitHub token not found");
        }

        return user.accessToken;
    } catch (error: any) {
        console.error("Error fetching GitHub token:", error);
        throw new Error(error.message || "Internal server error");
    } finally {
        await prisma.$disconnect();
        revalidatePath("/dashboard");
    }
}
