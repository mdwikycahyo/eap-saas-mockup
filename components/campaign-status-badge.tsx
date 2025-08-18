import { Badge } from "@/components/ui/badge"

interface CampaignStatusBadgeProps {
  status: string
}

export function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  switch (status) {
    case "Submitted URL Required":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          URL Required
        </Badge>
      )

    case "Under Review":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          Under Review
        </Badge>
      )
    case "Joined":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          Joined
        </Badge>
      )
    case "Live":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Live
        </Badge>
      )
    case "Completed":
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
          Completed
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
          {status}
        </Badge>
      )
  }
}
