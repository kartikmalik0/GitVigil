"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGitHubToken() {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return "NO_TOKEN";
        }

        const user = await prisma.user.findFirst({
            where: { id: session.user.id },
            select: { accessToken: true },
        });
        if (!user) {
            return "NO_TOKEN";
        }
        if (!user.accessToken) {
            return "NO_TOKEN";
        }

        return user.accessToken;
    } catch (error: any) {
        console.error("Error fetching GitHub token:", error);
        return "NO_TOKEN";
    } finally {
        await prisma.$disconnect();
        // revalidatePath("/");
    }
}
