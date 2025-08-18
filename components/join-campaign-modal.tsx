"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Info, X } from "lucide-react";

interface JoinCampaignModalProps {
  campaign: {
    slug: string;
    title: string;
    description: string;
    status: string;
    timeRemaining: number;
    points: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
}

export function JoinCampaignModal({ campaign, isOpen, onClose, onJoin }: JoinCampaignModalProps) {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    setIsJoining(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsJoining(false);
    onJoin();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Join Campaign</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{campaign.title}</CardTitle>
              <CardDescription>{campaign.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant="outline">{campaign.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Time Remaining</span>
                <span className="text-sm text-muted-foreground">{campaign.timeRemaining} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Points</span>
                <span className="text-sm text-muted-foreground">{campaign.points} points</span>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>How it works</AlertTitle>
            <AlertDescription>
              Join this campaign to share content about our brand on your social media. You can use provided assets or create your own content. Simply submit the URL of your published post for approval.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleJoin} disabled={isJoining} className="flex-1">
              {isJoining ? "Joining..." : "Join Campaign"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
