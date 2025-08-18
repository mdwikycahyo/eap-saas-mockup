// Admin Dashboard Types
export type ApprovalStatusType = "URL_PENDING" | "URL_APPROVED" | "URL_REJECTED";
export type SocialPlatform = "instagram" | "tiktok";

export interface PendingApprovalItem {
  id: string;
  creatorName: string;
  email?: string;
  campaignName: string;
  submissionTime: string;
  approvalStatus: ApprovalStatusType;
  platform: SocialPlatform;
  submittedUrl: string;
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
