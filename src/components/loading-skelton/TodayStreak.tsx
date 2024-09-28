import { Skeleton } from "@/components/ui/skeleton"

export function TodayContributionSkelton() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[214px] rounded-xl animate-pulse" />
        </div>
    )
}
