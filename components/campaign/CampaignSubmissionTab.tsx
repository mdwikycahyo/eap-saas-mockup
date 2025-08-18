"use client";

import { SubmissionUrlForm } from "./SubmissionUrlForm";
import { SubmissionApproved } from "./SubmissionApproved";
import { SubmissionUnderReview } from "./SubmissionUnderReview";
import type { Campaign } from "@/data/campaignData";

interface CampaignSubmissionTabProps {
  campaign: Campaign;
  postUrl: string;
  onPostUrlChange: (url: string) => void;
  onSubmitUrl: (e: React.FormEvent) => void;
}

export function CampaignSubmissionTab({
  campaign,
  postUrl,
  onPostUrlChange,
  onSubmitUrl,
}: CampaignSubmissionTabProps) {
  if (campaign.status === "Approved") {
    return <SubmissionApproved publishedUrl={campaign.publishedUrl} />;
  }

  if (campaign.status === "URL Under Review") {
    return <SubmissionUnderReview publishedUrl={campaign.publishedUrl} />;
  }

  if (campaign.status === "URL Required") {
    return (
      <SubmissionUrlForm
        postUrl={postUrl}
        onPostUrlChange={onPostUrlChange}
        onSubmit={onSubmitUrl}
      />
    );
  }

  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">Join the campaign to submit content.</p>
    </div>
  );
}
