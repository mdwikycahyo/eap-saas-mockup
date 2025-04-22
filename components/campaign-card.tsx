"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"
import { CampaignStatusBadge } from "./campaign-status-badge"
import { useState } from "react"

interface CampaignCardProps {
  campaign: {
    slug: string
    title: string
    description: string
    type: string
    status?: string
    color: string
    timeRemaining: number
    joined: boolean
  }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [isJoined, setIsJoined] = useState(campaign.joined)

  const handleViewDetails = () => {
    // Dispatch custom event to open modal with campaign data
    const event = new CustomEvent("open-campaign-modal", {
      detail: campaign.slug,
    })
    window.dispatchEvent(event)
  }

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsJoined(true)
    // In a real app, you would make an API call here
  }

  return (
    <Card className="overflow-hidden">
      <div
        className={`h-40 bg-gradient-to-r from-${campaign.color}-400 to-${campaign.color}-600 relative`}
        onClick={handleViewDetails}
        style={{ cursor: "pointer" }}
      >
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary">{campaign.type}</Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold hover:text-blue-600 cursor-pointer" onClick={handleViewDetails}>
              {campaign.title}
            </h3>
            <p className="text-sm text-muted-foreground">{campaign.description}</p>
          </div>
          {isJoined ? (
            <CampaignStatusBadge status={campaign.status || "Joined"} />
          ) : (
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              Available
            </Badge>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Ends in {campaign.timeRemaining} days</div>
          {isJoined ? (
            <Button size="sm" className="gap-1" onClick={handleViewDetails}>
              View <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" className="gap-1" onClick={handleJoin}>
              Join <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
