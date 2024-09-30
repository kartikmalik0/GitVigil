export const dynamic = 'force-dynamic'
import { getGitHubToken } from '@/actions/get-github-token'
import { auth } from '@/auth'
import DashboardLayout from '@/components/dashboard/page'
import MaxWidhtWrapper from '@/components/MaxWidthWrapper'
import { redirect } from 'next/navigation'

const Dashboard = async () => {

     await auth() || redirect("/login")
     await getGitHubToken() !== "NO_TOKEN" || redirect("/")

    return (
        <MaxWidhtWrapper>
            <DashboardLayout />
        </MaxWidhtWrapper>
    )
}

export default Dashboard



