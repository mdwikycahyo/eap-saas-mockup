"use client";

import { StatsCards } from "@/components/admin/dashboard/StatsCards";
import { SocialMediaApprovalSection } from "@/components/admin/dashboard/SocialMediaApprovalSection";
import { ContentApprovalSection } from "@/components/admin/dashboard/ContentApprovalSection";
import { CampaignPerformanceSection } from "@/components/admin/dashboard/CampaignPerformanceSection";
import { ContentReviewModal } from "@/components/admin/dashboard/modals/ContentReviewModal";
import { SocialMediaReviewModal } from "@/components/admin/dashboard/modals/SocialMediaReviewModal";
import { useApprovals } from "@/hooks/useApprovals";
import { useModalState } from "@/hooks/useModalState";
import { mockCampaignsPerformance } from "@/data/mockCampaigns";
import { mockDashboardStats } from "@/data/dashboardStats";

export default function AdminDashboard() {
  const {
    pendingContentApprovals,
    pendingSocialMedia,
    handleApproveContent,
    handleRejectContent,
    handleVerifySocialMedia,
    handleRejectSocialMedia,
  } = useApprovals();

  const {
    selectedApprovalItem,
    isReviewDialogOpen,
    openContentReviewDialog,
    setIsReviewDialogOpen,
    selectedSocialMediaItem,
    isSocialMediaReviewDialogOpen,
    openSocialMediaReviewDialog,
    setIsSocialMediaReviewDialogOpen,
  } = useModalState();

  const handleApproveAndClose = (itemId: string) => {
    handleApproveContent(itemId);
    setIsReviewDialogOpen(false);
  };

  const handleRejectAndClose = (itemId: string) => {
    handleRejectContent(itemId);
    setIsReviewDialogOpen(false);
  };

  const handleVerifyAndClose = (itemId: string) => {
    handleVerifySocialMedia(itemId);
    setIsSocialMediaReviewDialogOpen(false);
  };

  const handleRejectSocialAndClose = (itemId: string) => {
    handleRejectSocialMedia(itemId);
    setIsSocialMediaReviewDialogOpen(false);
  };

  return (
    <div className="p-6 py-12 md:p-6">
      <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, Admin!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your advocacy program.
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={mockDashboardStats} />

        <div className="space-y-4 md:space-y-6">
          {/* Mobile: Single column layout */}
          <div className="block md:hidden space-y-4 pb-6">
            <SocialMediaApprovalSection
              pendingSocialMedia={pendingSocialMedia}
              onOpenReviewDialog={openSocialMediaReviewDialog}
            />

            <ContentApprovalSection
              pendingContentApprovals={pendingContentApprovals}
              onOpenReviewDialog={openContentReviewDialog}
            />

            <CampaignPerformanceSection campaigns={mockCampaignsPerformance} />
          </div>

          {/* Desktop: Two column layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            <SocialMediaApprovalSection
              pendingSocialMedia={pendingSocialMedia}
              onOpenReviewDialog={openSocialMediaReviewDialog}
            />

            <ContentApprovalSection
              pendingContentApprovals={pendingContentApprovals}
              onOpenReviewDialog={openContentReviewDialog}
            />

            <CampaignPerformanceSection campaigns={mockCampaignsPerformance} />
          </div>
        </div>

        {/* Modal Components */}
        <ContentReviewModal
          isOpen={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          selectedItem={selectedApprovalItem}
          onApprove={handleApproveAndClose}
          onReject={handleRejectAndClose}
        />

        <SocialMediaReviewModal
          isOpen={isSocialMediaReviewDialogOpen}
          onOpenChange={setIsSocialMediaReviewDialogOpen}
          selectedItem={selectedSocialMediaItem}
          onVerify={handleVerifyAndClose}
          onReject={handleRejectSocialAndClose}
        />
      </main>
    </div>
  );
}
