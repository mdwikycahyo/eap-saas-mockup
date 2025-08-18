import { useEffect, useState } from "react";
import { campaignData, type Campaign } from "@/data/campaignData";

export interface CampaignModalState {
  open: boolean;
  campaignSlug: string | null;
  campaign: Campaign | null;
  viewMode: "full" | "details-only";
}

export function useCampaignModal() {
  const [open, setOpen] = useState(false);
  const [campaignSlug, setCampaignSlug] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"full" | "details-only">("full");

  const campaign = campaignSlug ? campaignData[campaignSlug] : null;

  useEffect(() => {
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { slug, mode } = customEvent.detail;
      setCampaignSlug(slug);
      setViewMode(mode || "full");
      setOpen(true);
    };

    window.addEventListener("open-campaign-modal", handleOpenModal as EventListener);
    return () => {
      window.removeEventListener("open-campaign-modal", handleOpenModal as EventListener);
    };
  }, []);

  useEffect(() => {
    // Reset state when modal closes
    if (!open) {
      setCampaignSlug(null);
    }
  }, [open]);

  const closeModal = () => setOpen(false);

  const joinCampaign = () => {
    if (campaignSlug) {
      const event = new CustomEvent("join-campaign", {
        detail: campaignSlug,
      });
      window.dispatchEvent(event);
      closeModal();
    }
  };

  return {
    open,
    campaign,
    campaignSlug,
    viewMode,
    closeModal,
    joinCampaign,
  };
}
