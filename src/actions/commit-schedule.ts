'use server'

import { revalidatePath } from 'next/cache'
import { CommitSchedule, CommitScheduleSchema } from '@/types/commitSchedule'
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function saveCommitSchedule(data: CommitSchedule | null) {
  const validatedData = CommitScheduleSchema.parse(data);
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const userId = session.user.id;

  await prisma.commitSchedule.upsert({
    where: { userId_frequency: { userId, frequency: validatedData.frequency } },
    update: validatedData,
    create: { ...validatedData, userId },
  });

}