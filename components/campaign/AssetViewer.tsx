"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAssetNavigation } from "@/hooks/useAssetNavigation";
import type { CampaignAsset } from "@/data/campaignData";

interface AssetViewerProps {
  assets: CampaignAsset[];
}

export function AssetViewer({ assets }: AssetViewerProps) {
  const {
    currentAssetIndex,
    currentAsset,
    nextAsset,
    prevAsset,
    goToAsset,
    canGoNext,
    canGoPrev,
    hasMultipleAssets,
  } = useAssetNavigation(assets);

  if (!assets.length || !currentAsset) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="aspect-video bg-slate-100 relative overflow-hidden rounded-md">
          <img
            src={currentAsset.url || "/placeholder.svg"}
            alt={currentAsset.name || "Campaign asset"}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 right-2">
            {currentAsset.type}
          </Badge>

          {/* Navigation arrows */}
          {hasMultipleAssets && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                onClick={prevAsset}
                disabled={!canGoPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                onClick={nextAsset}
                disabled={!canGoNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Pagination indicators */}
        {hasMultipleAssets && (
          <div className="flex justify-center mt-2 gap-1">
            {assets.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full cursor-pointer ${
                  index === currentAssetIndex ? "w-4 bg-primary" : "w-1.5 bg-gray-300"
                }`}
                onClick={() => goToAsset(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
