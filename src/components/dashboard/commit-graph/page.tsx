"use client";

import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { getCommitData } from "@/actions/get-commits";

const chartConfig = {
    commits: {
        label: "Commits",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function CommitGraph() {
    const { data: commitData, isLoading, error } = useQuery({
        queryKey: ["commitData"],
        queryFn: async () => await getCommitData(),
    });
    // const commitData = [

    //     { date: '2024-08-08', count: 5 },

    //     { date: '2024-08-09', count: 5 },

    //     { date: '2024-08-10', count: 3 },

    //     { date: '2024-08-11', count: 3 },

    //     { date: '2024-08-12', count: 12 },

    //     { date: '2024-08-13', count: 6 },

    //     { date: '2024-08-14', count: 9 },

    //     { date: '2024-08-15', count: 10 },

    //     { date: '2024-08-16', count: 11 },

    //     { date: '2024-08-17', count: 6 },

    //     { date: '2024-08-18', count: 12 },

    //     { date: '2024-08-19', count: 7 },

    //     { date: '2024-08-20', count: 6 },

    //     { date: '2024-08-21', count: 3 },

    //     { date: '2024-08-22', count: 8 },

    //     { date: '2024-08-23', count: 9 },

    //     { date: '2024-08-24', count: 8 },

    //     { date: '2024-08-25', count: 4 },

    //     { date: '2024-08-26', count: 5 },

    //     { date: '2024-08-27', count: 0 },

    //     { date: '2024-08-28', count: 0 },

    //     { date: '2024-08-29', count: 1 },

    //     { date: '2024-08-30', count: 13 },

    //     { date: '2024-08-31', count: 5 },

    //     { date: '2024-09-01', count: 5 },

    //     { date: '2024-09-02', count: 1 },

    //     { date: '2024-09-03', count: 1 },

    //     { date: '2024-09-04', count: 1 },

    //     { date: '2024-09-05', count: 1 },

    //     { date: '2024-09-06', count: 0 },

    //     { date: '2024-09-07', count: 1 }

    // ]

    if (error) return <div>Error: {error.message}</div>;

    const trendPercentage = calculateTrend(commitData);

    return (
        <Card>
            <CardHeader>
                <CardTitle>GitHub Commit Activity</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            {
                isLoading ?
                    <Loader2 className="mx-auto mb-8 h-12 text-blue-500  w-12 animate-spin" /> :
                    <>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <ResponsiveContainer width="100%" >
                                    <LineChart
                                        className="w-full"
                                        data={commitData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="var(--color-commits)"
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 font-medium leading-none">
                                {trendPercentage > 0 ? "Trending up" : "Trending down"} by {Math.abs(trendPercentage).toFixed(1)}% this week
                                {trendPercentage > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            </div>
                            <div className="leading-none text-muted-foreground">
                                Showing total commits for the last 7 days
                            </div>
                        </CardFooter>
                    </>
            }


        </Card>
    );
}

function calculateTrend(data: any[] | undefined) {
    if (!data || data.length < 2) return 0;
    const firstHalf = data.slice(0, Math.floor(data.length / 2));
    const secondHalf = data.slice(Math.floor(data.length / 2));
    const firstHalfAvg = firstHalf.reduce((sum: any, item: { count: any; }) => sum + item.count, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum: any, item: { count: any; }) => sum + item.count, 0) / secondHalf.length;
    return ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
}