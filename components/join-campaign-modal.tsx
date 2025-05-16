"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"

interface JoinCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  campaign: {
    slug: string
    title: string
    description: string
    type: string
    timeRemaining: number
    image?: string
  } | null
}

export function JoinCampaignModal({ isOpen, onClose, onConfirm, campaign }: JoinCampaignModalProps) {
  const [isJoining, setIsJoining] = useState(false)

  const handleConfirm = () => {
    setIsJoining(true)

    // Simulate a short delay to show loading state
    setTimeout(() => {
      setIsJoining(false)
      onConfirm()
    }, 500)
  }

  if (!campaign) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join Campaign</DialogTitle>
          <DialogDescription>
            Are you sure you want to join this campaign? You'll be able to submit content once joined.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-start space-x-4">
            <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={campaign.image || "/placeholder.svg"}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{campaign.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge
                  variant={campaign.type === "Quick Share" ? "secondary" : "outline"}
                  className={campaign.type === "Quick Share" ? "" : "bg-violet-50 text-violet-600 border-violet-200"}
                >
                  {campaign.type}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {campaign.timeRemaining} days remaining
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-3 rounded-md">
            <div className="flex items-center text-sm mb-2">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">Campaign Requirements</span>
            </div>
            <ul className="text-sm space-y-1 pl-6 list-disc text-muted-foreground">
              {campaign.type === "Quick Share" ? (
                <>
                  <li>Share the provided content on your social media</li>
                  <li>Submit the URL of your post</li>
                  <li>Maintain the post for at least 7 days</li>
                </>
              ) : (
                <>
                  <li>Create original content following the brief</li>
                  <li>Submit your content for approval</li>
                  <li>Once approved, post on your social media</li>
                  <li>Submit the URL of your post</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isJoining}>
            {isJoining ? "Joining..." : "Join Campaign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
