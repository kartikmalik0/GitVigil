import { CommitGraph } from "./commit-graph/page"
import TodayContribution from "./current-day-contribution/TodayContribution"
import Profile from "./profile/page"

const DashboardLayout = () => {
    return (
        <section className="mt-4 space-y-4">
            <Profile />
            <CommitGraph />
            <div>
                <TodayContribution />
            </div>
        </section>
    )
}

export default DashboardLayout
