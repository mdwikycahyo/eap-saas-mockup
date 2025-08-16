// Admin Dashboard Types
export type CampaignType = "QUICK_SHARE" | "CREATIVE_CHALLENGE";
export type ApprovalStatusType = "CONTENT_REVIEW" | "CONTENT_URL_REVIEW";
export type SocialPlatform = "instagram" | "tiktok";

export interface PendingApprovalItem {
  id: string;
  creatorName: string;
  email?: string;
  campaignName: string;
  campaignType: CampaignType;
  submissionTime: string;
  approvalStatus: ApprovalStatusType;
  platform: SocialPlatform;
  content?: {
    images?: Array<{ id: number; src: string; alt: string }>;
    videoSrc?: string;
    caption: string;
  };
  submittedUrl?: string;
  socialHandle?: string;
}

export interface PendingSocialMediaItem {
  id: string;
  creatorName: string;
  email?: string;
  platform: SocialPlatform;
  username: string;
  submissionTime: string;
  profileUrl?: string;
  followers: number;
  following: number;
}

export interface CampaignPerformance {
  id: string;
  name: string;
  creators: number;
  content: number;
  views: string;
  likes: string;
  comments: string;
}

export interface DashboardStats {
  creators: number;
  campaigns: number;
  contents: number;
  engagement: string;
}
