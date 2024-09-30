'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function deleteScheduledCommit(formData: FormData) {
  const session = await auth()
  
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const id = formData.get('id')

  if (!id || typeof id !== 'string') {
    throw new Error('Invalid commit id')
  }

  try {
    await prisma.commitSchedule.delete({
      where: { id, userId: session.user.id },
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to delete scheduled commit:', error)
    throw new Error('Failed to delete scheduled commit')
  }
}