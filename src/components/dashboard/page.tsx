import { Suspense } from "react"
import { CommitGraph } from "./commit-graph/page"
import TodayContribution from "./current-day-contribution/TodayContribution"
import Profile from "./profile/page"
import { TodayContributionSkelton } from "../loading-skelton/TodayStreak"

const DashboardLayout = () => {
    return (
        <section className="mt-4 space-y-4">
            <Profile />
            <CommitGraph />
            <div>
                <Suspense fallback={<TodayContributionSkelton/>}>
                    <TodayContribution />
                </Suspense>
            </div>
        </section>
    )
}

export default DashboardLayout
