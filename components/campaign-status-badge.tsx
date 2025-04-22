import { Badge } from "@/components/ui/badge"

interface CampaignStatusBadgeProps {
  status: string
}

export function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  switch (status) {
    case "Joined":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
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
    case "Completed":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
          Completed
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
          {status}
        </Badge>
      )
  }
}
