"use client";

import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from "lucide-react";
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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const trendPercentage = calculateTrend(commitData);

    return (
        <Card>
            <CardHeader>
                <CardTitle>GitHub Commit Activity</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
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
                    {trendPercentage > 0 ? "Trending up" : "Trending down"} by {Math.abs(trendPercentage).toFixed(1)}% this month
                    {trendPercentage > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total commits for the last 30 days
                </div>
            </CardFooter>
        </Card>
    );
}

function calculateTrend(data:   any[] | undefined) {
    if (!data || data.length < 2) return 0;
    const firstHalf = data.slice(0, Math.floor(data.length / 2));
    const secondHalf = data.slice(Math.floor(data.length / 2));
    const firstHalfAvg = firstHalf.reduce((sum: any, item: { count: any; }) => sum + item.count, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum: any, item: { count: any; }) => sum + item.count, 0) / secondHalf.length;
    return ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
}