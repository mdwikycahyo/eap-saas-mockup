"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, Share2 } from "lucide-react"
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

  const isQuickShare = campaign.type === "Quick Share"

  // Determine button text based on campaign type and status
  const getButtonText = () => {
    if (!isJoined) return "Join"

    if (isQuickShare) {
      if (campaign.status === "Submitted URL Required") return "Submit URL"
      if (campaign.status === "Live") return "View"
      return "View"
    } else {
      if (campaign.status === "Content Required") return "Create"
      if (campaign.status === "Under Review") return "View"
      if (campaign.status === "Live") return "View"
      return "View"
    }
  }

  // Determine button icon based on campaign type and status
  const getButtonIcon = () => {
    if (!isJoined) return <Plus className="h-4 w-4" />

    if (isQuickShare) {
      if (campaign.status === "Submitted URL Required") return <Share2 className="h-4 w-4" />
      if (campaign.status === "Live") return <ArrowRight className="h-4 w-4" />
      return <ArrowRight className="h-4 w-4" />
    } else {
      if (campaign.status === "Content Required") return <ArrowRight className="h-4 w-4" />
      return <ArrowRight className="h-4 w-4" />
    }
  }

  // Get the appropriate status display
  const getStatusDisplay = () => {
    if (!isJoined) return "Available"

    if (isQuickShare) {
      return campaign.status || "Submitted URL Required"
    } else {
      return campaign.status || "Content Required"
    }
  }

  return (
    <Card className="overflow-hidden">
      <div
        className={`h-40 bg-gradient-to-r from-purple-200 to-purple-300 relative`}
        onClick={handleViewDetails}
        style={{ cursor: "pointer" }}
      >
        <div className="absolute bottom-3 left-3">
          <Badge
            variant={isQuickShare ? "secondary" : "outline"}
            className={isQuickShare ? "" : "bg-violet-50 text-violet-600 border-violet-200"}
          >
            {campaign.type}
          </Badge>
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
            <CampaignStatusBadge status={getStatusDisplay()} />
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
              {getButtonText()} {getButtonIcon()}
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
