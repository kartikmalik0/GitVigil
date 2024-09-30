import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
  
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }
  
    try {
      const commits = await prisma.commitSchedule.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
      })
      return NextResponse.json(commits)
    } catch (error) {
      console.error('Failed to fetch scheduled commits:', error)
      return NextResponse.json({ error: 'Failed to fetch scheduled commits' }, { status: 500 })
    }
  }