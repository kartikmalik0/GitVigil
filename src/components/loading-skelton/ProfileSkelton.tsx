
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileSkelton() {
  return (
    <div className="flex items-center p-4 border rounded-md">
      <Skeleton className="w-16 h-16 rounded-full" />
      <div className="flex flex-col justify-center ml-4 space-y-2">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-24 h-4" />
      </div>
      <div className="flex items-center ml-auto space-x-2">
        <Skeleton className="w-24 h-8" />
        <Skeleton className="w-24 h-8" />
      </div>
    </div>
  )
}