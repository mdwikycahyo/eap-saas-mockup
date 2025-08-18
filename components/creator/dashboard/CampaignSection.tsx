"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CampaignCard } from "./CampaignCard";
import type { ActiveCampaign, AvailableCampaign } from "@/types/creator";

interface CampaignSectionProps {
  title: string;
  campaigns: ActiveCampaign[] | AvailableCampaign[];
  isActive: boolean;
  onCardClick: (slug: string, isActive: boolean) => void;
  onJoinClick?: (e: React.MouseEvent, campaign: AvailableCampaign) => void;
}

export function CampaignSection({
  title,
  campaigns,
  isActive,
  onCardClick,
  onJoinClick,
}: CampaignSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {campaigns.map((campaign) => (
          <CampaignCard
            key={isActive ? (campaign as ActiveCampaign).id : campaign.slug}
            campaign={campaign}
            isActive={isActive}
            onCardClick={onCardClick}
            onJoinClick={onJoinClick}
          />
        ))}
      </div>
    </div>
  );
}
