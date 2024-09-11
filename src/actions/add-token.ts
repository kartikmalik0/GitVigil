'use server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { encryptToken } from '@/lib/token-encryption'
import { revalidatePath } from 'next/cache'


type ActionResult = {
    success: boolean;
    message: string;
};


export async function upsertGithubToken(token: string): Promise<ActionResult> {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized")
    }
    try {
        // Encrypt the token before storing
        const encryptedToken = encryptToken(token)
        await prisma.user.upsert({
            where: { id: session.user.id },
            update: { accessToken: encryptedToken },
            create: {
                id: session.user.id,
                accessToken: encryptedToken,
            },
        })
        revalidatePath('/dashboard')
        return { success: true, message: 'GitHub token updated successfully' }
    } catch (error) {
        console.error('Error updating GitHub token:', error)
        return { success: false, message: 'Failed to update GitHub token' }
    } finally {
        await prisma.$disconnect()
    }
}