"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CampaignStatusBadge } from "./campaign-status-badge"
import { useCampaignModal } from "@/hooks/useCampaignModal"
import { useCampaignSubmission } from "@/hooks/useCampaignSubmission"
import {
  CampaignDetailsTab,
  CampaignAssetsTab,
  CampaignSubmissionTab,
} from "./campaign"

function CampaignModal() {
  const { open, campaign, viewMode, closeModal, joinCampaign } = useCampaignModal();
  const { postUrl, setPostUrl, handleSubmitUrl, resetForm } = useCampaignSubmission();

  // Early return if no campaign is selected
  if (!campaign) {
    return null;
  }

  const getStatusDisplay = () => {
    return campaign.status;
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    handleSubmitUrl(e, null, closeModal);
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <DialogTitle className="text-xl">{campaign.title}</DialogTitle>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <CampaignStatusBadge status={getStatusDisplay()} />
          </div>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className={`grid ${viewMode === "details-only" ? "grid-cols-2" : "grid-cols-3"} mb-4`}>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            {viewMode === "full" && <TabsTrigger value="submission">Submission</TabsTrigger>}
          </TabsList>

          <TabsContent value="details">
            <CampaignDetailsTab
              campaign={campaign}
              viewMode={viewMode}
              onJoinCampaign={joinCampaign}
            />
          </TabsContent>

          <TabsContent value="assets">
            <CampaignAssetsTab campaign={campaign} />
          </TabsContent>

          {viewMode === "full" && (
            <TabsContent value="submission">
              <CampaignSubmissionTab
                campaign={campaign}
                postUrl={postUrl}
                onPostUrlChange={setPostUrl}
                onSubmitUrl={handleUrlSubmit}
              />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export { CampaignModal };
