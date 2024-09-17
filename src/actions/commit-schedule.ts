'use server'

import { revalidatePath } from 'next/cache'
import { CommitSchedule, CommitScheduleSchema } from '@/types/commitSchedule'
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function saveCommitSchedule(data: CommitSchedule & { timeZone: string }) {
  console.log("Received data:", data);
  try {
    const validatedData = CommitScheduleSchema.parse(data);
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('User not authenticated');
    }

    const userId = session.user.id;

    // Convert customDate back to Date object if it's a string
    if (validatedData.frequency === 'custom' && typeof validatedData.customDate === 'string') {
      validatedData.customDate = new Date(validatedData.customDate);
    }

    const result = await prisma.commitSchedule.upsert({
      where: { userId_frequency: { userId, frequency: validatedData.frequency } },
      update: { ...validatedData, timeZone: data.timeZone },
      create: { ...validatedData, userId, timeZone: data.timeZone },
    });

    console.log("Upsert result:", result);

    revalidatePath('/dashboard'); // Adjust this path as needed
    return { success: true };
  } catch (error) {
    console.error("Error in saveCommitSchedule:", error);
    throw error;
  }
}