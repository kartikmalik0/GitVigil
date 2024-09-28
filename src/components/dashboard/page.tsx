import { Suspense } from "react"
import { CommitGraph } from "./commit-graph/page"
import TodayContribution from "./current-day-contribution/TodayContribution"
import Profile from "./profile/page"
import { TodayContributionSkelton } from "../loading-skelton/TodayStreak"
import ProfileSkelton from "../loading-skelton/ProfileSkelton"

const DashboardLayout = async () => {
    return (
        <section className="my-4 space-y-4">
            <Suspense fallback={<ProfileSkelton />}>
                <Profile />
            </Suspense>
            <CommitGraph />
            <div>
                <Suspense fallback={<TodayContributionSkelton />}>
                    <TodayContribution />
                </Suspense>
            </div>
        </section>
    )
}

export default DashboardLayout
