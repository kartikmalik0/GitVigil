import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const serverTime = new Date(); // Get the current server time

  // Get the day of the week, month, day, year, time (HH:mm:ss) in local time
  const dayOfWeek = serverTime.toLocaleString('en-US', { weekday: 'short' });
  const month = serverTime.toLocaleString('en-US', { month: 'short' });
  const day = serverTime.getDate().toString().padStart(2, '0');
  const year = serverTime.getFullYear();
  const hours = serverTime.getHours().toString().padStart(2, '0');
  const minutes = serverTime.getMinutes().toString().padStart(2, '0');
  const seconds = serverTime.getSeconds().toString().padStart(2, '0');

  // Get the time zone abbreviation automatically
  const timeZone = new Intl.DateTimeFormat('en-US', {
    timeZoneName: 'short',
  })
    .formatToParts(serverTime)
    .find((part) => part.type === 'timeZoneName')?.value || '';

  // Construct the formatted date string: Mon Sep 16 23:20:40 IST 2024
  const formattedDate = `${dayOfWeek} ${month} ${day} ${hours}:${minutes}:${seconds} ${timeZone} ${year}`;

  console.log(`Formatted server time: ${formattedDate}`);

  return NextResponse.json({
    serverTime: formattedDate,
  }, { status: 200 });
}
