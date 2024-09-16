import { createGitStreakRepo } from "@/actions/create-streak";
import prisma from "./prisma";

let isRunning = false;

export async function startScheduledCommits() {
    if (isRunning) return;
    isRunning = true;

    console.log("Scheduled commit check started");
    await checkAndRunScheduledCommits();

    // Schedule the next check in 1 minute
    setTimeout(() => {
        isRunning = false;
        startScheduledCommits();
    }, 60000);
}

export async function checkAndRunScheduledCommits() {
    const now = new Date();
    console.log(`Checking for scheduled commits at ${now.toISOString()}`);

    try {
        const schedules = await prisma.commitSchedule.findMany();
        console.log(`Found ${schedules.length} schedules`);

        for (const schedule of schedules) {
            console.log(
                `Checking schedule for user ${schedule.userId}:`,
                schedule
            );

            try {
                const shouldRun = shouldRunCommit(schedule, now);
                console.log(
                    `Should run commit for user ${schedule.userId}:`,
                    shouldRun
                );

                if (shouldRun) {
                    console.log(
                        `Attempting to run commit for user ${schedule.userId}`
                    );
                    await createGitStreakRepo(schedule.userId);
                    console.log(`Commit completed for user ${schedule.userId}`);
                }
            } catch (error) {
                console.error(
                    `Error processing schedule for user ${schedule.userId}:`,
                    error
                );
            }
        }
    } catch (error) {
        console.error("Error checking and running scheduled commits:", error);
    }

    console.log("Finished checking and running scheduled commits");
}

function shouldRunCommit(schedule: any, now: Date): boolean {
    console.log(`Evaluating schedule:`, schedule);

    const [hours, minutes] = schedule.time.split(":").map(Number);
    const scheduleDate = new Date(now);
    scheduleDate.setHours(hours, minutes, 0, 0);

    const timeDiff = Math.abs(now.getTime() - scheduleDate.getTime());
    const isWithinTimeWindow = timeDiff <= 60000;
    console.log( // Within 1 minute
        `Current time: ${now.toISOString()}, Scheduled time: ${scheduleDate.toISOString()}, Time difference: ${timeDiff}ms`
    );

    let shouldRun = false;

    switch (schedule.frequency) {
        case "daily":
            shouldRun = isWithinTimeWindow;
            break;
        case "weekly":
            shouldRun =
                now.getDay() === schedule.dayOfWeek && isWithinTimeWindow;
            break;
        case "weekend":
            shouldRun =
                (now.getDay() === 0 || now.getDay() === 6) &&
                isWithinTimeWindow;
            break;
        case "custom":
            const customDate = new Date(schedule.customDate);
            shouldRun =
                now.getTime() >= customDate.getTime() &&
                now.getTime() < customDate.getTime() + 60000; // Within 1 minute of scheduled time
            break;
    }

    console.log(`Should run for ${schedule.frequency} schedule:`, shouldRun);
    return shouldRun;
}
