import { useState } from "react";
import type { CampaignAsset } from "@/data/campaignData";

export function useAssetNavigation(assets: CampaignAsset[]) {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);

  const nextAsset = () => {
    if (currentAssetIndex < assets.length - 1) {
      setCurrentAssetIndex(currentAssetIndex + 1);
    }
  };

  const prevAsset = () => {
    if (currentAssetIndex > 0) {
      setCurrentAssetIndex(currentAssetIndex - 1);
    }
  };

  const goToAsset = (index: number) => {
    if (index >= 0 && index < assets.length) {
      setCurrentAssetIndex(index);
    }
  };

  const currentAsset = assets[currentAssetIndex];
  const canGoNext = currentAssetIndex < assets.length - 1;
  const canGoPrev = currentAssetIndex > 0;
  const hasMultipleAssets = assets.length > 1;

  return {
    currentAssetIndex,
    currentAsset,
    nextAsset,
    prevAsset,
    goToAsset,
    canGoNext,
    canGoPrev,
    hasMultipleAssets,
  };
}
