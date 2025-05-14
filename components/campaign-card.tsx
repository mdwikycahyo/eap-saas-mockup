"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import { CampaignStatusBadge } from "./campaign-status-badge"

interface CampaignCardProps {
  campaign: {
    slug: string
    title: string
    description: string
    type: string
    status: string
    image: string
    timeRemaining: number
    joined: boolean
  }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const isQuickShare = campaign.type === "Quick Share"
  const isAvailable = campaign.status === "Available"

  const handleCardClick = () => {
    // Dispatch custom event to open the campaign modal
    const event = new CustomEvent("open-campaign-modal", {
      detail: campaign.slug,
    })
    window.dispatchEvent(event)
  }

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click from triggering

    // Dispatch event to join the campaign
    const event = new CustomEvent("join-campaign", {
      detail: campaign.slug,
    })
    window.dispatchEvent(event)
  }

  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img src={campaign.image || "/placeholder.svg"} alt={campaign.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2">
          <Badge
            variant={isQuickShare ? "secondary" : "outline"}
            className={isQuickShare ? "" : "bg-violet-50 text-violet-600 border-violet-200"}
          >
            {campaign.type}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <CampaignStatusBadge status={campaign.status} />
        </div>
      </div>
      <CardContent className="p-4 flex-1">
        <h3 className="font-semibold text-lg mb-1">{campaign.title}</h3>
        <p className="text-muted-foreground text-sm">{campaign.description}</p>
        <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{campaign.timeRemaining} days remaining</span>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-end">
        {isAvailable ? (
          <Button size="sm" className="gap-1" onClick={handleJoinClick}>
            Join Campaign
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="gap-1">
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
