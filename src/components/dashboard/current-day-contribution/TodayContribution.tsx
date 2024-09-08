import MaintainStreakButton from "@/components/MaintainStreakButton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleCheckBig, CircleX } from "lucide-react"

const TodayContribution = () => {
    return (
        // <Card>
        //     <CardHeader>
        //         <CardTitle className="flex gap-2 items-center">
        //             <CircleX color="#eab308" />
        //             No Today&#39;s Contribution Status
        //         </CardTitle>
        //     </CardHeader>
        //     <CardContent>
        //         <p className="text-xl text-subHeading">
        //             No contributions detected today. Use the button below to maintain your streak!
        //         </p>
        //     </CardContent>
        //     <CardFooter>
        //         <MaintainStreakButton />
        //     </CardFooter>
        // </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex gap-2 items-center text-3xl font-semibold">
                    <CircleCheckBig color="#22c55e" />
                    Today&#39;s Contribution Status
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-semibold">
                    You&#39;ve made <span className="text-[#22c55e] font-bold">1</span> contribution today !
                </p>
            </CardContent>
            <CardFooter>
                <MaintainStreakButton />
            </CardFooter>
        </Card>
    )
}

export default TodayContribution
