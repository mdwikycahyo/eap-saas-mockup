"use client";

import { useState, useEffect } from "react";
import type { ActiveCampaign, AvailableCampaign } from "@/types/creator";

export function useCreatorCampaigns(
  initialActiveCampaigns: ActiveCampaign[],
  initialAvailableCampaigns: AvailableCampaign[]
) {
  const [activeCampaignsList, setActiveCampaignsList] = useState(initialActiveCampaigns);
  const [availableCampaignsList, setAvailableCampaignsList] = useState(initialAvailableCampaigns);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [campaignToJoin, setCampaignToJoin] = useState<AvailableCampaign | null>(null);

  // Listen for join campaign events
  useEffect(() => {
    const handleJoinCampaign = (event: Event) => {
      const customEvent = event as CustomEvent;
      const slug = customEvent.detail;

      // Find the campaign in available campaigns
      const campaignToJoin = availableCampaignsList.find(
        (c) => c.slug === slug
      );

      if (campaignToJoin) {
        // Remove from available campaigns
        setAvailableCampaignsList((prev) =>
          prev.filter((c) => c.slug !== slug)
        );

        // Add to active campaigns with appropriate status
        const newCampaign: ActiveCampaign = {
          ...campaignToJoin,
          id: Math.max(...activeCampaignsList.map((c) => c.id), 0) + 1,
          platform: "instagram",
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          points: 0,
          joined: true,
          status: "URL Required",
        };

        setActiveCampaignsList((prev) => [...prev, newCampaign]);
      }
    };

    window.addEventListener(
      "join-campaign",
      handleJoinCampaign as EventListener
    );
    return () => {
      window.removeEventListener(
        "join-campaign",
        handleJoinCampaign as EventListener
      );
    };
  }, [availableCampaignsList, activeCampaignsList]);

  const handleCardClick = (slug: string, isActive: boolean) => {
    const event = new CustomEvent("open-campaign-modal", {
      detail: {
        slug,
        mode: isActive ? "full" : "details-only",
      },
    });
    window.dispatchEvent(event);
  };

  const handleJoinClick = (
    e: React.MouseEvent,
    campaign: AvailableCampaign
  ) => {
    e.stopPropagation();
    setCampaignToJoin(campaign);
    setIsJoinModalOpen(true);
  };

  const handleConfirmJoin = () => {
    if (campaignToJoin) {
      setIsJoinModalOpen(false);

      const event = new CustomEvent("join-campaign", {
        detail: campaignToJoin.slug,
      });
      window.dispatchEvent(event);

      setCampaignToJoin(null);
    }
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
    setCampaignToJoin(null);
  };

  return {
    activeCampaignsList,
    availableCampaignsList,
    isJoinModalOpen,
    campaignToJoin,
    handleCardClick,
    handleJoinClick,
    handleConfirmJoin,
    closeJoinModal,
  };
}
