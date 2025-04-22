import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96 mt-2" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10 w-full max-w-2xl" />

        <div className="space-y-6">
          <Skeleton className="h-[250px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[180px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
