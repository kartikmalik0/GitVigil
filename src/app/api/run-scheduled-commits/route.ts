import { NextRequest, NextResponse } from "next/server";
import { checkAndRunScheduledCommits } from "@/lib/schedulingService";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {

    try {
        await checkAndRunScheduledCommits();

        return new NextResponse(
            JSON.stringify({
                message: "Scheduled commits checked and run successfully",
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store, max-age=0",
                },
            }
        );
    } catch (error: any) {
        console.error("Error in cron job:", error);

        return new NextResponse(
            JSON.stringify({
                message: "Error running scheduled commits",
                error: error.message,
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store, max-age=0",
                },
            }
        );
    }
}
