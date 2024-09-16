import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const serverTime = new Date(); // Get the current server time

  // Format the time in 'HH:mm' format using local time
  const hours = serverTime.getHours().toString().padStart(2, '0');
  const minutes = serverTime.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`; // Time in 'HH:mm'

  console.log(`Server time (local): ${formattedTime}`); // Log the formatted time

  return NextResponse.json({ time: formattedTime }, { status: 200 });
}