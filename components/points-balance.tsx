import { Award } from "lucide-react"

interface PointsBalanceProps {
  points: number
}

export function PointsBalance({ points }: PointsBalanceProps) {
  return (
    <div className="mt-4 md:mt-0 p-4 bg-slate-100 rounded-lg flex items-center gap-3">
      <Award className="h-5 w-5 text-slate-600" />
      <div>
        <p className="text-sm font-medium">Your Points Balance</p>
        <p className="text-2xl font-bold">{points.toLocaleString()}</p>
      </div>
    </div>
  )
}
