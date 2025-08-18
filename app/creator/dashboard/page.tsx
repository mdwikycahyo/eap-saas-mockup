"use client";

import { CampaignModal } from "@/components/campaign-modal";
import { JoinCampaignModal } from "@/components/join-campaign-modal";
import { DashboardHeader } from "@/components/creator/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/creator/dashboard/DashboardStats";
import { CampaignSection } from "@/components/creator/dashboard/CampaignSection";
import { useCreatorCampaigns } from "@/hooks/useCreatorCampaigns";
import { activeCampaigns, availableCampaigns, dashboardMetrics } from "@/data/creatorDashboardData";

export default function CreatorDashboard() {
  const {
    activeCampaignsList,
    availableCampaignsList,
    isJoinModalOpen,
    campaignToJoin,
    handleCardClick,
    handleJoinClick,
    handleConfirmJoin,
    closeJoinModal,
  } = useCreatorCampaigns(activeCampaigns, availableCampaigns);

  return (
    <div className="p-6 pt-16">
      <DashboardHeader />
      <DashboardStats metrics={dashboardMetrics} />

      <CampaignSection
        title="Available Campaigns"
        campaigns={availableCampaignsList}
        isActive={false}
        onCardClick={handleCardClick}
        onJoinClick={handleJoinClick}
      />

      <CampaignSection
        title="Active Campaigns"
        campaigns={activeCampaignsList}
        isActive={true}
        onCardClick={handleCardClick}
      />

      {/* Campaign Modal */}
      <CampaignModal />

      {/* Join Campaign Confirmation Modal */}
      <JoinCampaignModal
        isOpen={isJoinModalOpen}
        onClose={closeJoinModal}
        onJoin={handleConfirmJoin}
        campaign={campaignToJoin}
      />
    </div>
  );
}
