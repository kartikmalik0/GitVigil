import { getCurrentDayCommitData } from "@/actions/get-todays-commit";
import MaintainStreakButton from "@/components/MaintainStreakButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheckBig, CircleX, Star } from "lucide-react";
import Link from "next/link";

const TodayContribution = async () => {
    const data = await getCurrentDayCommitData();

    return (
        <>
            {data.totalCommits !== 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex gap-2 items-center text-3xl font-semibold">
                            <CircleCheckBig color="#22c55e" />
                            Today&#39;s Contribution Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-semibold">
                            You&#39;ve made <span className="text-[#22c55e] font-bold">{data.totalCommits}</span> contribution
                            {data.totalCommits > 1 ? "s" : ""} today!
                        </p>
                    </CardContent>
                    <CardFooter className="flex gap-4">
                        <MaintainStreakButton />
                        <Button variant="outline" size={"lg"} className='gap-2 flex md:hidden' asChild>
                            <Link href={"https://github.com/kartikmalik0/GitVigil.git"} target="_blank">
                                <Star />
                                Star on Github
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex gap-2 items-center">
                            <CircleX color="#eab308" />
                            No Today&#39;s Contribution Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl text-subHeading">
                            No contributions detected today. Use the button below to maintain your streak!
                        </p>
                    </CardContent>
                    <CardFooter className=" flex gap-4 items-center">
                        <MaintainStreakButton />
                        <Button variant="outline" size={"lg"} className='gap-2 flex md:hidden' asChild>
                            <Link href={"https://github.com/kartikmalik0/GitVigil.git"} target="_blank">
                                <Star />
                                Star on Github
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </>
    );
};

export default TodayContribution;
