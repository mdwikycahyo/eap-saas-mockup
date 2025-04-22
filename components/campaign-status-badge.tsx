import { Badge } from "@/components/ui/badge"

interface CampaignStatusBadgeProps {
  status: string
}

export function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  switch (status) {
    case "Joined":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          Content Required
        </Badge>
      )
    case "Submitted":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          Under Review
        </Badge>
      )
    case "Approved":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
          Ready to Post
        </Badge>
      )
    case "Live":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Live
        </Badge>
      )
    case "Rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          Rejected
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
