"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CampaignStatusBadge } from "./campaign-status-badge"

interface CampaignCardProps {
  campaign: {
    slug: string
    title: string
    subtitle: string
    type: string
    status: string
    color: string
    timeRemaining: number
  }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const handleClick = () => {
    // Dispatch custom event to open modal with campaign data
    const event = new CustomEvent("open-campaign-modal", {
      detail: campaign.slug,
    })
    window.dispatchEvent(event)
  }

  return (
    <Card className="overflow-hidden">
      <div
        className={`h-32 bg-gradient-to-r from-${campaign.color}-400 to-${campaign.color}-600`}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      ></div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-base mb-1 hover:text-blue-600 cursor-pointer" onClick={handleClick}>
              {campaign.title}
            </h3>
            <p className="text-sm text-muted-foreground">{campaign.subtitle}</p>
          </div>
          <CampaignStatusBadge status={campaign.status} />
        </div>
        <div className="flex items-center justify-between mt-3">
          <Badge variant="outline">{campaign.type}</Badge>
          <span className="text-xs text-muted-foreground">{campaign.timeRemaining} days left</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" onClick={handleClick}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
