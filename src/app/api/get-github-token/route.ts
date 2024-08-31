import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        console.log(session);
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await prisma.user.findFirst({
            where: { id: session.user.id },
            select: { accessToken: true },
        });

        if (!user || !user.accessToken) {
            return NextResponse.json(
                { error: "GitHub token not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ token: user.accessToken });
    } catch (error) {
        console.error("Error fetching GitHub token:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
