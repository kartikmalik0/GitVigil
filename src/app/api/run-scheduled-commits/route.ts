import { NextResponse } from 'next/server';
import { checkAndRunScheduledCommits } from '@/lib/schedulingService';

export async function GET() {
  console.log('GET request received for /api/scheduledCommits');
  try {
    console.log('Starting checkAndRunScheduledCommits');
    await checkAndRunScheduledCommits();
    console.log('checkAndRunScheduledCommits completed successfully');
    return NextResponse.json({ message: 'Scheduled commits checked and run successfully' });
  } catch (error: any) {
    console.error('Error in cron job:', error);
    return NextResponse.json({ message: 'Error running scheduled commits', error: error.message }, { status: 500 });
  }
}