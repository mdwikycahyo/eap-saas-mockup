"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText, Plus } from "lucide-react";
import type { Campaign } from "@/data/campaignData";

interface CampaignDetailsTabProps {
  campaign: Campaign;
  viewMode: "full" | "details-only";
  onJoinCampaign: () => void;
}

export function CampaignDetailsTab({ campaign, viewMode, onJoinCampaign }: CampaignDetailsTabProps) {
  return (
    <div className="space-y-4">
      <Alert className="bg-blue-50 border-blue-200">
        <FileText className="text-blue-600" />
        <AlertTitle className="text-sm font-medium">Campaign Information</AlertTitle>
        <AlertDescription className="text-sm">
          Join this campaign to share content about our brand on your social media. You can use provided assets or create your own content. Simply submit the URL of your published post for approval.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <h3 className="font-medium">Description & Brief</h3>
          <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {campaign.fullDescription}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Points</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <span className="text-2xl font-bold">{campaign.points}</span>
              <span className="text-muted-foreground">points upon approval</span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Ends in {campaign.timeRemaining}</span>
              </div>
              {campaign.submissionDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Submitted on {campaign.submissionDate}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Join campaign button for available campaigns */}
      {campaign.status === "Available" && viewMode === "full" && (
        <div className="flex justify-center mt-4">
          <Button
            size="lg"
            className="gap-2"
            onClick={onJoinCampaign}
          >
            <Plus className="h-4 w-4" /> Join This Campaign
          </Button>
        </div>
      )}
    </div>
  );
}
