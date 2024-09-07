import {  CommitGraph } from "./commit-graph/page"
import Profile from "./profile/page"

const DashboardLayout = () => {
    return (
        <section className="mt-4 space-y-4">
            <Profile />
            <CommitGraph/>
        </section>
    )
}

export default DashboardLayout
